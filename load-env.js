// Environment loader for local development
// This file loads .env in local development but is ignored in production

try {
  // Only load dotenv in local development
  if (process.env.NODE_ENV !== 'production' && !process.env.REPLIT_DEPLOYMENT) {
    const { config } = await import('dotenv');
    config();
    console.log('Loaded local .env file');
  }
} catch (error) {
  // dotenv not available or no .env file - use system environment variables
  console.log('Using system environment variables');
}