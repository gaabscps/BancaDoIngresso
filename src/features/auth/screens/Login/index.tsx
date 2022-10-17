import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Buffer } from 'buffer';
import { setItem } from '@/helpers/common/localStorage';
import { REACT_APP_AUTH, REACT_APP_USER } from '@/utils/config';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask } from '@/helpers/masks/cpf';
import { Auth } from '@/model/Auth';
import api, { AxiosError } from '@/services/api';
import { path } from '@/navigation/path';

import { toast } from 'react-toastify';
import { LoginContainer, States, FormInputName } from './ui';

export const LoginScreen: React.FC = (): JSX.Element => {
  const history = useHistory();
  const [state, setState] = useState<States>(States.default);

  const [shouldShowPasswordToText, setShouldShowPasswordToText] = useState(false);

  const { formData, formErrors, setErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      document: '',
      password: '',
    },
    validators: {
      document: [validators.required],
      password: [
        validators.required,
        /*         validators.minLength(8),
        validators.maxLength(15),
        validators.hasPasswordOnlyNumberCharacteres, */
      ],
    },
    formatters: {
      document: updateMask,
    },
  });

  const handleOnSubmit = async (): Promise<void> => {
    try {
      if (isFormValid()) {
        setState(States.loading);

        const payload = Buffer.from(
          `${formData[FormInputName.document]}:${formData[FormInputName.password]}`,
          'utf8',
        ).toString('base64');

        const { data } = await api.post<Auth>(
          '/auth',
          {
            grant_type: 'client_credentials',
          },
          {
            headers: {
              Authorization: `Basic ${payload}`,
            },
          },
        );

        setItem(String(REACT_APP_AUTH), data);
        setItem(String(REACT_APP_USER), data.user);

        history.push(path.Dashboard.itself);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.code && err.code === 'ERR_BAD_REQUEST') {
        setErrors({
          document: ['CPF ou Senha inválida'],
          password: ['CPF ou Senha inválida'],
        });
      } else {
        toast.error('Falha ao realizar login, tentar novamente mais tarde');
      }
    } finally {
      setState(States.default);
    }
  };

  const handleOnTogglePasswordToText = (): void =>
    setShouldShowPasswordToText(!shouldShowPasswordToText);

  const handleGoToForgotPassword = (): void => history.push(path.Initial.ForgetPassword);

  return (
    <LoginContainer
      state={state}
      shouldShowPasswordToText={shouldShowPasswordToText}
      formData={formData}
      formErrors={formErrors}
      onChangeFormInput={onChangeFormInput}
      onSubmit={handleOnSubmit}
      onTogglePasswordToText={handleOnTogglePasswordToText}
      onGoToForgotPassword={handleGoToForgotPassword}
    />
  );
};
