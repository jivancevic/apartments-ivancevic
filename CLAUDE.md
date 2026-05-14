# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start both frontend and backend together
./start-dev.sh
# or individually:
# (cd server && npm run dev) & (cd client && npm run dev)

# Frontend only (http://localhost:5173)
cd client && npm run dev

# Backend only (http://localhost:8080)
cd server && npm run dev

# Typecheck (both sides)
cd client && npm run typecheck
cd server && npm run typecheck

# Build
cd client && npm run build
cd server && npm run build
```

There are no test scripts. Typecheck and build are the quality gates.

## Architecture

Monorepo with three packages: `client/`, `server/`, and `shared/`. Client and server deploy independently.

### Shared types (`shared/types/index.ts`)

Single source of truth for all cross-seam types: `Apartment`, `Booking`, `Location`, `PriceSummary`, and the pricing config types (`StayLengthDiscount`, `RuleSet`, `RuleSetPeriod`, `PricePeriod`, `ApartmentPricingConfig`). Both sides re-export from here via their local `src/types/index.ts` barrel files. Use `@/types` (client) or `../types` (server) — do not import from `shared/` directly in feature code.

`Apartment` carries `slug` (URL-safe identifier, e.g. `"magical-oasis"`) and `stars` (integer star rating). Both are populated in `server/src/data/apartments.ts` and flow to the client through the API — no client-side lookup tables.

### Backend (`server/`)

Express + TypeScript, run with `tsx` in dev, bundled with `esbuild` for production. **No database** — all content lives in static TypeScript files under `server/src/data/` and is seeded into an in-memory store (`MemStorage`) at startup.

- `src/data/apartments.ts`, `data/visit.ts`, `data/pricing.ts` — all content; editing these is how you add/change apartments or locations
- `src/storage/storage.ts` — `MemStorage` implements `IStorage`, seeded from data files
- `src/services/` — business logic:
  - `apartmentService.ts` — CRUD wrappers + `getAvailability(id)` (merges stored + iCal bookings). iCal feeds cached 15 min server-side; stale data served on external failure. `createInquiry` validates dates and stores the inquiry only — **no email sends**.
  - `pricingService.ts` — authoritative price calculations: `calculateStayPrice`, `getStayLimits`, `getSeasonalPrices`
  - `emailService.ts` — Resend-based email: `sendOwnerNotification`, `sendCustomerConfirmation`
- `src/api/controllers/apartments.controller.ts` — after storing an inquiry, the **controller** explicitly calls `sendOwnerNotification` and `sendCustomerConfirmation` (fire-and-forget after the 201 response). This is intentional: the seam between storage and notification belongs at the controller level.
- `src/api/routes/pricing.routes.ts` — pricing endpoints: `POST /api/pricing/calculate`, `GET /api/pricing/limits/:id`, `GET /api/pricing/seasonal/:id`
- `src/types/` — server-only types (`Inquiry`, `InsertInquiry`, etc.) + re-exports from `shared/`

All mutation and calculation endpoints use Zod validation. Invalid requests get 422 with a readable message.

### Frontend (`client/`)

React 18 + Vite SPA. The `@` alias resolves to `client/src/`.

**Structure — feature-first:**
```
client/src/
  features/
    apartments/
      components/   ApartmentDetail, ApartmentGallery, ApartmentTabs
    visit/
      components/   VisitCards, VisitTabs
    contact/
      components/   ContactForm, ContactInfo
    search/
      components/   SearchBar, SearchResults
    home/
      components/   HeroSection, FeatureSection
  components/
    layout/         Header, Footer (shared across features)
    ui/             Radix UI-based design system primitives
    ErrorBoundary   Feature-level error boundaries
  hooks/            useLanguage, use-mobile, use-toast (truly shared)
  pages/            Page-level route components
```

When adding a feature, put components and feature-specific hooks under `features/{name}/`.

**Key patterns:**
- **Routing**: `wouter`. Routes defined in `src/App.tsx`.
- **Data fetching**: TanStack Query v5. `apiRequest` and `getQueryFn` in `src/lib/queryClient.ts` prepend `VITE_API_BASE_URL` to all API calls.
- **Pricing**: `POST /api/pricing/calculate` returns a server-authoritative `PriceSummary`. The client never calculates the final price itself. `getStayLimits` stays client-side (called on every calendar hover for instant feedback).
- **i18n**: `i18next` with EN/HR. Locales in `src/i18n/locales/`. Language toggle via `useLanguage` hook.
- **Error boundaries**: `ErrorBoundary` wraps the calendar, pricing display, and contact form. A crash in one section does not blank the whole page.
- **UI**: Radix UI primitives styled as shadcn components in `src/components/ui/`. Tailwind CSS, framer-motion for animations.

### Environment Variables

Backend (`server/.env`):
- `CORS_ORIGINS` or `ORIGIN` — allowed frontend origin(s); set to `http://localhost:5173` for local dev
- `RESEND_API_KEY` — optional; emails log to console if absent
- `PORT` — defaults to 8080

Frontend (`client/.env`):
- `VITE_API_BASE_URL` — backend URL (empty in dev; `https://api.apartmentsivancevic.com` in production)

### Deployment

- **Frontend**: Cloudflare Pages. Build command: `npm run build` (from `client/`). Output: `client/dist`. `client/public/_redirects` enables SPA routing.
- **Backend**: DigitalOcean Droplet + PM2. GitHub Actions (`.github/workflows/deploy-server.yml`) runs `typecheck` then `build`, rsyncs `server/` to the droplet, and reloads PM2 on push to `main`.

## Architecture decisions

`CONTEXT.md` (repo root) is the domain glossary and architecture decision log. Read it before proposing structural changes — it records closed decisions and the current backlog so they are not re-litigated.
