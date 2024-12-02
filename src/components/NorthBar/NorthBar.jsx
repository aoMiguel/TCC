import './NorthBar.css';
import Badge from '@mui/material/Badge';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

export default function NorthBar({ isRestaurante }) {

  return (
    <>
      <nav className="navbar">
        <div className="alinhar">
          <Link className='logo-text' to="/home"><LocalDiningIcon /> MenuForge <LocalDiningIcon /></Link>
          <span className='brand-text'>Bem-vindo!</span>
          {isRestaurante ? (
            <div className="shopping">
              <Badge badgeContent={quantidadePedidos} color="secondary">
                <Link className='pedidos' to={`/pedidos`}>
                  <CiShoppingCart size={26} />
                </Link>
              </Badge>
            </div>
          ) : <span></span>}
        </div>
      </nav>
    </>
  );
}
