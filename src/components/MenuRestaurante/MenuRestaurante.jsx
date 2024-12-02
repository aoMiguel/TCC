import "./MenuRestaurante.css"
import { Link } from 'react-router-dom';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SellIcon from '@mui/icons-material/Sell';
import LogoutIcon from '@mui/icons-material/Logout';


const RestauranteMenu = ({ onModalLogout }) => {
  const categories = [                              
    { name: "Controle", path: `/controle`, Icon: LocalBarIcon },
    { name: "Pedido", path: `/pedido`, Icon: SellIcon },
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

export default RestauranteMenu;
