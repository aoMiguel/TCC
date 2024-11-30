import './Home.css';
import ItemEntrada from '../../components/ItemEntrada/ItemEntrada';
import ItemPratos from '../../components/ItemPratos/ItemPratos';
import ItemBebida from '../../components/ItemBebida/ItemBebida';
import ItemPromocao from '../../components/ItemPromocao/ItemPromocao';
import OutDoor from '../../components/Outdoor/Outdoor';

export default function Home() {
    return (
        <>
            <OutDoor />
            <ItemEntrada />
            <ItemPratos />
            <ItemBebida />
            <ItemPromocao />
        </>
    );
}
