/* eslint-disable no-shadow */
import React, { Fragment } from 'react';
import { Button, Loading } from '@/components';
import { Col, Container, Input, Row } from 'reactstrap';
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
  onReturnTap,
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
            disabled={link !== undefined && link.length > 0}
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

      {eventTicketsPDV &&
        eventTicketsPDV.length > 0 &&
        eventTicketsPDV.map((line, index) => (
          <Row key={index}>
            {line.events.map(data => (
              <Col key={data.eventSection.id} md={6}>
                <h4 className="subtitle">{data.eventSection.name}</h4>
                <table style={{ marginLeft: '20px', marginBottom: '27px' }}>
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
                                <Input
                                  name="group"
                                  type="checkbox"
                                  checked={ticket.check}
                                  onChange={() => onCheckTicket(ticket.ticket.id)}
                                />
                                <span className="checkbox-list-label">{ticket.ticket.name}</span>
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
        ))}

      <div className="d-flex justify-content-end">
        <div>
          <Button title="Voltar etapa" theme="noneBorder" onClick={() => onReturnTap()} />
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