const Menu = ({ onModalLogout, restauranteName }) => {
  const categories = [
    { name: "Entradas", path: `/${restauranteName}/entradas`, Icon: MenuBookIcon },
    { name: "Pratos", path: `/${restauranteName}/pratos`, Icon: RamenDiningIcon },
    { name: "Bebidas", path: `/${restauranteName}/bebidas`, Icon: LocalBarIcon },
    { name: "Promoções", path: `/${restauranteName}/promocao`, Icon: SellIcon },
    { name: "Controlador", path: `/${restauranteName}/controller`, Icon: LocalBarIcon },
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