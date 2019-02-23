const Hapi = require("hapi");
const Mongoose = require("mongoose");

const server = new Hapi.server({
  port: 3000,
  host: "0.0.0.0"
});

let isConnected = false;

Mongoose.connect("mongodb://mongo:27017/orders");
var db = Mongoose.connection;

db.on("connected", () => {
  console.log("connected");
  isConnected = true;
});
db.on("disconnected", () => {
  console.log("disconnected");
  isConnected = false;
});

//TODO remove
server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "Hello, world!";
  }
});

server.route({
  method: "GET",
  path: "/connected",
  handler: (request, h) => {
    return isConnected;
  }
});

server.route({
  method: "GET",
  path: "/aggregation-criteria",
  handler: (request, h) => {
    return "Map Reduce";
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
