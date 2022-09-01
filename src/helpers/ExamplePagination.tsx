/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import { Container } from 'reactstrap';

// PAGINATION
import NewPagination from '../components/Utils/Pagination';

// TABLE
import { CustomTable, TableColumn } from '../components/Utils/Table';

interface DataRowPagination {
  id: number;
  country: string;
  established: string;
  head_quaters: string;
  logo: string;
  name: string;
  slogan: string;
  website: string;
}

interface DataRowMock {
  id: number;
  airline: DataRowPagination[];
}

const ExamplePagination = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [dataMock, setDataMock] = useState([]);
  const totalPages = 5;

  async function handleFetch(pageNumber: number) {
    // GET instantwebtools to mock pagination
    // **** IMPORTANTE: A LOGÍCA E REQUISIÇÃO DEVEM SER SEPARADAS DO UI **********
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=4`,
    );
    const data = await response.json();
    // **** IMPORTANTE: A LOGÍCA E CHAMADAS API DEVEM SER SEPARADAS DO UI **********
    setTotalCount(data.totalPassengers);
    const dataCollumn = data.data.map((item: DataRowMock) => ({
      id: item.id,
      country: item.airline[0].country,
      established: item.airline[0].established,
      slogan: item.airline[0].slogan,
      website: item.airline[0].website,
    }));

    // Seta os dados da tabela
    setDataMock(dataCollumn);
    setTotalCount(50);
  }

  React.useEffect(() => {
    handleFetch(page);
  }, []);

  async function handlePaginationChange(pageNumber: number) {
    // setLoading(true); // Aqui você pode colocar um loading
    setPage(pageNumber);
    await handleFetch(pageNumber);
    // setLoading(false); // Aqui você pode colocar um loading
  }

  // Define as colunas da tabela
  const columnsPrimaryPagination: TableColumn<DataRowPagination>[] = [
    {
      name: 'Nome',
      selector: row => row.country,
    },
    {
      name: 'Endereço',
      selector: row => row.established,
    },
    {
      name: 'Cidade',
      selector: row => row.slogan,
    },
    {
      name: 'Estado',
      selector: row => row.website,
    },
  ];

  return (
    <Container>
      <div className="pt-5 pb-5">
        <h3>Pagination</h3>
        <br />
        {/* Table with status color */}
        <h5>Tabele com Paginação</h5>
        {dataMock && (
          <CustomTable columns={columnsPrimaryPagination} data={dataMock} theme="primary" />
        )}
        <NewPagination
          currentPage={page}
          totalCount={totalCount}
          pageSize={totalPages}
          onPageChange={pagee => handlePaginationChange(pagee)}
        />
      </div>
    </Container>
  );
};

export default ExamplePagination;
