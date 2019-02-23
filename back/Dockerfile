FROM node:latest
RUN rm -rf ./node_modules
WORKDIR /usr/src/backend
COPY package.json /usr/src/backend
COPY package-lock.json /usr/src/backend
RUN npm install
COPY . /usr/src/backend
EXPOSE 3000
CMD ["npm", "start"]