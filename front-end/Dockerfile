FROM nginx:alpine AS development

WORKDIR /camagru/front-end

RUN rm -rf /usr/share/nginx/html/*

COPY /camagru/front-end /usr/share/nginx/html
COPY /camagru/front-end/default.conf /etc/nginx/conf.d/default.conf