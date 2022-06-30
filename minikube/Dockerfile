FROM node:16

ENV PORT=8080

WORKDIR /usr/src/app

COPY ./app/server.js ./app/package*.json ./

RUN npm ci --omit=dev

CMD ["node", "server.js"]