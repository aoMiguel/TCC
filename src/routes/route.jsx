import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Entradas from '../pages/Entradas/Entradas';
import Pratos from '../pages/Pratos/Pratos';
import NavBar from '../components/navbar/navbar';
import Pedidos from '../pages/Pedidos/Pedidos';
import Bebida from '../pages/Bebidas/Bebidas';
import Promocao from '../pages/Promocao/Promocao';
import Cardapio from '../pages/Cardapio/Cardapio'
import './AppRoutes.css';

const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('authToken'));

  const handleLogin = (token) => {
    if (token) {
      console.log('Token recebido:', token);
      localStorage.setItem('authToken', token); 
      setIsAuth(true); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuth(false);
  };

  // Componente de rota protegida
  const ProtectedRoute = ({ element: Component }) => {
    return isAuth ? Component : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app-route-container">
        {isAuth ? (
          <>
            <NavBar onLogout={handleLogout} />
            <div className="content">
              <Routes>
                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/pratos" element={<ProtectedRoute element={<Pratos />} />} />
                <Route path="/entradas" element={<ProtectedRoute element={<Entradas />} />} />
                <Route path="/pedidos" element={<ProtectedRoute element={<Pedidos />} />} />
                <Route path="/bebidas" element={<ProtectedRoute element={<Bebida />} />} />
                <Route path="/promocao" element={<ProtectedRoute element={<Promocao />} />} />
                <Route path="/cardapio" element={<ProtectedRoute element={<Cardapio />} />} />
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
