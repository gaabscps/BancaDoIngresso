import React from 'react';
import { Container } from 'reactstrap';

// TABLE
import { TableColumn } from 'react-data-table-component';
import CustomTable from '../components/Utils/Table';

// ICON
import { ReactComponent as SvgExample } from '../assets/images/svg/SvgExample.svg';

// MOCK
import { mockData } from '../components/Utils/Table/mock';

interface DataRow {
  image: string;
  pdvName: string;
  address: string;
  city: string;
  state: string;
  actions: string;
}

const ExampleTables = (): JSX.Element => {
  const columnsPrimary: TableColumn<DataRow>[] = [
    {
      name: 'Imagem',
      selector: row => row.image,
      style: {
        paddingLeft: '0px',
        with: '10vw',
      },
    },
    {
      name: 'Nome do PDV',
      selector: row => row.pdvName,
    },
    {
      name: 'Endereço',
      selector: row => row.address,
    },
    {
      name: 'Cidade',
      selector: row => row.city,
    },
    {
      name: 'Estado',
      selector: row => row.state,
    },
    {
      name: 'Ações',
      selector: row => row.actions,
    },
  ];

  const dataPrimary = mockData.map(item => ({
    id: item.id,
    image: (
      <div style={{ maxHeight: '5.188rem', padding: 0 }}>
        <img
          style={{
            height: '5.188rem',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            width: '11vw',
          }}
          src={item.image}
        />
      </div>
    ),
    pdvName: item.pdvName,
    address: item.address,
    city: item.city,
    state: item.state,
    actions: <SvgExample className="mr-2 svg-icon" />,
  }));

  const columnsSecundary: TableColumn<DataRow>[] = [
    {
      name: 'Nome do PDV',
      selector: row => row.pdvName,
    },
    {
      name: 'Endereço',
      selector: row => row.address,
    },
    {
      name: 'Estado',
      selector: row => row.state,
    },
    {
      name: 'Ações',
      selector: row => row.actions,
    },
  ];

  const dataSecundary = mockData.map(item => ({
    id: item.id,
    pdvName: item.pdvName,
    address: item.address,
    state: item.state,
    actions: <SvgExample className="mr-2 svg-icon" />,
  }));

  return (
    <Container>
      <div className="pt-5">
        <h3>Tables</h3>
        <br />
        <br />
        {/* Table 1 */}
        <label>Table Primary</label>
        <CustomTable columns={columnsPrimary} data={dataPrimary} theme="primary" />
        {/* Table 2 */}
        <label>Table Secundary</label>
        <CustomTable
          columns={columnsSecundary}
          data={dataSecundary}
          dense={true}
          theme="secundary"
        />
      </div>
    </Container>
  );
};

export default ExampleTables;
