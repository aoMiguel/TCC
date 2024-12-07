import { useContext, useEffect, useState } from 'react';
import { PedidoContext } from './PedidoContext';
import Pedidos from './Pedidos';
import './ItemPedido.css';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const ItemPedido = () => {
    const { pedidos, limparCarrinho } = useContext(PedidoContext);
    const [descricao, setDescricao] = useState('');
    const [itenspedido, setItenspedido] = useState([]);
    const [total, setTotal] = useState('');
    const [sucesso, setSucesso] = useState(false); // Estado para controlar o alerta

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
                    quant: 1,
                    status: "N",
                    datapedid: new Date().toISOString(),
                    valor_total: (total || 0) * 1,
                    desc_pedido: descricao || " ",
                    idRestaurante: "7270890b-fbc8-4b7f-ad74-b4c10b94fef4"
                }),
            });

            if (response.ok) {
                console.log('Pedido enviado com sucesso!');
                setSucesso(true); // Alerta de sucesso
                setDescricao('');
                limparCarrinho();

                // Depois de 1 segundo, esconde o alerta
                setTimeout(() => {
                    setSucesso(false);
                }, 1000); // 1 segundo
            } else {
                alert(response.body);
                console.error('Erro ao enviar o pedido:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <div>
            {/* Exibe o alerta no topo da tela */}
            {sucesso && (
                <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                    sx={{
                        position: 'fixed', // Fixa o alerta no topo
                        top: '20px', // Distância do topo
                        left: '50%', // Centraliza o alerta
                        transform: 'translateX(-50%)', // Ajusta para que o alerta esteja centralizado
                        backgroundColor: '#99FF99', 
                        color: '#000', 
                        marginBottom: '20px',
                        zIndex: 1000, // Garante que o alerta ficará acima de outros elementos
                    }}
                >
                    Sucesso!!
                </Alert>
            )}

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
