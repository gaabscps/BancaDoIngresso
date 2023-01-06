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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handeEventType = (type: number) => {
    switch (type) {
      case 0:
        return 'Mono';
      case 1:
        return 'Pai';
      case 2:
        return 'Filho';
      default:
        return '--';
    }
  };

  // Confirmação de dados
  const dataConfirmation = [
    {
      title: 'Nome do evento:',
      content: event?.name || '--',
    },
    {
      title: 'Tipo do evento:',
      content: handeEventType(Number(event?.eventType)),
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
      content: event?.products?.map(item => item.name) || '--',
    },
    {
      title: 'Qtd',
      content: event?.products?.map(item => item.amount) || '--',
    },
    {
      title: 'Valor un',
      content: event?.products?.map(item => item.unitValue) || '--',
    },
    {
      title: 'Total estimado',
      content: event?.products?.map(item => item.totalValue) || '--',
    },
    {
      title: 'Tx Deb',
      content: event?.products?.map(
        item => `${Number(item.physicalSale?.debit).toFixed(2)}%` || '--',
      ),
    },
    {
      title: 'Tx Cred',
      content: event?.products?.map(
        item => `${Number(item.physicalSale?.credit).toFixed(2)}%` || '--',
      ),
    },
    {
      title: 'Tx Pix ',
      content: event?.products?.map(
        item => `${Number(item.physicalSale?.pix).toFixed(2)}%` || '--',
      ),
    },
    {
      title: 'Tx Admin',
      content: event?.products?.map(
        item => `${Number(item.physicalSale?.administrateTax).toFixed(2)}%` || '--',
      ),
    },
    {
      title: 'Parcelas',
      content: event?.products?.map(item => item.physicalSale?.installments || '--'),
    },
    {
      title: 'Jur mês',
      content: event?.products?.map(
        item => `${Number(item.physicalSale?.fee).toFixed(2)}%` || '--',
      ),
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

            {event?.products && <SectorProduct event={event} data={dataSectorProduct} />}
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
                  {item?.poss?.map(pos => (
                    <DataList
                      data={[
                        {
                          title: 'Nome da POS:',
                          content: pos?.pos?.name,
                        },
                        {
                          title: 'Nº de série:',
                          content: pos?.pos?.serialNumber,
                        },
                        {
                          title: '% do Garçom:',
                          content: pos?.waiter,
                        },
                      ]}
                    />
                  ))}
                </div>

                <DataList
                  data={[
                    {
                      title: 'Usuários do PDV:',
                      content: item.pdv.users.map(user => user?.name),
                    },
                  ]}
                />
                <DataList
                  data={[
                    {
                      title: 'SubPDV’s:',
                      content: item?.subPdvs?.map(subPdv => subPdv?.subPdv?.name),
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
