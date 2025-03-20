import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import useInstituicoes from '../context/InstituicoesContext';

const InstituicoesTable = ({onDelete}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [InstituicoesPerPage] = useState(30); 
  const [paginatedInstituicoes, setPaginatedInstituicoes] = useState([]);
  let { propriedades, setPropriedades } = useInstituicoes();

  const getInstituicoes = () => {
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
    getInstituicoes();
  }, []);

  useEffect(() => {
    const indexOfLast = currentPage * InstituicoesPerPage;
    const indexOfFirst = indexOfLast - InstituicoesPerPage;
    const currentPropriedades = propriedades.slice(indexOfFirst, indexOfLast);
    setPaginatedInstituicoes(currentPropriedades);
  }, [propriedades, currentPage]);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [propriedades]);

  const totalPages = Math.ceil(propriedades.length / InstituicoesPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
          {paginatedInstituicoes.map((instituicoes, i) => (
            <tr key={i}>
              <td>{instituicoes.região}</td>
              <td>{instituicoes.UF}</td>
              <td>{instituicoes.município}</td>
              <td>{instituicoes.mesoregião}</td>
              <td>{instituicoes.microregião}</td>
              <td>{instituicoes.entidade}</td>
              <td>{instituicoes.matrículas}</td>
              <td className="d-flex align-items-center gap-3">
              <MDBBtn floating tag="a" className="mx-2" color="primary" onClick={() => onEdit(instituicoes)}>
                <MDBIcon fas icon="pen" />
              </MDBBtn>
                <MDBBtn floating tag="a" className="mx-2" color="danger" onClick={() => onDelete(instituicoes.id)}>
<MDBIcon fas icon="trash-alt" />
</MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <Pagination className="d-flex flex-wrap justify-content-center">
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

export default InstituicoesTable;
