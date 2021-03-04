FROM node:13.12.0-alpine as builder


# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

COPY ./src ./src
COPY ./public ./public
COPY ./.env ./.env

RUN yarn cache clean

RUN yarn  

RUN yarn build 

FROM nginx:1.17.3-alpine AS frontend

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.conf  /etc/nginx/nginx.conf

COPY --from=builder /app/build /app

RUN mkdir -p /etc/nginx/logs &&  echo '' > /etc/nginx/logs/error.log

WORKDIR /app
