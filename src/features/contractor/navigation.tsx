import React from 'react';
import { Route } from '@/navigation/Route';
import { ContractorScreen } from '@/features/contractor/screens/List';

export const COMPANY_ROUTES = {
  itself: '/dashboard/contractor',
};

export const ContractorNavigation = (): JSX.Element => (
  <Route exact path={COMPANY_ROUTES.itself} component={ContractorScreen} isPrivateRoute />
);
