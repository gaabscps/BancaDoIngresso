import React from 'react';
import { Route } from '@/navigation/Route';
import { PermissionScreen } from '.';

export const PERMISSION_ROUTES = {
  itself: '/dashboard/permission',
};

export const PermissionNavigation = (): JSX.Element => (
  <Route exact path={PERMISSION_ROUTES.itself} component={PermissionScreen} isPrivateRoute />
);
