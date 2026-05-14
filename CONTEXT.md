# CONTEXT.md

Domain glossary and architectural backlog for apartments-ivancevic.
Used by Claude Code architecture reviews to maintain consistent language and avoid re-litigating closed decisions.

---

## Domain vocabulary

**Apartment** — a rentable unit. Has an identity (ID, slug, name EN/HR), physical attributes (size, bedrooms, amenities), pricing configuration, and booking platform links. Defined in `server/src/data/apartments.ts`.

**Booking** — a date range on a specific apartment that is unavailable for new guests. Comes from two sources: directly stored (from manual input or future direct bookings) and iCal-synced (pulled from Airbnb/Booking.com feeds). Neither source is authoritative alone.

**iCal feed** — an external calendar URL (Airbnb or Booking.com) that a property publishes. Polled server-side every 15 minutes and cached in `apartmentService.ts`. The source of truth for platform-originated bookings. On external failure, stale cache is served.

**Availability** — the consolidated set of blocked dates for an apartment, derived by merging stored bookings with iCal-feed bookings. Computed server-side in `getAvailability()` and returned by `GET /api/apartments/:id/bookings`. Clients use this single endpoint; there is no separate iCal endpoint.

**Inquiry** — a guest's request to book an apartment for specific dates. Stored in memory by `createInquiry()` in `apartmentService.ts`, which validates dates only. After the 201 response is sent, the controller fires two notification emails. Distinct from a confirmed booking. Submitted via `POST /api/apartments/inquiries`.

**Notification** — an email sent in response to an inquiry: one to the owner (`info@apartmentsivancevic.com`) and one to the guest. Triggered fire-and-forget by the controller after storing the inquiry (`sendOwnerNotification`, `sendCustomerConfirmation` in `emailService.ts`). The seam between storage and notification is at the controller level, not inside `createInquiry`.

**Stay** — a guest's selected date range (check-in to check-out). Has a length (nights), a price calculated server-side, and min/max night constraints from the pricing config.

**Price summary** — the server-authoritative breakdown of a stay: nightly prices, subtotal, stay-length discount, cleaning fee, total. Returned by `POST /api/pricing/calculate`. Defined in `shared/types/index.ts`. The client never recalculates this; it always calls the endpoint.

**Pricing config** — the seasonal rule sets and price periods that determine the nightly rate for each apartment. Stored in `server/src/data/pricing.ts`, keyed by apartment ID (not name). Consumed server-side only. The client calls `/api/pricing/limits/:id` and `/api/pricing/seasonal/:id` for what it needs — no raw config dump is exposed.

**Location** — a point of interest, restaurant, activity, or excursion near Korčula. Has a category, bilingual name/description, distance, and optional map/website link. Defined in `server/src/data/visit.ts`.

**Slug** — a URL-safe string identifier for an apartment (e.g. `magical-oasis`). A field on the `Apartment` entity, populated in `server/src/data/apartments.ts` and carried to the client through the API. No client-side lookup tables.

---

## Code conventions

**Bilingual field access** — use `localize(obj, field, lang)` from `client/src/lib/localize.ts`. Picks `fieldEn` or `fieldHr` based on `lang`. Do not write inline `lang === "en" ? obj.fieldEn : obj.fieldHr` ternaries; add them to `localize` call sites instead.

**`shared/` is type-only** — both tsconfigs resolve `shared/` by relative path, and neither can resolve third-party packages (e.g. Zod) from outside their own `node_modules`. Only plain TypeScript types and interfaces belong in `shared/`. Validation schemas (Zod) stay in `server/src/validation/` (server) and `client/src/features/*/schemas.ts` (client).

**Inquiry validation** — server schema is `server/src/validation/inquiry.ts`. Client form schema is `client/src/features/contact/schemas.ts` (`makeInquiryFormSchema(t)` factory so translations are injected once, not recreated each render). Both enforce `name: min(1)`. The inquiry endpoint is `POST /api/apartments/inquiries` (not `/api/inquiries`).

---

## Architecture backlog

Candidates surfaced by `/improve-codebase-architecture`. Work through them in order.

### #1 — Booking source fan-in (done)
`apartmentService.getAvailability()` merges stored + iCal bookings. `/api/apartments/:id/bookings` returns the unified list. `/api/apartments/:id/ical-bookings` removed. `useIcalFeeds` hook deleted. `ApartmentDetail` and `SearchResults` each reduced to a single query.

### #2 — Pricing config types duplicated across the seam (done)
`RuleSet`, `RuleSetPeriod`, `PricePeriod`, `ApartmentPricingConfig`, `StayLengthDiscount` now live in `shared/types/index.ts`. Both `server/src/data/pricing.ts` and the client re-export them from shared. `client/src/types/index.ts` is the single import path for client code.

### #3 — `createInquiry` hides notification side effects (done)
`createInquiry` in `apartmentService.ts` now only stores and validates — no email imports or sends. The controller in `apartments.controller.ts` explicitly calls `sendOwnerNotification` and `sendCustomerConfirmation` after the inquiry is stored and the response is sent. The seam between storage and notification is now visible at the controller level.

