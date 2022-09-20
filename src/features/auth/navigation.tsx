import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from '@/navigation/Route';
import { LoginScreen } from '@/features/auth/screens/Login';
import { ForgotPasswordScreen } from '@/features/auth/screens/ForgotPassword';
import { CodeConfirmScreen } from './screens/CodeConfirm';
import { NewPasswordScreen } from './screens/NewPassword';

export const AUTH_ROUTES = {
  itself: '/',
  Login: '/login',
  ForgetPassword: '/forgot-password',
  CodeConfirm: '/code-confirm',
  NewPassword: '/forget-pwd',
};
export const AuthNavigation = (): JSX.Element => (
  <React.Fragment>
    <Redirect from={AUTH_ROUTES.itself} exact to={AUTH_ROUTES.Login} />
    <Route path={AUTH_ROUTES.Login} component={LoginScreen} />
    <Route path={AUTH_ROUTES.ForgetPassword} component={ForgotPasswordScreen} />
    <Route path={AUTH_ROUTES.CodeConfirm} component={CodeConfirmScreen} />
    <Route path={AUTH_ROUTES.NewPassword} component={NewPasswordScreen} />
  </React.Fragment>
);
