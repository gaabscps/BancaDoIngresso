import FilterVector from '@/assets/images/svg/FilterVector';
import { DataList } from '@/components/DataList';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { CustomTable } from '@/components/Table';
import { updateMask as updateMaskCash } from '@/helpers/masks/cashNumber';
import empty from '@/assets/images/other-images/imgvazio.svg';
import { colors } from '@/styles/colors';
import React from 'react';
import { ArrowLeft, X } from 'react-feather';
import { Link } from 'react-router-dom';

import { Card, Container } from 'reactstrap';

import { CollapseTable } from '@/components/CollapseTable';
import validators from '@/helpers/validators';
import { GeneralSale } from '../../components/GeneralSale';

export interface ReportsContentProps {
  event: any;
  eventChild: any;
  generalSale: any;
  saleDate: any;
}

export const ReportsContent: React.FC<ReportsContentProps> = ({
  event,
  eventChild,
  saleDate,
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

  const contentColumn = [
    {
      title: 'Ingresso',
      width: 300,
    },
    {
      title: 'Ingressos vendidos',
      width: 200,
    },
    {
      title: 'Finalidade',
      width: 100,
    },
    {
      title: 'Valor',
      width: 200,
    },
  ];

  const titleColumn = [
    {
      title: 'Data',
      width: 300,
    },
    {
      title: 'Total ingressos vendidos',
      width: 200,
    },
    {
      title: 'Cortesias',
      width: 100,
    },
    {
      title: 'Valor Total',
      width: 200,
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
            {saleDate?.dates?.map((date: any, index: any) => (
              <CollapseTable
                key={index}
                titleColumn={titleColumn}
                titleDataRow={[
                  {
                    data: date.date,
                    width: 300,
                  },
                  {
                    data: date.amountSold,
                    width: 200,
                  },
                  {
                    data: date.amountCourtesy,
                    width: 100,
                  },
                  {
                    data: `R$ ${updateMaskCash(validators.applyDecimalMask(String(date.value)))}`,
                    width: 200,
                  },
                ]}
                contentColumn={contentColumn}
                contentDataRow={[
                  {
                    data: date?.details.map((ticket: any) => ticket.name),
                    width: 300,
                  },
                  {
                    data: date?.details.map((ticket: any) => ticket.amountSold),
                    width: 200,
                  },
                  {
                    data: date?.details.map((ticket: any) => ticket.goal),
                    width: 100,
                  },
                  {
                    data: date?.details.map(
                      (ticket: any) =>
                        `R$ ${updateMaskCash(validators.applyDecimalMask(String(ticket.value)))}`,
                    ),
                    width: 200,
                  },
                ]}
              />
            ))}
          </>
        )}
        {reportContent === 'Vendas por PDV' && <div className="pageTitle">Vendas por PDVs</div>}
      </Container>
      <Card className="report-footer">
        <div className="d-flex justify-content-between">
          <div className="report-summary">
            <span className="text-small-darkgray-regular">Ingressos emitidos: </span>
            <span className="text-small-darkgray-700 circle-separator">50.000</span>
          </div>
          <div className="report-summary">
            <span className="text-small-darkgray-regular">Ingressos emitidos: </span>
            <span className="text-small-darkgray-700 circle-separator">50.000</span>
          </div>
        </div>
      </Card>
    </>
  );
};