### #4 — Apartment identity has no canonical home (done)
`slug` and `stars` are now fields on the `Apartment` entity in `shared/types/index.ts`, populated in `server/src/data/apartments.ts`. Removed `APARTMENT_SLUGS` lookup tables from `ApartmentTabs.tsx` and `SearchResults.tsx`, and the `getApartmentStars` function from `ApartmentTabs.tsx`. `ApartmentDetail.tsx` now reads `apartment.stars` directly. Also fixed a latent bug: `SearchResults.tsx` had `saint-roko` and `ismaelli` IDs swapped.

### #5 — Client pricing lib was a replicated seam (done)
`client/src/lib/pricing.ts` (371 lines) deleted. It reimplemented the server's pricing calculation engine client-side, fetching raw config from `/api/pricing-data` and running shadow copies of `calculateStayPrice`, `getStayLimits`, etc. Now: `SeasonPriceGrid` uses `useQuery` against `/api/pricing/seasonal/:id`; `BookingCalendar` calls `/api/pricing/limits/:id` via `apiRequest` in a `useEffect`; `isValidStayLength` is synchronous and reads the cached `stayLimits` state. The `/api/pricing-data` and `/api/pricing/data` endpoints removed.

### #6 — Pricing config keyed by apartment display name (done)
`APARTMENT_RULE_SET_PERIODS`, `APARTMENT_PRICE_PERIODS`, and `APARTMENT_PRICING_CONFIGS` in `server/src/data/pricing.ts` were keyed by `apartment.nameEn` strings. All three maps now use `Record<number, ...>` keyed by apartment ID. Pricing service functions (`calculateStayPrice`, `getStayLimits`, `getSeasonalPrices`) take `apartmentId: number`. Renaming an apartment no longer silently breaks pricing.

### #7 — `apartmentService` pass-through object removed (done)
`apartmentService.getAll()`, `getById()`, `getAllBookings()`, `getBookingsByApartment()` were pure delegates to `storage`. Removed the `apartmentService` object. The controller now calls `storage` directly for basic CRUD. `getAvailability()` (which merges stored + iCal bookings) is exported as a named function from `apartmentService.ts` — the only logic that earns its keep.

### #8 — Inquiry schema extracted from controller (done)
Server-side `inquirySchema` moved from `apartments.controller.ts` to `server/src/validation/inquiry.ts`. Client-side form schema moved from `ContactForm.tsx` into `client/src/features/contact/schemas.ts` as a `makeInquiryFormSchema(t)` factory. Fixed constraint drift (`name: min(2)` on client → `min(1)` to match server). Fixed URL bug: client was POSTing to `/api/inquiries` (404); corrected to `/api/apartments/inquiries`. Removed dead `ical-bookings` query from `ContactForm` — the endpoint was removed in #1 and `/api/apartments/:id/bookings` already returns merged availability.

### #9 — `localize` helper centralises bilingual field access (done)
`client/src/lib/localize.ts` exports `localize(obj, field, lang)` which picks `fieldEn` or `fieldHr` by language. Replaced all inline `lang === "en" ? obj.fieldEn : obj.fieldHr` ternaries across `ApartmentDetail`, `ApartmentTabs`, `SearchResults`, `VisitCards`, `VisitTabs`, `FeatureSection`, `ContactForm`.

### #10 — `SearchResults` data orchestration is tangled
`SearchResults.tsx` (~466 lines) owns: per-apartment booking fetches in a raw-`fetch` loop (bypasses `apiRequest`/`getQueryFn`), a price-computation `useEffect` that fans out to `POST /api/pricing/calculate` for every apartment, a manual 500ms minimum loading timer built with `useRef`/`setTimeout`, and the availability-filter logic. These concerns should be extracted into feature hooks (`useApartmentSearch` or similar) so the component only renders. The `queryKey: ["allBookings"]` is also missing `checkIn`/`checkOut`, so cached booking data is reused across different searches.

### #11 — `ApartmentTabs` URL date parsing is 120 lines for two params
`ApartmentTabs.tsx` has a `parseQueryParams` function (~80 lines) that manually parses `checkIn` and `checkOut` query params with try/catch, `isNaN` guards, and two separate code paths per param. `new URLSearchParams(window.location.search)` + `new Date(param + "T00:00:00")` achieves the same in a few lines. The verbosity obscures the intent and would hide a bug if a third date param were added.

---

## Closed decisions

**No runtime code in `shared/`** — `shared/` has no `package.json` and no `node_modules`. Both `server/` and `client/` import it by relative path, so third-party packages (Zod, date-fns, etc.) cannot be resolved from files inside `shared/`. Attempting to add Zod schemas to `shared/` breaks `tsc --noEmit` on the server. Keep `shared/` to plain TypeScript types and interfaces only.
