import React from 'react';
import { Route } from '@/navigation/Route';
import { MenuScreen } from '.';

export const MENU_ROUTES = {
  itself: '/dashboard/menu',
};

export const MenuNavigation = (): JSX.Element => (
  <Route exact path={MENU_ROUTES.itself} component={MenuScreen} isPrivateRoute />
);
