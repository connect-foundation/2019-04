FROM node:12.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 3030
CMD [ "npm", "start" ]
