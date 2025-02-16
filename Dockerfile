# build step
FROM node:20 AS node-builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# serve step
FROM nginx:alpine as server
COPY --chown=node-builder /app/dist /user/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]