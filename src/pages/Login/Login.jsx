import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Nome:', name, 'Email:', email, 'Phone:', phone);

    // Envio dos dados para o servidor Fastify
    try {
      const response = await fetch('http://localhost:3333/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: name, gmail: email, whats: phone }), 
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Cliente cadastrado com sucesso:', result);
        
        // Verifique se o token está presente na resposta
        const token = result.token; // Supondo que o token seja retornado na resposta
        if (token) {
          onLogin(token); // Chame a função de login com o token
        } else {
          // Se não houver token, redirecione para a home
          console.log('Redirecionando para a home sem token...');
          navigate('/home');
        }
      } else {
        const error = await response.json();
        console.error('Erro ao cadastrar cliente:', error);
        alert(error.error); // Exibe o erro para o usuário
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="sign-up-container">
          <h2>Cadastre-se!</h2>
          <form onSubmit={handleSubmit} className='form-content'>
            <input
              type="text"
              placeholder="Nome"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
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
            <button className='btn_submit' type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
