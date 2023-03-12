import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import ClienteLista from './cliente/lista/ClienteLista';
import ClienteNovo from './cliente/novo/ClienteNovo';
import ClienteEditar from './cliente/editar/ClienteEditar';
import ProdutoLista from './produto/lista/ProdutoLista';
import ProdutoNovo from './produto/novo/ProdutoNovo';
import ProdutoEditar from './produto/editar/ProdutoEditar';
import PedidoLista from './pedido/lista/PedidoLista';
import PedidoNovo from './pedido/novo/PedidoNovo';
import PedidoEditar from './pedido/editar/PedidoEditar';
import { Container } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [clienteId, setClienteId] = useState(null);
  const [produtoId, setProdutoId] = useState(null);
  const [pedidoId, setPedidoId] = useState(null);

  return (
    <div className="App">
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cliente/lista" element={<ClienteLista setClienteId={setClienteId} />}  />
            <Route path="/cliente/novo" element={<ClienteNovo />} />
            <Route path="/cliente/editar" element={<ClienteEditar clienteId={clienteId} setClienteId={setClienteId} />} />
            <Route path="/produto/lista" element={<ProdutoLista setProdutoId={setProdutoId} />} />
            <Route path="/produto/novo" element={<ProdutoNovo />} />
            <Route path="/produto/editar" element={<ProdutoEditar produtoId={produtoId} setProdutoId={setProdutoId} />} />
            <Route path="/pedido/lista" element={<PedidoLista setPedidoId={setPedidoId} />} />
            <Route path="/pedido/novo" element={<PedidoNovo />} />
            <Route path="/pedido/editar" element={<PedidoEditar pedidoId={pedidoId} setPedidoId={setPedidoId} />} />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
