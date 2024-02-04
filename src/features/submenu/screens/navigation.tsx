import React from 'react';
import { Route } from '@/navigation/Route';
import { SubMenuScreen } from '.';

export const SUB_MENU_ROUTES = {
  itself: '/dashboard/sub-menu',
};

export const SubMenuNavigation = (): JSX.Element => (
  <Route exact path={SUB_MENU_ROUTES.itself} component={SubMenuScreen} isPrivateRoute={false} />
);
