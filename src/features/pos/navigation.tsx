import React from 'react';
import { Route } from '@/navigation/Route';
import { PosScreen } from '@/features/pos/screens/List';

export const POS_ROUTES = {
  itself: '/dashboard/pos',
};

export const PosNavigation = (): JSX.Element => (
  <Route exact path={POS_ROUTES.itself} component={PosScreen} isPrivateRoute={false} />
);
