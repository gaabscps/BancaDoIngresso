import React from 'react';
import { Route } from '@/navigation/Route';
import { ReportsScreen } from '@/features/reports/screens';

export const REPORTS_ROUTES = {
  itself: '/dashboard/event/reports/:id',
};

export const ReportsNavigation = (): JSX.Element => (
  <Route exact path={REPORTS_ROUTES.itself} component={ReportsScreen} isPrivateRoute />
);
