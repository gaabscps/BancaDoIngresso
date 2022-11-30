import React from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { SectorPosContainer } from './ui';
import { formPosProps } from '../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorProductPosContainerProps {
  state: States;
}
export const SectorPosScreen: React.FC<SectorProductPosContainerProps> = ({ state }) => {
  console.log(States);

  const {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
    // setErrors: setErrorsProduct,
    // resetForm: resetFormProduct,
  } = useForm({
    initialData: {
      allowPos: '',
      pos: '',
      waiter: '',
      commission: '',
      allowDiscount: '',
    },
    validators: {
      allowPos: [validators.required],
      pos: [validators.required],
      waiter: [validators.required],
      commission: [validators.required],
      allowDiscount: [validators.required],
    },
    formatters: {},
  });

  const controllerFormPos: formPosProps = {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
  };

  return (
    <>
      <SectorPosContainer controllerFormPos={controllerFormPos} state={state} />
    </>
  );
};
