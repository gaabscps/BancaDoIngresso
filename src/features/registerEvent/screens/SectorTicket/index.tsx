/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { SectorTicketContainer, States } from '@/features/registerEvent/screens/SectorTicket/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import Tickets from '@/model/Tickets';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/components/DeleteContent';
import Ticket from '@/model/Ticket';
import EventPhaseCompletion from '@/model/EventPhaseCompletion';
import { formSectorTicketProps, ticketStepProps } from './types';
import {
  ticketActionsProps,
  ticketStatesProps,
} from '../../components/SectorTicketMainSettingsSreen/types';

type UrlParams = {
  id: string;
};

export interface TicketProps {
  phaseCompletion: EventPhaseCompletion | undefined;
}

export const SectorTicketScreen: React.FC<TicketProps> = ({ phaseCompletion }): JSX.Element => {
  const [state, setState] = useState<States>(States.default);

  const [ticket, setTicket] = useState<Ticket>();
  const [ticketState, setTicketState] = useState<Ticket>();

  const [ticketList, setTicketList] = useState<Ticket[]>([]);

  const params = useParams<UrlParams>();

  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataSectorTicket,
    formErrors: formErrorsSectorTicket,
    onChangeFormInput: onChangeFormInputSectorTicket,
    isFormValid: isFormValidSectorTicket,
  } = useForm({
    initialData: {
      isTicket: 'false',
    },
    validators: {
      isTicket: [validators.required],
    },
    formatters: {},
  });

  const handleFecthTicketsList = async (id: string): Promise<void> => {
    try {
      type TicketsResponse = {
        idEvent: string;
        tickets: Ticket[];
      };
      setState(States.loading);
      const { data } = await api.get<TicketsResponse>(`event/ticket/${id}`);
      // filter father event when event type is father
      const { tickets } = data;
      setTicketList(tickets ?? []);
      if (tickets && tickets.length > 0) {
        onChangeFormInputSectorTicket('isTicket')('true');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnGetTicket = (ticketSelected: Ticket): void => {
    try {
      setTicket(ticketSelected);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditTicket = (): void => {
    try {
      setTicket(undefined);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnConfirmDeleteToTicket = async (ticketSelected: Tickets): Promise<void> => {
    try {
      await api.delete(`/event/ticket/${params?.id}/${ticketSelected.id}`);
      toast.success('Ticket excluído com sucesso!');
      confirmDelete.hide();
      handleFecthTicketsList(params?.id);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeleteTicket = (ticketSelected: Tickets): void => {
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
          onClick: () => {
            handleOnConfirmDeleteToTicket(ticketSelected);
          },
        },
      ],
    });
  };

  const controllerTicketStates: ticketStatesProps = {
    ticket,
    ticketList,
    setTicket,
  };

  const controllerTicketActions: ticketActionsProps = {
    onGetById: handleOnGetTicket,
    onGetAll: handleFecthTicketsList,
    onCancelEdit: handleOnCancelEditTicket,
    onShowDelete: handleOnShowDeleteTicket,
  };

  useEffect(() => {
    handleFecthTicketsList(params?.id);
  }, []);

  const controllerFormSectorTicket: formSectorTicketProps = {
    formData: formDataSectorTicket,
    formErrors: formErrorsSectorTicket,
    onChangeFormInput: onChangeFormInputSectorTicket,
    isFormValid: isFormValidSectorTicket,
  };

  const controllerTicketStep: ticketStepProps = {
    ticketState,
    setTicketState,
    phaseCompletion,
  };

  return (
    <SectorTicketContainer
      formSectorTicket={controllerFormSectorTicket}
      state={state}
      ticketStates={controllerTicketStates}
      ticketActions={controllerTicketActions}
      ticketStep={controllerTicketStep}
    />
  );
};
