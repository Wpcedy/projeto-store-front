import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import store from '../../img/store.png';
import api from "../../services/api";

function PedidoEditar(props) {
  const navigate = useNavigate();
  const [pedido, setPedido] = useState('');
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    buscar();
  }, []);

  const buscar = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/pedido/' + props.pedidoId,
    }).then((response) => {
      setPedido(response.data[0]);
      setProdutos(response.data[0].produtos);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setPedido('');
    });
  }

  const homeAction = () => {
    props.setPedidoId(null);
    navigate("/");
  }

  const clientesAction = () => {
    props.setPedidoId(null);
    navigate("/cliente/lista");
  }

  const ProdutosAction = () => {
    props.setPedidoId(null);
    navigate("/produto/lista");
  }

  const PedidosAction = () => {
    props.setPedidoId(null);
    navigate("/pedido/lista");
  }

  const verCliente = (clienteId) => {
    props.setPedidoId(null);
    props.setClienteId(clienteId);
    navigate("/cliente/editar");
  }

  const verProduto = (produtoId) => {
    props.setPedidoId(null);
    props.setProdutoId(produtoId);
    navigate("/produto/editar");
  }

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
    <div className="PedidoEditar" style={{
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
              <Button id="home" onClick={() => homeAction()}>Home</Button>{' '}
              <Button id="clientes" onClick={() => clientesAction()}>Clientes</Button>{' '}
              <Button id="produtos" onClick={() => ProdutosAction()}>Produtos</Button>{' '}
              <Button id="pedidos" onClick={() => PedidosAction()}>Pedidos</Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card><br></br>
      <Card>
        <Card.Header className="TextLeft">Editar Pedido - {props.pedidoId}</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Form.Group controlId="form.nome">
                <InputGroup className='TextLeft'>
                  <label>
                    Cliente
                    <Form.Control type="text" name="nome" value={pedido.clienteNome} disabled />
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
                      <Form.Control type="text" name="valor" value={pedido.valorpedido} disabled />
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
                    <Form.Control type="text" name="status" value={pedido.status} disabled />
                  </label>
                </InputGroup><br />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="form.status">
                <InputGroup className='TextLeft'>
                  <label>
                    Produtos
                    <ul>
                      {produtos.map(
                        (produto, i) => (
                          <li>
                            <b>Nome:</b> {produto.label} - <b>Valor:</b> R${produto.price},00 - <Button id="buscar" type="button" onClick={() => { verProduto(produto.value) }}>Ver Produto</Button>{' '}
                          </li>
                        )
                      )}
                    </ul>
                  </label>
                </InputGroup><br />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col className='TextRight'>
              <Button id="buscar" type="button" onClick={() => { verCliente(pedido.cliente) }}>Ver Cliente</Button>{' '}
                  <Button id="pedido-aprovar" variant="warning" onClick={() => { aprovarPedido(props.pedidoId) }} disabled={pedido.status == 'APROVADO' || pedido.status == 'CANCELADO'}>Aprovar Pedido</Button>{' '}
                  <Button id="pedido-cancelar" variant="warning" onClick={() => { CancelarPedido(props.pedidoId) }} disabled={pedido.status == 'CANCELADO'}>Cancelar Pedido</Button>{' '}
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <Toaster />
    </div>
  );
};

export default PedidoEditar;
