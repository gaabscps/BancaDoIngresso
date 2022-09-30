import React from 'react';
import { Route } from '@/navigation/Route';
import { GroupSubgroupProductScreen } from '@/features/groupSubgroupProduct/screens/List';

export const GROUPSUBGROUPPRODUCT_ROUTES = {
  itself: '/dashboard/productscombos/groupsubgroupproduct',
};

export const GroupSubgroupProductNavigation = (): JSX.Element => (
  <Route
    exact
    path={GROUPSUBGROUPPRODUCT_ROUTES.itself}
    component={GroupSubgroupProductScreen}
    isPrivateRoute
  />
);
