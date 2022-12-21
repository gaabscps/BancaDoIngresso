import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import { TabPdvActionsProps } from '@/features/registerEvent/screens/Pdv/ui';
import { useParams } from 'react-router-dom';
import EventTicket from '@/model/EventTicket';
import { EventTicketPDVLine } from '@/features/registerEvent/screens/Pdv';
import { States, PdvEventTicketContainer } from './ui';

type UrlParams = {
  id: string;
};

interface PdvEventTickScreenProps extends TabPdvActionsProps {
  pdvId?: string;
  eventTicketsPDV: EventTicketPDVLine[];
  getEventPdvTickets: () => void;
  handleOnGetTickets: () => void;
  handleCheckTicket: (ticketId: string) => void;
}

export const PdvEventTickScreen: React.FC<Omit<PdvEventTickScreenProps, 'firstTab'>> = ({
  pdvId,
  eventTicketsPDV,
  getEventPdvTickets,
  handleOnGetTickets,
  handleCheckTicket,
  backTab,
  nextTab,
}): JSX.Element => {
  const params = useParams<UrlParams>();
  const [state, setState] = useState<States>(States.default);

  const handleNextTab = async (): Promise<void> => {
    nextTab();
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const handleGenerateSalesLink = async (): Promise<void> => {
    setState(States.loading);
    try {
      const response = await api.post<EventTicket>(
        `/event/ticket/${params.id}/asdfasdfasdf/asdfasdf`,
      );
      console.log(response.data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
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
