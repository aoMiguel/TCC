import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login_Restaurante.css';
import Button from '@mui/material/Button';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';
import MaskedInput from 'react-text-mask';
import SimpleAlert from '../../components/Alertas/SimpleAlert';

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
  const [nome, setnome] = useState('');
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
  const [restauranteName, setRestauranteName] = useState('');

  useEffect(() => {
    const storedRestauranteName = localStorage.getItem('restaurante');
    setRestauranteName(storedRestauranteName);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cadastre) {
      // Validações
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
            cnpj, nome, endereco, cep, cidade, bairro, num, compl, telefone, capacidade
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Restaurante cadastrado com sucesso:', result);
          setToken(result.token);
          setAlertVisible(true);
          navigate(`/${restauranteName}/home`);
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
      // Lógica de login
      try {
        const response = await fetch(`http://localhost:3333/restaurante?nome=${nome}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          if (result.length > 0) {
            // Nome já cadastrado, redireciona para a página do restaurante
            navigate(`/${restauranteName}/home`);
          } else {
            setError('Restaurante não encontrado. Verifique o nome.');
          }
        } else {
          const errorText = await response.text();
          const error = errorText ? JSON.parse(errorText) : { message: 'Erro desconhecido' };
          console.error('Erro ao verificar restaurante:', error);
          setError(error.message || 'Erro ao verificar restaurante.');
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
                <CustomTextField
                  value={cnpj}
                  onChange={(e) => setcnpj(e.target.value)}
                  label="CNPJ"
                  required
                />
                <CustomTextField
                  value={nome}
                  onChange={(e) => setnome(e.target.value)}
                  label="Nome"
                  required
                />
                {/* Outros campos do formulário */}
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
