import React from 'react';
import { Switch } from 'react-router-dom';
import { Error404 } from '@/components';
import { AuthNavigation } from '@/features/auth/navigation';
import { DashboardNavigation } from '@/features/dashboard/navigation';
import { PdvNavigation } from '@/features/pdv/navigation';
import { renderRoutes } from './utils';
import { Route } from './Route';
import { path } from './path';

const Navigation: React.FC = (): JSX.Element => {
  const authRoutes = renderRoutes(AuthNavigation);
  const dashboardRoutes = renderRoutes(DashboardNavigation);
  const pdvRoutes = renderRoutes(PdvNavigation);

  return (
    <Switch>
      {authRoutes}
      {dashboardRoutes}
      {pdvRoutes}
      <Route path={path.Initial.All} component={Error404} />
    </Switch>
  );
};

export { Navigation };
