import React, { useState, useEffect } from 'react';
import './ItemControle.css';

const ItemControle = () => {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    foto: '',
    description: '',
    price: '',
    tipoprato: '',
    pratosid: '',
  });
  const [pratos, setPratos] = useState([]);

  useEffect(() => {
    if (showViewForm) {
      fetchPratos();
    }
  }, [showViewForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchPratos = async () => {
    try {
      const response = await fetch('http://localhost:3333/pratos');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPratos(data);
      } else {
        throw new Error('Erro ao buscar pratos');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:3333/pratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Pedido adicionado com sucesso!');
        resetForm();
      } else {
        throw new Error('Erro ao adicionar o pedido');
      }
    } catch (error) {
      console.error(error);
      alert(error.message || 'Erro ao conectar com o servidor.');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3333/pratos/${formData.pratosid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Pedido alterado com sucesso!');
        setShowUpdateForm(false);
        fetchPratos(); // Atualiza a lista de pratos após a atualização
      } else {
        throw new Error('Erro ao alterar o pedido');
      }
    } catch (error) {
      console.error(error);
      alert(error.message || 'Erro ao conectar com o servidor.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3333/pratos/${formData.pratosid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Prato deletado com sucesso!');
        setShowDeleteForm(false);
        fetchPratos(); // Atualiza a lista de pratos após a exclusão
      } else {
        throw new Error('Erro ao deletar o prato');
      }
    } catch (error) {
      console.error(error);
      alert(error.message || 'Erro ao conectar com o servidor.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      foto: '',
      description: '',
      price: '',
      tipoprato: '',
      pratosid: '',
    });
    setShowForm(false);
  };

  return (
    <div className="item-controle">
      {!showForm && !showUpdateForm && !showDeleteForm && !showViewForm ? (
        <>
          <h2>Controles</h2>
          <button className="btn-adicionar" onClick={() => setShowForm(true)}>
            Adicionar Prato
          </button>
          <button className="btn-alterar" onClick={() => setShowUpdateForm(true)}>
            Alterar Prato
          </button>
          <button className="btn-deletar" onClick={() => setShowDeleteForm(true)}>
            Deletar Prato
          </button>
          <button className="btn-ver" onClick={() => setShowViewForm(true)}>
            Ver Pratos
          </button>
        </>
      ) : showForm ? (
        <div className="form-container">
          <h3>Inserir Dados do Pedido</h3>
          <table>
            <tbody>
              <tr>
                <td>Nome do Prato</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome do prato"
                  />
                </td>
              </tr>
              <tr>
                <td>Foto (URL)</td>
                <td>
                  <input
                    type="text"
                    name="foto"
                    value={formData.foto}
                    onChange={handleInputChange}
                    placeholder="URL da foto"
                  />
                </td>
              </tr>
              <tr>
                <td>Descrição</td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descrição"
                  />
                </td>
              </tr>
              <tr>
                <td>Preço (R$)</td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Preço"
                  />
                </td>
              </tr>
              <tr>
                <td>Tipo do Prato</td>
                <td>
                  <select
                    name="tipoprato"
                    value={formData.tipoprato}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione</option>
                    <option value="E">Entrada</option>
                    <option value="P">Prato Principal</option>
                    <option value="B">Sobremesa</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-actions">
            <button className="btn-enviar" onClick={handleSave}>
              Salvar
            </button>
            <button className="btn-voltar" onClick={resetForm}>
              Voltar
            </button>
          </div>
        </div>
      ) : showUpdateForm ? (
        <div className="form-container">
          <h3>Alterar Dados do Pedido</h3>
          <table>
            <tbody>
              <tr>
                <td>ID do Prato</td>
                <td>
                  <input
                    type="text"
                    name="pratosid"
                    value={formData.pratosid}
                    onChange={handleInputChange}
                    placeholder="ID do prato"
                  />
                </td>
              </tr>
              <tr>
                <td>Nome do Prato</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Foto (URL)</td>
                <td>
                  <input
                    type="text"
                    name="foto"
                    value={formData.foto}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Descrição</td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Preço</td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Tipo do Prato</td>
                <td>
                  <select
                    name="tipoprato"
                    value={formData.tipoprato}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione</option>
                    <option value="E">Entrada</option>
                    <option value="P">Prato Principal</option>
                    <option value="B">Sobremesa</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-actions">
            <button className="btn-enviar" onClick={handleUpdate}>
              Alterar
            </button>
            <button className="btn-voltar" onClick={() => setShowUpdateForm(false)}>
              Voltar
            </button>
          </div>
        </div>
      ) : showDeleteForm ? (
        <div className="form-container">
          <h3>Deletar Pedido</h3>
          <table>
            <tbody>
              <tr>
                <td>ID do Prato</td>
                <td>
                  <input
                    type="text"
                    name="pratosid"
                    value={formData.pratosid}
                    onChange={handleInputChange}
                    placeholder="ID do prato"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-actions">
            <button className="btn-deletar" onClick={handleDelete}>
              Deletar
            </button>
            <button className="btn-voltar" onClick={() => setShowDeleteForm(false)}>
              Voltar
            </button>
          </div>
        </div>
      ) : showViewForm ? (
        <div className="pratos-list">
          <h3>Lista de Pratos</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {pratos.map((prato) => (
                <tr key={prato.pratosid}>
                  <td>{prato.pratosid}</td>
                  <td>{prato.name}</td>
                  <td>{prato.price}</td>
                </tr>
              ))}
            </tbody>

          </table>
          <div className="form-actions">
            <button className="btn-voltar" onClick={() => setShowViewForm(false)}>
              Voltar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ItemControle;
