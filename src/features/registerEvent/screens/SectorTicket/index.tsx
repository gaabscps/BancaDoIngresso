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
import { formSectorTicketProps } from './types';
import {
  ticketActionsProps,
  ticketStatesProps,
} from '../../components/SectorTicketMainSettingsSreen/types';

type UrlParams = {
  id: string;
};

export const SectorTicketScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);

  const [ticket, setTicket] = useState<Tickets>();
  const [ticketList, setTicketList] = useState<Tickets[]>([]);

  const params = useParams<UrlParams>();

  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataSectorTicket,
    formErrors: formErrorsSectorTicket,
    onChangeFormInput: onChangeFormInputSectorTicket,
  } = useForm({
    initialData: {
      isTicket: '',
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
        tickets: Tickets[];
      };
      setState(States.loading);
      const { data } = await api.get<TicketsResponse>(`event/ticket/${id}`);
      // filter father event when event type is father
      const { tickets } = data;
      setTicketList(tickets ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnGetTicket = (ticketSelected: Tickets): void => {
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
      console.log('TODO: Fetch delete ticket:>> ', ticketSelected);
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
  };

  return (
    <SectorTicketContainer
      formSectorTicket={controllerFormSectorTicket}
      state={state}
      ticketStates={controllerTicketStates}
      ticketActions={controllerTicketActions}
    />
  );
};
