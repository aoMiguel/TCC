import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import prato1 from '../assets/prato1.jpg';
import prato2 from '../assets/prato2.jpg';
import prato3 from '../assets/prato3.jpg';
import prato4 from '../assets/prato4.jpg';
import prato5 from '../assets/prato5.jpg';
import prato6 from '../assets/prato6.jpg';
import prato7 from '../assets/prato7.jpg';

const Home = () => {
    const galleryRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        const gallery = galleryRef.current;

        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartX(e.pageX - gallery.offsetLeft);
            setScrollLeft(gallery.scrollLeft);
            gallery.style.cursor = 'grabbing';
        };

        const handleMouseLeaveOrUp = () => {
            setIsDragging(false);
            gallery.style.cursor = 'grab';
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 1.5;
            gallery.scrollLeft = scrollLeft - walk;
        };

        gallery.addEventListener('mousedown', handleMouseDown);
        gallery.addEventListener('mouseleave', handleMouseLeaveOrUp);
        gallery.addEventListener('mouseup', handleMouseLeaveOrUp);
        gallery.addEventListener('mousemove', handleMouseMove);

        return () => {
            gallery.removeEventListener('mousedown', handleMouseDown);
            gallery.removeEventListener('mouseleave', handleMouseLeaveOrUp);
            gallery.removeEventListener('mouseup', handleMouseLeaveOrUp);
            gallery.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging, startX, scrollLeft]);

    return (
        <div className="app-container">
            <nav className="navbar">
                <ul className="navbar-links">
                    <li><Link to="/pratos">Pratos</Link></li>
                    <li><Link to="/bebidas">Bebidas</Link></li>
                    <li><Link to="/entradas">Entradas</Link></li>
                </ul>
            </nav>
            <aside className="sidebar">
                <ul>
                    <li><Link to="/cardapio">Cardápio</Link></li>
                    <li><Link to="/promocoes">Promoções</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </aside>
            <main className="main-content">
                <div className="intro-container">
                    <h2>Descubra sabores incríveis!</h2>
                    <p>Em nosso restaurante, oferecemos uma experiência gastronômica única com pratos feitos com ingredientes frescos e de alta qualidade. Venha experimentar o melhor da culinária!</p>
                </div>
                
                <div className="image-gallery" ref={galleryRef}>
                    <h2>Pratos</h2>
                    <div className="image-card">
                        <img src={prato1} alt="Prato delicioso1" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato2} alt="Prato delicioso2" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato3} alt="Prato delicioso3" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato4} alt="Prato delicioso4" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato5} alt="Prato delicioso5" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato6} alt="Prato delicioso6" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato7} alt="Prato delicioso7" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                </div>

                <div className="image-gallery" ref={galleryRef}>
                    <h2>Bebidas</h2>
                    <div className="image-card">
                        <img src={prato1} alt="Bebida deliciosa1" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato2} alt="Bebida deliciosa2" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato3} alt="Bebida deliciosa3" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                </div>

                <div className="image-gallery" ref={galleryRef}>
                    <h2>Entradas</h2>
                    <div className="image-card">
                        <img src={prato1} alt="Entrada deliciosa1" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato2} alt="Entrada deliciosa2" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato3} alt="Entrada deliciosa3" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                </div>

                <div className="image-gallery" ref={galleryRef}>
                    <h2>Promoções</h2>
                    <div className="image-card">
                        <img src={prato1} alt="Promoção deliciosa1" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato2} alt="Promoção deliciosa2" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                    <div className="image-card">
                        <img src={prato3} alt="Promoção deliciosa3" />
                        <button>+</button>
                        <p className="price">R$34,90</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
