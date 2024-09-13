import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class DataBasePostgres {

   // Listar Pratos
   async listPratos(search) {
      if (search) {
         return await sql`SELECT * FROM Pratos WHERE name ILIKE ${'%' + search + '%'}`;
      } else {
         return await sql`SELECT * FROM Pratos`;
      }
   }

   // Listar Usuários
   async listUsuarios(search) {
      if (search) {
         return await sql`SELECT * FROM Cliente WHERE gmail ILIKE ${'%' + search + '%'}`;
      } else {
         return await sql`SELECT * FROM Cliente`;
      }
   }

   // Listar Pedidos
   async listPedidos(search) {
      if (search) {
         return await sql`SELECT * FROM Pedido WHERE pedidoID ILIKE ${'%' + search + '%'}`;
      } else {
         return await sql`SELECT * FROM Pedido`;
      }
   }

   // Listar Comandas
   async listComanda(search) {
      if (search) {
         return await sql`SELECT * FROM Comanda WHERE IDcomanda_num ILIKE ${'%' + search + '%'}`;
      } else {
         return await sql`SELECT * FROM Comanda`;
      }
   }

   // Criar Prato
   async createPrato(prato) {
      const pratoID = randomUUID();
      const { name, foto, description, price } = prato;

      await sql`
         INSERT INTO Pratos (pratosid, name, foto, description, price) 
         VALUES (${pratoID}, ${name}, ${foto}, ${description}, ${price})
      `;
   }

   // Atualizar Prato
   async updatePrato(id, prato) {
      const { name, foto, description, price } = prato;

      await sql`
         UPDATE Pratos 
         SET name = ${name}, foto = ${foto}, description = ${description}, price = ${price} 
         WHERE pratosid = ${id}
      `;
   }

   // Deletar Prato
   async deletePrato(id) {
      await sql`DELETE FROM Pratos WHERE pratosid = ${id}`;
   }

   // Criar Cliente
   async createCliente(cliente) {
      const usuarioID = randomUUID();
      const { idComanda, idRestaurante, gmail, whats } = cliente;

      await sql`
         INSERT INTO Cliente (usuarioid, idComanda, idRestaurante, gmail, whats) 
         VALUES (${usuarioID}, ${idComanda}, ${idRestaurante}, ${gmail}, ${whats})
      `;
   }

   // Atualizar Cliente
   async updateCliente(id, cliente) {
      const { idComanda, idRestaurante, gmail, whats } = cliente;

      await sql`
         UPDATE Cliente 
         SET idComanda = ${idComanda}, idRestaurante = ${idRestaurante}, gmail = ${gmail}, whats = ${whats} 
         WHERE usuarioid = ${id}
      `;
   }

   // Deletar Cliente
   async deleteCliente(id) {
      await sql`DELETE FROM Cliente WHERE usuarioid = ${id}`;
   }

   // Criar Pedido
   async createPedido(pedido) {
      const pedidoID = randomUUID();
      const { quant, status, datapedid, valor_total, desc_pedido, pratosid, id_comanda_num, idRestaurante } = pedido;

      await sql`
         INSERT INTO Pedido (pedidoID, quant, status, datapedid, valor_total, desc_pedido, pratosid, id_comanda_num, idRestaurante) 
         VALUES (${pedidoID}, ${quant}, ${status}, ${datapedid}, ${valor_total}, ${desc_pedido}, ${pratosid}, ${id_comanda_num}, ${idRestaurante})
      `;
   }

   // Atualizar Pedido
   async updatePedido(id, pedido) {
      const { quant, status, datapedid, valor_total, desc_pedido, pratosid, id_comanda_num, idRestaurante } = pedido;

      await sql`
         UPDATE Pedido 
         SET quant = ${quant}, status = ${status}, datapedid = ${datapedid}, valor_total = ${valor_total}, desc_pedido = ${desc_pedido}, pratosid = ${pratosid}, id_comanda_num = ${id_comanda_num}, idRestaurante = ${idRestaurante}
         WHERE pedidoID = ${id}
      `;
   }

   // Deletar Pedido
   async deletePedido(id) {
      await sql`DELETE FROM Pedido WHERE pedidoID = ${id}`;
   }

   // Criar Comanda
   async createComanda(comanda) {
      const { usuarioid, pratosid, idRestaurante, IDcomanda_num } = comanda;

      await sql`
         INSERT INTO Comanda (usuarioid, pratosid, idRestaurante, IDcomanda_num) 
         VALUES (${usuarioid}, ${pratosid}, ${idRestaurante}, ${IDcomanda_num})
      `;
   }

   // Atualizar Comanda
   async updateComanda(id, comanda) {
      const { usuarioid, pratosid, idRestaurante, IDcomanda_num } = comanda;

      await sql`
         UPDATE Comanda 
         SET usuarioid = ${usuarioid}, pratosid = ${pratosid}, idRestaurante = ${idRestaurante}, IDcomanda_num = ${IDcomanda_num}
         WHERE IDcomanda_num = ${id}
      `;
   }

   // Deletar Comanda
   async deleteComanda(id) {
      await sql`DELETE FROM Comanda WHERE IDcomanda_num = ${id}`;
   }
}
