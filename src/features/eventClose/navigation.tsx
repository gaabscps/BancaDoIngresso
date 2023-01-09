import React from 'react';
import { Route } from '@/navigation/Route';
import { HomeEventCloseScreen } from '@/features/eventClose/screens/Home';
import { GeneralCollectionScreen } from './screens/GeneralCollection';

export const EVENTCLOSE_ROUTES = {
  itself: '/dashboard/event-close/:id',
  generalCollection: '/dashboard/event-close/general-collection/:id',
  revenues: '/dashboard/event-close/general-collection/:id',
  expenses: '/dashboard/event-close/general-collection/:id',
  machines: '/dashboard/event-close/general-collection/:id',
  finalSettlement: '/dashboard/event-close/final-settlement/:id',
};

export const EventCloseNavigation = (): JSX.Element => (
  <>
    <Route exact path={EVENTCLOSE_ROUTES.itself} component={HomeEventCloseScreen} isPrivateRoute />
    <Route
      exact
      path={EVENTCLOSE_ROUTES.generalCollection}
      component={GeneralCollectionScreen}
      isPrivateRoute
    />
  </>
);
