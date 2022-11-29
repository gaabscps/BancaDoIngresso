/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { PdvEventContainer, States } from '@/features/registerEvent/screens/Pdv/ui';
import useForm from '@/hooks/useForm';

export const PdvEventScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  const {
    formData: formDataPdv,
    formErrors: formErrorsPdv,
    onChangeFormInput: onChangeFormInputPdv,
    isFormValid: isFormValidPdv,
  } = useForm({
    initialData: {
      isPdv: '',
    },
    validators: {},
    formatters: {},
  });

  const {
    formData: formDataMainPdv,
    formErrors: formErrorsMainPdv,
    onChangeFormInput: onChangeFormInputMainPdv,
    isFormValid: isFormValidMainPdv,
  } = useForm({
    initialData: {
      isPdv: '',
    },
    validators: {},
    formatters: {},
  });

  const controllerFormPdv = {
    formData: formDataPdv,
    formErrors: formErrorsPdv,
    onChangeFormInput: onChangeFormInputPdv,
    isFormValid: isFormValidPdv,
  };

  const controllerFormMainPdv = {
    formData: formDataMainPdv,
    formErrors: formErrorsMainPdv,
    onChangeFormInput: onChangeFormInputMainPdv,
    isFormValid: isFormValidMainPdv,
  };

  return (
    <PdvEventContainer
      state={state}
      formPdv={controllerFormPdv}
      formMainPdv={controllerFormMainPdv}
    />
  );
};
