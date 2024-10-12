import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';   
import Login from '../pages/Login/Login'; 
import Entradas from '../pages/Entradas/Entradas';
import Pratos from '../pages/Pratos/Pratos';
import NavBar from '../components/navbar/navbar';
import Pedidos from '../pages/Pedidos/Pedidos';
import './AppRoutes.css';

const AppRoutes = () => {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pratos" element={<Pratos />} />
            <Route path="/entradas" element={<Entradas />} />
            <Route path="/pedidos" element={<Pedidos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
