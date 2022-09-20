import React, { useState } from 'react';
import { updateMask } from '@/helpers/masks/cpf';
import validators from '@/helpers/validators';
import useForm from '@/hooks/useForm';
import ChangePassword from '@/model/ChangePassword';
import api, { AxiosError } from '@/services/api';
import { useHistory, useLocation } from 'react-router-dom';
import { useDialog } from '@/hooks/useDialog';
import { Auth } from '@/model/Auth';
import { Buffer } from 'buffer';
import { setItem } from '@/helpers/common/localStorage';
import { REACT_APP_AUTH, REACT_APP_USER } from '@/utils/config';
import { path } from '@/navigation/path';
import { FormInputName, NewPasswordContainer } from './ui';
import { States } from '../Login/ui';

export const NewPasswordScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [shouldShowPasswordToText, setShouldShowPasswordToText] = useState(false);
  const [shouldShowConfirmPasswordToText, setShouldShowConfirmPasswordToText] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { onToggle, visible } = useDialog();

  const token = new URLSearchParams(location.search).get('code');

  const { formData, formErrors, onChangeFormInput, isFormValid, setErrors } = useForm({
    initialData: {
      confirmPassword: '',
      password: '',
    },
    validators: {
      password: [
        validators.required,
        validators.minLength(8),
        validators.maxLength(15),
        validators.hasPasswordOnlyNumberCharacteres,
      ],
      confirmPassword: [
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

  const handleOnTogglePasswordToText = (): void =>
    setShouldShowPasswordToText(!shouldShowPasswordToText);

  const handleOnToggleConfirmPasswordToText = (): void =>
    setShouldShowConfirmPasswordToText(!shouldShowConfirmPasswordToText);

  const handleOnGoToDashboard = (): void => {
    history.push(path.Dashboard.itself);
  };

  const passwordMatch: boolean =
    formData[FormInputName.password] === formData[FormInputName.confirmPassword];

  const onSubmit = async (): Promise<void> => {
    try {
      if (isFormValid()) {
        setState(States.loading);

        if (passwordMatch) {
          const fetchChangePassword = await api.post<ChangePassword>('/auth/change-password', {
            token,
            password: formData[FormInputName.password],
            confirmPassword: formData[FormInputName.confirmPassword],
          });
          const payload = Buffer.from(
            `${fetchChangePassword.data.login}:${formData[FormInputName.password]}`,
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
          onToggle();
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      setErrors({
        password: [err.message],
        confirmPassword: [err.message],
      });
    }
  };

  return (
    <NewPasswordContainer
      onGoToDashboard={handleOnGoToDashboard}
      onToggle={onToggle}
      visible={visible}
      onChangeFormInput={onChangeFormInput}
      shouldShowPasswordToText={shouldShowPasswordToText}
      formData={formData}
      formErrors={formErrors}
      state={state}
      onToggleConfirmPasswordToText={handleOnToggleConfirmPasswordToText}
      onTogglePasswordToText={handleOnTogglePasswordToText}
      shouldShowConfirmPasswordToText={shouldShowConfirmPasswordToText}
      onSubmit={onSubmit}
    />
  );
};
