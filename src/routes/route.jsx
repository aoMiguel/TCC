import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Entradas from '../pages/Entradas/Entradas';
import Pratos from '../pages/Pratos/Pratos';
import NavBar from '../components/navbar/navbar';
import Pedidos from '../pages/Pedidos/Pedidos';
import Bebida from '../pages/Bebidas/Bebidas';
import Promocao from '../pages/Promocao/Promocao';
import './AppRoutes.css';

const AppRoutes = () => {
  // Verifica se o token está no localStorage para manter o login
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('authToken'));

  // Função de login que armazena o token no localStorage
  const handleLogin = (token) => {
    if (token) {
      console.log('Token recebido:', token); // Log para depuração
      localStorage.setItem('authToken', token); // Armazena o token
      setIsAuth(true); 
    }
  };

  // Função de logout que remove o token
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuth(false);
  };

  useEffect(() => {
    // Checa se o token é válido ou realiza outras verificações de autenticação
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsAuth(false);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        { isAuth ? (
          <>
            <NavBar onLogout={handleLogout} /> 
            <div className="content">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/pratos" element={<Pratos />} />
                <Route path="/entradas" element={<Entradas />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/bebidas" element={<Bebida />} />
                <Route path="/promocao" element={<Promocao />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default AppRoutes;
