import { useContext, useState } from 'react';
import { PedidoContext } from './PedidoContext'
import Pedidos from './Pedidos';
import './ItemPedido.css';

const ItemPedido = () => {
    const { pedidos } = useContext(PedidoContext);
    const [ descricao, setDescricao ] = useState('')
    const total = pedidos.reduce((acc, item) => {
        const price = item.price || 0;  
        const quant = item.quant || 1;  
        return acc + (price * quant);
    }, 0);
    
    
    const handleDescricaoChange = (e) => {
      setDescricao(e.target.value); 
  };

    const finalizarPedido = async () => {    
        try {
            // console.log(pedidos);
            // Criar um array de pedidos com base nos itens do carrinho
            const pedidosPayload = pedidos.map(item => ({
                quant: item.quant || 1, 
                status: "N",
                datapedid: new Date().toISOString(),  
                valor_total: (item.price || 0) * (item.quant || 1),  
                desc_pedido: descricao || " ",  
                pratosid: "1c2c5397-9c09-45bf-b4b9-81d5dd1e71ba",  
                id_comanda_num: "95fa714c-7b26-4b67-a1cd-041b7eedc204",  
                idRestaurante: "7270890b-fbc8-4b7f-ad74-b4c10b94fef4"  
            }));
            console.log(pedidosPayload);

            // Enviar o array de pedidos ao backend
            const response = await fetch('http://localhost:3333/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedidosPayload),  
            });

            if (response.ok) {
                console.log('Pedido enviado com sucesso!');
                alert('Pedido finalizado com sucesso!');
            } else {
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
                    Total: R$ {total.toFixed(2)}
                </div>
                <div className='desc'>
                  <label htmlFor="desc">Descrição do pedido
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
