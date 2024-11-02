import "./Outdoor.css"
import { Button } from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';

export default function OutDoor() {
  return (
    <>
      <main className="main-content">
        <div className="outdoor">
          <h1>Descubra sabores incríveis!</h1>
          <p>
            Em nosso restaurante, oferecemos uma experiência gastronômica única
            com pratos feitos com ingredientes frescos e de alta qualidade.
            Venha experimentar o melhor da culinária!
          </p>
          <Button
            variant="contained"
            sx={{
              width: '220px',
              justifyContent: 'space-between',
              alignContent: 'center',
              background: 'linear-gradient(45deg, rgba(249,87,56,1) 0%, rgba(87,30,20,1) 100%);',
              color: 'white',
              textTransform: 'none',
              marginTop: '40px',
            }}
            endIcon={<SellIcon />}
          >
            Veja nossas promoções
          </Button>
        </div>
      </main>
    </>
  );
}
