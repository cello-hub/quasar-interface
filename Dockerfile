FROM node:18-alpine as builder
WORKDIR /app
RUN npm i -g pnpm
COPY . .
RUN pnpm i
RUN pnpm run build


FROM nginx
EXPOSE 80
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
