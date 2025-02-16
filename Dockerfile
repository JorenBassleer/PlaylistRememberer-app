# build step
FROM node:20 AS node-builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# serve step
FROM nginx:alpine AS server
WORKDIR /usr/share/nginx/html
COPY --from=node-builder /app/dist .
CMD ["nginx", "-g", "daemon off;"]