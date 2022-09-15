/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Route as RouteWrapper, RouteProps, Redirect } from 'react-router-dom';
import { REACT_APP_AUTH } from '@/utils/config';
import { getBoolean } from '@/helpers/common/localStorage';
import { Default } from './Layout/Default';
import { Dashboard } from './Layout/Dashboard';
import { path as routes } from './path';

interface RouteWrapperProps extends RouteProps {
  component: any;
  isPrivateRoute?: boolean;
  path: string;
}

export const Route: React.FC<RouteWrapperProps> = ({
  component: Component,
  isPrivateRoute = false,
  path,
  ...rest
}: RouteWrapperProps): JSX.Element => {
  const signed = getBoolean(String(REACT_APP_AUTH));

  if (isPrivateRoute && !signed) {
    return <Redirect to={routes.Initial.itself} />;
  }

  if (!isPrivateRoute && signed) {
    return <Redirect to={routes.Dashboard.itself} />;
  }

  if (signed && path === routes.Initial.itself) {
    return <Redirect to={routes.Dashboard.itself} />;
  }

  const Layout = signed ? Dashboard : Default;

  return (
    <RouteWrapper
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};
