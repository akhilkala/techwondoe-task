# FROM node:alpine as builder
# WORKDIR '/app'
# COPY ./package.json ./
# RUN npm install
# COPY . .
# RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY  ./build /usr/share/nginx/html