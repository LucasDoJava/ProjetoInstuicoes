import { Button, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InstituicoesCard = ({ imagem, nome, descricao }) => {
  const detalharHandleClick = (event) => {
  };

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imagem} />
        <Card.Body>
          <Card.Title>{nome}</Card.Title>
          <Card.Text>{descricao}</Card.Text>
          <Button onClick={detalharHandleClick} variant="success">
            Ver mais...
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

InstituicoesCard.propTypes = {
  imagem: PropTypes.string,
  nome: PropTypes.string,
  descricao: PropTypes.string,
};

export default InstituicoesCard;
