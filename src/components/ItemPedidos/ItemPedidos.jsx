import { useEffect, useState } from 'react';
import './ItemPedidos.css';

const ItemPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Função para buscar os pedidos do backend
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
    } catch (error) {
      setErrorMessage('Não foi possível carregar os pedidos no momento. Tente novamente mais tarde.');
      console.error('Erro ao buscar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para alterar o status de um pedido no backend
  const alterarStatus = async (pedidoid, novoStatus) => {
    try {
      // Envia "C" ao invés de "Concluído"
      const status = novoStatus === 'Concluído' ? 'C' : novoStatus;

      const response = await fetch(`http://localhost:3333/pedido/${pedidoid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }), // Envia "C" para "Concluído"
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o status do pedido');
      }

      // Atualiza o estado local após sucesso no backend
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.pedidoid === pedidoid ? { ...pedido, status: 'C' } : pedido
        )
      );
    } catch (error) {
      setErrorMessage('Erro ao atualizar o status do pedido. Tente novamente.');
      console.error('Erro ao atualizar status:', error);
    }
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
      ) : pedidos.length > 0 ? (
        <>
          {/* Exibe a tabela de pedidos */}
          <section>
            <h2>Pedidos</h2>
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
                    <td>{pedido.status === 'C' ? 'Concluído' : pedido.status}</td>
                    <td>{new Date(pedido.datapedid).toLocaleString()}</td>
                    <td>
                      {pedido.status !== 'C' ? (
                        <button onClick={() => alterarStatus(pedido.pedidoid, 'Concluído')}>
                          Concluir
                        </button>
                      ) : (
                        <span className="verificado">✔</span> // Aqui você pode usar o ícone "✔" ou outro
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )}
    </div>
  );
};

export default ItemPedidos;
