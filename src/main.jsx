import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from '../src/routes/route'
import './index.css'
import { PedidoProvider } from './components/ItemPedido/PedidoContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PedidoProvider>
    <AppRoutes />
    </PedidoProvider>
  </StrictMode>,
)
