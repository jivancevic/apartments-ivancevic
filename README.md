# Apartments Ivančević - Local Development Setup

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

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at:
- Full Application: http://localhost:5000 (both frontend and API)
- Backend API only: http://localhost:5000/api/*

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `RESEND_API_KEY` | Email service API key | Optional* | `re_xxxxxxxxx` |
| `NODE_ENV` | Environment mode | No | `development` |
| `PORT` | Custom port number | No | `3001` |

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
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── package.json     # Dependencies and scripts
└── .env            # Environment variables (not committed)
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open database GUI (if available)