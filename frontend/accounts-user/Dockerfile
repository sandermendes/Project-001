# Install dependencies only when needed
FROM node:20-alpine AS deps

# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY frontend/accounts-user/package.json ./
# COPY frontend/accounts-user/package-lock.json ./
COPY frontend/accounts-user/yarn.lock ./
# RUN yarn install
RUN npm install && npm ci

# Rebuild the source code only when needed
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/accounts-user/public ./public
COPY frontend/accounts-user/src ./src
COPY frontend/accounts-user/.env ./.env
COPY frontend/accounts-user/index.html ./index.html
COPY frontend/accounts-user/package.json ./package.json
# COPY frontend/accounts-user/package-lock.json ./package-lock.json
COPY frontend/accounts-user/tsconfig.json ./tsconfig.json
COPY frontend/accounts-user/tsconfig.node.json ./tsconfig.node.json
COPY frontend/accounts-user/vite.config.ts ./vite.config.ts
COPY frontend/accounts-user/yarn.lock ./yarn.lock
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.25.4-alpine as production
ENV NODE_ENV development
# Copy built assets from `builder` image
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY frontend/accounts-user/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 4050
# Start nginx
CMD ["nginx", "-g", "daemon off;"]