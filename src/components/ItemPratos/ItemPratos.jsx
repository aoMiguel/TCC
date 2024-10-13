import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GrAdd } from 'react-icons/gr';
import './ItemPratos.css';
import { PedidoContext } from '../ItemPedido/PedidoContext';

const ImageCard = ({ src, alt, price }) => {
  const { adicionarPedido } = useContext(PedidoContext); 

  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  const handleAddToCart = () => {
    const novoPedido = { src, alt, price }; 
    adicionarPedido(novoPedido); 
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
        <GrAdd />
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
  const images = [
    {
      src: 'https://i.imgur.com/HcJBO3f.jpeg',
      alt: 'Prato delicioso',
      price: 34.9,
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
