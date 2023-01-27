import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import { TabPdvActionsProps } from '@/features/registerEvent/screens/Pdv/ui';
import { useParams } from 'react-router-dom';
import { EventTicketPDVLine } from '@/features/registerEvent/screens/Pdv';
import PdvLink from '@/model/PdvLink';
import { States, PdvEventTicketContainer } from './ui';

type UrlParams = {
  id: string;
};

interface PdvEventTickScreenProps extends TabPdvActionsProps {
  pdvId?: string;
  eventTicketsPDV: EventTicketPDVLine[];
  link: string;
  numberTab: number;
  inputRef: React.RefObject<HTMLInputElement>;
  isFormValidMainPdv: () => boolean;
  getEventPdvTickets: () => void;
  handleSetPdvLink: (link: string) => void;
  handleOnGetTickets: () => void;
  handleCheckTicket: (ticketId: string) => void;
}

export const PdvEventTickScreen: React.FC<Omit<PdvEventTickScreenProps, 'firstTab'>> = ({
  pdvId,
  eventTicketsPDV,
  link,
  numberTab,
  inputRef,
  isFormValidMainPdv,
  getEventPdvTickets,
  handleSetPdvLink,
  handleOnGetTickets,
  handleCheckTicket,
  backTab,
  nextTab,
}): JSX.Element => {
  const params = useParams<UrlParams>();
  const [state, setState] = useState<States>(States.default);

  const handleNextTab = async (): Promise<void> => {
    if (numberTab === 0 && isFormValidMainPdv()) {
      nextTab();
    } else {
      inputRef.current?.focus();
      toast.error('Selecione um PDV');
    }
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const handleGenerateSalesLink = async (): Promise<void> => {
    setState(States.loading);
    if (link && link.length > 0) {
      toast.warn('PDV já possui link de venda');
    } else {
      try {
        const response = await api.post<PdvLink>(`/event/pdv/${params.id}/link/${pdvId}`);
        handleSetPdvLink(response.data.link);
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
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
      pdvId={pdvId}
      eventTicketsPDV={eventTicketsPDV}
      link={link}
      onCheckTicket={handleCheckTicket}
      onGenerateSalesLink={handleGenerateSalesLink}
      onNextTap={handleNextTab}
      onReturnTap={handleBackTab}
    />
  );
};
