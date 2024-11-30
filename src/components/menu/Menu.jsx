const Menu = ({ onModalLogout}) => {
  const categories = [
    { name: "Entradas", path: `/entradas`, Icon: MenuBookIcon },
    { name: "Pratos", path: `/pratos`, Icon: RamenDiningIcon },
    { name: "Bebidas", path: `/bebidas`, Icon: LocalBarIcon },
    { name: "Promoções", path: `/promocao`, Icon: SellIcon },
    { name: "Controlador", path: `/controller`, Icon: LocalBarIcon },
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