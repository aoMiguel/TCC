import React, { createContext, useState } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [quantidade, setQuantidade] = useState(0); 

  const adicionarPedido = (novoPedido) => {
    setPedidos((prev) => [...prev, novoPedido]);
    setQuantidade((prev) => prev + 1); 
  };
  const removerPedido = (index) => {
    setPedidos((prev) => prev.filter((_, i) => i !== index));
    setQuantidade((prev) => prev - 1);
  };
  return (
    <PedidoContext.Provider value={{ pedidos, adicionarPedido, quantidade, removerPedido}}>
      {children}
    </PedidoContext.Provider>
  );
};
