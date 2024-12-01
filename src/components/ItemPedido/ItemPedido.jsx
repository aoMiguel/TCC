import { useContext } from 'react';
import { PedidoContext } from './PedidoContext'
import Pedidos from './Pedidos';
import './ItemPedido.css';

const ItemPedido = () => {
    const { pedidos } = useContext(PedidoContext); 
    const total = pedidos.reduce((acc, item) => acc + item.price, 0); 

    return (
        <div>
            <h1>Carrinho de Compras</h1>
            <div className="cart">
                <Pedidos 
                    record={pedidos}
                />
                <div className="total">
                    Total: R$ {total.toFixed(2)}
                </div>
            </div>
            <button style={{ background: 'green', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '10px 0' }} onClick={fazerRequisicao}>Finalizar</button>
        </div>
    );
};

export default ItemPedido;
