import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
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
                <h6>Bem-vindo ao nosso restaurante!</h6>
                <div className="intro-container">
                    <h2>Descubra sabores incríveis!</h2>
                    <p>Em nosso restaurante, oferecemos uma experiência gastronômica única com pratos feitos com ingredientes frescos e de alta qualidade. Venha experimentar o melhor da culinária!</p>
                </div>
                <div className="image-gallery">
                    <img src="image1.jpg" alt="Prato delicioso" />
                    <img src="image2.jpg" alt="Bebida refrescante" />
                    <img src="image3.jpg" alt="Entrada apetitosa" />
                </div>
            </main>
        </div>
    );
};

export default Home;
