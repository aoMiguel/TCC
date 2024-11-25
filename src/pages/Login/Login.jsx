import { useState, useRef, useEffect } from 'react';
import './login.css';
import Button from '@mui/material/Button';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';
import MaskedInput from 'react-text-mask';
import SimpleAlert from '../../components/Alertas/SimpleAlert'

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [restaurante, setRestaurante] = useState('')
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const [cadastre, setCadastrese] = useState(false);

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const restauranteInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cadastre) {
      if (!email.endsWith('@gmail.com')) {
        setError('O email deve terminar com @gmail.com');
        return;
      }
      if (!phone) {
        setError('O campo de telefone é obrigatório');
        return;
      }
      setError('');

      try {
        const response = await fetch('http://localhost:3333/cliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome: name, restaurante: restaurante, gmail: email, whats: phone }),
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Cliente cadastrado com sucesso:', result);

          localStorage.setItem('restaurante', restaurante);

          setToken(result.token);
          setAlertVisible(true);
        } else {
          const error = await response.json();
          console.error('Erro ao cadastrar cliente:', error);
          setError(error.message || 'Erro ao cadastrar cliente.');
        }

      } catch (error) {
        console.error('Erro na requisição:', error);
        setError('Erro na requisição');
      }
    } else {
      if (!email.endsWith('@gmail.com')) {
        setError('O email deve terminar com @gmail.com');
        return;
      }
      setError('');

      try {
        const response = await fetch('http://localhost:3333/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ gmail: email }),
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Login realizado com sucesso:', result);

          if (result.token) {
            setToken(result.token);
            setAlertVisible(true);
          } else {
            setError('Token não recebido.');
          }
        } else {
          const error = await response.json();
          console.error('Erro ao fazer login:', error);
          setError(error.message || 'Erro ao fazer login.');
        }

      } catch (error) {
        console.error('Erro na requisição:', error);
        setError('Erro na requisição');
      }
    }
  };


  useEffect(() => {
    if (alertVisible && token) {
      const timer = setTimeout(() => {
        onLogin(token);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [alertVisible, token, onLogin]);

  useEffect(() => {
    const storedRestauranteName = localStorage.getItem('restaurante');
    setRestaurante(storedRestauranteName);
  }, []);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        {alertVisible && <SimpleAlert />}
        <div className="sign-up-container">
          {cadastre ? (
            <div>
              <h3>Crie uma conta</h3>
              <p>Preencha os campos abaixo para criar sua conta.</p>
              <form onSubmit={handleSubmit} className='form-content'>
                <TextField
                  inputRef={nameInputRef}
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
                  inputRef={restauranteInputRef}
                  value={restaurante}
                  onChange={(e) => setRestaurante(e.target.value)}
                  id="standard-basic"
                  label="Restaurante"
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
                  inputRef={emailInputRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  required
                  error={!!error && !email.endsWith('@gmail.com')}
                  helperText={error}
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
                <MaskedInput
                  mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  render={(ref, props) => (
                    <TextField
                      {...props}
                      inputRef={ref}
                      label="Telefone"
                      variant="standard"
                      required
                      error={!!error && phone === ''}
                      helperText={phone === '' ? error : ''}
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
                  )}
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
          ) : (
            <div>
              <h3>Fazer login</h3>
              <p>Preencha os campos abaixo para fazer seu Login</p>
              <TextField
                inputRef={emailInputRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="standard-basic"
                label="Email"
                variant="standard"
                required
                error={!!error && !email.endsWith('@gmail.com')}
                helperText={error}
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
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  width: '200px',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  backgroundColor: '#C7462D',
                  color: 'white',
                  textTransform: 'none',
                  margin: '10px 0px 10px 0px',
                }}
                startIcon={<></>}
                endIcon={<SendRoundedIcon />}
              >
                Login
              </Button>
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
                onClick={() => setCadastrese(!cadastre)}
              >
                Cadastrar
              </Button>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
