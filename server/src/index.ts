import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import("../load-env.js");
import cors from "cors";
import session from "express-session";
import passport from "passport";
import apiRouter from "./api/routes";

const app = express();
app.set("trust proxy", 1);

// CORS (env-driven)
const originsRaw = (
  process.env.CORS_ORIGINS ||
  process.env.ORIGIN ||
  ""
).trim();
const configuredOrigins = originsRaw
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const isWildcard = originsRaw === "*";
const corsOrigin = (
  origin: string | undefined,
  cb: (err: Error | null, allow?: boolean) => void
) => {
  if (!origin) return cb(null, true);
  if (isWildcard) return cb(null, true);
  if (configuredOrigins.length > 0)
    return cb(null, configuredOrigins.includes(origin));
  if ((process.env.NODE_ENV || "").toLowerCase() === "development")
    return cb(null, true);
  return cb(new Error("CORS: Origin not allowed"), false);
};
const corsOptions = { origin: corsOrigin, credentials: true } as const;
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Body parsers after cors
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session + Passport
app.use(
  session({
    name: process.env.COOKIE_NAME || "sid",
    secret: process.env.SESSION_SECRET || "changeme",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: (process.env.COOKIE_SECURE || "true").toLowerCase() === "true",
      domain: process.env.COOKIE_DOMAIN || undefined,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  })
);
passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use("/api", apiRouter);

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("ok");
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : undefined;
app.listen(port, host, () => {
  console.log(`serving on ${host ?? "localhost"}:${port}`);
});
