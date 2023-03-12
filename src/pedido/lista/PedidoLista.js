import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import store from '../../img/store.png';

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

function PedidoLista() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/pedido/lista',
    }).then((response) => {
      setPedidos(response.data);
      setSubmitted(false);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setSubmitted(false);
      setPedidos([]);
    });
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    axios({
      method: 'get',
      url: 'http://localhost:8080/pedido/lista',
      params: {
        nome: formDataObj.nome,
        valor: formDataObj.valor,
        status: formDataObj.status,
      },
    }).then((response) => {
      setPedidos(response.data);
      setSubmitted(false);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setSubmitted(false);
      setPedidos([]);
    });
  };

  return (
    <div className="PedidoLista" style={{
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
      <Form noValidate onSubmit={handleSubmit}>
        <Card>
          <Card.Header className="TextLeft">Filtros</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group controlId="form.nome">
                  <InputGroup className='TextLeft'>
                    <label>
                      Cliente
                      <Form.Control type="text" name="nome"/>
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.valor">
                  <InputGroup className='TextLeft'>
                    <label>
                      Valor do Pedido

                      <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control type="number" name="valor"/>
                        <InputGroup.Text>,00</InputGroup.Text>
                      </InputGroup>
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.status">
                  <InputGroup className='TextLeft'>
                    <label>
                      Status
                      <Form.Select name="status">
                        <option value=''></option>
                        <option value="ABERTO">Aberto</option>
                        <option value="APROVADO">Aprovado</option>
                        <option value="CANCELADO">Cancelado</option>
                      </Form.Select><br />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col className='TextRight'>
                <Button id="buscar" type="submit" disabled={submitted}>Filtrar</Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Form>
      <br></br>
      <Card>
        <Card.Header className="TextLeft">Pedido - Lista</Card.Header>
        <Card.Body>
          <Row>
            <Col className='TextRight'>
              <Button id="pedidos" onClick={() => navigate("/pedido/novo")}>Novo Pedido</Button>
            </Col>
          </Row>
          <Items currentItems={pedidos} />
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
      <Toaster />
    </div>
  );
};

export default PedidoLista;