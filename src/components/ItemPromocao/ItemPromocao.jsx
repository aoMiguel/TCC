import React, { useContext, useState } from 'react';
import Card from '../Card/Card';
import './ItemPromocao.css';

const ItemPromocao = () => {
  const images = [
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
    {
      src: 'https://i.pinimg.com/control/564x/9d/af/e1/9dafe123abaf350d64b0df29d5fbc43b.jpg',
      alt: 'Prato delicioso',
      price: 24.90,
      
    },
  ];

  return (
    <>
      <h2 className='item-h2'>Promoção</h2>
      <div className="image-gallery">
        {images.map((image, index) => (
          <Card
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

export default ItemPromocao;
