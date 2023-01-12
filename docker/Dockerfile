FROM node:18-slim AS builder
WORKDIR /usr/src/app
COPY . .
RUN apt-get update && apt-get install -y git
RUN yarn && yarn build

FROM nginx:stable
LABEL version="1.0"
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/angular-command/ .
