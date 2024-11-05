import Card from '../Card/Card';
import './ItemEntrada.css';

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
     <h2 className='item-h2'>Entrada</h2>
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

export default ItemEntrada;
