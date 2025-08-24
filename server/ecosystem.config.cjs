const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

// Resolve and load .env (or .env.production when present)
const envDefaultPath = path.join(__dirname, ".env");
const envProdPath = path.join(__dirname, ".env.production");
let envPathToUse = envDefaultPath;
if (process.env.NODE_ENV === "production" && fs.existsSync(envProdPath)) {
  envPathToUse = envProdPath;
}
if (fs.existsSync(envPathToUse)) {
  dotenv.config({ path: envPathToUse });
}

module.exports = {
  apps: [
    {
      name: "apartments-ivancevic-server",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      env: {
        NODE_ENV: "development",
        PORT: String(process.env.PORT || 3000),
        CORS_ORIGINS:
          process.env.CORS_ORIGINS ||
          process.env.ORIGIN ||
          "http://localhost:5173",
        ORIGIN: process.env.ORIGIN || "http://localhost:5173",
        SESSION_SECRET: process.env.SESSION_SECRET || "dev_only_change_me",
        COOKIE_NAME: process.env.COOKIE_NAME || "sid",
        COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "",
        COOKIE_SECURE: process.env.COOKIE_SECURE || "false",
        COOKIE_SAMESITE: process.env.COOKIE_SAMESITE || "None",
        RESEND_API_KEY: process.env.RESEND_API_KEY || "",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: String(process.env.PORT || 8080),
        CORS_ORIGINS:
          process.env.CORS_ORIGINS ||
          process.env.ORIGIN ||
          "https://apartmentsivancevic.com",
        ORIGIN: process.env.ORIGIN || "https://apartmentsivancevic.com",
        SESSION_SECRET:
          process.env.SESSION_SECRET || "REPLACE_WITH_A_REAL_SECRET_KEY",
        COOKIE_NAME: process.env.COOKIE_NAME || "sid",
        COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || ".apartmentsivancevic.com",
        COOKIE_SECURE: process.env.COOKIE_SECURE || "true",
        COOKIE_SAMESITE: process.env.COOKIE_SAMESITE || "None",
        RESEND_API_KEY: process.env.RESEND_API_KEY || "",
      },
    },
  ],
};
