import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import store from '../../img/store.png';

function ProdutoLista(props) {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/produto/lista',
    }).then((response) => {
      setProdutos(response.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setProdutos([]);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    axios({
      method: 'get',
      url: 'http://localhost:8080/produto/lista',
      params: {
        nome: formDataObj.nome,
        descricao: formDataObj.descricao,
        valor: formDataObj.valor,
      },
    }).then((response) => {
      setProdutos(response.data);
      setSubmitted(false);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setSubmitted(false);
      setProdutos([]);
    });
  };

  const editarProduto = (produtoId) => {
    props.setProdutoId(produtoId);
    navigate("/produto/editar");
  };

  return (
    <div className="ProdutoLista" style={{
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
                      Nome
                      <Form.Control type="text" name="nome" />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.descricao">
                  <InputGroup className='TextLeft'>
                    <label>
                      Descrição
                      <Form.Control type="text" name="descricao"/>
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.valor">
                  <InputGroup className='TextLeft'>
                    <label>
                      Valor do Produto
                      <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control type="number" name="valor"/>
                        <InputGroup.Text>,00</InputGroup.Text>
                      </InputGroup>
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
        <Card.Header className="TextLeft">Produto - Lista</Card.Header>
        <Card.Body>
          <Row>
            <Col className='TextRight'>
              <Button id="pedidos" onClick={() => navigate("/produto/novo")}>Novo Produto</Button>
            </Col>
          </Row><br></br>
          {produtos.map(
            (produto, i) => (
              <Card className="mb-4">
                <Card.Header>
                  <Card.Title className="TextLeft"><b>Produto -</b> {produto.id} </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <b>Nome:</b> {produto.nome}
                    </Col>
                    <Col>
                      <b>Valor:</b> R${produto.valor},00
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <b>Descrição:</b> {produto.descricao}
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="TextRight">
                  <Button id="pedidos" onClick={() => { editarProduto(produto.id) }}>Editar Produto</Button>
                </Card.Footer>
              </Card>
            )
          )}
        </Card.Body>
        <Card.Footer></Card.Footer>
      </Card>
      <Toaster />
    </div>
  );
};

export default ProdutoLista;