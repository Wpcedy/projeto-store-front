import { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import store from '../../img/store.png';
import api from "../../services/api";

function ClienteNovo(props) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        "/cliente/new",
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
        toast.success('Cliente criado com sucesso!');
        setSubmitted(false);
        event.target.reset();
      }).catch((error) => {
        setSubmitted(false);
        toast.error(error.response.data.message);
      });
    }
  };

  return (
    <div className="ClienteNovo" style={{
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
          <Card.Header className="TextLeft">Novo Cliente</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Form.Group controlId="form.nome">
                  <InputGroup className='TextLeft'>
                    <label>
                      Nome
                      <Form.Control type="text" name="nome" required />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.email">
                  <InputGroup className='TextLeft'>
                    <label>
                      Email
                      <Form.Control type="text" name="email" required />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.cpf">
                  <InputGroup className='TextLeft'>
                    <label>
                      CPF
                      <Form.Control type="text" name="cpf" maxLength={11} required />
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
                      <Form.Control type="text" name="endereco" required />
                    </label>
                  </InputGroup><br />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.telefone">
                  <InputGroup className='TextLeft'>
                    <label>
                      Telefone
                      <Form.Control type="text" name="telefone" maxLength={11} required />
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

export default ClienteNovo;