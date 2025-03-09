import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PropriedadesTable = ({ propriedades, setPropriedades, onDelete}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [propriedadesPerPage] = useState(10); // Número de propriedades por página
  const [paginatedPropriedades, setPaginatedPropriedades] = useState([]);

  // Função para buscar as propriedades
  const getPropriedades = () => {
    fetch('http://localhost:3000/instituicoes')
      .then((response) => response.json())
      .then((data) => {
        setPropriedades([...data]);
      })
      .catch((error) => {
        console.log('Deu erro!');
      });
  };

  useEffect(() => {
    getPropriedades();
  }, []);

  useEffect(() => {
    // Atualiza as propriedades paginadas sempre que as propriedades ou a página atual mudarem
    const indexOfLast = currentPage * propriedadesPerPage;
    const indexOfFirst = indexOfLast - propriedadesPerPage;
    const currentPropriedades = propriedades.slice(indexOfFirst, indexOfLast);
    setPaginatedPropriedades(currentPropriedades);
  }, [propriedades, currentPage]);

  // Atualiza a página atual se as propriedades mudarem
  useEffect(() => {
    setCurrentPage(1); // Sempre começa na página 1
  }, [propriedades]);

  const totalPages = Math.ceil(propriedades.length / propriedadesPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Geração de páginas para o componente Pagination
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <MDBTable hover>
        <MDBTableHead>
          <tr>
            <th scope="col">Região</th>
            <th scope="col">UF</th>
            <th scope="col">Município</th>
            <th scope="col">Mesoregião</th>
            <th scope="col">Microregião</th>
            <th scope="col">Entidade</th>
            <th scope="col">Mátriculas</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {paginatedPropriedades.map((propriedade, i) => (
            <tr key={i}>
              <td>{propriedade.região}</td>
              <td>{propriedade.UF}</td>
              <td>{propriedade.município}</td>
              <td>{propriedade.mesoregião}</td>
              <td>{propriedade.microregião}</td>
              <td>{propriedade.entidade}</td>
              <td>{propriedade.matrículas}</td>
              <td>
              <MDBBtn floating tag="a" className="mx-2" color="primary" onClick={() => onEdit(propriedade)}>
                <MDBIcon fas icon="pen" />
              </MDBBtn>
                <MDBBtn floating tag="a" className="mx-2" color="danger" onClick={() => onDelete(propriedade.id)}>
<MDBIcon fas icon="trash-alt" />
</MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <Pagination>
        <Pagination.First onClick={() => handlePagination(1)} />
        <Pagination.Prev
          onClick={() => handlePagination(Math.max(currentPage - 1, 1))}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => handlePagination(Math.min(currentPage + 1, totalPages))}
        />
        <Pagination.Last onClick={() => handlePagination(totalPages)} />
      </Pagination>
    </>
  );
};

export default PropriedadesTable;
