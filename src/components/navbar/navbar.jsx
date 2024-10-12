import './navbar.css';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="alinhar">
          <span></span>
          <span className='brand-text'>Bem-vindo ao Nosso Site!</span>
          <div className="shopping">
            <span className='notification'></span>
            <Link className='pedidos' to="/pedidos"><CiShoppingCart size={26}/></Link>
          </div>
        </div>
      </nav>
      <div className="nav-bar">
        <ul className='categoria'>
        <div className="logo-container">
          <Link className='link-categoria logo-text' to="/home">MenuForge</Link>
        </div>
          <li><Link className='link-categoria link-categoria-hover' to="/entradas">Entradas</Link></li>
          <li><Link className='link-categoria link-categoria-hover' to="/pratos">Pratos</Link></li>
          <li><Link className='link-categoria link-categoria-hover' to="/bebidas">Bebidas</Link></li>
          <li><Link className='link-categoria link-categoria-hover' to="/promocoes">Promoções</Link></li>
        </ul>
        <div className="logout-container">
          <Link className='link-categoria link-logout-hover' to="/logout">Logout</Link>
        </div>
      </div>
    </>
  );
};