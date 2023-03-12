import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import store from '../../img/store.png';

function PedidoNovo() {
  const navigate = useNavigate();

  return (
    <div className="PedidoNovo" style={{
      paddingTop: '15px',
    }}>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <img src={store} alt="store" height={250} /><br></br>
          Bem vindo(a)
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <Button id="home" onClick={() => navigate("/")}>Home</Button>{' '}
              <Button id="clientes" onClick={() => navigate("/cliente/lista")}>Clientes</Button>{' '}
              <Button id="produtos" onClick={() => navigate("/produto/lista")}>Produtos</Button>{' '}
              <Button id="pedidos" onClick={() => navigate("/pedido/lista")}>Pedidos</Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card><br></br>
    </div>
  );
};

export default PedidoNovo;
