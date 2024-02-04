import React from 'react';
import { Route } from '@/navigation/Route';
import { HomeScreen } from '@/features/dashboard/screens/Home';

export const DASHBOARD_ROUTES = {
  itself: '/dashboard',
};

export const DashboardNavigation = (): JSX.Element => (
  <Route exact path={DASHBOARD_ROUTES.itself} component={HomeScreen} />
);
