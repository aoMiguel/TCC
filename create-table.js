
import {sql} from './db.js' 


//begin dishes
sql`
    CREATE TABLE pratos (
        pratosid     TEXT PRIMARY KEY,
        name         TEXT,
        description  TEXT,
        price        DECIMAL(10, 2),
        foto         TEXT
    )
`.then(()=>{
    console.log("A tabela pratos foi criada com sucesso!")
})
//end dishes

//begin user
sql`
    CREATE TABLE usuario (
        usuarioid        TEXT PRIMARY KEY,
        idComanda        VARCHAR(255),
        idRestaurante    VARCHAR(255),
        gmail            VARCHAR(255),
        whats            VARCHAR(255)
    )
`.then(()=>{
    console.log('A tabela user foi criada com sucesso!')
})
//end user

//begin order
sql`
    CREATE TABLE pedido (
        pedidoID    TEXT PRIMARY KEY,
        idpedido    TEXT,
        datahora    TIMESTAMP,
        idmesa      TEXT   
    )
`.then(()=>{
    console.log("A tabela pedidos foi criada com sucesso!")
})
//end order

