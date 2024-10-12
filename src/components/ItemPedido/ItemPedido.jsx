import './ItemPedido.css';
import { useState } from 'react'; 

const ItemPedido = () => {
    const [cartCount, setCartCount] = useState(0)

    const items = [
        { id: 1, name: 'Produto 1', price: 50.00 },
        { id: 2, name: 'Produto 2', price: 30.00 },
        { id: 3, name: 'Produto 3', price: 20.00 },
    ];

    const total = items.reduce((acc, item) => acc + item.price, 0);

    const addItemToCart = () => { 
        setCartCount(cartCount + 1);
    };

    return (
        <div>
            <h1>Carrinho de Compras</h1>
            <button onClick={addItemToCart}>Adicionar Item</button> {}
            <div className="cart">
                {items.map(item => (
                    <div key={item.id} className="cart-item">
                        <span>{item.name}</span>
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
