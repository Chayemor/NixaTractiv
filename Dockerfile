FROM node:10.15.0

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# node_modules is also on .dockerignore
ENV PATH /app/node_modules/.bin:$PATH

# Installa
COPY package.json ./
RUN npm install --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
