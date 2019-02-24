FROM node:latest
RUN rm -rf ./node_modules
WORKDIR /usr/src/backend
COPY package.json /usr/src/backend
COPY package-lock.json /usr/src/backend
RUN npm install
COPY . /usr/src/backend
EXPOSE 3000
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start