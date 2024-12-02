import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './ItemEntrada.css';

const ItemEntrada = () => {
  const [entrada, setEntrada] = useState([]);

  const fazerRequisicao = async () => {
    const response = await fetch('http://localhost:3333/pratos', {
      method: 'GET'
    });

    try {
      const data = await response.json();
      const filterEntrada = data.filter((e)=> {
        return e.tipoprato === "E"
      });
      const entrada = filterEntrada.map((item) => {
        return {
          src: item.foto,
          alt: item.name,
          price: parseFloat(item.price)
        };
      });

      response.status == 200 && setEntrada(entrada);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fazerRequisicao();
  }, []);

  return (
    <>
     <h2 className='item-h2'>Entrada</h2>
      <div className="image-gallery">
        {entrada.map((image, index) => (
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
}

export default ItemEntrada;
