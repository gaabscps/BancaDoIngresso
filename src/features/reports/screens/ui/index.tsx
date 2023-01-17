import FilterVector from '@/assets/images/svg/FilterVector';
import { DataList } from '@/components/DataList';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { CustomTable } from '@/components/Table';
import empty from '@/assets/images/other-images/imgvazio.svg';
import { colors } from '@/styles/colors';
import React from 'react';
import { ArrowLeft, X } from 'react-feather';
import { Link } from 'react-router-dom';

import { Card, Container } from 'reactstrap';

import { GeneralSale } from '../../components/GeneralSale';

export interface ReportsContentProps {
  event: any;
  eventChild: any;
  generalSale: any;
}

export const ReportsContent: React.FC<ReportsContentProps> = ({
  event,
  eventChild,
  generalSale,
}) => {
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

  console.log(generalSale.geographicRanking);

  return (
    <>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle d-flex">
            <Link to={`${process.env.PUBLIC_URL}/dashboard/event`}>
              <ArrowLeft color={colors.black} className="arrow-left" />
            </Link>
            <h5 className="ml-3 mb-0 mt-2 pageTitle">{event.name}</h5>
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
          <img style={{ borderRadius: '10px', transform: 'scaleY(0.8)' }} width={120} src={empty} />
          <DataList
            data={[
              {
                title: 'Local:',
                content: event.city || '-----',
              },
              {
                title: 'Venda',
                content: event.amountSale || '-----',
              },
              {
                title: 'Cortesia',
                content: event.amountCourtesy || '-----',
              },
              {
                title: 'Total de vendas:',
                content: event.totalSales || '-----',
              },
              {
                title: 'Arrecadação:',
                content: event.saleValue
                  ? `R$${String(event.saleValue && +event.saleValue.toFixed(2)).replace('.', ',')}`
                  : '-----',
              },
              {
                title: 'Ticket médio:',
                content: event.averageTicket
                  ? `R$${String(event.averageTicket && +event.averageTicket.toFixed(2)).replace(
                      '.',
                      ',',
                    )}`
                  : '-----',
              },
            ]}
          />
        </div>
        <SuperCollapse
          className={eventChild ? ' ' : 'collapse-disabled collapse-disable-text'}
          title="Eventos filhos"
          disabled={!eventChild}
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
              data={
                eventChild?.map &&
                eventChild?.map((child: any) => ({
                  image: child?.image || '---',
                  name: child?.name || '---',
                  venda: child?.amountSale || '---',
                  cortesia: child?.amountCourtesy || '---',
                  totalVendas: child?.totalSales || '---',
                  arrecadacao: `R$${
                    String(child.saleValue && +child.saleValue.toFixed(2)).replace('.', ',') ||
                    '---'
                  }}`,
                  ticketMedio: `R$${String(
                    child.averageTicket && +child.averageTicket.toFixed(2),
                  ).replace('.', ',')}`,
                }))
              }
            />
          }
          leftIcon={() => <div></div>}
        />
        <hr />
        <div className="mb-5 mt-5 report-menu-container">
          {reports.map((report, index) => (
            <Card
              key={index}
              className="report-menu-card card-no-border"
              style={{
                backgroundColor: report.title === reportContent ? '#3CAFC8' : '#FFFFFF',
                color: report.title === reportContent ? '#FFFFFF' : '#000000',
              }}
              onClick={() => setReportContent(report.title)}
            >
              {report.title}
            </Card>
          ))}
        </div>
        <hr className="mb-5" />
        {
          // switch case reportContent
        }
        {reportContent === 'Vendas gerais' && <GeneralSale generalSaleState={generalSale} />}

        {reportContent === 'Vendas por data' && (
          <>
            <h5>Vendas por data</h5>
            <div className="collapseTableText">
              <div className="d-flex">
                <div
                  style={{
                    marginLeft: '10px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  }}
                >
                  <div>Data</div>
                  <div>Total ingressos vendidos</div>
                  <div>Cortesias</div>
                  <div>Valor total</div>
                </div>
                <div></div>
              </div>
            </div>
            <SuperCollapse
              title={
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    columnGap: '150px',
                  }}
                >
                  <div>10/12/2022</div>
                  <div>2.000</div>
                  <div>5</div>
                  <div>R$ 20.000,00</div>
                </div>
              }
              content={<GeneralSale generalSaleState={generalSale} />}
              leftIcon={() => <div></div>}
            />
          </>
        )}
        {reportContent === 'Vendas por PDV' && <div className="pageTitle">Vendas por PDVs</div>}
      </Container>
    </>
  );
};
