import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TableItens from '../TableItens/TableItens';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './ItemControle.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1080,
  height: 740,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 8,
  borderRadius: '16px'
};

const ItemControle = () => {
  const [open, setOpen] = useState(false);
  const [pratosid, setPratosid] = useState('');
  const [name, setName] = useState('');
  const [tipoprato, setTipoprato] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0,00');
  const [foto, setFoto] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [alterou, setAlterou] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const itemPrato = {
    pratosid,
    name,
    tipoprato,
    description,
    price,
    foto,
  };

  const onEditItem = (item) => {
    setPratosid(item.pratosid);
    setName(item.name);
    setTipoprato(item.tipoprato);
    setDescription(item.description);
    setPrice(item.price);
    setFoto(item.foto);
    setImagePreview(item.foto);
    setIsEdit(true);
    setOpen(true);
  };

  const handleOpen = () => {
    setIsEdit(false);
    defaultValues();
    setOpen(true);
  };

  const defaultValues = () => {
    setPratosid('');
    setName('');
    setTipoprato('');
    setDescription('');
    setPrice('0,00');
    setFoto('');
    setImagePreview('');
  };

  const handleClose = () => {
    setOpen(false);
    defaultValues();
  };

  const handleCadastrarItem = async () => {
    try {
      const method = pratosid ? 'PUT' : 'POST';
      const url = pratosid
        ? `http://localhost:3333/pratos/${pratosid}`
        : 'http://localhost:3333/pratos';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemPrato),
      });

      if (response.ok) {
        setOpen(false);
        setSnackbarMessage(pratosid ? 'Item editado com sucesso!' : 'Item cadastrado com sucesso!');
        setSnackbarSeverity('success');
        setAlterou(true);
        setSnackbarOpen(true);
      } else {
        throw new Error('Erro ao salvar o prato');
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage('Erro ao conectar com o servidor.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }; 

  const handlePriceChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    if (value !== '') {
      const parsedValue = (parseFloat(value) / 100).toFixed(2);
      setPrice(parsedValue);
    } else {
      setPrice('0,00');
    }
  };

  const formatCurrency = (value) => {
    if (value === '') return '';
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) return '';

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue);
  };

  const handleImagePreview = () => {
    setImagePreview(foto);
  };

  return (
    <>
      <Box sx={{ margin: 6 }}>
        <Button variant="contained" onClick={handleOpen} sx={{
          margin: 2,
          backgroundColor: '#C7462D',
          color: 'white',
          textTransform: 'none',
          width: '140px',
          height: '40px',
          borderRadius: '8px',
        }}>
          Novo Item
        </Button>
        <TableItens onEditItem={onEditItem} alterou={alterou} />
      </Box>

      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          BackdropProps={{
            sx: {
              backgroundColor: 'rgba(0, 0, 0, .84)',
            },
          }}
        >
          <Box sx={style}>
            <h2 id="child-modal-title" style={{ color: '#C7462D', fontSize: '24px', textAlign: 'center' }}>Cadastre seu item aqui!</h2>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  label="Nome do Item"
                  variant="filled"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    marginBottom: 2,
                    width: '480px',
                    bgcolor: 'background.paper',
                    '& .MuiFilledInput-root': {
                      borderRadius: 2,
                      border: 'none',
                      boxShadow: 1,
                      '&:before': {
                        borderBottom: 'none',
                      },
                      '&:after': {
                        borderBottom: 'none',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInputBase-root': {
                      border: 'none',
                      '&:hover': {
                        border: 'none',
                      },
                      '&.Mui-focused': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      px: 2,
                    },
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField
                    label="Categoria"
                    variant="filled"
                    fullWidth
                    select
                    value={tipoprato}
                    onChange={(e) => setTipoprato(e.target.value)}
                    sx={{
                      borderRadius: 2,
                      width: '200px',
                      bgcolor: 'background.paper',
                      '& .MuiFilledInput-root': {
                        borderRadius: 2,
                        border: 'none',
                        boxShadow: 1,
                        '&:before': {
                          borderBottom: 'none',
                        },
                        '&:after': {
                          borderBottom: 'none',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                      },
                      '& .MuiInputBase-root': {
                        border: 'none',
                        '&:hover': {
                          border: 'none',
                        },
                        '&.Mui-focused': {
                          border: 'none',
                        },
                      },
                      '& .MuiInputBase-input': {
                        px: 2,
                      },
                    }}
                  >
                    <MenuItem value="E">Entrada</MenuItem>
                    <MenuItem value="P">Pratos</MenuItem>
                    <MenuItem value="B">Bebidas</MenuItem>
                  </TextField>
                  <TextField
                    label="Preço"
                    type="text"
                    value={formatCurrency(price)}
                    onChange={handlePriceChange}
                    variant="filled"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      width: '200px',
                      bgcolor: 'background.paper',
                      '& .MuiFilledInput-root': {
                        borderRadius: 2,
                        border: 'none',
                        boxShadow: 1,
                        '&:before': {
                          borderBottom: 'none',
                        },
                        '&:after': {
                          borderBottom: 'none',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                      },
                      '& .MuiInputBase-root': {
                        border: 'none',
                        '&:hover': {
                          border: 'none',
                        },
                        '&.Mui-focused': {
                          border: 'none',
                        },
                      },
                      '& .MuiInputBase-input': {
                        px: 2,
                      },
                    }}
                  />
                </div>
                <TextField
                  label="Descrição"
                  variant="filled"
                  multiline
                  rows={3}
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    marginTop: 2,
                    bgcolor: 'background.paper',
                    '& .MuiFilledInput-root': {
                      borderRadius: 2,
                      border: 'none',
                      boxShadow: 1,
                      '&:before': {
                        borderBottom: 'none',
                      },
                      '&:after': {
                        borderBottom: 'none',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInputBase-root': {
                      border: 'none',
                      '&:hover': {
                        border: 'none',
                      },
                      '&.Mui-focused': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      px: 2,
                    },
                  }}
                />
                <TextField
                  label="Imagem (URL)"
                  type="url"
                  variant="filled"
                  fullWidth
                  value={foto}
                  onChange={(e) => setFoto(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    marginTop: 2,
                    width: '480px',
                    bgcolor: 'background.paper',
                    '& .MuiFilledInput-root': {
                      borderRadius: 2,
                      border: 'none',
                      boxShadow: 1,
                      '&:before': {
                        borderBottom: 'none',
                      },
                      '&:after': {
                        borderBottom: 'none',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiInputBase-root': {
                      border: 'none',
                      '&:hover': {
                        border: 'none',
                      },
                      '&.Mui-focused': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      px: 2,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleImagePreview}
                  sx={{
                    backgroundColor: '#4AC07F',
                    color: 'white',
                    width: '200px',
                    mt: 6,
                    '&:hover': {
                      backgroundColor: '#215438',
                    },
                    alignSelf: 'center',
                  }}
                >
                  Carregar Prévia
                </Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                {imagePreview ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <img
                      src={imagePreview}
                      alt="Prévia da Imagem"
                      style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'contain', border: '1px solid #ccc', borderRadius: '14px' }}
                    />
                  </Box>
                ) : (
                  <Typography color="text.secondary" sx={{ m: 6, textAlign: 'center' }}>Selecione uma imagem para visualizar a prévia.</Typography>
                )}
              </div>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 'auto', mr: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClose}
                sx={{
                  mr: 4,
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
                onClick={handleCadastrarItem}
                sx={{
                  backgroundColor: isEdit ? '#5da0f0' : '#4AC07F',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: isEdit ? '#5da0f0' : '#4AC07F',
                  },
                }}
              >
                {isEdit ? 'Editar' : 'Cadastrar'}
              </Button>
            </Box>
          </Box>
        </Modal>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ItemControle;
