# Apartments Ivančević - Vacation Rental Platform

## Overview

This is a full-stack vacation rental platform for Apartments Ivančević, a family-owned business offering apartments on the Croatian island of Korčula. The application enables potential guests to browse apartments, check availability, view pricing, and submit booking inquiries.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Internationalization**: react-i18next for English/Croatian language support

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with `/api` prefix for all endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Email Service**: Resend for transactional emails
- **External Integrations**: iCal feeds from Airbnb and Booking.com for availability

### Database Architecture
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema**: Centralized in `shared/schema.ts` for type safety across frontend/backend
- **Tables**: apartments, bookings, inquiries, locations
- **Migrations**: Automated through drizzle-kit

## Key Components

### Apartment Management
- Complete apartment data including amenities, pricing, and images
- Multi-language support (English/Croatian) for descriptions
- Dynamic pricing based on seasons and apartment-specific multipliers
- Image galleries with lazy loading

### Booking System
- iCal feed integration for real-time availability from external platforms
- Interactive calendar for date selection
- Dynamic price calculation based on seasons and stay duration
- Inquiry submission system (no direct booking - inquiry-based workflow)

### Multilingual Support
- Full i18n implementation with react-i18next
- Language toggle in navigation
- Localized content for apartments, locations, and UI elements
- URL parameters preserved across language switches

### Location Recommendations
- Categorized recommendations (attractions, activities, restaurants, excursions)
- Distance and transportation information
- External links to booking platforms and maps

## Data Flow

1. **Client Request**: User browses apartments or submits inquiry
2. **API Layer**: Express routes handle requests, validate data with Zod schemas
3. **Storage Layer**: In-memory storage with interface for future database migration
4. **External APIs**: iCal feeds fetched and parsed for availability data
5. **Response**: JSON data returned to client, React Query handles caching

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **react-i18next**: Internationalization
- **date-fns**: Date manipulation and formatting

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Communication
- **resend**: Email service for inquiry notifications
- **ical**: iCal feed parsing for availability data
- **node-fetch**: HTTP client for external API calls

## Deployment Strategy

### Development
- **Environment**: Replit with Node.js 20 and PostgreSQL 16
- **Hot Reload**: Vite HMR for frontend, tsx for backend development
- **Port Configuration**: Backend on 5000, frontend proxy through Vite

### Production Build
- **Frontend**: Vite build to `dist/public`
- **Backend**: esbuild bundle to `dist/index.js`
- **Static Assets**: Served from `dist/public` in production
- **Environment Variables**: Database URL, email API keys

### Database
- **Development**: Local PostgreSQL or Neon database
- **Schema Management**: Drizzle migrations with `npm run db:push`
- **Connection**: Environment variable `DATABASE_URL`

## Changelog

```
Changelog:
- June 17, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```