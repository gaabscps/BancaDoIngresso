import React from 'react';
import { Route } from '@/navigation/Route';
import { ProductScreen } from '@/features/product/screens/List';

export const PRODUTCT_ROUTES = {
  itself: '/dashboard/productscombos/product',
};

export const ProductNavigation = (): JSX.Element => (
  <Route exact path={PRODUTCT_ROUTES.itself} component={ProductScreen} isPrivateRoute={false} />
);
