import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HomeState } from '@/store/ducks/home/types';
import { ApplicationState } from '@/store';
import { path } from '@/navigation/path';

import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import Event from '@/model/Event';
import Pdv from '@/model/Pdv';
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
  const [currentPage, setCurrentPage] = useState({
    page: 1,
    pageSize: 6,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });
  const [eventList, setEventList] = useState<Event[]>([]);
  const [pdvList, setPdvList] = useState<Pdv[]>([]);
  const homeState = useSelector<ApplicationState, HomeState>(store => store.home);

  const history = useHistory();
  // const dispatch = useDispatch();

  const handleFetchEvents = async (values: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post('/event/page', values);

      if (data) {
        setEventList(data?.list ?? []);

        setCurrentPage(currentPageState => ({
          ...currentPageState,
          ...data,
        }));
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFecthPdvList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Pdv[]>(`/pdv/find`);
      setPdvList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  useEffect(() => {
    handleFetchEvents(currentPage);
    handleFecthPdvList();
  }, []);

  const handleOnViewAllEvents = (): void => {
    history.push(path.Dashboard.Events.itself);
  };

  return (
    <HomeContainer
      data={homeState}
      events={eventList}
      onViewAllEvents={handleOnViewAllEvents}
      state={state}
      pdvList={pdvList}
    />
  );
};
