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
import { columnsMachinesProductSalesDetails } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface MachinesProductSalesProps {
  state: States;
  eventLocation: any;
  machinesProductSalesList: any[];
  machinesProductSalesFooter: any;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  infoMachinesProductSales = 'infoMachinesProductSales',
}

export const MachinesProductSalesContainer: React.FC<MachinesProductSalesProps> = ({
  state,
  eventLocation,
  machinesProductSalesList,
  machinesProductSalesFooter,
}) => {
  const { id: eventId } = useParams<{ id: string }>();
  const dataTableMachinesProductSales = machinesProductSalesList?.map((item: any, index) => ({
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
            Venda de produtos {eventLocation?.event?.name && `- ${eventLocation?.event?.name}`}
          </h5>
        </div>
        <CustomTable
          columns={columnsMachinesProductSalesDetails}
          data={dataTableMachinesProductSales}
          numberRowsPerPage={1000}
          theme="primary"
          progressPending={state === States.loading}
        />
      </Container>
      <FooterCustom
        data={[
          {
            title: 'Totais de ítens:',
            value: machinesProductSalesFooter?.amount || 'Dado não encontrado',
          },
          {
            title: 'Total de receitas:',
            value:
              machinesProductSalesFooter?.totalValue?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }) || 'Dado não encontrado',
          },
        ]}
      />
    </Fragment>
  );
};
