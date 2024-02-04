import React from 'react';
import { Route } from '@/navigation/Route';
import { PaymentGatewayScreen } from '@/features/paymentGateway/screens/List';

export const PAYMENTGATEWAY_ROUTES = {
  itself: '/dashboard/payment-gateway',
};

export const PaymentGatewayNavigation = (): JSX.Element => (
  <Route
    exact
    path={PAYMENTGATEWAY_ROUTES.itself}
    component={PaymentGatewayScreen}
    isPrivateRoute={false}
  />
);
