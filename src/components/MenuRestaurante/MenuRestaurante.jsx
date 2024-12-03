import "./MenuRestaurante.css"
import { Link } from 'react-router-dom';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';



const RestauranteMenu = ({ onModalLogout }) => {
  const categories = [                              
    { name: "Controle", path: `/controle`, Icon: ManageAccountsIcon },
    { name: "Pedido", path: `/pedido`, Icon: LocalDiningIcon },
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
