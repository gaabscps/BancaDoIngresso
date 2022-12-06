/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  ConfirmationEventContainer,
  States,
} from '@/features/registerEvent/screens/Confirmation/ui';
import Event from '@/model/Event';
import api, { AxiosError } from '@/services/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type UrlParams = {
  id: 'string';
};

export const ConfirmationEventScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [event, setEvent] = useState<Event>();

  const params = useParams<UrlParams>();
  const handleFetchEvent = async (id: 'string'): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Event>(`event/${id}`);
      setEvent(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  useEffect(() => {
    handleFetchEvent(params.id);
  }, []);

  return <ConfirmationEventContainer event={event} state={state} />;
};
