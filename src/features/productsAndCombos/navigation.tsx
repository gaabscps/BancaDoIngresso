import React from 'react';
import { Route } from '@/navigation/Route';
import { HomeProductComboScreen } from '@/features/productsAndCombos/screens/Home';

export const PRODUTCTSCOMBOS_ROUTES = {
  itself: '/dashboard/productscombos',
};

export const ProductsCombosNavigation = (): JSX.Element => (
  <Route
    exact
    path={PRODUTCTSCOMBOS_ROUTES.itself}
    component={HomeProductComboScreen}
    isPrivateRoute
  />
);
