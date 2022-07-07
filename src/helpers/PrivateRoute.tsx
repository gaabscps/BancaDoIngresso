import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

import { isAuthenticated } from './localStorage';

interface Props extends RouteProps {
  component: (props: any) => JSX.Element;
  child?: (props: any) => JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, child: Child }) => {
  let redirectPath = '';
  if (!isAuthenticated()) {
    redirectPath = '/';
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }
  if (Component) {
    if (Child) {
      return (
        <Component>
          <Child />
        </Component>
      );
    }
    return <Component />;
  }
  return <Navigate to="" />;
};

export default PrivateRoute;
