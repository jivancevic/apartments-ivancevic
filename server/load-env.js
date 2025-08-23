// Environment loader for local development (server-only)
try {
  if (process.env.NODE_ENV !== "production" && !process.env.REPLIT_DEPLOYMENT) {
    const { config } = await import("dotenv");
    config();
    console.log("Loaded server .env file");
  }
} catch {
  console.log("Using system environment variables");
}
