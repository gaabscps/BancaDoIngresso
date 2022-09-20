import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Buffer } from 'buffer';
// import { setItem } from '@/helpers/common/localStorage';
// import { REACT_APP_AUTH, REACT_APP_USER } from '@/utils/config';
import useForm from '@/hooks/useForm';
// import validators from '@/helpers/validators';
import { updateMask } from '@/helpers/masks/cpf';
// import { Auth } from '@/model/Auth';
import api, { AxiosError } from '@/services/api';
import { path } from '@/navigation/path';
import { ForgotPasswordResponse } from '../../types';

import { ForgotPasswordContainer, States, FormInputName } from './ui';

export const ForgotPasswordScreen: React.FC = (): JSX.Element => {
  const history = useHistory();
  const [state, setState] = useState<States>(States.default);

  const { formData, formErrors, setErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      document: '',
    },
    // validators: {
    //   document: [validators.required, validators.cpf],
    // },
    formatters: {
      document: updateMask,
    },
  });

  const handleGoToLogin = (): void => history.push(path.Initial.Login);

  const handleOnSubmit = async (): Promise<void> => {
    try {
      if (isFormValid()) {
        setState(States.loading);

        const { data } = await api.post<ForgotPasswordResponse>('/auth/recover-password', {
          login: formData[FormInputName.document],
        });

        history.push(path.Initial.CodeConfirm, {
          email: data.email,
          cpf: formData[FormInputName.document],
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      setErrors({
        document: [err.message],
      });
    } finally {
      setState(States.default);
    }
  };

  return (
    <ForgotPasswordContainer
      state={state}
      formData={formData}
      formErrors={formErrors}
      onChangeFormInput={onChangeFormInput}
      onSubmit={handleOnSubmit}
      onGoToLogin={handleGoToLogin}
      resendCode={handleOnSubmit}
    />
  );
};
