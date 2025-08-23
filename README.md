# Apartments Ivančević – Local Development, Build and Deploy

## Prerequisites

Before running this project locally, make sure you have:

1. **Node.js 18+** installed on your MacBook
2. **PostgreSQL** installed and running locally
3. **Git** for version control

## Installation Steps

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd apartments-ivancevic

# Install dependencies
npm install
```

### 2. Database Setup

Install PostgreSQL on macOS:

```bash
# Using Homebrew
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb apartments_db
```

### 3. Environment Configuration

For **local development only**, copy the example environment file:

```bash
cp .env.example .env
```

Then install dotenv for local development:

```bash
npm install dotenv
```

Edit `.env` file with your local settings:

```env
# Database - Update with your local PostgreSQL credentials
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/apartments_db

# Email Service - Get your API key from https://resend.com
RESEND_API_KEY=your_resend_api_key_here

# Development Environment
NODE_ENV=development
```

### 4. Database Migration

Run database migrations:

```bash
npm run db:push
```

### 5. Start Development Servers

Run frontend and backend separately:

```bash
# Frontend
cd client
npm install
npm run dev

# Backend
cd ../server
npm install
cp .env.example .env
npm run dev
```

Or from the project root, run both together in parallel:

```bash
npm run dev:all
```

Local URLs:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api/\*

Important for local dev: set `ORIGIN=http://localhost:5173` in `server/.env` so CORS allows the Vite dev server and cookies to work cross-origin. Alternatively, use `CORS_ORIGINS=http://localhost:5173,https://apartmentsivancevic.com` to support multiple origins.

## Environment Variables

| Variable         | Description           | Required   | Example        |
| ---------------- | --------------------- | ---------- | -------------- |
| `RESEND_API_KEY` | Email service API key | Optional\* | `re_xxxxxxxxx` |
| `NODE_ENV`       | Environment mode      | No         | `development`  |
| `PORT`           | Custom port number    | No         | `3001`         |

**\*Note**: `RESEND_API_KEY` is only needed if you want to test email functionality. The app runs fine without it - emails just won't be sent (you'll see console logs instead).

## Getting API Keys

### Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env` file

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running: `brew services start postgresql@16`
- Check your database credentials in `.env`
- Verify the database exists: `psql -l`

### Port Already in Use

If port 5000 is busy, you can change it by adding this to your `.env` file:

```env
PORT=3001
```

Then access the app at http://localhost:3001

### Email Service Issues

- Verify your Resend API key is correct
- Check the Resend dashboard for quota limits
- Emails work in development but may need domain verification for production

## Project Structure

```
├── client/                  # React + Vite + Tailwind + i18next + Wouter
│   ├── package.json
│   ├── public/
│   │   └── _redirects       # Cloudflare Pages SPA routing
│   ├── tsconfig.json
│   └── .env.example
├── server/                  # Express API (no DB) + session-based auth
│   ├── package.json
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── ecosystem.config.js  # PM2 process config
│   ├── tsconfig.json
│   ├── types.ts             # Local server-only types
│   └── .env.example
└── .github/workflows/
    └── deploy-backend.yml   # GitHub Actions for backend deploy
```

## Environment

Backend `.env.example` (copy to `server/.env` and adjust):

```
NODE_ENV=production
PORT=3000
# Use one of the following:
# For single origin
ORIGIN=https://apartmentsivancevic.com
# Or for multiple origins (comma-separated)
# CORS_ORIGINS=https://apartmentsivancevic.com,https://www.apartmentsivancevic.com
SESSION_SECRET=changeme
COOKIE_NAME=sid
COOKIE_DOMAIN=.apartmentsivancevic.com
COOKIE_SECURE=true
COOKIE_SAMESITE=None
```

Frontend `.env.example` (copy to `client/.env` and adjust):

```
VITE_API_BASE_URL=https://api.apartmentsivancevic.com
```

## Deploy – Backend (DigitalOcean + PM2)

1. Provision a Droplet (Ubuntu 22.04), install Node 20 and PM2:

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm i -g pm2
```

2. Setup directory:

```
sudo mkdir -p /var/www/project/server
sudo chown -R $USER:$USER /var/www/project
```

3. Configure GitHub Secrets: `DO_HOST`, `DO_USER`, `SSH_PRIVATE_KEY`.

4. Push to `main`. GitHub Actions will build and rsync `server/` to the Droplet and run `pm2 startOrReload ecosystem.config.js`.

Alternative: Docker (build on droplet):

```
cd /var/www/project/server
docker build -t apartments-api .
docker run -d -p 3000:3000 --env-file .env --name apartments-api apartments-api
```

## Deploy – Frontend (Cloudflare Pages)

- Create a Pages project connected to this repo.
- Build command: `npm run build`
- Build directory: `client/dist`
- Root directory: `client`
- Environment variable: `VITE_API_BASE_URL=https://api.apartmentsivancevic.com`
- The `client/public/_redirects` file ensures SPA routing.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open database GUI (if available)
- `npm run dev:server` - Start backend only (from project root)
- `npm run dev:client` - Start frontend only (from project root)
- `npm run dev:all` - Start backend and frontend together (from project root)
