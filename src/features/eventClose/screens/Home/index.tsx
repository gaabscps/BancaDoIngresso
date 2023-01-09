/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { HomeContainer, States } from '@/features/eventClose/screens/Home/ui';
import { useParams, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';

export const HomeEventCloseScreen: React.FC = (): JSX.Element => {
  const { state: eventLocation } = useLocation();
  const [state, setState] = useState<States>(States.default);
  const [eventState, setEventState] = useState([]);
  // state get params location

  // get url params
  const { id: eventId } = useParams<{ id: string }>();

  const handleGetEventClose = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/close/${id}`);
      setEventState(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  useEffect(() => {
    handleGetEventClose(eventId);
  }, []);

  return <HomeContainer state={state} eventState={eventState} eventLocation={eventLocation} />;
};
