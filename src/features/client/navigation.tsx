import React from 'react';
import { Route } from '@/navigation/Route';
import { ClientScreen } from '@/features/client/screens/List';

export const CLIENT_ROUTES = {
  itself: '/dashboard/client',
};

export const ClientNavigation = (): JSX.Element => (
  <Route exact path={CLIENT_ROUTES.itself} component={ClientScreen} isPrivateRoute={false} />
);
