import { Row } from 'react-bootstrap';
import InstituicoesCard from './InstituicoesCard';
import instituicao from '../datasets/instituicao';

const InstituicaoCard = () => {
  let InstituicoessData = [...instituicao];
  return (
    <>
      <Row>
        {InstituicoessData.map(({ imagem, nome, descricao }, indice) => {
          return (
            <InstituicoesCard
              key={indice}
              imagem={imagem}
              nome={nome}
              descricao={descricao}
            />
          );
        })}
      </Row>
    </>
  );
};

export default InstituicaoCard;
