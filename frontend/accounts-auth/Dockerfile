# Install dependencies only when needed
FROM node:20-alpine AS deps

# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY frontend/accounts-auth/package.json ./
COPY frontend/accounts-auth/package-lock.json ./
COPY frontend/accounts-auth/yarn.lock ./
# RUN yarn install
RUN npm install && npm ci

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/accounts-auth/public ./public
COPY frontend/accounts-auth/src ./src
COPY frontend/accounts-auth/.env ./.env
COPY frontend/accounts-auth/index.html ./index.html
COPY frontend/accounts-auth/package.json ./package.json
COPY frontend/accounts-auth/package-lock.json ./package-lock.json
COPY frontend/accounts-auth/tsconfig.json ./tsconfig.json
COPY frontend/accounts-auth/tsconfig.node.json ./tsconfig.node.json
COPY frontend/accounts-auth/vite.config.ts ./vite.config.ts
COPY frontend/accounts-auth/yarn.lock ./yarn.lock
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.25.2-alpine as production
ENV NODE_ENV development
# Copy built assets from `builder` image
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY frontend/accounts-auth/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 4050
# Start nginx
CMD ["nginx", "-g", "daemon off;"]