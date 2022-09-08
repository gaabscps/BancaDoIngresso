import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from '@/navigation/Route';
import { LoginScreen } from '@/features/auth/screens/Login/indexSemSaga';

export const AUTH_ROUTES = {
  itself: '/',
  Login: '/login',
  ForgetPassword: '/forgot-password',
};
export const AuthNavigation = (): JSX.Element => (
  <React.Fragment>
    <Redirect from={AUTH_ROUTES.itself} exact to={AUTH_ROUTES.Login} />
    <Route path={AUTH_ROUTES.Login} component={LoginScreen} />
  </React.Fragment>
);
