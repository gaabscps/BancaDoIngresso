import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HomeState } from '@/store/ducks/home/types';
import { ApplicationState } from '@/store';
import { getRequest } from '@/store/ducks/home/actions';
import eventos from '@/utils/eventos.json';
import { path } from '@/navigation/path';

import { HomeContainer, Events } from './ui';

const events: Events[] = [];
eventos.eventos.forEach(event => events.push(event));

export const HomeScreen: React.FC = (): JSX.Element => {
  const homeState = useSelector<ApplicationState, HomeState>(store => store.home);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequest());
  }, []);

  const handleOnViewAllEvents = (): void => {
    history.push(path.Dashboard.Events.itself);
  };

  return <HomeContainer data={homeState} events={events} onViewAllEvents={handleOnViewAllEvents} />;
};
