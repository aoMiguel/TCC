import * as React from 'react';
import { useContext } from 'react';
import { PedidoContext } from './PedidoContext'
import './ItemPedido.css';

const ItemPedido = () => {
    const { pedidos } = useContext(PedidoContext); 
    const total = pedidos.reduce((acc, item) => acc + item.price, 0);  

    return (
        <div>
            <h1>Carrinho de Compras</h1>
            <div className="cart">
                {pedidos.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img src={item.image} alt={item.alt} className="item-image" />
                        <span>{item.alt}</span>
                        <span>R$ {item.price.toFixed(2)}</span>
                    </div>
                ))}
                <div className="total">
                    Total: R$ {total.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default ItemPedido;
