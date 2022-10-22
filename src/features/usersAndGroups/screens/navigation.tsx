import React from 'react';
import { Route } from '@/navigation/Route';
import { UserScreen } from '@/features/usersAndGroups/screens/List';

export const USER_ROUTES = {
  itself: '/dashboard/user',
};

export const UserNavigation = (): JSX.Element => (
  <Route exact path={USER_ROUTES.itself} component={UserScreen} isPrivateRoute />
);
