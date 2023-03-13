import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import store from '../../img/store.png';
import api from '../../services/api';

function PedidoLista(props) {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [filtro, setFiltro] = useState([]);

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
    axios({
      method: 'get',
      url: 'http://localhost:8080/cliente/lista',
    }).then((response) => {
      setClientes(response.data);
      setSubmitted(false);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setSubmitted(false);
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
      url: 'http://localhost:8080/pedido/lista',
      params: {
        cliente: filtro.cliente,
        valor: filtro.valor,
        status: filtro.status,
        ordercampo: filtro.ordercampo,
        ordertipo: filtro.ordertipo,
      },
    }).then((response) => {
      setPedidos(response.data);
      setSubmitted(false);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setSubmitted(false);
      setPedidos([]);
    });
  }

  const editarPedido = (pedidoId) => {
    props.setPedidoId(pedidoId);
    navigate("/pedido/editar");
  };

  const excluirPedido = (pedidoId) => {
    api.post(
      "/pedido/" + pedidoId + "/remover",
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      toast.success('Pedido excluido com sucesso!');
      buscar();
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const aprovarPedido = (pedidoId) => {
    api.post(
      "/pedido/" + pedidoId + "/aprovar",
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      toast.success('Pedido Aprovado com sucesso!');
      buscar();
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const CancelarPedido = (pedidoId) => {
    api.post(
      "/pedido/" + pedidoId + "/cancelar",
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      toast.success('Pedido Cancelado com sucesso!');
      buscar();
    }).catch((error) => {
      toast.error(error.response.data.message);
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
                      <Form.Select name="cliente">
                        <option value=''></option>
                        {clientes.map(
                          (cliente, i) => (
                            <option value={cliente.id}>{cliente.nome}</option>
                          )
                        )}
                      </Form.Select><br />
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
                        <Form.Control type="number" name="valor" />
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
            <Row>
              <Col>
                <Form.Group controlId="form.endereco">
                  <InputGroup className='TextLeft'>
                    <label>
                      Ordenar por
                      <Form.Select name="ordercampo">
                        <option value=''></option>
                        <option value="cliente">Cliente</option>
                        <option value="status">Status</option>
                        <option value="valorpedido">Valor do Pedido</option>
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
        <Card.Header className="TextLeft">Pedido - Lista</Card.Header>
        <Card.Body>
          <Row>
            <Col className='TextRight'>
              <Button variant="secondary" id="pedidos" onClick={() => navigate("/pedido/novo")}>Novo Pedido</Button>
            </Col>
          </Row><br></br>
          {pedidos.map(
            (pedido, i) => (
              <Card className="mb-4">
                <Card.Header>
                  <Card.Title className="TextLeft"><b>Pedido -</b> {pedido.id} </Card.Title>
                </Card.Header>
                <Card.Body>
                  {/* {pedido.produtos} */}
                  <Row>
                    <Col>
                      <b>Cliente:</b> {pedido.clienteNome} - <b>Data:</b> {pedido.datapedido} - <b>Valor:</b> {pedido.valorpedido},00 - <b>Status:</b> {pedido.status}
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="TextRight">
                  <Button id="pedido-excluir" variant="danger" onClick={() => { excluirPedido(pedido.id) }} disabled={pedido.status == 'APROVADO' || pedido.status == 'CANCELADO'}>Excluir Pedido</Button>{' '}
                  <Button id="pedido-aprovar" variant="warning" onClick={() => { aprovarPedido(pedido.id) }} disabled={pedido.status == 'APROVADO' || pedido.status == 'CANCELADO'}>Aprovar Pedido</Button>{' '}
                  <Button id="pedido-cancelar" variant="warning" onClick={() => { CancelarPedido(pedido.id) }} disabled={pedido.status == 'CANCELADO'}>Cancelar Pedido</Button>{' '}
                  <Button id="pedido" onClick={() => { editarPedido(pedido.id) }}>Editar Pedido</Button>
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

export default PedidoLista;