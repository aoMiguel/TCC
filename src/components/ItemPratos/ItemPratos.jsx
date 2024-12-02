import { useEffect, useState } from 'react';
import './ItemPratos.css';
import Card from '../Card/Card';

const ItemPratos = () => {
  const [pratos, setPratos] = useState([]);

  const fazerRequisicao = async () => {
    const response = await fetch('http://localhost:3333/pratos', {
      method: 'GET'
    });
    
    try {
      const data = await response.json();
      const filterPrato = data.filter((e) => {
        return e.tipoprato === "P"
      });
      const pratos = filterPrato.map((item) => {
        return {
          src: item.foto,
          alt: item.name,
          price: parseFloat(item.price)
        };
      });

      response.status == 200 && setPratos(pratos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fazerRequisicao();
  }, []);

  return (
    <>
      <h2 className='item-h2'>Pratos</h2>
      <div className="image-gallery">
        {pratos.map((image, index) => (
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

export default ItemPratos;
