import './Promocao.css'
import ItemPromocao from '../../components/ItemPromocao/ItemPromocao'


export default function Promocao() {
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
      </main>
      <ItemPromocao />
    </>
  )
};
