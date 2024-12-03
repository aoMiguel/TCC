import { useContext, useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { PedidoContext } from '../ItemPedido/PedidoContext';
import { Box, Button, TextField, Typography, Modal, Backdrop, Fade } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import PropTypes from 'prop-types';
import './Card.css';

const Card = function ({ src, alt, price, pratosid }) {
  const { adicionarPedido, removerPedido, pedidos } = useContext(PedidoContext);
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const handleModalRemoverOpen = () => { setOpen(true) };
  const handleModalRemoverClose = () => { setOpen(false); };

  const fecharModalCancelar = () => {
    const index = pedidos.findIndex((pedido) => pedido.src === src);
    if (index !== -1) {
      removerPedido(index);
    }
    setAdded(false);
    setCount(1);
    handleModalRemoverClose(); 
  };
  

  const handleIncrement = () => {
    if (count < 10) {
      setCount(count + 1);
      const novoPedido = { src, alt, price, pratosid}
      adicionarPedido(novoPedido);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    if (count === 0) {
      handleModalRemoverOpen();
      setAdded(false);
    }
  }, [count]);

  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  const styleBox = {
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
    p: 4,
  };

  const handleAddToCart = () => {
    const novoPedido = { src, alt, price, pratosid };
    adicionarPedido(novoPedido);
    setAdded(true);
    setCount(1);
    // onAddToCart(src);
  };
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setCount(value);
    }
  };

  return (
    <>
      <div className="image-card-bebidas">
        <img src={src} alt={alt} className="image" />
        <div className="info-item-bebidas">
          <p className="description_item">{alt}</p>
          <p className="price">{formattedPrice}</p>
        </div>
        {!added ?
          <button
            onClick={handleAddToCart}
            aria-label={`Adicionar ${alt} ao carrinho`}
            className="add-button">
            <GrAdd />
          </button>
          :
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              color="secondary" sx="background: #C7462D"
              onClick={handleDecrement}
              disabled={count <= 0}
            >
              -
            </Button>
            <TextField
              sx={{
                width: '50px',
                margin: '0 10px',
                textAlign: 'center',
                '& input': {
                  textAlign: 'center',
                  color: '#d1d1d1',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  '-moz-appearance': 'textfield',
                },
              }}
              value={count}
              onChange={handleInputChange}
              type="number"
              inputProps={{
                min: 0,
                max: 10,
                style: { textAlign: 'center' },
              }}
            />
            <Button
              variant="contained"
              color="secondary" sx="background: #4CB963"
              onClick={handleIncrement}
              disabled={count >= 10}
            >
              +
            </Button>
          </Box>
        }
      </div>

      {open && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleModalRemoverClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={styleBox}>
              <PriorityHighIcon sx={{ color: '#B44647', padding: '4px', width: '32px', height: '32px', boxShadow: 'rgba(240, 93, 94, 0.1) 0px 0px 0px 8px', backgroundColor: 'rgba(240, 93, 94, 0.4)', borderRadius: '20px' }} />
              <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                Deseja remover {alt}?
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Se desejar remover esse item cancele essa mensagem, caso contrario, clique em confirmar.
              </Typography>
              <div className="btn_mensagem">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={fecharModalCancelar}
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
                  onClick={handleModalRemoverClose}
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
      )}
    </>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  // onAddToCart: PropTypes.func.isRequired,
};


export default Card
