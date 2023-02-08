import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { path } from '@/navigation/path';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import Home from '@/model/Home';
import { HomeContainer } from './ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
// const events: Events[] = [];
// eventos.eventos.forEach(event => events.push(event));

export const HomeScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);

  const [eventList, setEventList] = useState<Home | undefined>();

  const history = useHistory();
  // const dispatch = useDispatch();

  const handleFetchEvents = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get('/home');

      if (data) {
        setEventList(data ?? {});
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  useEffect(() => {
    handleFetchEvents();
  }, []);

  const handleOnViewAllEvents = (): void => {
    history.push(path.Dashboard.Events.itself);
  };

  return <HomeContainer events={eventList} onViewAllEvents={handleOnViewAllEvents} state={state} />;
};
