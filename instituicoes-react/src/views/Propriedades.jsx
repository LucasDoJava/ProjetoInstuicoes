import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import PropriedadesTable from '../components/PropriedadesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';

const Propriedades = () => {
  let [propriedades, setPropriedades] = useState([]);

  let [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  let [inputs, setInputs] = useState({
    região: '',
    UF: '',
    município: '',
    mesoregião: '',
    microregião: '',
    entidade: '',
    matrículas: ''
  });

  const handleChange = (event) => {
    let name = event.target.name;
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/instituicoes', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => {
        if (response.ok) {
          //Adicionar na lista.
          setPropriedades([...propriedades, inputs]);
          //Fechar o modal.
          setShow(!show);
        }
      })
      .catch((error) => {});
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/instituicoes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Atualiza a lista removendo o item excluído
          setPropriedades(propriedades.filter((item) => item.id !== id));
        }
      })
      .catch((error) => console.error("Erro ao excluir:", error));
  };

  return (
    <>
      <div>Instuições</div>

      <div>
        <Row>
          <Col>
            <MDBInput label="Buscar" id="formControlSm" type="text" size="sm" />
          </Col>
          <Col>
            <MDBTooltip
              tag="span"
              wrapperClass="d-inline-block"
              title="Adicionar Propriedade"
            >
              <Button onClick={handleShow} variant= "success">+</Button>
            </MDBTooltip>
          </Col>
        </Row>
      </div>

      
      <PropriedadesTable
        propriedades={propriedades}
        setPropriedades={setPropriedades}
        onDelete={handleDelete}
      ></PropriedadesTable>

      <Modal
        show={show}
        onHide={handleShow}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Cadastrar</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Nordeste"
                id="região"
                name="região"
                value={inputs.região}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>UF</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: PB"
                id="UF"
                name="UF"
                value={inputs.UF}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Araruna"
                id="município"
                name="município"
                value={inputs.município}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mesoregião</Form.Label>
              <Form.Control
                type="text"
                id="mesoregião"
                name="mesoregião"
                value={inputs.mesoregião}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Microregião</Form.Label>
              <Form.Control
                type="text"
                id="microregião"
                name="microregião"
                value={inputs.microregião}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Entidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: EMEF JOAO ALVES"
                id="entidade"
                name="entidade"
                value={inputs.entidade}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Matrículas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: 779"
                id="matrículas"
                name="matrículas"
                value={inputs.matrículas}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleShow} >
              Fechar
            </Button>
            <Button variant="success" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Propriedades;
