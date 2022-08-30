import React from 'react';
import { Container } from 'reactstrap';
import DataTable from 'react-data-table-component';

import { ReactComponent as SvgExample } from '../assets/images/svg/SvgExample.svg';

const customStyles = {
  rows: {
    style: {
      minHeight: '5.188rem !important',
      border: 'none !important',
      borderRadius: '10px',
      backgroundColor: '#FFF',
      marginBottom: '30px',
      fontSize: '0.75rem',
      fontWidth: '300',
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
  table: {
    style: {
      backgroundColor: 'transparent',
    },
  },
  headRow: {
    style: {
      border: 'none !important',
      backgroundColor: 'transparent',
      fontSize: '1rem',
      fontWidth: '400',
    },
  },
};

const mockData = [
  {
    id: 1,
    pdvName: 'Example 1',
    image: 'https://picsum.photos/200/300',
    address: 'Rua exemplo 1',
    city: 'São Paulo',
    state: 'SP',
    actions: [],
  },
  {
    id: 2,
    pdvName: 'Example 2',
    image: 'https://picsum.photos/200/400',
    address: 'Rua exemplo 2',
    city: 'Uberlândia',
    state: 'MG',
    actions: [],
  },
  {
    id: 3,
    pdvName: 'Example 3',
    image: 'https://picsum.photos/200/500',
    address: 'Rua exemplo 3',
    city: 'Distrito Federal',
    state: 'DF',
    actions: [],
  },
];

const ExampleTables = (): JSX.Element => {
  const columns = [
    {
      name: 'Imagem',
      selector: (row: any) => row.image,
      style: {
        paddingLeft: '0px',
        with: '10vw',
      },
    },
    {
      name: 'Nome do PDV',
      selector: (row: any) => row.pdvName,
    },
    {
      name: 'Endereço',
      selector: (row: any) => row.address,
    },
    {
      name: 'Cidade',
      selector: (row: any) => row.city,
    },
    {
      name: 'Estado',
      selector: (row: any) => row.state,
    },
    {
      name: 'Ações',
      selector: (row: any) => row.actions,
    },
  ];

  const data = mockData.map(item => ({
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

  return (
    <Container>
      <div className="pt-5">
        <h3>Tables</h3>
        <br />
        <br />
        <label htmlFor="ExemploIcon">Exemplo 1</label>
        {/* Table 1 */}
        <DataTable
          columns={columns}
          data={data}
          dense={true}
          customStyles={customStyles}
          style={{ backgroundColor: '#E5E5E5' }}
        />
      </div>
    </Container>
  );
};

export default ExampleTables;
