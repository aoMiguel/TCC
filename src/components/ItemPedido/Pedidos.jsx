import React, { useContext, useEffect, useState } from 'react';
import { PedidoContext } from './PedidoContext';
import './Pedidos.css';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Pedidos = ({ record }) => {
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

  useEffect(() => {
    console.log(record)
  }, [record]);

  return (
    <div>
      <h2 style={{ color: 'black' }}>Pedidos</h2>
      {error && <div className="error">{error}</div>}
    
      <ul>
        {record && record.length > 0 ? (
          record.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', width: '100%'}}>
              <li className="pedidos-item">
                <img src={item.src} alt={item.alt} className="item-image" />
                <p>{item.alt}</p>
                <p>R$ {item.price.toFixed(2)}</p>
              </li>
              <div className="alterar"> 
                <button
                  style={{
                    background: '#F05D5E',
                    color: 'white',
                    border: 'none',
                    width: '34px',
                    height: '34px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    margin: '10px 0',
                  }}
                  onClick={() => handleDelete(index)}
                >
                  <DeleteIcon/>
                </button>
              </div>
            </div>
          ))
        ) : (
          <li style={{ color: 'black', textAlign: 'center' }}>Nenhum pedido adicionado</li>
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

Pedidos.defaultProps = {
  record: {},
};

export default Pedidos;
