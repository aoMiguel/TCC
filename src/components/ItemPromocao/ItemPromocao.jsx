import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './ItemPromocao.css';

const ItemPromocao = () => {
  const [promocao, setPromocao] = useState([]);

  const fazerRequisicao = async () => {
    const response = await fetch('http://localhost:3333/pratos', {
      method: 'GET'
    });

    try {
      const data = await response.json();
      const promocao = data.map((item) => {
        return {
          src: item.foto,
          alt: item.name,
          price: parseFloat(item.price)
        };
      });

      response.status == 200 && setPromocao(promocao);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fazerRequisicao();
  }, []);

  return (
    <>
      <h2 className='item-h2'>Promoção</h2>
      <div className="image-gallery">
        {promocao.map((image, index) => (
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
