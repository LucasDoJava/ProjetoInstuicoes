import { Container} from 'react-bootstrap';
import PropriedadesCard from './PropriedadesCard';
import Carrossel from './Carrossel';


const Main = () => {
  return (
    <main>
      <Container fluid className="mt-2">
      <div className="mb-4">
      <Carrossel />
      </div>
        <PropriedadesCard />
      </Container>
    </main>
  );
};

export default Main;
