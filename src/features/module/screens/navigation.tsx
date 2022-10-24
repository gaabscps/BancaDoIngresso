import React from 'react';
import { Route } from '@/navigation/Route';
import { ModuleScreen } from '@/features/module/screens';

export const MODULE_ROUTES = {
  itself: '/dashboard/module',
};

export const ModuleNavigation = (): JSX.Element => (
  <Route exact path={MODULE_ROUTES.itself} component={ModuleScreen} isPrivateRoute />
);
