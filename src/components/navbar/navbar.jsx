import './navbar.css';
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function Navbar({ onLogout, quantidadePedidos }) {
  return (
    <>
      <nav className="navbar">
        <div className="alinhar">
          <span></span>
          <span className='brand-text'>Bem-vindo ao Nosso Site!</span>
          <div className="shopping">
            <Badge badgeContent={quantidadePedidos} color="secondary">
              <Link className='pedidos' to="/pedidos">
                <CiShoppingCart size={26} />
              </Link>
            </Badge>
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
          <li><Link className='link-categoria link-categoria-hover' to="/promocao">Promoções</Link></li>
          <li><Link className='link-categoria link-categoria-hover' to="/cardapio">Cardapio</Link></li>
        </ul>
        <div className="logout-container"> 
          <button className='link-categoria link-logout-hover' onClick={onLogout}>
            <Link to="/login">LogOut</Link>
          </button>
        </div>
      </div>
    </>
  );
}
