import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import store from '../../img/store.png';
import api from "../../services/api";

function ProdutoEditar(props) {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/produto/'+props.produtoId,
    }).then((response) => {
      setNome(response.data[0].nome);
      setDescricao(response.data[0].descricao);
      setValor(response.data[0].valor);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setNome('');
      setDescricao('');
      setValor('');
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

      setValidated(true);

      api.post(
        "/produto/"+props.produtoId+"/editar",
        JSON.stringify({
          nome: formDataObj.nome,
          descricao: formDataObj.descricao,
          valor: formDataObj.valor,
        }),
        {
          headers: {
          'Content-Type': 'application/json'
          }
        }
      ).then((response) => {
        toast.success('Produto atualizado com sucesso!');
        setSubmitted(false);
      }).catch((error) => {
        setSubmitted(false);
        toast.error(error.response.data.message);
      });
    }

  };

  const homeAction = () => {
    props.setProdutoId(null);
    navigate("/");
  }

  const clientesAction = () => {
    props.setProdutoId(null);
    navigate("/cliente/lista");
  }

  const ProdutosAction = () => {
    props.setProdutoId(null);
    navigate("/produto/lista");
  }

  const PedidosAction = () => {
    props.setProdutoId(null);
    navigate("/pedido/lista");
  }

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
              <Button id="home" onClick={() => homeAction()}>Home</Button>{' '}
              <Button id="clientes" onClick={() => clientesAction()}>Clientes</Button>{' '}
              <Button id="produtos" onClick={() => ProdutosAction()}>Produtos</Button>{' '}
              <Button id="pedidos" onClick={() => PedidosAction()}>Pedidos</Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card><br></br>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Card>
          <Card.Header className="TextLeft">Editar Produto - {props.produtoId}</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group controlId="form.nome">
                  <InputGroup className='TextLeft'>
                    <label>
                      Nome
                      <Form.Control type="text" name="nome" onChange={(event) => setNome(event?.target.value)} value={nome} required/>
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.descricao">
                  <InputGroup className='TextLeft'>
                    <label>
                      Descrição
                      <Form.Control type="text" name="descricao" onChange={(event) => setDescricao(event?.target.value)} value={descricao} required/>
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
                        <Form.Control type="number" name="valor" onChange={(event) => setValor(event?.target.value)} value={valor} required/>
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

export default ProdutoEditar;
