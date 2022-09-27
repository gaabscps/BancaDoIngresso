import React from 'react';
import { Route } from '@/navigation/Route';
import { PaymentMethodsScreen } from '@/features/paymentMethods/screens/List';

export const POS_ROUTES = {
  itself: '/dashboard/payment',
};

export const PaymentMethodsNavigation = (): JSX.Element => (
  <Route exact path={POS_ROUTES.itself} component={PaymentMethodsScreen} isPrivateRoute />
);
