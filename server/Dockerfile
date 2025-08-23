FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production || npm ci

# Copy server source
COPY . ./

# Build (client is built separately on Cloudflare; server bundles its own output)
RUN npm run build || true

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]

