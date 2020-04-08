FROM node:13.0-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

FROM nginx:latest

COPY --from=builder /app/dist/* /usr/share/nginx/html/