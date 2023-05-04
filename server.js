// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
fastify.register(require("@fastify/cors"), {});

// Declare a route
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

fastify.post("/registro", require("./src/registro"));

fastify.post("/login", require("./src/login"));

fastify.get("/usuario/token", require("./src/token"));

fastify.post("/contacto", require("./src/contacto"));

fastify.get("/consulta", require("./src/contacto"));
fastify.delete("/consulta", require("./src/contacto"));
// API CRUD

fastify.route({
  method: ["GET", "POST", "PUT", "DELETE"],
  url: "/categoria",
  handler: require("./src/categoria.js"),
});

// Run the server!
async function start() {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
