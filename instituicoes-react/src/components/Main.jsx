import { Container} from 'react-bootstrap';
import InstituicaoCard from './InstituicaoCard';
import Carrossel from './Carrossel';


const Main = () => {
  return (
    <main>
      <Container fluid className="mt-2">
      <div className="mb-4">
      <Carrossel />
      </div>
        <InstituicaoCard />
      </Container>
    </main>
  );
};

export default Main;
