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
import { ReportFooter } from '@/components/ReportFooter';
import dayjs from 'dayjs';
import { Dialog } from '@/components';
import { ActionProps } from '@/components/Dialog';
import { GeneralSale } from '../../components/GeneralSale';
import { SaleDate } from '../../components/SaleDate';
import { ControllerFormProps, ControllerModalProps } from '../../types';
import { FilterContent } from '../../components/FilterContent';
import { SalePdv } from '../../components/SalePdv';

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
}

export interface ReportsContentProps {
  event: any;
  eventChild: any;
  generalSale: any;
  saleDate: any;
  shouldShowModal: ShouldShowModal;
  controllerModal: ControllerModalProps;
  controllerFormFilter: ControllerFormProps;
  filter: {
    filterSearch: string;
    inputSearch: string;
    lastDate: string;
  };
  onShouldShowModal: ({
    value,
    newTitleModal,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
  }) => void;
}

export const ReportsContent: React.FC<ReportsContentProps> = ({
  event,
  filter,
  eventChild,
  saleDate,
  generalSale,
  controllerModal,
  controllerFormFilter,
  onShouldShowModal,
}) => {
  const [reportContent, setReportContent] = React.useState('');
  const [hasFooter, setHasFooter] = React.useState(false);

  const renderActionDialogToCancelFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): Promise<void> => controllerFormFilter.clearFilter(),
    theme: 'noneBorder',
  };

  const reports = [
    {
      title: 'Vendas gerais',
      footer: false,
    },
    {
      title: 'Vendas por data',
      footer: true,
    },
    {
      title: 'Vendas por PDV',
      footer: true,
    },
    {
      title: 'Vendas por SubPDV',
      footer: false,
    },
    {
      title: 'Sangria',
      footer: false,
    },
    {
      title: 'Rastreamento',
      footer: false,
    },
    {
      title: 'Vendas de produtos',
      footer: false,
    },
    {
      title: 'Validação',
      footer: false,
    },
    {
      title: 'Terminais',
      footer: false,
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

  const footerData = [
    {
      title: 'Ingressos emitidos: ',
      value: saleDate.amountIssued,
    },
    {
      title: 'Ingressos vendidos: ',
      value: saleDate.amountSold,
    },
    {
      title: 'Cortesias: ',
      value: saleDate.amountCourtesy,
    },
    {
      title: 'Faturamento: ',
      value: `R$ ${updateMaskCash(String(saleDate.billingValue))}`,
    },
    {
      title: 'Descontos: ',
      value: `R$ ${updateMaskCash(String(saleDate.discount))}`,
    },
    {
      title: 'Faturamento com descontos: ',
      value: `R$ ${updateMaskCash(String(saleDate.netIncome))}`,
    },
  ];

  return (
    <>
      <Dialog
        title={controllerModal.title}
        visible={controllerModal.visible}
        onClose={controllerModal.onToggle}
        position="right"
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToCancelFilter,
          }[controllerModal.shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): void => controllerFormFilter.OnFilter(),
            },
          }[controllerModal.shouldShowModal],
        ]}
      >
        <FilterContent controllerFormFilter={controllerFormFilter} />
      </Dialog>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle d-flex">
            <Link to={`${process.env.PUBLIC_URL}/dashboard/event`}>
              <ArrowLeft color={colors.black} className="arrow-left" />
            </Link>
            <h5 className="ml-3 mb-0 mt-2 pageTitle">
              {event.name} - {dayjs(event.date).format('DD/MM/YYYY')}
            </h5>
          </div>
          <div className="button-filter-container">
            <div className="filter-container">
              <div
                className="filter-content"
                onClick={(): void => {
                  controllerModal.onToggle();
                  onShouldShowModal({
                    value: ShouldShowModal.filter,
                    newTitleModal: '',
                  });
                }}
              >
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        {filter.filterSearch && (
          <div
            className="mb-5"
            style={{
              background: 'rgba(130, 130, 130, 0.1)',
              borderRadius: '20px',
              padding: '3px 20px',
              width: 'fit-content',
            }}
          >
            <span style={{ color: '#828282' }}>
              {filter.filterSearch === 'date'
                ? `De: ${dayjs(filter.inputSearch).format('DD/MM/YYYY')}, Até: ${dayjs(
                    filter.lastDate,
                  ).format('DD/MM/YYYY')}`
                : filter.inputSearch}
            </span>
            <X
              onClick={() => controllerFormFilter.clearFilter()}
              size={12}
              className="ml-2 action-icon"
              style={{ color: '#828282' }}
            />
          </div>
        )}

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
              onClick={() => {
                setReportContent(report.title);
                setHasFooter(report.footer);
              }}
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
          <SaleDate saleDate={saleDate} titleColumn={titleColumn} contentColumn={contentColumn} />
        )}

        {reportContent === 'Vendas por PDV' && (
          <SalePdv salePdv={saleDate} titleColumn={titleColumn} contentColumn={contentColumn} />
        )}
      </Container>
      <ReportFooter data={footerData} hasFooter={hasFooter} />
    </>
  );
};
