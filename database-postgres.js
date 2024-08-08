import { randomUUID } from "node:crypto";
import { sql } from './db.js';

export class DataBasePostgres {
   // Listar Pratos
   async listPratos(search) {
      if (search) {
         return await sql`SELECT * FROM pratos WHERE name ILIKE ${'%' + search + '%'}`;
      } else {
         return await sql`SELECT * FROM pratos`;
      }
   }

   // Listar Usuários
   async listUsuarios(search) {
      if (search) {
         return await sql`SELECT * FROM usuario WHERE gmail ILIKE ${'%' + search + '%'}`;
      } else {
         return await sql`SELECT * FROM usuario`;
      }
   }

   // Listar Pedidos
   async listPedidos(search) {
      if (search) {
         return await sql`SELECT * FROM pedido WHERE idpedido ILIKE ${'%' + search + '%'}`;
      } else {
         return await sql`SELECT * FROM pedido`;
      }
   }

   // Criar Prato
   async createPrato(prato) {
      const pratoID = randomUUID(); // Gerar um ID único
      const { name, foto, description, price } = prato;

      await sql`
         INSERT INTO pratos (pratosid, name, foto, description, price) 
         VALUES (${pratoID}, ${name}, ${foto}, ${description}, ${price})
      `;
   }

   // Atualizar Prato
   async updatePrato(id, prato) {
      const { name, foto, description, price } = prato;

      await sql`
         UPDATE pratos 
         SET name = ${name}, foto = ${foto}, description = ${description}, price = ${price} 
         WHERE pratosid = ${id}
      `;
   }

   // Deletar Prato
   async deletePrato(id) {
      await sql`DELETE FROM pratos WHERE pratosid = ${id}`;
   }

   // Criar Usuário
   async createUser(usuario) {
      const usuarioID = randomUUID(); // Gerar um ID único
      const { idComanda, idRestaurante, gmail, whats } = usuario;

      await sql`
         INSERT INTO usuario (usuarioid, idComanda, idRestaurante, gmail, whats) 
         VALUES (${usuarioID}, ${idComanda}, ${idRestaurante}, ${gmail}, ${whats})
      `;
   }

   // Atualizar Usuário
   async updateUser(id, usuario) {
      const { idComanda, idRestaurante, gmail, whats } = usuario;

      await sql`
         UPDATE usuario 
         SET idComanda = ${idComanda}, idRestaurante = ${idRestaurante}, gmail = ${gmail}, whats = ${whats} 
         WHERE usuarioid = ${id}
      `;
   }

   // Deletar Usuário
   async deleteUser(id) {
      await sql`DELETE FROM usuario WHERE usuarioid = ${id}`;
   }

   // Criar Pedido
   async createPedido(pedido) {
      const pedidoID = randomUUID(); // Gerar um ID único
      const { idpedido, datahora, idmesa } = pedido;

      await sql`
         INSERT INTO pedido (pedidoID, idpedido, datahora, idmesa) 
         VALUES (${pedidoID}, ${idpedido}, ${datahora}, ${idmesa})
      `;
   }

   // Atualizar Pedido
   async updatePedido(id, pedido) {
      const { idpedido, datahora, idmesa } = pedido;

      await sql`
         UPDATE pedido 
         SET idpedido = ${idpedido}, datahora = ${datahora}, idmesa = ${idmesa}
         WHERE pedidoID = ${id}
      `;
   }

   // Deletar Pedido
   async deletePedido(id) {
      await sql`DELETE FROM pedido WHERE pedidoID = ${id}`;
   }
}
