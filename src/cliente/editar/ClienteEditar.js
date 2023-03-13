import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import store from '../../img/store.png';
import api from "../../services/api";

function ClienteEditar(props) {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/cliente/'+props.clienteId,
    }).then((response) => {
      setNome(response.data[0].nome);
      setEmail(response.data[0].email);
      setCpf(response.data[0].cpf);
      setEndereco(response.data[0].endereco);
      setTelefone(response.data[0].telefone);
    }).catch((error) => {
      toast.error(error.response.data.message);
      setNome('');
      setEmail('');
      setCpf('');
      setEndereco('');
      setTelefone('');
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
        "/cliente/"+props.clienteId+"/editar",
        JSON.stringify({
          nome: formDataObj.nome,
          email: formDataObj.email,
          cpf: formDataObj.cpf,
          endereco: formDataObj.endereco,
          telefone: formDataObj.telefone
        }),
        {
          headers: {
          'Content-Type': 'application/json'
          }
        }
      ).then((response) => {
        toast.success('Cliente atualizado com sucesso!');
        setSubmitted(false);
      }).catch((error) => {
        setSubmitted(false);
        toast.error(error.response.data.message);
      });
    }

  };

  const homeAction = () => {
    props.setClienteId(null);
    navigate("/");
  }

  const clientesAction = () => {
    props.setClienteId(null);
    navigate("/cliente/lista");
  }

  const ProdutosAction = () => {
    props.setClienteId(null);
    navigate("/produto/lista");
  }

  const PedidosAction = () => {
    props.setClienteId(null);
    navigate("/pedido/lista");
  }

  return (
    <div className="ClienteEditar" style={{
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
          <Card.Header className="TextLeft">Editar Cliente - {props.clienteId}</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group controlId="form.nome">
                  <InputGroup className='TextLeft'>
                    <label>
                      Nome
                      <Form.Control type="text" name="nome" onChange={(event) => setNome(event?.target.value)} value={nome} required />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.email">
                  <InputGroup className='TextLeft'>
                    <label>
                      Email
                      <Form.Control type="text" name="email" onChange={(event) => setEmail(event?.target.value)} value={email} required />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.cpf">
                  <InputGroup className='TextLeft'>
                    <label>
                      CPF
                      <Form.Control type="text" name="cpf" maxLength={11} onChange={(event) => setCpf(event?.target.value)} value={cpf} required />
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
                      <Form.Control type="text" name="endereco" onChange={(event) => setEndereco(event?.target.value)} value={endereco} required />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.telefone">
                  <InputGroup className='TextLeft'>
                    <label>
                      Telefone
                      <Form.Control type="text" name="telefone" maxLength={11} onChange={(event) => setTelefone(event?.target.value)} value={telefone} required />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col className='TextRight'>
                <Button id="buscar" type="submit" disabled={submitted}>Salvar</Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Form>
      <br></br>
      <Toaster />
    </div>
  );
};

export default ClienteEditar;
