import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import store from '../../img/store.png';

function ProdutoEditar(props) {
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/produto/'+props.produtoId,
    }).then((response) => {
      setProduto(response.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setProduto(null);
    });
  }, []);

  return (
    <div className="ProdutoEditar" style={{
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
      <Toaster />
    </div>
  );
};

export default ProdutoEditar;