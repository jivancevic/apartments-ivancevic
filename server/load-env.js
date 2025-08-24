// Environment loader (server-only)
// Always attempt to load .env if present (safe in production too),
// but skip on Replit deployments.
try {
  if (!process.env.REPLIT_DEPLOYMENT) {
    const { config } = await import("dotenv");
    config();
    console.log("Loaded server .env file (if present)");
  }
} catch {
  console.log("Using system environment variables");
}
