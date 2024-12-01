import { useEffect, useState } from 'react';
import './ItemBebida.css';
import Card from '../Card/Card';

const ItemBebida = () => {
  const [bebidas, setBebidas] = useState([]);
  // const [addedImage, setAddedImage] = useState(null);

  const fazerRequisicao = async () => {
    const response = await fetch('http://localhost:3333/pratos', {
      method: 'GET'
    });

    try {
      const data = await response.json();
      const bebidas = data.map((item) => {
        return {
          src: item.foto,
          alt: item.name,
          price: item.price
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

  // const handleAddToCart = (src) => {
  //   setAddedImage(src);
  // };

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
          // onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      {/* {addedImage && (
        <div className="added-image">
          <h3>Item Adicionado:</h3>
          <img src={addedImage} alt="Item Adicionado" />
        </div>
      )} */}
    </>
  );
};

export default ItemBebida;
