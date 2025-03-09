import Carousel from 'react-bootstrap/Carousel';
import carro from '../datasets/carrossel';

function Carrossel() {
  return (
    <Carousel>
      {carro.map(({ imagem }, indice) => (
        <Carousel.Item key={indice}>
          <img className="d-block w-100" src={imagem} alt={`Slide ${indice + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrossel;
