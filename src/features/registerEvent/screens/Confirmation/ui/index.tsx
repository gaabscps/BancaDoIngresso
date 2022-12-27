/* eslint-disable react/jsx-key */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Col, Container, Row } from 'reactstrap';
import Event from '@/model/Event';
import dayjs from 'dayjs';
import Ticket from '@/model/Ticket';
import { DataList } from '@/components/DataList';
import { DataConfirmation } from '../components/DataConfirmation';
import { SectorTicket } from '../components/SectorTicket';
import { SectorProduct } from '../components/SectorProduct';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface ConfirmationEventContainerProps {
  state: States;
  event: Event | undefined;
  ticket: Ticket | undefined;
}

export const ConfirmationEventContainer: React.FC<ConfirmationEventContainerProps> = ({
  state,
  event,
  ticket,
}) => {
  // Confirmação de dados
  console.log(event);
  const dataConfirmation = [
    {
      title: 'Nome do evento:',
      content: event?.name || '--',
    },
    {
      title: 'Tipo do evento:',
      content: event?.eventType || '--',
    },
    // Preciso achar o endpoint para listagem de eventos filhos
    {
      title: 'Eventos filhos:',
      content: event?.fatherEvent || '--',
    },
    {
      title: 'Evento pai:',
      content: event?.fatherEvent?.name || '--',
    },
    {
      title: 'Cidade / Estado:',
      content:
        event?.address.city && event.address.state
          ? `${event?.address.city} / ${event?.address.state}`
          : '--',
    },
    {
      title: 'Data e hora início:',
      content:
        event?.startDate !== undefined
          ? `${dayjs(event?.startDate).format('DD/MM/YYYY')} - ${
              String(event?.startDate).split('T')[1].slice(0, 5) ?? ''
            }`
          : '--',
    },
    {
      title: 'Data e hora fim:',
      content:
        event?.startDate !== undefined
          ? `${dayjs(event?.endDate).format('DD/MM/YYYY')} - ${
              String(event?.endDate).split('T')[1].slice(0, 5) ?? ''
            }`
          : '--',
    },
    {
      title: 'Empresa ou contratante:',
      content: event?.contractor.name || '--',
    },
  ];
  // Fim confirmação de dados

  const dataSectorProduct = [
    {
      title: 'Produto',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.name),
        ) || '--',
    },
    {
      title: 'Qtd',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.amount),
        ) || '--',
    },
    {
      title: 'Valor un',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.unitValue),
        ) || '--',
    },
    {
      title: 'Total estimado',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.totalValue),
        ) || '--',
    },
    {
      title: 'Tx Deb',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.physicalSale.debit),
        ) || '--',
    },
    {
      title: 'Tx Cred',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.physicalSale.credit),
        ) || '--',
    },
    {
      title: 'Tx Pix ',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.physicalSale.pix),
        ) || '--',
    },
    {
      title: 'Tx Admin',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.physicalSale.administrateTax),
        ) || '--',
    },
    {
      title: 'Parcelas',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.physicalSale.installments),
        ) || '--',
    },
    {
      title: 'Jur mês',
      content:
        event?.sectionproductsAndCombos?.map(item =>
          item.products.map(products => products.physicalSale.fee),
        ) || '--',
    },
  ];

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <Row>
          <Col md={12}>
            <DataConfirmation data={dataConfirmation} />

            {event?.tickets && <SectorTicket ticket={ticket} />}

            {event?.sectionproductsAndCombos && (
              <SectorProduct event={event} data={dataSectorProduct} />
            )}
            <h5 className="mb-2 border-bottom-title mb-5 container-event">PDV’s</h5>
            {event?.pdvs?.map(item => (
              <>
                <div>Nome do PDV</div>
                <div>{item.pdv.name}</div>
                <div
                  className="mb-4"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                    columnGap: '30px',
                  }}
                >
                  <DataList
                    data={[
                      {
                        title: 'Nome da POS:',
                        content: 'não achei esse endpoint',
                      },
                      {
                        title: 'Nº de série:',
                        content: 'não achei esse endpoint',
                      },
                      {
                        title: '% do Garçom:',
                        content: 'não achei esse endpoint',
                      },
                    ]}
                  />
                </div>
                <DataList
                  data={[
                    {
                      title: 'Usuários do PDV:',
                      content: item.pdv.users.map(user => user.name),
                    },
                  ]}
                />
                <DataList
                  data={[
                    {
                      title: 'SubPDV’s:',
                      content: item?.subPdvs?.map(subPdv => subPdv.subPdv.name),
                    },
                  ]}
                />
              </>
            ))}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
