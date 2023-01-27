/* eslint-disable no-shadow */
import React, { Fragment } from 'react';
import { Button, Checkbox, Loading } from '@/components';
import { Col, Container, Row } from 'reactstrap';
import { EventTicketPDVLine } from '@/features/registerEvent/screens/Pdv';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface StateProps {
  state: States;
  pdvId: string | undefined;
  eventTicketsPDV: EventTicketPDVLine[];
  link: string;
}

interface DispatchProps {
  onCheckTicket: (ticketId: string) => void;
  onGenerateSalesLink: () => void;
  onReturnTap: () => void;
  onNextTap: () => void;
}

type Props = StateProps & DispatchProps;

export const PdvEventTicketContainer: React.FC<Props> = ({
  state,
  pdvId,
  eventTicketsPDV,
  link,
  onCheckTicket,
  onGenerateSalesLink,
  onNextTap,
}): JSX.Element => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      {pdvId && pdvId.length > 0 && (
        <div style={{ float: 'right' }}>
          <button
            style={{ border: '0' }}
            onClick={() => onGenerateSalesLink()}
            disabled={link !== undefined && link !== null && link.length > 0}
          >
            <h4
              className="subtitle"
              style={{ color: '#3CAFC8', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Gerar link de venda
            </h4>
          </button>

          {link && link.length > 0 && <p>{link}</p>}
        </div>
      )}

      {eventTicketsPDV && eventTicketsPDV.length > 0 ? (
        eventTicketsPDV.map((line, index) => (
          <Row key={index}>
            {line.events.map(data => (
              <Col key={data.eventSection.id} md={6}>
                <h4 className="subtitle">{data.eventSection.name}</h4>
                <table style={{ marginBottom: '27px' }}>
                  <tbody>
                    {data.list.map((list, index) => (
                      <tr key={index}>
                        {list.tickets.map(ticket => (
                          <td key={ticket.ticket.id}>
                            <div
                              className="tbody-container"
                              style={{ display: 'flex' }}
                              key={index}
                              id={`${index}`}
                            >
                              <div key={index} id={`${index}`} className="checkbox-list">
                                <Checkbox
                                  label={ticket.ticket.name}
                                  name={`group-${index}-${ticket.ticket.id}`}
                                  checked={ticket.check}
                                  onChange={() => onCheckTicket(ticket.ticket.id)}
                                />
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            ))}
          </Row>
        ))
      ) : (
        <div>Não há ingressos cadastrados para este evento</div>
      )}

      <div className="d-flex justify-content-end">
        <div>
          <Button
            title="Proxima etapa"
            theme="outlineDark"
            className="ml-3"
            onClick={() => {
              onNextTap();
            }}
          />
        </div>
      </div>
    </Container>
  </Fragment>
);
