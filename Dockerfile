FROM node:14.16-alpine
RUN mkdir /var/back-end
WORKDIR /var/back-end
COPY . .
RUN npm i
RUN npm install pm2 -g
CMD npm run migrations ; pm2-runtime ./src/server.js
