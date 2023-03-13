import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import store from '../../img/store.png';
import api from '../../services/api';

function ClienteLista(props) {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [filtro, setFiltro] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/cliente/lista',
    }).then((response) => {
      setClientes(response.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setClientes([]);
    });
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    setFiltro(formDataObj);
    buscar();
  };

  const buscar = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/cliente/lista',
      params: {
        nome: filtro.nome,
        email: filtro.email,
        cpf: filtro.cpf,
        endereco: filtro.endereco,
        telefone: filtro.telefone,
        ordercampo: filtro.ordercampo,
        ordertipo: filtro.ordertipo,
      },
    }).then((response) => {
      setClientes(response.data);
      setSubmitted(false);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setSubmitted(false);
      setClientes([]);
    });
  }

  const editarCliente = (clienteId) => {
    props.setClienteId(clienteId);
    navigate("/cliente/editar");
  };

  const excluirCliente = (clienteId) => {
    api.post(
      "/cliente/"+clienteId+"/remover",
      {
        headers: {
        'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      toast.success('Cliente excluido com sucesso!');
      buscar();
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  return (
    <div className="ClienteLista" style={{
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
                <Form.Group controlId="form.email">
                  <InputGroup className='TextLeft'>
                    <label>
                      Email
                      <Form.Control type="text" name="email" />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.cpf">
                  <InputGroup className='TextLeft'>
                    <label>
                      CPF
                      <Form.Control type="text" name="cpf" maxLength={11} />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="form.endereco">
                  <InputGroup className='TextLeft'>
                    <label>
                      Endereço
                      <Form.Control type="text" name="endereco" />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.telefone">
                  <InputGroup className='TextLeft'>
                    <label>
                      Telefone
                      <Form.Control type="text" name="telefone" maxLength={11} />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="form.endereco">
                  <InputGroup className='TextLeft'>
                    <label>
                      Ordenar por
                      <Form.Select name="ordercampo">
                        <option value=''></option>
                        <option value="nome">Nome</option>
                        <option value="email">Email</option>
                        <option value="telefone">Telefone</option>
                        <option value="cpf">CPF</option>
                        <option value="endereco">Endereço</option>
                      </Form.Select><br />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.telefone">
                  <InputGroup className='TextLeft'>
                    <label>
                      Tipo Ordenação
                      <Form.Select name="ordertipo">
                        <option value=''></option>
                        <option value="ASC">Crescente</option>
                        <option value="DESC">Decrescente</option>
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
                <Button variant="info" id="buscar" type="submit" disabled={submitted}>Filtrar</Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Form>
      <br></br>
      <Card>
        <Card.Header className="TextLeft">Cliente - Lista</Card.Header>
        <Card.Body>
          <Row>
            <Col className='TextRight'>
              <Button variant="secondary" id="pedidos" onClick={() => navigate("/cliente/novo")} >Novo Cliente</Button>
            </Col>
          </Row><br></br>
          {clientes.map(
            (cliente, i) => (
              <Card className="mb-4">
                <Card.Header>
                  <Card.Title className="TextLeft"><b>Cliente -</b> {cliente.id} </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <b>Nome:</b> {cliente.nome} - <b>CPF:</b> {cliente.cpf} - <b>Telefone:</b> {cliente.telefone}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <b>Email:</b> {cliente.email} - <b>Endereço:</b> {cliente.endereco}
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="TextRight">
                  <Button id="cliente-excluir" variant="danger"onClick={() => { excluirCliente(cliente.id) }}>Excluir Cliente</Button>{' '}
                  <Button id="cliente" onClick={() => { editarCliente(cliente.id) }}>Editar Cliente</Button>
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

export default ClienteLista;