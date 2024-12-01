import { useContext } from 'react';
import './ItemPratos.css';
import Card from '../Card/Card';
import { PedidoContext } from '../ItemPedido/PedidoContext';

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
      <h2 className='item-h2'>Pratos</h2>
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

export default ItemPratos;
