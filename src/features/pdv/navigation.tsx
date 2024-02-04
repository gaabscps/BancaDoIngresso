import React from 'react';
import { Route } from '@/navigation/Route';
import { PdvScreen } from '@/features/pdv/screens/List';

export const PDV_ROUTES = {
  itself: '/dashboard/pdv',
};

export const PdvNavigation = (): JSX.Element => (
  <Route exact path={PDV_ROUTES.itself} component={PdvScreen} isPrivateRoute={false} />
);
