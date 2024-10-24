import React, { useContext, useState } from 'react';
import { PedidoContext } from './PedidoContext';
import './Pedidos.css';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function Pedidos() {
  const { pedidos, removerPedido, adicionarPedido } = useContext(PedidoContext); 
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false); 

  const handleDelete = (index) => {
    try {
      removerPedido(index); 
    } catch (err) {
      setError('Erro ao remover o pedido.'); 
    }
  };

  const handleAddClick = () => {
    adicionarPedido(); 
    setShowAlert(true); 
    setTimeout(() => setShowAlert(false), 3000); 
  };

  return (
    <div>
      <h2>Pedidos</h2>
      {error && <div className="error">{error}</div>} 
      <button onClick={handleAddClick}>Adicionar Pedido</button> 
      <ul>
        {pedidos.length === 0 ? ( 
          <li>Nenhum pedido adicionado</li>
        ) : (
          pedidos.map((item, index) => (
            <li key={index}>
              {item.alt} - R$ {item.price.toFixed(2)}
              <button onClick={() => handleDelete(index)}>Excluir</button>
            </li>
          ))
        )}
      </ul>
      {showAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
        >
          Pedido cadastrado com sucesso!
        </Alert>
      )}
    </div>
  );
}
