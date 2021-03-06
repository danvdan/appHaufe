const Hapi = require("hapi");
const config = require("./config");
const boom = require("boom");
const Mongoose = require("mongoose");
const OrderModel = require("./models/Order");

const server = new Hapi.server({
  host: config.server.host,
  port: config.server.port
});

let isConnected = false;

Mongoose.connect(
  `mongodb://${config.database.host}:${config.database.port}/${
    config.database.db
  }`
);
var db = Mongoose.connection;
db.on("error", () => {
  console.log("Connection error");
  process.exit(1);
});
db.once("open", () => {
  console.log("Connection with database succeeded.");
});
db.on("connected", () => {
  console.log("Connected");
  isConnected = true;
});
db.on("disconnected", () => {
  console.log("Disconnected");
  isConnected = false;
});

server.route({
  method: "GET",
  path: "/connected",
  config: { cors: true },
  handler: (request, h) => {
    let response;
    if (isConnected) {
      response = h.response(isConnected).code(200);
    } else {
      response = h.response().code(204);
    }

    return response;
  }
});
server.route({
  method: "GET",
  path: "/all",
  config: { cors: true },
  handler: async (request, h) => {
    try {
      var orders = await OrderModel.find().exec();
      return h.response(orders);
    } catch (error) {
      return boom.boomify(error, { statusCode: 500 });
    }
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
  config: { cors: true },
  handler: async (request, h) => {
    try {
      var order = new OrderModel(request.payload);
      var result = await order.save();

      return h.response(result);
    } catch (error) {
      return boom.boomify(error, { statusCode: 500 });
    }
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
