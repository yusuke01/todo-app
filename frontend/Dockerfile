# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production stage
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx","-g","daemon off;"]
