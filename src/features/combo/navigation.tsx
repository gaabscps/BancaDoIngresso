import React from 'react';
import { Route } from '@/navigation/Route';
import { ComboScreen } from '@/features/combo/screens/List';

export const PRODUTCT_ROUTES = {
  itself: '/dashboard/productscombos/combo',
};

export const ComboNavigation = (): JSX.Element => (
  <Route exact path={PRODUTCT_ROUTES.itself} component={ComboScreen} isPrivateRoute />
);
