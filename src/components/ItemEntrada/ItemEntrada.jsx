import PropTypes from 'prop-types';
import { GrAdd } from "react-icons/gr";
import './ItemEntrada.css';

const ImageCard = ({ src, alt, price }) => {
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
          <button aria-label={`Adicionar ${alt} ao carrinho`} className="add-button">
            <GrAdd />
          </button>
    </div>
)};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

const ItemEntrada = () => {
  const images = [
    {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    },{
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    },{
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
    }, {
      src: 'https://i.imgur.com/dMwHmTW.jpeg',
      alt: 'Prato delicioso',
      price: 'R$34,90',
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
