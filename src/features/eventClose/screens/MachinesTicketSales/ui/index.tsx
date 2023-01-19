import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Container } from 'reactstrap';
import './style.scss';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { colors } from '@/styles/colors';
import { CustomTable } from '@/components/Table';
// import dayjs from 'dayjs';
import { FooterCustom } from '@/components/FooterCustom';
import { columnsMachinesTicketSalesDetails } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface MachinesTicketSalesProps {
  state: States;
  eventLocation: any;
  machinesTicketSalesList: any[];
  machinesTicketSalesFooter: any;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  infoMachinesTicketSales = 'infoMachinesTicketSales',
}

export const MachinesTicketSalesContainer: React.FC<MachinesTicketSalesProps> = ({
  state,
  eventLocation,
  machinesTicketSalesList,
  machinesTicketSalesFooter,
}) => {
  const { id: eventId } = useParams<{ id: string }>();
  const dataTableMachinesTicketSales = machinesTicketSalesList?.map((item: any, index) => ({
    id: index,
    machineId: index < 10 ? `0${index + 1}` : index + 1,
    machine: item?.machine,
    situation: item?.situation,
    pdv: item?.pdv,
    section: item?.section,
    serial: item?.serial,
    daysofuse: item?.daysofuse,
    value: item?.value,
    difference: item?.difference,
    debit: item?.debit,
    credit: item?.credit,
    deductmoney: item?.deductmoney,
    pix: item?.pix,
    totalValue: item?.totalValue,
  }));

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="pageTitle d-flex mb-5">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/machines/${eventId}`}>
            <ArrowLeft color={colors.black} className="arrow-left" />
          </Link>
          <h5 className="ml-3 mb-0 mt-2 pageTitle">
            Venda de ingressos {eventLocation?.event?.name && `- ${eventLocation?.event?.name}`}
          </h5>
        </div>
        <CustomTable
          columns={columnsMachinesTicketSalesDetails}
          data={dataTableMachinesTicketSales}
          numberRowsPerPage={1000}
          theme="primary"
          progressPending={state === States.loading}
        />
      </Container>
      <FooterCustom
        data={[
          {
            title: 'Totais de ítens:',
            value: machinesTicketSalesFooter?.amount || 'Dado não encontrado',
          },
          {
            title: 'Total de receitas:',
            value:
              machinesTicketSalesFooter?.totalValue?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }) || 'Dado não encontrado',
          },
        ]}
      />
    </Fragment>
  );
};
