import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';

import { TabPdvActionsProps } from '@/features/registerEvent/screens/Pdv/ui';
import { useParams } from 'react-router-dom';
import EventTicket from '@/model/EventTicket';
import Section from '@/model/Section';
import Ticket from '@/model/Ticket';
import Pdv from '@/model/Pdv';
import EventSectionTicket from '@/model/EventSectionTicket';
import EventPdvTicket from '@/model/EventPdvTicket';
import { States, PdvEventTicketContainer } from './ui';

type UrlParams = {
  id: string;
};

interface PdvTicket {
  ticket: Ticket;
  check: boolean;
}

interface EventTicketPDVTickets {
  tickets: PdvTicket[];
}

export interface EventTicketPDV {
  eventSection: Section;
  list: EventTicketPDVTickets[];
}

export interface EventTicketPDVLine {
  events: EventTicketPDV[];
}

interface PdvEventTickScreenProps extends TabPdvActionsProps {
  pdvId?: string;
}

export const PdvEventTickScreen: React.FC<Omit<PdvEventTickScreenProps, 'firstTab'>> = ({
  pdvId,
  backTab,
  nextTab,
}): JSX.Element => {
  const params = useParams<UrlParams>();
  const [state, setState] = useState<States>(States.default);
  const [eventTicketsPDV, setEventTicketsPDV] = useState<EventTicketPDVLine[]>([]);

  const saveEventPdvTickets = async (): Promise<void> => {
    try {
      setState(States.loading);
      const pdv = {
        id: pdvId,
      } as Pdv;
      const sectionTickets: EventSectionTicket[] = [];

      eventTicketsPDV.forEach(line => {
        line.events.forEach(event => {
          const eventSectionTicket: EventSectionTicket = {
            section: event.eventSection,
            tickets: [],
          };
          event.list.forEach(list => {
            list.tickets.forEach(ticketList => {
              if (ticketList.check) {
                const ticket = {
                  id: ticketList.ticket.id,
                } as Ticket;
                eventSectionTicket.tickets.push(ticket);
              }
            });
          });
          sectionTickets.push(eventSectionTicket);
        });
      });

      const eventPdvTicket: EventPdvTicket = {
        pdv,
        sectionTickets,
      };
      await api.post(`/event/pdv/${params.id}/ticket`, eventPdvTicket);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleNextTab = async (): Promise<void> => {
    await saveEventPdvTickets();
    nextTab();
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const parseEventTicketsPDV = (eventTickets: EventTicket): void => {
    const list: EventTicketPDV[] = [];

    if (eventTickets && eventTickets.tickets && eventTickets.tickets.length > 0) {
      eventTickets.tickets.forEach(eventTicket => {
        let found = false;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < list.length; i++) {
          if (list[i].eventSection.id === eventTicket.eventSection.id) {
            found = true;
            let count = 0;
            list[i].list.forEach(data => {
              count = data.tickets.length;
            });
            if (count < 2) {
              const ticket: PdvTicket = {
                ticket: eventTicket,
                check: false,
              };
              list[i].list[list[i].list.length - 1].tickets.push(ticket);
            } else {
              const eventTicketPDVTickets: EventTicketPDVTickets = {
                tickets: [],
              };
              const ticket: PdvTicket = {
                ticket: eventTicket,
                check: false,
              };
              eventTicketPDVTickets.tickets.push(ticket);
              list[i].list.push(eventTicketPDVTickets);
            }
            break;
          }
        }
        if (!found) {
          const eventTicketPDV: EventTicketPDV = {
            eventSection: eventTicket.eventSection,
            list: [],
          };
          const ticket: PdvTicket = {
            ticket: eventTicket,
            check: false,
          };
          const eventTicketPDVTickets: EventTicketPDVTickets = {
            tickets: [],
          };
          eventTicketPDVTickets.tickets.push(ticket);
          eventTicketPDV.list.push(eventTicketPDVTickets);
          list.push(eventTicketPDV);
        }
      });
    }
    const eventTicketPDVLines: EventTicketPDVLine[] = [];
    let count = 0;
    list.forEach(data => {
      if (count === 0) {
        const eventTicketPDVLine: EventTicketPDVLine = {
          events: [],
        };
        count = 2;
        eventTicketPDVLine.events.push(data);
        eventTicketPDVLines.push(eventTicketPDVLine);
      } else if (count < 2) {
        eventTicketPDVLines[eventTicketPDVLines.length - 1].events.push(data);
        count = 2;
      } else if (count === 2) {
        const eventTicketPDVLine: EventTicketPDVLine = {
          events: [],
        };
        count = 1;
        eventTicketPDVLine.events.push(data);
        eventTicketPDVLines.push(eventTicketPDVLine);
      }
    });
    setEventTicketsPDV(eventTicketPDVLines);
  };

  const handleOnGetTickets = async (): Promise<void> => {
    if (params.id) {
      try {
        setState(States.loading);
        const responseEventTicket = await api.get<EventTicket>(`/event/ticket/${params.id}`);
        parseEventTicketsPDV(responseEventTicket.data);
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
    }
  };

  const getEventPdvTickets = async (): Promise<void> => {
    if (pdvId && pdvId.length > 0) {
      try {
        setState(States.loading);
        const response = await api.get<Ticket[]>(`/event/pdv/${params.id}/ticket/${pdvId}`);
        eventTicketsPDV.forEach(line => {
          line.events.forEach(event => {
            event.list.forEach(list => {
              list.tickets.forEach(ticketList => {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < response.data.length; i++) {
                  if (ticketList.ticket.id === response.data[i].id) {
                    // eslint-disable-next-line no-param-reassign
                    ticketList.check = true;
                    break;
                  }
                }
              });
            });
          });
        });
        setEventTicketsPDV(eventTicketsPDV);
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status !== 400) {
          toast.error(err.message);
        }
      } finally {
        setState(States.default);
      }
    }
  };

  const handleCheckTicket = (ticketId: string): void => {
    let found = false;
    // eslint-disable-next-line no-plusplus
    for (let l = 0; l < eventTicketsPDV.length; l++) {
      // eslint-disable-next-line no-plusplus
      for (let e = 0; e < eventTicketsPDV[l].events.length; e++) {
        // eslint-disable-next-line no-plusplus
        for (let li = 0; li < eventTicketsPDV[l].events[e].list.length; li++) {
          // eslint-disable-next-line no-plusplus
          for (let t = 0; t < eventTicketsPDV[l].events[e].list[li].tickets.length; t++) {
            if (eventTicketsPDV[l].events[e].list[li].tickets[t].ticket.id === ticketId) {
              eventTicketsPDV[l].events[e].list[li].tickets[t].check =
                !eventTicketsPDV[l].events[e].list[li].tickets[t].check;
              found = true;
              break;
            }
          }
          if (found) {
            break;
          }
        }
        if (found) {
          break;
        }
      }
      if (found) {
        break;
      }
    }
    const json = JSON.stringify(eventTicketsPDV);
    setEventTicketsPDV(JSON.parse(json));
  };

  const handleGenerateSalesLink = async (): Promise<void> => {
    const response = await api.post<EventTicket>(
      `/event/ticket/${params.id}/asdfasdfasdf/asdfasdf`,
    );
    console.log(response.data);
  };

  useEffect(() => {
    getEventPdvTickets();
  }, [pdvId]);

  useEffect(() => {
    handleOnGetTickets();
  }, []);

  return (
    <PdvEventTicketContainer
      state={state}
      eventTicketsPDV={eventTicketsPDV}
      onCheckTicket={handleCheckTicket}
      onGenerateSalesLink={handleGenerateSalesLink}
      onNextTap={handleNextTab}
      onReturnTap={handleBackTab}
    />
  );
};
