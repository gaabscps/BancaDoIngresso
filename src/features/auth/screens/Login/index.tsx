import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApplicationState } from '@/store';
import { loginRequest } from '@/store/ducks/auth/actions';
import { AuthState } from '@/store/ducks/auth/types';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask } from '@/helpers/masks/cpf';

import { path } from '@/navigation/path';
import { LoginContainer, States, FormInputName } from './ui';

export const LoginScreen: React.FC = (): JSX.Element => {
  const history = useHistory();
  const { error } = useSelector<ApplicationState, AuthState>(store => store.auth);

  const dispatch = useDispatch();
  const [shouldShowPasswordToText, setShouldShowPasswordToText] = useState(false);

  const { formData, formErrors, setErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      document: '',
      password: '',
    },
    validators: {
      document: [validators.required, validators.cpf],
      password: [
        validators.required,
        validators.minLength(8),
        validators.maxLength(15),
        validators.hasPasswordOnlyNumberCharacteres,
      ],
    },
    formatters: {
      document: updateMask,
    },
  });

  const handleOnSubmit = async (): Promise<void> => {
    if (isFormValid()) {
      dispatch(loginRequest(formData[FormInputName.document], formData[FormInputName.password]));
    }
  };

  const handleOnTogglePasswordToText = (): void =>
    setShouldShowPasswordToText(!shouldShowPasswordToText);

  const handleGoToForgotPassword = (): void => history.push(path.Initial.ForgetPassword);

  useEffect(() => {
    if (error) {
      setErrors({
        document: ['Credencial inválida, por favor verifique e tente novamente.'],
      });
    }
  }, [error]);

  return (
    <LoginContainer
      state={States.default}
      // isLoading={isLoading}
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
