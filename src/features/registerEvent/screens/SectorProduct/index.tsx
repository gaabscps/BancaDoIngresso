/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { SectorProductContainer, States } from '@/features/registerEvent/screens/SectorProduct/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { formSectorProductProps } from './types';

export const SectorProductScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  const {
    formData: formDataSectorProduct,
    formErrors: formErrorsSectorProduct,
    onChangeFormInput: onChangeFormInputSectorProduct,
  } = useForm({
    initialData: {
      isProduct: '',
    },
    validators: {
      isProduct: [validators.required],
    },
    formatters: {},
  });

  const controllerFormSectorProduct: formSectorProductProps = {
    formData: formDataSectorProduct,
    formErrors: formErrorsSectorProduct,
    onChangeFormInput: onChangeFormInputSectorProduct,
  };

  return <SectorProductContainer formSectorProduct={controllerFormSectorProduct} state={state} />;
};
