import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from "./route";
import PrivateRoute from "./helpers/PrivateRoute";
import { toast } from "react-toastify";

const Root = () => {
  toast.configure();

  const renderRoute = ({ path, child, component: Component, privateRoute }) => {
    if (privateRoute) {
      return (
        <PrivateRoute path={path} exact component={Component} child={child} />
      );
    } else {
      return (
        <Route exact path={path} render={(props) => <Component {...props} />} />
      );
    }
  };

  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>{routes.map((route) => renderRoute(route))}</Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
