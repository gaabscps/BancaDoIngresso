/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { SectorProductContainer, States } from '@/features/registerEvent/screens/SectorProduct/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { formSectorProductProps } from './types';

export const SectorProductScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  const {
    formData: formDataSectorTicket,
    formErrors: formErrorsSectorTicket,
    onChangeFormInput: onChangeFormInputSectorTicket,
  } = useForm({
    initialData: {
      isProduct: '',
    },
    validators: {
      isProduct: [validators.required],
    },
    formatters: {},
  });

  const controllerFormSectorTicket: formSectorProductProps = {
    formData: formDataSectorTicket,
    formErrors: formErrorsSectorTicket,
    onChangeFormInput: onChangeFormInputSectorTicket,
  };

  return <SectorProductContainer formSectorTicket={controllerFormSectorTicket} state={state} />;
};
