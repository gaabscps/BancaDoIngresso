/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { SectorTicketContainer, States } from '@/features/registerEvent/screens/SectorTicket/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';

export const SectorTicketScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  const {
    formData: formDataSectorTicket,
    formErrors: formErrorsSectorTicket,
    onChangeFormInput: onChangeFormInputSectorTicket,
    isFormValid: isFormValidSectorTicket,
    resetForm: resetFormSectorTicket,
  } = useForm({
    initialData: {
      isTicket: '',
    },
    validators: {
      isTicket: [validators.required],
    },
    formatters: {},
  });

  const controllerFormSectorTicket: any = {
    formData: formDataSectorTicket,
    formErrors: formErrorsSectorTicket,
    onChangeFormInput: onChangeFormInputSectorTicket,
  };

  return <SectorTicketContainer formSectorTicket={controllerFormSectorTicket} state={state} />;
};
