import React, { useState } from 'react';
import { path } from '@/navigation/path';
import { useHistory, useLocation } from 'react-router-dom';
import api from '@/services/api';
import { CodeConfirmContainer } from './ui';
import { ForgotPasswordResponse } from '../../types';
import { States } from '../Login/ui';

export const CodeConfirmScreen: React.FC = (): JSX.Element => {
  const history = useHistory();
  const [state] = useState<States>(States.default);

  const { state: stateLocation }: any = useLocation();

  const handleGoToLogin = (): void => history.push(path.Initial.Login);
  const handleGoToForgotPassword = (): void => history.push(path.Initial.ForgetPassword);

  const resendCode = async (): Promise<void> => {
    await api.post<ForgotPasswordResponse>('/auth/recover-password', {
      login: stateLocation.cpf,
    });
  };

  return (
    <CodeConfirmContainer
      resendCode={resendCode}
      onGoToLogin={handleGoToLogin}
      email={stateLocation.email}
      onGoToForgotPassword={handleGoToForgotPassword}
      state={state}
    />
  );
};
