import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './RouteRestaurante.css'
import MenuRestaurante from '../components/MenuRestaurante/MenuRestaurante';
import RestauranteHome from '../pages/RestauranteHome/RestauranteHome'
import Controle from '../pages/Controle/Controle'
import Pedido from '../pages/PedidoRestaurante/PedidoRestaurante'
import { Button } from '@mui/material';

const AppRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const handleModalLogoutOpen = () => setOpen(true);
  const handleModalLogoutClose = () => setOpen(false);

  const handleLogin = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
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
            <NorthBar />
            <MenuRestaurante onModalLogout={handleModalLogoutOpen} />
            {handleModalLogoutOpen &&
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
                    <PriorityHighIcon sx={{ color: '#B44647', padding: '4px', width: '32px', height: '32px', boxShadow: 'rgba(240, 93, 94, 0.1) 0px 0px 0px 8px', backgroundColor: 'rgba(240, 93, 94, 0.4)', borderRadius: '20px' }} />
                    <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ marginTop: '22px', fontWeight: 'bold' }}>
                      Confirmar Logout
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
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
            }
            <div className="content">
              <Routes>
                <Route path={`/homerestaurante`} element={<ProtectedRoute element={<RestauranteHome />} />} />
                <Route path={`/controle`} element={<ProtectedRoute element={<Controle />} />} />
                <Route path={`/pedido`} element={<ProtectedRoute element={<Pedido />} />} />
                <Route path={`/*`} element={<Navigate to={`/homerestaurante`} />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/loginrestaurante" element={<LoginRestaurante />} />
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
