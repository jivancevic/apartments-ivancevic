# Apartments Ivančević - Local Development

## Quick Start (No Database Required!)

This app uses **in-memory storage** - no PostgreSQL setup needed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the App
```bash
npm run dev
```

That's it! The app runs at **http://localhost:5000**

> **Note**: The app uses `localhost` for local development (instead of `0.0.0.0`) to work properly on macOS.

## Optional: Email Functionality

If you want to test email sending:

1. Get a free API key from [resend.com](https://resend.com)
2. Create a `.env` file:
```env
RESEND_API_KEY=your_api_key_here
```

Without the API key, emails just show as console logs (no errors).

## How It Works

- **Frontend**: React with TypeScript
- **Backend**: Express server with in-memory storage
- **Data**: All apartment info is stored in code (no database)
- **Emails**: Optional Resend service for contact forms

## Troubleshooting

**Port 5000 busy?** Add to `.env`:
```env
PORT=3001
```

**Still having issues?** Run the setup checker:
```bash
node local-setup-check.js
```