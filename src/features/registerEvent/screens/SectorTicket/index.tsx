/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { SectorTicketContainer, States } from '@/features/registerEvent/screens/SectorTicket/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { formSectorTicketProps } from './types';

export const SectorTicketScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  const {
    formData: formDataSectorTicket,
    formErrors: formErrorsSectorTicket,
    onChangeFormInput: onChangeFormInputSectorTicket,
  } = useForm({
    initialData: {
      isTicket: '',
    },
    validators: {
      isTicket: [validators.required],
    },
    formatters: {},
  });

  const controllerFormSectorTicket: formSectorTicketProps = {
    formData: formDataSectorTicket,
    formErrors: formErrorsSectorTicket,
    onChangeFormInput: onChangeFormInputSectorTicket,
  };

  return <SectorTicketContainer formSectorTicket={controllerFormSectorTicket} state={state} />;
};
