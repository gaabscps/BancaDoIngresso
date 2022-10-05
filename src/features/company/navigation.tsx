import React from 'react';
import { Route } from '@/navigation/Route';
import { CompanyScreen } from '@/features/company/screens/List';

export const COMPANY_ROUTES = {
  itself: '/dashboard/company',
};

export const CompanyNavigation = (): JSX.Element => (
  <Route exact path={COMPANY_ROUTES.itself} component={CompanyScreen} isPrivateRoute />
);
