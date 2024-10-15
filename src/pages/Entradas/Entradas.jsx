import './Entradas.css';
import ItemEntrada from '../../components/ItemEntrada/ItemEntrada'

export default function Entradas() {
  return (
    <>
      <main className="main-content">
        <div className="intro-container">
          <h2>Descubra sabores incríveis!</h2>
          <p>
            Em nosso restaurante, oferecemos uma experiência gastronômica única 
            com pratos feitos com ingredientes frescos e de alta qualidade. 
            Venha experimentar o melhor da culinária!
          </p>
        </div>
        
        <ItemEntrada/>
      </main>
    </>
  );
}
