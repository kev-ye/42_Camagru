FROM node:17-alpine AS development

WORKDIR /camagru/back-end

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/api" ]