import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import store from '../../img/store.png';
import api from "../../services/api";
import { MultiSelect } from "react-multi-select-component";

function PedidoNovo(props) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  useEffect(() => {
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
    axios({
      method: 'get',
      url: 'http://localhost:8080/produto/lista',
    }).then((response) => {
      let produtosDesorganizados = response.data;
      let produtoOrganizados = [...produtosDesorganizados].map(e => ({label:e.nome,value:e.id}))
      setProdutos(produtoOrganizados);
      setSubmitted(false);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setSubmitted(false);
      setProdutos([]);
    });
  }, []);

  const handleSubmit = (event) => {
    setSubmitted(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setSubmitted(false);
      setValidated(true);
    } else {
      const formData = new FormData(event.target),
        formDataObj = Object.fromEntries(formData.entries())

      console.log(formDataObj.produto);
      setValidated(true);

      api.post(
        "/pedido/new",
        JSON.stringify({
          cliente: formDataObj.cliente,
          produtos: produtosSelecionados,
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then((response) => {
        toast.success('Pedido criado com sucesso!');
        setSubmitted(false);
        event.target.reset();
        setProdutosSelecionados([]);
      }).catch((error) => {
        setSubmitted(false);
        toast.error(error.response.data.message);
      });
    }
  };

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
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Card>
          <Card.Header className="TextLeft">Pedido Novo</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group controlId="form.cliente">
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
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="form.produto">
                  <InputGroup className='TextLeft'>
                    <label>
                      Produtos
                      <MultiSelect
                        options={produtos}
                        value={produtosSelecionados}
                        onChange={setProdutosSelecionados}
                      />
                      <br />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col className='TextRight'>
                <Button variant="success" id="buscar" type="submit" disabled={submitted}>Salvar</Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Form>
      <Toaster />
    </div>
  );
};

export default PedidoNovo;
