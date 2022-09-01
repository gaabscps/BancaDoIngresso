/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Container } from 'reactstrap';

// TABLE
import { CustomTable, CollumnStatus, CollumnImage, TableColumn } from '../components/Utils/Table';

// ICON
import { ReactComponent as SvgExample } from '../assets/images/svg/SvgExample.svg';
import { ReactComponent as Pen } from '../assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '../assets/images/svg/lixeira.svg';
import { ReactComponent as Ticket } from '../assets/images/svg/ticket.svg';

// MOCK
import { mockData } from '../components/Utils/Table/mock';
// import PaginationCustom from '../components/Utils/Pagination';

interface DataRow {
  image: string;
  pdvName: string;
  address: string;
  city: string;
  state: string;
  actions: string;
  status: string;
}

const ExampleTables = (): JSX.Element => {
  // Table with status color
  const columnsPrimaryStatusColor: TableColumn<DataRow>[] = [
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
      width: '200px',
    },
  ];
  const dataPrimaryStatusColor = mockData.map(item => ({
    id: item.id,
    pdvName: <CollumnStatus statusColor={item.status}>{item.pdvName}</CollumnStatus>,
    address: item.address,
    city: item.city,
    state: item.state,
    actions: (
      <div>
        <Pen className="mr-4 svg-icon" />
        <Trash className="mr-4 svg-icon" />
        <Ticket className="mr-4 svg-icon" />
      </div>
    ),
  }));
  // Table with status color

  // Table with status color AND image
  const columnsPrimaryImageStatus: TableColumn<DataRow>[] = [
    {
      name: 'Imagem',
      selector: row => row.image,
      width: '100px',
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
  const dataPrimaryImageStatus = mockData.map(item => ({
    id: item.id,
    // image: <CollumnImage srcImage={item.image} />,
    image: (
      <CollumnStatus statusColor={item.status} justify="right">
        <CollumnImage srcImage={item.image} />
      </CollumnStatus>
    ),
    pdvName: item.pdvName,
    address: item.address,
    city: item.city,
    state: item.state,
    actions: <SvgExample className="mr-2 svg-icon" />,
  }));
  // Table with status color AND image

  // Table with image
  const columnsPrimaryImage: TableColumn<DataRow>[] = [
    {
      name: 'Imagem',
      selector: row => row.image,
      width: '100px',
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
  const dataPrimaryImage = mockData.map(item => ({
    id: item.id,
    image: <CollumnImage srcImage={item.image} />,
    pdvName: item.pdvName,
    address: item.address,
    city: item.city,
    state: item.state,
    actions: <SvgExample className="mr-2 svg-icon" />,
  }));
  // Table with image

  // Table Secudary Style
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
  // Table Secudary Style

  return (
    <Container>
      <div className="pt-5 pb-5">
        <h3>Tables</h3>
        <br />
        {/* Table with status color */}
        <h5>Tabele principal - Cor status</h5>
        <CustomTable
          columns={columnsPrimaryStatusColor}
          data={dataPrimaryStatusColor}
          theme="primary"
        />
        {/* Table with status color */}
        <hr />
        {/* Table with status color AND image */}
        <h5>Tabele principal - Cor status e imagem</h5>
        <CustomTable
          columns={columnsPrimaryImageStatus}
          data={dataPrimaryImageStatus}
          theme="primary"
        />
        {/* Table with status color AND image */}
        <hr />
        {/* Table with image */}
        <h5>Tabele principal - Imagem</h5>
        <CustomTable columns={columnsPrimaryImage} data={dataPrimaryImage} theme="primary" />
        {/* Table with image */}
        <hr />
        {/* Table Secudary Style */}
        <h5>Table Secundaria</h5>
        <CustomTable
          columns={columnsSecundary}
          data={dataSecundary}
          dense={true}
          theme="secundary"
        />
        {/* Table Secudary Style */}
      </div>
    </Container>
  );
};

export default ExampleTables;
