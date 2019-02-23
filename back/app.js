const Hapi = require("hapi");
const Mongoose = require("mongoose");

const server = new Hapi.server({
  port: 3000,
  host: "localhost"
});

// Mongoose.connect("mongodb://mongo:27017/");

server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "Hello, world!";
  }
});

server.route({
  method: "GET",
  path: "/heartbeat",
  handler: (request, h) => {
    return "Connection is alive!";
  }
});

server.route({
  method: "POST",
  path: "/add",
  handler: (request, h) => {
    return "post";
  }
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
