/* eslint-disable react/jsx-key */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Col, Container, Row } from 'reactstrap';
import Event from '@/model/Event';
import dayjs from 'dayjs';
import Ticket from '@/model/Ticket';
import Tickets from '@/model/Tickets';
import TicketBatch from '@/model/TicketBatch';
import { DataList } from '../components/DataList';

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
      content: event?.fatherEvent || '--',
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

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <Row>
          <Col md={10}>
            <div className="container-event">
              <h5 className="mb-2 border-bottom-title mb-5">Confirmação de dados</h5>
            </div>
            <DataList data={dataConfirmation} />
            <h5 className="mb-2 border-bottom-title mb-5 container-event">Setores e Ingressos</h5>
            {ticket?.tickets?.map((item: Tickets) => (
              <>
                <div className="mb-4">
                  <div className="mb-2 dataListTitle">Nome do setor:</div>
                  <div>{item?.name || '--'}</div>
                </div>
                <div className="d-grid">
                  {item.batchs?.map((batch: TicketBatch) => (
                    <div
                      className="mb-4"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                        columnGap: '10px',
                      }}
                    >
                      <DataList
                        data={[
                          {
                            title: 'Lote:',
                            content: batch.name || '--',
                          },
                          {
                            title: 'Início da venda:',
                            content: `${dayjs(batch?.startDate).format('DD/MM/YYYY')} - ${
                              String(batch?.startDate).split('T')[1].slice(0, 5) ?? ''
                            }`,
                          },
                          {
                            title: 'Fim da venda:',
                            content: `${dayjs(batch?.startDate).format('DD/MM/YYYY')} - ${
                              String(batch?.startDate).split('T')[1].slice(0, 5) ?? ''
                            }`,
                          },
                          {
                            title: '% comissão:',
                            content: batch.commission || '--',
                          },
                          {
                            title: 'Qtd de ingresso:',
                            content: item.numberTickets || '--',
                          },
                          {
                            title: 'Qtd cortesia:',
                            content: item?.amountCourtesy || '--',
                          },
                          {
                            title: 'Qtd meia:',
                            content: item.amountHalfPrice || '--',
                          },
                          {
                            title: 'Valor unitário:',
                            content: `R$ ${batch.unitValue}` || '--',
                          },
                          {
                            title: <div style={{ fontWeight: '700' }}>Valor total:</div>,
                            content:
                              <div style={{ fontWeight: '700' }}>{`R$ ${batch.totalValue}`}</div> ||
                              '--',
                          },
                        ]}
                      />
                    </div>
                  ))}
                </div>
                <div className="mb-5 mt-5" style={{ borderBottom: 'solid 1px #D9D9D9' }} />
              </>
            ))}
            <h5 className="mb-2 border-bottom-title mb-5 container-event">Setores e Produtos</h5>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
