import './Home.css';
import ItemEntrada from '../../components/ItemEntrada/ItemEntrada';
import ItemPratos from '../../components/ItemPratos/ItemPratos';
import ItemBebida from '../../components/ItemBebida/ItemBebida';
import ItemPromocao from '../../components/ItemPromocao/ItemPromocao';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const carouselImages = [
        {
            src: 'https://i.imgur.com/dMwHmTW.jpeg',
            alt: 'Prato promocional 1',
        },
        {
            src: 'https://i.imgur.com/dMwHmTW.jpeg',
            alt: 'Prato promocional 2',
        },
        {
            src: 'https://i.imgur.com/dMwHmTW.jpeg',
            alt: 'Prato promocional 3',
        },
    ];

    return (
        <>
            <main className="main-content">
                <div className="carousel-container">
                    <Slider {...sliderSettings} className="carousel-slider">
                        {carouselImages.map((image, index) => (
                            <div key={index}>
                                <img src={image.src} alt={image.alt} className="carousel-image" />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="intro-container">
                    <h2>Descubra sabores incríveis!</h2>
                    <p>
                        Em nosso restaurante, oferecemos uma experiência gastronômica única
                        com pratos feitos com ingredientes frescos e de alta qualidade.
                        Venha experimentar o melhor da culinária!
                    </p>
                </div>
            </main>
            <ItemEntrada />
            <ItemPratos />
            <ItemBebida />
            <ItemPromocao />
        </>
    );
}
