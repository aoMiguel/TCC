import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Button from '@mui/material/Button';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
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
      {alertVisible ? (
          <Alert severity="success">
            Cliente {name} cadastrado com sucesso.
          </Alert>
        ) : 
        <div className="sign-up-container">
          <h3>Crie uma conta</h3>
          <p>Preencha os campos abaixo para criar sua conta.</p>
          <form onSubmit={handleSubmit} className='form-content'>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="standard-basic"
              label="Nome"
              variant="standard"
              required
              sx={{
                width: '300px',
                margin: '10px 0px',
                '& .MuiInputBase-input': {
                  color: '#d1d1d1'
                },
                '& .MuiFormLabel-root': {
                  color: '#d1d1d1',
                  '&.Mui-focused': {
                    color: '#d1d1d1',
                  },
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#d1d1d1',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#d1d1d1',
                }
              }}
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="standard-basic"
              label="Email"
              variant="standard"
              required
              sx={{
                width: '300px',
                margin: '10px 0px',
                '& .MuiInputBase-input': {
                  color: '#d1d1d1'
                },
                '& .MuiFormLabel-root': {
                  color: '#d1d1d1',
                  '&.Mui-focused': {
                    color: '#d1d1d1',
                  },
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#d1d1d1',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#d1d1d1',
                }
              }}
            />
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="standard-basic"
              label="Telefone"
              variant="standard"
              required
              sx={{
                width: '300px',
                margin: '10px 0px',
                '& .MuiInputBase-input': {
                  color: '#d1d1d1'
                },
                '& .MuiFormLabel-root': {
                  color: '#d1d1d1',
                  '&.Mui-focused': {
                    color: '#d1d1d1',
                  },
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#d1d1d1',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#d1d1d1',
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ 
                width: '200px',
                justifyContent: 'space-between',
                alignContent: 'center',
                backgroundColor: '#C7462D', 
                color: 'white', 
                textTransform: 'none',
                margin: '80px 0px 40px 0px',
              }}
              startIcon={<></>}
              endIcon={<SendRoundedIcon />}
            >
              Cadastrar
            </Button>
          </form>
        </div>
      }
      </div>
    </div>
  );
};

export default Login;
