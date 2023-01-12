import FilterVector from '@/assets/images/svg/FilterVector';
import PDVIcon from '@/assets/images/svg/Pdv';
import { DataList } from '@/components/DataList';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { CustomTable } from '@/components/Table';
import { colors } from '@/styles/colors';
import React from 'react';
import { ArrowLeft, X } from 'react-feather';
import { Link } from 'react-router-dom';
import { Card, Container } from 'reactstrap';

export const ReportsContent: React.FC = () => {
  console.log('Reports Content');
  const [reportContent, setReportContent] = React.useState('');

  const reports = [
    {
      title: 'Vendas gerais',
    },
    {
      title: 'Vendas por data',
    },
    {
      title: 'Vendas por PDV',
    },
    {
      title: 'Vendas por SubPDV',
    },
  ];

  return (
    <>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle d-flex">
            <Link to={`${process.env.PUBLIC_URL}/dashboard/event`}>
              <ArrowLeft color={colors.black} className="arrow-left" />
            </Link>
            <h5 className="ml-3 mb-0 mt-2 pageTitle">Revoada do Tatu - 01/04/2022</h5>
          </div>
          <div className="button-filter-container">
            <div className="filter-container">
              <div className="filter-content" onClick={() => undefined}>
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <div
          className="mb-5"
          style={{
            background: 'rgba(130, 130, 130, 0.1)',
            borderRadius: '20px',
            padding: '3px 20px',
            width: 'fit-content',
          }}
        >
          <span style={{ color: '#828282' }}>De: 10/05/2022, Até: 12/05/2022</span>
          <X size={12} className="ml-2" style={{ color: '#828282' }} />
        </div>
        <div
          className="mb-4"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
            gridColumnGap: '40px',
            overflow: 'auto',
            alignItems: 'end',
          }}
        >
          <img
            width={120}
            height={80}
            style={{ borderRadius: '10px' }}
            src="https://picsum.photos/200/300"
            alt="random"
          />
          <DataList
            data={[
              {
                title: 'Local:',
                content: 'Rio Claro',
              },
              {
                title: 'Venda',
                content: '500',
              },
              {
                title: 'Cortesia',
                content: '500',
              },
              {
                title: 'Total de vendas:',
                content: '1.000',
              },
              {
                title: 'Arrecadação:',
                content: 'R$ 200.000,00',
              },
              {
                title: 'Ticket médio:',
                content: 'R$ 60,00',
              },
            ]}
          />
        </div>
        <SuperCollapse
          title="Eventos filhos"
          content={
            <CustomTable
              numberRowsPerPage={0}
              progressPending={false}
              theme="secondaryWithoutBorder"
              columns={[
                {
                  name: '',
                  selector: row => row.image,
                  width: '120px',
                },
                {
                  name: 'Nome do evento',
                  selector: row => row.name,
                },
                {
                  name: 'Venda',
                  selector: row => row.venda,
                },
                {
                  name: 'Cortesia',
                  selector: row => row.cortesia,
                },
                {
                  name: 'Total de vendas',
                  selector: row => row.totalVendas,
                },
                {
                  name: 'Arrecadação',
                  selector: row => row.arrecadacao,
                },
                {
                  name: 'Ticket médio',
                  selector: row => row.ticketMedio,
                },
              ]}
              data={[
                {
                  image: (
                    <img
                      width={80}
                      height={60}
                      style={{ borderRadius: '2.06278px' }}
                      src="https://picsum.photos/200/300"
                      alt="random"
                    />
                  ),
                  name: 'Revoada do Tatu',
                  venda: '500',
                  cortesia: '500',
                  totalVendas: '1.000',
                  arrecadacao: 'R$ 200.000,00',
                  ticketMedio: 'R$ 60,00',
                },
              ]}
            />
          }
          leftIcon={PDVIcon}
        />
        <hr />
        <div
          className="mb-5 mt-5"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gridColumnGap: '38px',
            gridRowGap: '30px',
          }}
        >
          {reports.map((report, index) => (
            <Card
              key={index}
              style={{
                backgroundColor: report.title === reportContent ? '#3CAFC8' : '#FFFFFF',
                color: report.title === reportContent ? '#FFFFFF' : '#000000',
                minWidth: '182px',
                width: 'fit-content',
                alignItems: 'center',
                padding: '26px 30px',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setReportContent(report.title)}
            >
              {report.title}
            </Card>
          ))}
        </div>
        <hr />
        {reportContent === 'Vendas gerais' && <div className="pageTitle">Vendas gerais</div>}
        {reportContent === 'Vendas por data' && <div className="pageTitle">Vendas por data</div>}
        {reportContent === 'Vendas por PDV' && <div className="pageTitle">Vendas por PDVs</div>}
      </Container>
    </>
  );
};
