import React, { createContext, useState } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);

  const adicionarPedido = (novoPedido) => {
    setPedidos((prevPedidos) => [...prevPedidos, novoPedido]);
  };

  return (
    <PedidoContext.Provider value={{ pedidos, adicionarPedido }}>
      {children}
    </PedidoContext.Provider>
  );
};
