# ---------- Build Stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# Copy only deps files first (to leverage cache)
COPY package.json package-lock.json ./
RUN npm i

# Now copy all source files
COPY . .

# Build Vite app
RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine AS prod

WORKDIR /app

# Copy built dist and runtime files
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Copy only necessary config files for Vite preview
COPY --from=build /app/vite.config.ts ./vite.config.ts

# Copy public files that exist
COPY --from=build /app/public/robots.txt ./dist/robots.txt
COPY --from=build /app/public/favicon.ico ./dist/favicon.ico
COPY --from=build /app/public/GP-no-bg.png ./dist/GP-no-bg.png
COPY --from=build /app/public/placeholder.svg ./dist/placeholder.svg

EXPOSE 3005

# Jalankan preview server dengan config TS
CMD ["npx", "vite", "preview", "--config", "vite.config.ts", "--port", "3003", "--host"]