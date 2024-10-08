import React, { useState } from 'react';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Phone:', phone);

    // Envio dos dados para o servidor Fastify
    try {
      const response = await fetch('http://localhost:3333/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gmail: email, whats: phone }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Cliente cadastrado com sucesso:', result);
      } else {
        const error = await response.json();
        console.error('Erro ao cadastrar cliente:', error);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <span className='brand-text'>Menuforge</span>
      </nav>
      <div className="app-container">
        <div className="sign-up-container">
          <h2>Cadastre-se!</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
