import "./Menu.css"
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SellIcon from '@mui/icons-material/Sell';
import LogoutIcon from '@mui/icons-material/Logout';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';


const Menu = ({ onModalLogout}) => {
  const categories = [                              
    { name: "Controle", path: `/controle`, Icon: FeaturedPlayListIcon },
    { name: "Entradas", path: `/entradas`, Icon: MenuBookIcon },
    { name: "Pratos", path: `/pratos`, Icon: RamenDiningIcon },
    { name: "Bebidas", path: `/bebidas`, Icon: LocalBarIcon },
    { name: "Promoções", path: `/promocao`, Icon: SellIcon },
  ];
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
          <button
            className='link-categoria link-logout-hover'
            onClick={(e) => {
              e.preventDefault();
              onModalLogout();
            }}
          >
            Sair
            <LogoutIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default Menu;
