/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef, useState } from 'react';
import { FormInputName, PdvEventContainer, States } from '@/features/registerEvent/screens/Pdv/ui';
import useForm from '@/hooks/useForm';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { DeleteContent } from '@/components/DeleteContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import api from '@/services/api';
import EventPdv from '@/model/EventPdv';
import Pdv from '@/model/Pdv';
import validators from '@/helpers/validators';
import { useParams } from 'react-router-dom';
import EventPdvMain from '@/model/EventPdvMain';
import Section from '@/model/Section';
import Ticket from '@/model/Ticket';
import EventSectionTicket from '@/model/EventSectionTicket';
import EventPdvTicket from '@/model/EventPdvTicket';

import EventTicket from '@/model/EventTicket';
import { FormInputName as FormInputMainName } from '../../components/MainPdvContent';
import { mainPdvStatesProps } from '../../components/PdvScreen/types';
import { useEvent } from '../../hook/useEvent';

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

type UrlParams = {
  id: string;
};

export const PdvEventScreen: React.FC = (): JSX.Element => {
  const params = useParams<UrlParams>();
  const [state, setState] = useState<States>(States.default);
  const [pdvId, setPdvId] = useState<string>();
  const [numberTab, setNumberTab] = useState(0);
  const [eventTicketsPDV, setEventTicketsPDV] = useState<EventTicketPDVLine[]>([]);
  const confirmDelete = useConfirmDelete();
  const [mainPdv, setMainPdv] = useState<Pdv>();
  const [eventPDVs, setEventPDVs] = useState<EventPdv[]>([]);
  const [mainPdvList, setMainPdvList] = useState<Pdv[]>([]);
  const [link, setLink] = useState<string>(undefined as unknown as string);

  const { eventState, onChange: onChangeEvent } = useEvent();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    formData: formDataPdv,
    formErrors: formErrorsPdv,
    onChangeFormInput: onChangeFormInputPdv,
    isFormValid: isFormValidPdv,
  } = useForm({
    initialData: {
      isPdv: '',
    },
    validators: {},
    formatters: {},
  });

  const {
    formData: formDataMainPdv,
    formErrors: formErrorsMainPdv,
    onChangeFormInput: onChangeFormInputMainPdv,
    isFormValid: isFormValidMainPdv,
    resetForm: resetFormMainPdv,
  } = useForm({
    initialData: {
      pdv: '',
      allowMoney: 'true',
      allowAdvanceFee: 'true',
      allowDebit: 'true',
      allowCreditCard: 'true',
      // allowBankSlip:'true',
      allowPix: 'true',
      allowSellingWebsite: 'false',
      allowDiscount: 'true',
    },
    validators: {
      pdv: [validators.required],
      allowMoney: [validators.required],
      allowAdvanceFee: [validators.required],
      allowDebit: [validators.required],
      allowCreditCard: [validators.required],
      // allowBankSlip:[validators.required],
      allowPix: [validators.required],
      allowSellingWebsite: [validators.required],
      allowDiscount: [validators.required],
    },
    formatters: {},
  });

  const handleOnConfirmDelete = async (mainPdvSelected: Pdv): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(`/event/pdv/${params.id}/${mainPdvSelected.id}`);
      toast.success('Pdv excluído com sucesso!');
      await handleFecthPdvList();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      confirmDelete.hide();
      setState(States.default);
    }
  };

  const handleOnShowDeleteMainPdv = (mainPdvSelected: Pdv): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => confirmDelete.hide(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): void => {
            handleOnConfirmDelete(mainPdvSelected);
          },
        },
      ],
    });
  };

  const handleFecthPdvList = async (): Promise<void> => {
    if (params.id) {
      try {
        setState(States.loading);
        const { data } = await api.get<Pdv[]>(`/pdv/find`);
        setMainPdvList(data ?? []);
        const responseEventPDVs = await api.get<EventPdv[]>(`/event/pdv/${params.id}`);
        if (responseEventPDVs.data && responseEventPDVs.data.length > 0) {
          setEventPDVs(responseEventPDVs.data);
          onChangeFormInputPdv(FormInputName.isPdv)('true');
        }
        if (!pdvId) {
          setLink(undefined as unknown as string);
        }
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
    }
  };

  const handleOnGetMainPdv = async (mainPdvSelected: Pdv): Promise<void> => {
    try {
      if (mainPdvSelected) {
        setMainPdv(mainPdvSelected);
        handleChangeSelectedPdv(mainPdvSelected.id as string);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditMainPdv = (): void => {
    try {
      setMainPdv(undefined);
      resetFormMainPdv();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controllerMainPdvActions: any = {
    onGetList: handleFecthPdvList,
    onGet: handleOnGetMainPdv,
    onCancelEdit: handleOnCancelEditMainPdv,
    onShowModalDelete: handleOnShowDeleteMainPdv,
  };

  const controllerMainPdvStates: mainPdvStatesProps = {
    mainPdv,
    setMainPdv,
    mainPdvList,
    setMainPdvList,
    eventPDVs,
    link,
  };

  const controllerFormPdv = {
    formData: formDataPdv,
    formErrors: formErrorsPdv,
    onChangeFormInput: onChangeFormInputPdv,
    isFormValid: isFormValidPdv,
  };

  const controllerFormMainPdv = {
    formData: formDataMainPdv,
    formErrors: formErrorsMainPdv,
    onChangeFormInput: onChangeFormInputMainPdv,
    isFormValid: isFormValidMainPdv,
  };

  const handleChangeSelectedPdv = (value: string): void => {
    setPdvId(value);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < eventPDVs.length; i++) {
      if (eventPDVs[i].pdv.id === value) {
        setLink(eventPDVs[i].link as string);
        onChangeFormInputPdv(FormInputName.isPdv)('true');
        onChangeFormInputMainPdv(FormInputMainName.pdv)(eventPDVs[i].pdv.id as string);
        onChangeFormInputMainPdv(FormInputMainName.allowMoney)(
          eventPDVs[i].allowMoney ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowAdvanceFee)(
          eventPDVs[i].allowAdvanceFee ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowDebit)(
          eventPDVs[i].allowDebit ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowCreditCard)(
          eventPDVs[i].allowCreditCard ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowPix)(
          eventPDVs[i].allowPix ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowSellingWebsite)(
          eventPDVs[i].allowSellingWebsite ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowDiscount)(
          eventPDVs[i].allowDiscount ? 'true' : 'false',
        );
        break;
      }
    }
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

  const handleSetPdvLink = (linkSelected: string): void => {
    setLink(linkSelected);
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

  const saveEventPdvMain = async (): Promise<void> => {
    if (isFormValidMainPdv()) {
      try {
        setState(States.loading);
        const pdv = {
          id: pdvId,
        } as Pdv;
        const eventPdvMain: EventPdvMain = {
          pdv,
          allowMoney: formDataMainPdv[FormInputMainName.allowMoney] === 'true',
          allowAdvanceFee: formDataMainPdv[FormInputMainName.allowAdvanceFee] === 'true',
          allowDebit: formDataMainPdv[FormInputMainName.allowDebit] === 'true',
          allowCreditCard: formDataMainPdv[FormInputMainName.allowCreditCard] === 'true',
          allowBankSlip: false,
          allowPix: formDataMainPdv[FormInputMainName.allowPix] === 'true',
          allowSellingWebsite: formDataMainPdv[FormInputMainName.allowSellingWebsite] === 'true',
          allowDiscount: formDataMainPdv[FormInputMainName.allowDiscount] === 'true',
        };

        await api.post(`/event/pdv/${params.id}/main`, eventPdvMain);
        await saveEventPdvTickets();
        handleFecthPdvList();
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
    }
  };

  const handleNextTab = async (): Promise<void> => {
    if (isFormValidMainPdv()) {
      await saveEventPdvMain();
      setNumberTab(numberTab + 1);
    }
  };

  useEffect(() => {
    handleFecthPdvList();
  }, []);

  return (
    <PdvEventContainer
      state={state}
      pdvId={pdvId}
      eventTicketsPDV={eventTicketsPDV}
      link={link}
      numberTab={numberTab}
      formPdv={controllerFormPdv}
      formMainPdv={controllerFormMainPdv}
      mainPdvActions={controllerMainPdvActions}
      mainPdvStates={controllerMainPdvStates}
      onChangeEvent={onChangeEvent}
      eventState={eventState}
      onChangeSelectedPdv={handleChangeSelectedPdv}
      getEventPdvTickets={getEventPdvTickets}
      handleSetPdvLink={handleSetPdvLink}
      handleOnGetTickets={handleOnGetTickets}
      handleCheckTicket={handleCheckTicket}
      setNumberTab={setNumberTab}
      nextTab={handleNextTab}
      inputRef={inputRef}
      isFormValidMainPdv={isFormValidMainPdv}
    />
  );
};
