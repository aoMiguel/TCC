import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GrAdd } from "react-icons/gr";
import { PedidoContext } from '../ItemPedido/PedidoContext'; 
import './ItemEntrada.css';

const ImageCard = ({ src, alt, price }) => {
  const { adicionarPedido } = useContext(PedidoContext); 

  const handleAdd = () => {
    adicionarPedido({ src, alt, price });
  };

  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return (
    <div className="image-card">
      <img src={src} alt={alt} className="image" />
      <div className="info-item">
        <p className='description_item'>{alt}</p>
        <p className="price">{formattedPrice}</p>
      </div>
      <button aria-label={`Adicionar ${alt} ao carrinho`} className="add-button" onClick={handleAdd}>
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

const ItemEntrada = () => {
  const images = [
    {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    },{
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    },{
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }, {
      src: 'https://i.pinimg.com/736x/d9/35/2f/d9352f8cf0023ef14f1f73e70f668ebe.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
    }
  ];

  return (
    <>
      <h2>Entradas</h2>
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

export default ItemEntrada;
