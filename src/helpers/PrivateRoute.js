import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "../helpers/localStorage";

const PrivateRoute = ({ component: Component, child: Child, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated()) {
          if (Component) {
            if (!Child) {
              return <Component {...props} />;
            }
            return (
              <Component {...props}>
                <Child {...props} />
              </Component>
            );
          }
          return (
            <Redirect
              to={{
                pathname: "/dashboard/admin",
                state: { from: props.location },
              }}
            />
          );
        }
        return (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
