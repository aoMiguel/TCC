import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login_Restaurante.css';
import Button from '@mui/material/Button';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';
import MaskedInput from 'react-text-mask';
import SimpleAlert from '../../components/Alertas/SimpleAlert'

const CustomTextField = ({ value, onChange, label, required }) => (
  <TextField
    value={value}
    onChange={onChange}
    label={label}
    variant="standard"
    required={required}
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
);

const LoginRestaurante = ({ onLogin }) => {
  const navigate = useNavigate();
  const [cnpj, setcnpj] = useState('');
  const [nome, setnome] = useState('')
  const [endereco, setendereco] = useState('');
  const [cep, setcep] = useState('');
  const [cidade, setcidade] = useState('');
  const [bairro, setbairro] = useState('');
  const [num, setnum] = useState('');
  const [compl, setcompl] = useState('');
  const [telefone, settelefone] = useState('');
  const [capacidade, setcapacidade] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const [cadastre, setCadastrese] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cadastre) {
      if (!nome.trim()) {
        setError('O nome não pode ser vazio');
        return;
      }
      if (!telefone) {
        setError('O campo de telefone é obrigatório');
        return;
      }
      setError('');

      try {
        const response = await fetch('http://localhost:3333/restaurante', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            cnpj,
            nome,
            endereco, 
            cep, 
            cidade, 
            bairro, 
            num, 
            compl, 
            telefone, 
            capacidade
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Restaurante cadastrado com sucesso:', result.message);
          setToken(result.token);
          setAlertVisible(true);
          navigate(`/${nome}/home`);
        } else {
          const errorText = await response.text();
          const error = errorText ? JSON.parse(errorText) : { message: 'Erro desconhecido' };
          console.error('Erro ao cadastrar restaurante:', error);
          setError(error.message || 'Erro ao cadastrar restaurante.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setError('Erro na requisição');
      }
    } else {
      if (nome.trim() === '') {
        setError('O nome não pode ser vazio');
        return;
      }
      setError('');

      try {
        const response = await fetch('http://localhost:3333/restaurante', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome: nome }),
        });

        if (response.ok) {
          const text = await response.text();
          const result = text ? JSON.parse(text) : {};
          console.log('Login realizado com sucesso:', result);

          if (result.token) {
            setToken(result.token);
            setAlertVisible(true);
          } else {
            setError('Token não recebido.');
          }
        } else {
          const errorText = await response.text();
          const error = errorText ? JSON.parse(errorText) : { message: 'Erro desconhecido' };
          console.error('Erro ao fazer login:', error);
          setError(error.message || 'Erro ao fazer login.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setError('Erro na requisição');
      }
    }
  };

  const toggleCadastre = () => {
    setCadastrese(!cadastre);
  };

  useEffect(() => {
    if (alertVisible && token) {
      const timer = setTimeout(() => {
        onLogin(token);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [alertVisible, token, onLogin]);

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

                <MaskedInput
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                  value={cnpj}
                  onChange={(e) => setcnpj(e.target.value)}
                  render={(ref, props) => (
                    <TextField
                      {...props}
                      inputRef={ref}
                      label="CNPJ"
                      variant="standard"
                      required
                      error={!!error && cnpj === ''}
                      helperText={cnpj === '' ? error : ''}
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
                <CustomTextField
                  value={nome}
                  onChange={(e) => setnome(e.target.value)}
                  label="Nome"
                  required
                />
                <CustomTextField
                  value={endereco}
                  onChange={(e) => setendereco(e.target.value)}
                  label="Endereco"
                  required
                  helperText={error}
                />
                <MaskedInput
                  mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  value={telefone}
                  onChange={(e) => settelefone(e.target.value)}
                  render={(ref, props) => (
                    <TextField
                      {...props}
                      inputRef={ref}
                      label="Telefone"
                      variant="standard"
                      required
                      error={!!error && telefone === ''}
                      helperText={telefone === '' ? error : ''}
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
                <MaskedInput
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  value={cep}
                  onChange={(e) => setcep(e.target.value)}
                  render={(ref, props) => (
                    <TextField
                      {...props}
                      inputRef={ref}
                      label="CEP"
                      required
                      error={!!error && cep === ''}
                      helperText={cep === '' ? error : ''}
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
                <CustomTextField
                  value={cidade}
                  onChange={(e) => setcidade(e.target.value)}
                  label="Cidade"
                  required
                  helperText={error}
                />
                <CustomTextField
                  value={bairro}
                  onChange={(e) => setbairro(e.target.value)}
                  label="Bairro"
                  required
                  helperText={error}
                />
                <MaskedInput
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                  value={num}
                  onChange={(e) => setnum(e.target.value)}
                  render={(ref, props) => (
                    <TextField
                      {...props}
                      inputRef={ref}
                      label="Número"
                      required
                      error={!!error && num === ''}
                      helperText={num === '' ? error : ''}
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
                <CustomTextField
                  value={compl}
                  onChange={(e) => setcompl(e.target.value)}
                  label="Complemento"
                  required
                  helperText={error}
                />
                <CustomTextField
                  value={capacidade}
                  onChange={(e) => setcapacidade(e.target.value)}
                  label="Capacidade"
                  required
                  helperText={error}
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
              <CustomTextField
                value={nome}
                onChange={(e) => setnome(e.target.value)}
                label="Nome"
                required
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
                onClick={toggleCadastre}
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

export default LoginRestaurante;
