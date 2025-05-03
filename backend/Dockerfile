# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile
COPY src/ ./src/
RUN yarn build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=builder /app/dist ./dist
CMD ["node","dist/index.js"]
