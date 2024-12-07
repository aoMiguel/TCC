import './HomePage.css';
import Button from '@mui/material/Button';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Link } from 'react-router-dom';

const selecionar = () => {
  return (
    <div className="app-wrapper">
      <div className="app-container">
        <div className="sign-up-container">
          <h3>Selecione o tipo da conta</h3>
          <p>selecione o tipo da sua conta abaixo</p>

          <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              width: '200px',
              justifyContent: 'space-between',
              alignContent: 'center',
              backgroundColor: '#C7462D',
              color: 'white',
              textTransform: 'none',
              margin: '10px 0px 10px 0px',
            }}
            endIcon={<SendRoundedIcon />}
          >
            Cliente
          </Button> 
          </Link>

          <Link to="/loginrestaurante" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                width: '200px',
                justifyContent: 'space-between',
                alignContent: 'center',
                backgroundColor: '#00000000',
                borderColor: "#C7462D",
                color: '#C7462D',
                border: "1px solid",
                textTransform: 'none',
                margin: '10px 0px 10px 0px',
              }}
              startIcon={<></>}
              endIcon={<SendRoundedIcon />}
            >
              Restaurante
            </Button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default selecionar;
