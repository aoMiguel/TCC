import { useEffect, useState } from 'react';
import './ItemBebida.css';
import Card from '../Card/Card';

const ItemBebida = () => {
  const [bebidas, setBebidas] = useState([]);

  const fazerRequisicao = async () => {
    const response = await fetch('http://localhost:3333/pratos', {
      method: 'GET'
    });

    try {
      const data = await response.json();
      const filterBebidas = data.filter((e)=> {
        return e.tipoprato === "B"
      });
      const bebidas = filterBebidas.map((item) => {
        return {
          src: item.foto,
          alt: item.name,
          price: parseFloat(item.price)
        };
      });

      response.status == 200 && setBebidas(bebidas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fazerRequisicao();
  }, []);

  return (
    <>
      <h2 className='item-h2'>Bebidas</h2>
      <div className="image-gallery">
        {bebidas && bebidas.map((image, index) => (
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

export default ItemBebida;
