const fastify = require("fastify")({
    logger: true,
    pluginTimeout: 10000,
});

//importar clase usuario
const versiones = require("./versiones.js");

//Inicializar servidor Fastify
fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});


fastify.register(require("fastify-cors"), {
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"]
})

fastify.get("/versiones", versiones.getAll);

fastify.get("/versiones/:app", versiones.getByApp);

fastify.put("/versiones/:app", versiones.modifyByApp);
