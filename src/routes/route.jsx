import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Entradas from '../pages/Entradas/Entradas';
import Pratos from '../pages/Pratos/Pratos';
import Pedidos from '../pages/Pedidos/Pedidos';
import Bebida from '../pages/Bebidas/Bebidas';
import Promocao from '../pages/Promocao/Promocao';
import Controle from '../pages/Controle/Controle'
import './AppRoutes.css';
import NorthBar from '../components/NorthBar/NorthBar';
import Menu from '../components/menu/Manu';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Button } from '@mui/material';

const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [restauranteName, setRestauranteName] = useState("");
  const [open, setOpen] = useState(false);
  const handleModalLogoutOpen = () => setOpen(true);
  const handleModalLogoutClose = () => setOpen(false);
  
  
  useEffect(() => {
    const storedRestauranteName = localStorage.getItem('restaurante');
    setRestauranteName(storedRestauranteName);
    setIsAuth(!!localStorage.getItem('authToken'));
  }, []);

  const handleLogin = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
      const storedRestauranteName = localStorage.getItem('restaurante');
      setRestauranteName(storedRestauranteName);
      setIsAuth(true);
    }
  };

  const style = {
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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('restaurante');
    setRestauranteName("")
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
            <NorthBar restauranteName={restauranteName} />
            <Menu restauranteName={restauranteName} onModalLogout={handleModalLogoutOpen} />
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleModalLogoutClose}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <PriorityHighIcon  sx={{ color: '#B44647', padding: '4px', width: '32px', height: '32px', boxShadow: 'rgba(240, 93, 94, 0.1) 0px 0px 0px 8px', backgroundColor: 'rgba(240, 93, 94, 0.4)', borderRadius: '20px'}} />
                  <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ marginTop: '22px', fontWeight: 'bold' }}>
                    Confirmar Logout
                  </Typography>
                  <Typography id="transition-modal-description"  sx={{ mt: 2 }}>
                    Alterações não salvas serão perdidas. <br /> Você tem certeza de que deseja sair?
                  </Typography>
                  <div className="btn_mensagem">
                    <Button 
                      variant="outlined"
                      color= "error"
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
                        alignContent: 'center',
                        backgroundColor: '#4AC07F', 
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#215438'
                        },
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
                <Route path={`/${restauranteName}/home`}element={<ProtectedRoute element={<Home />} />} />
                <Route path={`/${restauranteName}/pratos`}element={<ProtectedRoute element={<Pratos />} />} />
                <Route path={`/${restauranteName}/entradas`}element={<ProtectedRoute element={<Entradas />} />} />
                <Route path={`/${restauranteName}/pedidos`}element={<ProtectedRoute element={<Pedidos />} />} />
                <Route path={`/${restauranteName}/bebidas`}element={<ProtectedRoute element={<Bebida />} />} />
                <Route path={`/${restauranteName}/promocao`}element={<ProtectedRoute element={<Promocao />} />} />
                <Route path={`/${restauranteName}/controle`}element={<ProtectedRoute element={<Controle />} />} />
                <Route path={`/*`} element={<Navigate to={`/${restauranteName}/home`} />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default AppRoutes;
