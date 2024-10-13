import React, { useState } from 'react';
import './Pedido.css'

export default function Pedidos({ itens }) {
  const [itensState, setItensState] = useState(itens);

  const handleDelete = (index) => {
    const newItens = itensState.filter((_, i) => i !== index);
    setItensState(newItens);
  };

  return (
    <div>
      <h2>Pedidos</h2>
      <ul>
        {itensState.map((item, index) => (
          <li key={index}>
            {item.alt} - {item.price}
            <button onClick={() => handleDelete(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
