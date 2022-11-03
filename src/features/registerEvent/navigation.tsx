import React from 'react';
import { Route } from '@/navigation/Route';
import { EventScreen } from './screens';

export const REGISTEREVENT_ROUTES = {
  itself: '/dashboard/event/create',
  edit: '/dashboard/event/edit/:id',
};

export const RegisterEventNavigation = (): JSX.Element => (
  <React.Fragment>
    <Route exact path={REGISTEREVENT_ROUTES.itself} component={EventScreen} isPrivateRoute />
    <Route exact path={REGISTEREVENT_ROUTES.edit} component={EventScreen} isPrivateRoute />
  </React.Fragment>
);
