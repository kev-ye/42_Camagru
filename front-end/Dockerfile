FROM nginx:alpine AS development

RUN rm -rf /usr/share/nginx/html/*
RUN mkdir /usr/share/nginx/html/front-end

COPY . /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf