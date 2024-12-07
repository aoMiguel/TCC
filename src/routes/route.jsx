import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Entradas from '../pages/Entradas/Entradas';
import Pratos from '../pages/Pratos/Pratos';
import Pedidos from '../pages/Pedidos/Pedidos';
import Bebida from '../pages/Bebidas/Bebidas';
import Promocao from '../pages/Promocao/Promocao';
import HomePage from '../pages/HomePage/HomePage';
import LoginRestaurante from '../pages/Login_Restaurante/Login_Restaurante';
import Controle from '../pages/Controle/Controle';
import Pedido from '../pages/PedidoRestaurante/PedidoRestaurante';
import './AppRoutes.css';
import NorthBar from '../components/NorthBar/NorthBar';
import Menu from '../components/menu/Menu';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import RestauranteMenu from '../components/MenuRestaurante/MenuRestaurante';
import { Button } from '@mui/material';

const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthRestaurant, setIsAuthRestaurant] = useState(false);
  const [open, setOpen] = useState(false);

  const handleModalLogoutOpen = () => setOpen(true);
  const handleModalLogoutClose = () => setOpen(false);

  const handleLogin = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
      setIsAuth(true);
    }
  };

  const handleLoginRestaurant = (token) => {
    if (token) {
      localStorage.setItem('authTokenRestaurante', token);
      setIsAuthRestaurant(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuth(false);
  };

  const handleLogoutRestaurant = () => {
    localStorage.removeItem('authTokenRestaurante');
    setIsAuthRestaurant(false);
  };

  const ProtectedRoute = ({ element }) => {
    return isAuth ? element : <Navigate to="/login" />;
  };

  const ProtectedRouteRestaurant = ({ element }) => {
    return isAuthRestaurant ? element : <Navigate to="/loginrestaurante" />;
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    height: 320,
    borderRadius: '12px',
    bgcolor: 'background.paper',
    color: 'black',
    border: 'none',
    boxShadow: 24,
    p: 6,
  };

  return (
    <Router>
      <div className="app-route-container">
        {/* Rota de usuário autenticado */}
        {isAuth && (
          <>
            <NorthBar isRestaurante={true} />
            <Menu onModalLogout={handleModalLogoutOpen} />
            <Modal
              open={open}
              onClose={handleModalLogoutClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500 }}
            >
              <Fade in={open}>
                <Box sx={modalStyle}>
                  <PriorityHighIcon
                    sx={{
                      color: '#B44647',
                      padding: '4px',
                      width: '32px',
                      height: '32px',
                      boxShadow: 'rgba(240, 93, 94, 0.1) 0px 0px 0px 8px',
                      backgroundColor: 'rgba(240, 93, 94, 0.4)',
                      borderRadius: '20px',
                    }}
                  />
                  <Typography variant="h6" sx={{ marginTop: '22px', fontWeight: 'bold' }}>
                    Confirmar Logout
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Alterações não salvas serão perdidas. <br /> Você tem certeza de que deseja sair?
                  </Typography>
                  <div className="btn_mensagem">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleModalLogoutClose}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#F05D5E',
                          color: 'white',
                        },
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleLogout}
                      sx={{
                        backgroundColor: '#4AC07F',
                        color: 'white',
                        '&:hover': { backgroundColor: '#215438' },
                      }}
                    >
                      Confirmar
                    </Button>
                  </div>
                </Box>
              </Fade>
            </Modal>
            <div className="content">
              <Routes>
                <Route path={`/home`} element={<ProtectedRoute element={<Home />} />} />
                <Route path={`/pratos`} element={<ProtectedRoute element={<Pratos />} />} />
                <Route path={`/entradas`} element={<ProtectedRoute element={<Entradas />} />} />
                <Route path={`/pedidos`} element={<ProtectedRoute element={<Pedidos />} />} />
                <Route path={`/bebidas`} element={<ProtectedRoute element={<Bebida />} />} />
                <Route path={`/promocao`} element={<ProtectedRoute element={<Promocao />} />} />
                <Route path={`/*`} element={<Navigate to={`/home`} />} />
              </Routes>
            </div>
          </>
        )}

        {/* Rota de restaurante autenticado */}
        {isAuthRestaurant && (
          <>
            <NorthBar isRestaurante={false} />
            <RestauranteMenu onModalLogout={handleModalLogoutOpen} />
            <Modal
              open={open}
              onClose={handleModalLogoutClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500 }}
            >
              <Fade in={open}>
                <Box sx={modalStyle}>
                  <PriorityHighIcon
                    sx={{
                      color: '#B44647',
                      padding: '4px',
                      width: '32px',
                      height: '32px',
                      boxShadow: 'rgba(240, 93, 94, 0.1) 0px 0px 0px 8px',
                      backgroundColor: 'rgba(240, 93, 94, 0.4)',
                      borderRadius: '20px',
                    }}
                  />
                  <Typography variant="h6" sx={{ marginTop: '22px', fontWeight: 'bold' }}>
                    Confirmar Logout
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Alterações não salvas serão perdidas. <br /> Você tem certeza de que deseja sair?
                  </Typography>
                  <div className="btn_mensagem">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleModalLogoutClose}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#F05D5E',
                          color: 'white',
                        },
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleLogoutRestaurant}
                      sx={{
                        backgroundColor: '#4AC07F',
                        color: 'white',
                        '&:hover': { backgroundColor: '#215438' },
                      }}
                    >
                      Confirmar
                    </Button>
                  </div>
                </Box>
              </Fade>
            </Modal>
            <div className="content">
              <Routes>
                <Route path={`/controle`} element={<ProtectedRouteRestaurant element={<Controle />} />} />
                <Route path={`/pedido`} element={<ProtectedRouteRestaurant element={<Pedido />} />} />
              </Routes>
            </div>
          </>
        )}

        {/* Rotas não autenticadas */}
        {(!isAuth && !isAuthRestaurant) && (
          <Routes>
            <Route path="/loginrestaurante" element={<LoginRestaurante onLogin={handleLoginRestaurant} />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/*" element={<Navigate to="/homepage" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default AppRoutes;
