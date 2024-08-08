import fastify from 'fastify';
import { DataBasePostgres } from './database-postgres.js';

const server = fastify();
const database = new DataBasePostgres();

// Pratos
server.post("/pratos", async (request, reply) => {
    const { name, foto, description, price } = request.body;

    await database.createPrato({
        name,
        foto,
        description,
        price
    });

    reply.status(201).send();
});

server.get("/pratos", async (request) => {
    const search = request.query.search;
    const pratos = await database.listPratos(search);
    return pratos;
});

server.put("/pratos/:id", async (request, reply) => {
    const pratosID = request.params.id;
    const { name, foto, description, price } = request.body;

    await database.updatePrato(pratosID, {
        name,
        foto,
        description,
        price
    });

    reply.status(204).send();
});

server.delete("/pratos/:id", async (request, reply) => {
    const pratosID = request.params.id;
    await database.deletePrato(pratosID);
    reply.status(204).send();
});

// Usuários
server.post("/usuario", async (request, reply) => {
    const { idComanda, idRestaurante, gmail, whats } = request.body;

    await database.createUser({
        idComanda,
        idRestaurante,
        gmail,
        whats
    });

    reply.status(201).send();
});

server.get("/usuario", async (request) => {
    const search = request.query.search;
    const usuarios = await database.listUsuarios(search);
    return usuarios;
});

server.put("/usuario/:id", async (request, reply) => {
    const usuarioID = request.params.id;
    const { idComanda, idRestaurante, gmail, whats } = request.body;

    await database.updateUser(usuarioID, {
        idComanda,
        idRestaurante,
        gmail,
        whats
    });

    reply.status(204).send();
});

server.delete("/usuario/:id", async (request, reply) => {
    const usuarioID = request.params.id;
    await database.deleteUser(usuarioID);
    reply.status(204).send();
});

// Pedidos
server.post("/pedido", async (request, reply) => {
    const { idpedido, datahora, idmesa } = request.body;

    await database.createPedido({
        idpedido,
        datahora,
        idmesa
    });

    reply.status(201).send();
});

server.get("/pedido", async (request) => {
    const search = request.query.search;
    const pedidos = await database.listPedidos(search);
    return pedidos;
});

server.put("/pedido/:id", async (request, reply) => {
    const pedidoID = request.params.id;
    const { idpedido, datahora, idmesa } = request.body;

    await database.updatePedido(pedidoID, {
        idpedido,
        datahora,
        idmesa
    });

    reply.status(204).send();
});

server.delete("/pedido/:id", async (request, reply) => {
    const pedidoID = request.params.id;
    await database.deletePedido(pedidoID);
    reply.status(204).send();
});

server.listen(3333, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
