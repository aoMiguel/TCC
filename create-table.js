    import {sql} from './db.js' 


    sql`
        CREATE TABLE Restaurante (
            idRestaurante  TEXT PRIMARY KEY,
            cnpj           VARCHAR(255),
            nome           VARCHAR(255),
            endereco       VARCHAR(255),
            cep            VARCHAR(255),
            cidade         VARCHAR(255)
            bairro         VARCHAR(255),
            num            INT,
            compl          VARCHAR(255),
            telefone       VARCHAR(20),
            capacidade     INT
            FOREIGN KEY (idRestaurante) REFERENCES Comanda(idRestaurante)
        )'
    `.then(()=>{
        console.log("A tabla retaurante foi criada com sucesso")
    },
    ),

    sql`
        CREATE TABLE Comanda (
            usuarioid        TEXT PRIMARY KEY,
            pratosid         TEXT PRIMARY KEY
            idRestaurate     TEXT PRIMARY KEY
            IDcomanda_num    PRIMARY KEY
        )
        
    `.then(()=>{
        
    }),


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
    }),

    sql`
        CREATE TABLE cliente (
            usuarioid        TEXT PRIMARY KEY,
            idComanda        VARCHAR(255),
            idRestaurante    VARCHAR(255),
            gmail            VARCHAR(255),
            whats            VARCHAR(20)
            FOREIGN KEY (idRestaurante) REFERENCES Comanda(idRestaurante),
            FOREIGN KEY (IDcomanda_num) REFERENCES Comanda(IDcomanda_num)
        )
    `.then(()=>{
        console.log('A tabela user foi criada com sucesso!')
    }),

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


