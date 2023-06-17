FROM node:18-alpine as builder
ENV TZ=Asia/Shanghai
WORKDIR /app
RUN npm i -g pnpm
COPY . .
RUN pnpm i
RUN pnpm run build


FROM nginx
ENV TZ=Asia/Shanghai
EXPOSE 80
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
