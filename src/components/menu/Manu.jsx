import "./Menu.css"
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SellIcon from '@mui/icons-material/Sell';
import LogoutIcon from '@mui/icons-material/Logout';

const categories = [
  { name: "Entradas", path: "/entradas", Icon: MenuBookIcon },
  { name: "Pratos", path: "/pratos", Icon: RamenDiningIcon },
  { name: "Bebidas", path: "/bebidas", Icon: LocalBarIcon },
  { name: "Promoções", path: "/promocao", Icon: SellIcon },
];

const Menu = ({ onModalLogout }) => {
  return (
    <>
      <div className="menu">
        <span></span>
        <ul className='categoria'>
          {categories.map(({ name, path, Icon }) => (
            <li key={name}>
              <Link className='link-categoria link-categoria-hover' to={path}>
                {name}
                <Icon className="icon"/>
              </Link>
            </li>
          ))}
        </ul>
        <div className="logout-container">
          <Link
            className='link-categoria link-logout-hover'
            to="/login"
            onClick={onModalLogout}
          >
            Sair
            <LogoutIcon />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;
