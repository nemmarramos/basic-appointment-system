FROM node:16

WORKDIR /usr/src/app2
COPY package*.json ./
COPY . .
RUN npm i
EXPOSE 8080
CMD [ "node", "server.js" ]