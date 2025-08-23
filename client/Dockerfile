# syntax=docker/dockerfile:1

# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Pass API base URL at build time (defaults for local Docker usage)
ARG VITE_API_BASE_URL=http://localhost:3000
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Install deps and build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Runtime stage ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install a lightweight static server via Vite preview
RUN npm i -g vite@5

# Copy built assets
COPY --from=builder /app/dist ./dist

EXPOSE 5173
CMD ["vite", "preview", "--host", "0.0.0.0", "--port", "5173"]


