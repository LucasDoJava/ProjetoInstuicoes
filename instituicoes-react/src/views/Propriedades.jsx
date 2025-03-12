import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import PropriedadesTable from '../components/PropriedadesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

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


  let instituicoesSchema = yup.object().shape({
    região: yup.string().required('Região é obrigatória'),
    UF: yup.string().required('UF é obrigatória'),
    município: yup.string().required('Município é obrigatório'),
    microregião: yup.string().required('Microregião é obrigatória'),
    entidade: yup.string().required('Entidade é obrigatória'),
    matrículas: yup.number().required().positive('Deve ser positivo').integer('Deve ser inteiro')
  });

  const showSuccessToast = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const showErrorToast = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const handleChange = (event) => {
    let name = event.target.name;
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await instituicoesSchema.validate(inputs, { abortEarly: false });

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
            setPropriedades([...propriedades, inputs]);
            setShow(false);
            showSuccessToast('Instituição adicionada com sucesso!');
          } else {
            showErrorToast('Erro ao adicionar instituição!');
          }
        })
        .catch(() => {
          showErrorToast('Erro de conexão com o servidor!');
        });
    } catch (err) {
      err.inner.forEach((e) => showErrorToast(e.message));
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/instituicoes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setPropriedades(propriedades.filter((item) => item.id !== id));
          showSuccessToast("Instituição removida com sucesso!");
        } else {
          showErrorToast("Erro ao excluir instituição!");
        }
      })
      .catch(() => showErrorToast("Erro de conexão ao excluir."));
  };
  return (
    <>

      <div>Instituições</div>

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
              <Button onClick={handleShow} variant="success">+</Button>
            </MDBTooltip>
          </Col>
        </Row>
      </div>

      <PropriedadesTable
        propriedades={propriedades}
        setPropriedades={setPropriedades}
        onDelete={handleDelete}
      />

      <Modal
        show={show}
        onHide={() => setShow(false)}
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
            <Button variant="danger" onClick={() => setShow(false)}> {}
              Fechar
            </Button>
            <Button variant="success" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Propriedades;
