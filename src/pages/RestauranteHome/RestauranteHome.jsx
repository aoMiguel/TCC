import './RestauranteHome.css';
import ItemEntrada from '../../components/ItemEntrada/ItemEntrada';
import ItemPratos from '../../components/ItemPratos/ItemPratos';
import ItemBebida from '../../components/ItemBebida/ItemBebida';
import ItemPromocao from '../../components/ItemPromocao/ItemPromocao';
import OutDoor from '../../components/Outdoor/Outdoor';
import Divider from '@mui/material/Divider';

export default function Home() {
    return (
        <>
            <OutDoor />
            <h1 style={{ color: '#ff4d4d', padding: "20px 0px" }}>
                Cardápio completo
                <Divider />
            </h1>
            
            <ItemEntrada />
            <ItemPratos />
            <ItemBebida />
            <ItemPromocao />
        </>
    );
}
