import { useEffect, useState } from 'react';
import './ItemPedidos.css';

const ItemPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosConcluidos, setPedidosConcluidos] = useState([]); // Estado para pedidos concluídos
  const [pedidosSendoFeitos, setPedidosSendoFeitos] = useState([]); // Estado para pedidos sendo feitos
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Função para buscar os pedidos
  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:3333/pedido', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar pedidos');
      }
      const data = await response.json();
      setPedidos(data);
      setPedidosSendoFeitos(data.filter((pedido) => pedido.status === 'S'));
    } catch (error) {
      setErrorMessage('Não foi possível carregar os pedidos no momento. Tente novamente mais tarde.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir o pedido
  const deletePedido = async (pedidoid) => {
    try {
      const response = await fetch(`http://localhost:3333/pedido/${pedidoid}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir pedido');
      }

      // Atualiza a lista de pedidos removendo o pedido excluído
      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.pedidoid !== pedidoid));
      setPedidosSendoFeitos((prevPedidos) => prevPedidos.filter((pedido) => pedido.pedidoid !== pedidoid));
      setPedidosConcluidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.pedidoid !== pedidoid));
    } catch (error) {
      setErrorMessage('Não foi possível excluir o pedido. Tente novamente.');
      console.error('Erro ao excluir pedido:', error);
    }
  };

  // Função para alterar o status do pedido
  const alterarStatus = (pedidoid, novoStatus) => {
    setPedidos((prevPedidos) => {
      const pedidoAlterado = prevPedidos.find((pedido) => pedido.pedidoid === pedidoid);
      if (pedidoAlterado) {
        // Atualiza o pedido e move para a lista de pedidos concluídos ou sendo feitos
        const pedidosRestantes = prevPedidos.filter((pedido) => pedido.pedidoid !== pedidoid);
        pedidoAlterado.status = novoStatus;

        // Mover o pedido para os concluídos ou sendo feitos
        if (novoStatus === 'Concluído') {
          setPedidosConcluidos((prevConcluidos) => {
            if (!prevConcluidos.find((pedido) => pedido.pedidoid === pedidoid)) {
              return [...prevConcluidos, pedidoAlterado];
            }
            return prevConcluidos;
          });
        } else if (novoStatus === 'S') {
          setPedidosSendoFeitos((prevSendoFeitos) => {
            if (!prevSendoFeitos.find((pedido) => pedido.pedidoid === pedidoid)) {
              return [...prevSendoFeitos, pedidoAlterado];
            }
            return prevSendoFeitos;
          });
        }

        return pedidosRestantes;
      }
      return prevPedidos;
    });
  };

  // Carrega os pedidos ao montar o componente
  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="item-pedidos-container">
      {loading ? (
        <p>Carregando pedidos...</p>
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : pedidos.length > 0 || pedidosConcluidos.length > 0 || pedidosSendoFeitos.length > 0 ? (
        <>
          {/* Exibe pedidos pendentes */}
          <section>
            <h2>Pedidos Pendentes</h2>
            <table className="pedido-tabela">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Valor Total</th>
                  <th>Status</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.pedidoid}>
                    <td>{pedido.desc_pedido || 'Sem descrição'}</td>
                    <td>{pedido.valor_total}</td>
                    <td>{pedido.status}</td>
                    <td>{new Date(pedido.datapedid).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => alterarStatus(pedido.pedidoid, 'Concluído')} // Apenas botão de Concluir
                        disabled={pedido.status === 'Concluído'}
                      >
                        Concluir
                      </button>
                      <button onClick={() => deletePedido(pedido.pedidoid)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Exibe pedidos sendo feitos */}
          {pedidosSendoFeitos.length > 0 && (
            <section>
              <h2>Pedidos Sendo Feitos</h2>
              <table className="pedido-tabela">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Valor Total</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosSendoFeitos.map((pedido) => (
                    <tr key={pedido.pedidoid}>
                      <td>{pedido.desc_pedido || 'Sem descrição'}</td>
                      <td>{pedido.valor_total}</td>
                      <td>{pedido.status}</td>
                      <td>{new Date(pedido.datapedid).toLocaleString()}</td>
                      <td>
                        <button
                          onClick={() => alterarStatus(pedido.pedidoid, 'Concluído')}
                          disabled={pedido.status === 'Concluído'}
                        >
                          Concluir
                        </button>
                        <button onClick={() => deletePedido(pedido.pedidoid)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Exibe pedidos concluídos */}
          {pedidosConcluidos.length > 0 && (
            <section>
              <h2>Pedidos Concluídos</h2>
              <table className="pedido-tabela">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Valor Total</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosConcluidos.map((pedido) => (
                    <tr key={pedido.pedidoid}>
                      <td>{pedido.desc_pedido || 'Sem descrição'}</td>
                      <td>{pedido.valor_total}</td>
                      <td>{pedido.status}</td>
                      <td>{new Date(pedido.datapedid).toLocaleString()}</td>
                      <td>
                        <button onClick={() => deletePedido(pedido.pedidoid)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )}
    </div>
  );
};

export default ItemPedidos;
