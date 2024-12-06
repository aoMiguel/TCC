import { useContext, useEffect, useState } from 'react';
import { PedidoContext } from './PedidoContext'
import Pedidos from './Pedidos';
import './ItemPedido.css';

const ItemPedido = () => {
    const { pedidos, limparCarrinho } = useContext(PedidoContext);
    const [descricao, setDescricao] = useState('');
    const [itenspedido, setItenspedido] = useState([]);
    const [total, setTotal] = useState('');

    useEffect(() => {
        setItenspedido(pedidos);
        setTotal(pedidos.reduce((acc, item) => {
            const price = item.price || 0;
            const quant = item.quant || 1;
            return acc + (price * quant);
        }, 0));
    }, [pedidos]);


    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value);
    };

    const finalizarPedido = async () => {
        try {
            const response = await fetch('http://localhost:3333/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    itens: itenspedido,
                    quant:  1,
                    status: "N",
                    datapedid: new Date().toISOString(),
                    valor_total: (total || 0) * 1,
                    desc_pedido: descricao || " ",
                    // pratosid: "1c2c5397-9c09-45bf-b4b9-81d5dd1e71ba",
                    // id_comanda_num: "95fa714c-7b26-4b67-a1cd-041b7eedc204",
                    idRestaurante: "7270890b-fbc8-4b7f-ad74-b4c10b94fef4"
                }),
            });

            if (response.ok) {
                console.log('Pedido enviado com sucesso!');
                alert('Pedido finalizado com sucesso!');
                setDescricao('');
                limparCarrinho();
                
            } else {
                alert(response.body)
                console.error('Erro ao enviar o pedido:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <div>
            <h1>Carrinho de Compras</h1>
            <div className="cart">
                <Pedidos
                    record={pedidos}
                />
                <div className="total">
                    Total: R$ {total}
                </div>
                <div className='desc'>
                    <label htmlFor="desc"> Descrição do pedido
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={handleDescricaoChange}
                            placeholder='Digite sua preferência'
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                                marginTop: '10px',
                            }}
                        >
                        </textarea>
                    </label>
                </div>
            </div>
            <button onClick={finalizarPedido}
                style={{
                    background: 'green', color: 'white', border: 'none', padding:
                        '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '10px 0'
                }}
            >
                Finalizar
            </button>

        </div>
    );
};

export default ItemPedido;
