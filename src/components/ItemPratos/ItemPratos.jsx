import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { GrAdd, GrCheckmark } from 'react-icons/gr';
import './ItemPratos.css';
import { PedidoContext } from '../ItemPedido/PedidoContext';

const ImageCard = ({ src, alt, price }) => {
  const { adicionarPedido } = useContext(PedidoContext);
  const [added, setAdded] = useState(false);

  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  const handleAddToCart = () => {
    const novoPedido = { src, alt, price };
    adicionarPedido(novoPedido);
    setAdded(true);
  };

  return (
    <div className="image-card">
      <img src={src} alt={alt} className="image" />
      <div className="info-item">
        <p className="description_item">{alt}</p>
        <p className="price">{formattedPrice}</p>
      </div>
      <button
        onClick={handleAddToCart}
        aria-label={`Adicionar ${alt} ao carrinho`}
        className="add-button"
      >
        {added ? <GrCheckmark /> : <GrAdd />}
      </button>
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

const ItemPratos = () => {
  const { quantidade } = useContext(PedidoContext);

  const images = [
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de frango grelhado',
      price: 29.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de massa ao molho',
      price: 24.90,
    },{
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato de carne com legumes',
      price: 34.90,
    },
    
  ];

  return (
    <>
      <h2>Pratos</h2>
      <div className="image-gallery">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            src={image.src}
            alt={image.alt}
            price={image.price}
          />
        ))}
      </div>
    </>
  );
};

export default ItemPratos;
