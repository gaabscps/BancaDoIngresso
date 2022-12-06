/* eslint-disable react/jsx-key */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Col, Container, Row } from 'reactstrap';
import Event from '@/model/Event';
import dayjs from 'dayjs';
import { DataList } from '../components/DataList';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface ConfirmationEventContainerProps {
  state: States;
  event: Event | undefined;
}

export const ConfirmationEventContainer: React.FC<ConfirmationEventContainerProps> = ({
  state,
  event,
}) => {
  // Confirmação de dados
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
            {event?.tickets?.map(item =>
              item.batchs ? (
                <>
                  <div>Nome do setor:</div>
                  <div>{item.eventSection.name}</div>
                  <div
                    className="d-grid"
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
                          content: item.batchs.map((batch: any) => batch.name),
                        },
                        {
                          title: 'Início da venda:',
                          content: item.batchs.map(
                            (batch: any) =>
                              `${dayjs(batch?.startDate).format('DD/MM/YYYY')} - ${
                                String(batch?.startDate).split('T')[1].slice(0, 5) ?? ''
                              }`,
                          ),
                        },
                        {
                          title: 'Fim da venda:',
                          content: item.batchs.map(
                            (batch: any) =>
                              `${dayjs(batch?.startDate).format('DD/MM/YYYY')} - ${
                                String(batch?.startDate).split('T')[1].slice(0, 5) ?? ''
                              }`,
                          ),
                        },
                        {
                          title: '% comissão:',
                          content: item.batchs.map((batch: any) => batch.commission),
                        },
                        {
                          title: 'Qtd de ingresso:',
                          content: item.batchs.map((batch: any) => batch.amount),
                        },
                        {
                          title: 'Qtd cortesia:',
                          content: event.vouchers?.length,
                        },
                      ]}
                    />
                  </div>
                </>
              ) : null,
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
