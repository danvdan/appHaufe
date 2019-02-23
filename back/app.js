// const Hapi = require("hapi");
// const HapiMongoDb = require("hapi-mongodb");

// const server = new Hapi.server({
//   port: 3000,
//   host: "localhost"
// });

// server.route({
//   method: "GET",
//   path: "/",
//   handler: (request, h) => {
//     return "Hello, world!";
//   }
// });

// server.route({
//   method: "GET",
//   path: "/heartbeat",
//   handler: (request, h) => {
//     return "Connection is alive!";
//   }
// });

// server.route({
//   method: "POST",
//   path: "/add",
//   handler: (request, h) => {
//     return "post";
//   }
// });

// const init = async () => {
//   await server.start();
//   console.log(`Server running at: ${server.info.uri}`);
// };

// process.on("unhandledRejection", err => {
//   console.log(err);
//   process.exit(1);
// });

// init();

const Hapi = require("hapi");
const Boom = require("boom");
const HapiMongoDb = require("hapi-mongodb");

const launchServer = async function() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost"
  });

  await server.register({
    plugin: HapiMongoDb,
    options: {
      url: "mongodb://localhost:27017/"
    }
  });

  server.route({
    method: "GET",
    path: "/",
    async handler(request) {
      return "hello world";
    }
  });

  server.route({
    method: "GET",
    path: "/users/{id}",
    async handler(request) {
      const db = request.mongo.db;
      const ObjectID = request.mongo.ObjectID;

      try {
        const result = await db
          .collection("users")
          .findOne({ _id: new ObjectID(request.params.id) });
        return result;
      } catch (err) {
        throw Boom.internal("Internal MongoDB error", err);
      }
    }
  });

  await server.start();
  console.log(`Server started at ${server.info.uri}`);
};

launchServer().catch(err => {
  console.error(err);
  process.exit(1);
});
