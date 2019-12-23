# base image
FROM node:12.2.0-alpine

WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json

RUN npm install --loglevel error

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

# start app
CMD ["npm", "start"]

