import React from 'react';
import img from '../../assets/cardapio.jpeg'
import './ItemCardapio.css' 

const MenuPDF = () => {
  return (
    <div className="menu-container">
      <h1>Cardápio</h1>
      <img src={img} alt="Cardápio" className="img" />  
    </div>
  );
};

export default MenuPDF;