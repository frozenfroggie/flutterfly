FROM node:10.11.0

WORKDIR /usr/src/flutterfly

COPY package*.json ./

RUN npm install

CMD ["npm", "start"]
