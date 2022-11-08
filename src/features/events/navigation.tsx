import React from 'react';
import { Route } from '@/navigation/Route';
import { EventScreen } from '@/features/events/screens/list';

export const EVENTS_ROUTES = {
  itself: '/dashboard/event',
};

export const EventsNavigation = (): JSX.Element => (
  <Route exact path={EVENTS_ROUTES.itself} component={EventScreen} isPrivateRoute />
);
