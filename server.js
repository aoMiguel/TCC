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
    server.post("/Cliente", async (request, reply) => {
        const { idComanda, idRestaurante, gmail, whats } = request.body;

        await database.createCliente({
            idComanda,
            idRestaurante,
            gmail,
            whats
        });

        reply.status(201).send();
    });

    server.get("/Cliente", async (request) => {
        const search = request.query.search;
        const usuarios = await database.listUsuarios(search);
        return usuarios;
    });

    server.put("/Cliente/:id", async (request, reply) => {
        const usuarioID = request.params.id;
        const { idComanda, idRestaurante, gmail, whats } = request.body;

        await database.updateCliente(usuarioID, {
            idComanda,
            idRestaurante,
            gmail,
            whats
        });

        reply.status(204).send();
    });

    server.delete("/Cliente/:id", async (request, reply) => {
        const usuarioID = request.params.id;
        await database.deleteCliente(usuarioID);
        reply.status(204).send();
    });

    // Pedidos
    server.post("/pedido", async (request, reply) => {
        const { quant, status, datapedid, valor_total, desc_pedido, pratosid, id_comanda_num, idRestaurante  } = request.body;

        await database.createPedido({
            quant,
            status,
            datapedid,
            valor_total,
            desc_pedido,
            pratosid,
            id_comanda_num,
            idRestaurante
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
        const { quant, status, datapedid, valor_total, desc_pedido, pratosid, id_comanda_num, idRestaurante } = request.body;

        await database.updatePedido(pedidoID, {
            quant,
            status,
            datapedid,
            valor_total,
            desc_pedido,
            pratosid,
            id_comanda_num,
            idRestaurante
        });

        reply.status(204).send();
    });

    server.delete("/pedido/:id", async (request, reply) => {
        const pedidoID = request.params.id;
        await database.deletePedido(pedidoID);
        reply.status(204).send();
    });

    server.post("/Restaurante", async (request, reply) => {
        const { idRestaurante, cnpj, nome, endereco, cep, cidade, bairro, num, compl, telefone, capacidade } = request.body;

        await database.createRestaurante({
            idRestaurante,
            cnpj,
            nome,
            endereco,
            cep,
            cidade,
            bairro,
            num,
            compl,
            telefone,
            capacidade
        });

        reply.status(201).send();
    });

    server.get("/Restaurante", async (request) => {
        const search = request.query.search;
        const restaurante = await database.listRestaurante(search);
        return restaurante;
    });

    server.put("/Restaurante/:id", async (request, reply) => {
        const restID = request.params.id
        const { idRestaurante, cnpj, nome, endereco, cep, cidade, bairro, num, compl, telefone, capacidade  } = request.body;

        await database.updateRestaurante(restID, {
            idRestaurante,
            cnpj,
            nome,
            endereco,
            cep,
            cidade,
            bairro,
            num,
            compl,
            telefone,
            capacidade
        });

        reply.status(204).send();
    });

    server.delete("/Restaurante/:id", async (request, reply) => {
        const restID = request.params.id
        await database.deleteRestaurante(restID);
        reply.status(204).send();
    });

    server.post("/Comanda", async (request, reply) => {
        const { usuarioid, pratosid, idRestaurante, IDcomanda_num } = request.body;

        await database.createComanda({
            usuarioid,
            pratosid,
            idRestaurante,
            IDcomanda_num
        });

        reply.status(201).send();
    });

    server.get("/Comanda", async (request) => {
        const search = request.query.search;
        const comanda = await database.listComanda(search);
        return comanda;
    });

    server.put("/Comanda/:id", async (request, reply) => {
        const comandaid = request.params.id
        const { usuarioid, pratosid, idRestaurante, IDcomanda_num } = request.body;

        await database.updateComanda(comandaid, {
            usuarioid,
            pratosid,
            idRestaurante,
            IDcomanda_num
        });

        reply.status(204).send();
    });

    server.delete("/Comanda/:id", async (request, reply) => {
        const comandaid = request.params.id
        await database.deleteComanda(comandaid);
        reply.status(204).send();
    });

    server.listen(3333, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
