import { MDBInput, MDBTooltip } from 'mdb-react-ui-kit';
import InstituicoesTable from '../components/InstituicoesTable';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from 'formik';
import useInstituicoes from '../context/InstituicoesContext';

const Instituicoes = () => {
  let {
    setPropriedades,
    instituicoesInitialValues,
    instituicoesSchema,
    show,
    handleShow,
    setShow
  } = useInstituicoes();

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

  const handleSubmit = async (values, actions) => {
    try {
      await instituicoesSchema.validate(values, { abortEarly: false });
  
      const response = await fetch("http://localhost:3000/instituicoes", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        const newInstituicao = await response.json();
  
        setPropriedades((prev) => [...prev, { ...values, id: newInstituicao.id }]); 
        setShow(false);
        showSuccessToast("Instituição adicionada com sucesso!");
      } else {
        showErrorToast("Erro ao adicionar instituição!");
      }
    } catch (err) {
      err.inner.forEach((e) => showErrorToast(e.message));
    }
  
    actions.setSubmitting(false);
  };
  
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Tem certeza que deseja excluir esta instituição?");
    if (!isConfirmed) return;
  
    fetch(`http://localhost:3000/instituicoes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setPropriedades((prev) => prev.filter((item) => item.id !== id));
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
              title="Adicionar Instituições"
            >
              <Button onClick={handleShow} variant="success">+</Button>
            </MDBTooltip>
          </Col>
        </Row>
      </div>

      <InstituicoesTable
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
        <Formik
          initialValues={instituicoesInitialValues}
          validationSchema={instituicoesSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => {
            return (
        <Form onSubmit={handleSubmit}>
        <Modal.Body>
  <Form.Group className="mb-3">
    <Form.Label>Região</Form.Label>
    <Form.Control
      type="text"
      placeholder="Ex: Nordeste"
      id="região"
      name="região"
      value={values.região}
      onChange={handleChange}
    />
     {errors.região && touched.região ? (
        <div className="text-danger">{errors.região}</div>
      ) : null}
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>UF</Form.Label>
    <Form.Control
      type="text"
      placeholder="Ex: PB"
      id="UF"
      name="UF"
      value={values.UF}
      onChange={handleChange}
    />
     {errors.UF && touched.UF ? (
        <div className="text-danger">{errors.UF}</div>
      ) : null}
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Município</Form.Label>
    <Form.Control
      type="text"
      placeholder="Ex: Araruna"
      id="município"
      name="município"
      value={values.município}
      onChange={handleChange}
    />
     {errors.município && touched.município ? (
        <div className="text-danger">{errors.município}</div>
      ) : null}
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Mesoregião</Form.Label>
    <Form.Control
      type="text"
      id="mesoregião"
      name="mesoregião"
      value={values.mesoregião}
      onChange={handleChange}
    />
     {errors.mesoregião && touched.mesoregião ? (
        <div className="text-danger">{errors.mesoregião}</div>
      ) : null}
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Microregião</Form.Label>
    <Form.Control
      type="text"
      id="microregião"
      name="microregião"
      value={values.microregião}
      onChange={handleChange}
    />
     {errors.microregião && touched.microregião ? (
        <div className="text-danger">{errors.microregião}</div>
      ) : null}
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Entidade</Form.Label>
    <Form.Control
      type="text"
      placeholder="Ex: EMEF JOAO ALVES"
      id="entidade"
      name="entidade"
      value={values.entidade}
      onChange={handleChange}
    />
     {errors.entidade && touched.entidade ? (
        <div className="text-danger">{errors.entidade}</div>
      ) : null}
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Matrículas</Form.Label>
    <Form.Control
      type="text"
      placeholder="Ex: 779"
      id="matrículas"
      name="matrículas"
      value={values.matrículas}
      onChange={handleChange}
    />
     {errors.matrículas && touched.matrículas ? (
        <div className="text-danger">{errors.matrículas}</div>
      ) : null}
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
            );
          }}
          </Formik>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Instituicoes;
