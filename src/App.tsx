import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import CheckLogedUser from './helpers/CheckLogedUser';
import PrivateRoute from './helpers/PrivateRoute';
import { RoteContent, routes } from './route';
import store from './store';

function App(): JSX.Element {
  const renderRoute = (index: number, routeContent: RoteContent): JSX.Element => {
    const { path, child: Child, component: Component, privateRoute } = routeContent;
    if (privateRoute) {
      return (
        <Route
          key={index}
          path={path}
          element={<PrivateRoute component={Component} child={Child} />}
        />
      );
    }
    return <Route key={index} path={path} element={<Component />} />;
  };
  return (
    <Fragment>
      <Provider store={store}>
        <CheckLogedUser />
        <BrowserRouter>
          <Routes>
            {routes.map((route: RoteContent, index: number) => renderRoute(index, route))}
          </Routes>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;
