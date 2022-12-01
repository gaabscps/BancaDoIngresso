import React from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { PdvProductContainer } from './ui';
import { formPdvProductProps } from '../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorProductPosContainerProps {
  // state: States;
  nextTab: () => void;
  backTab: () => void;
}
export const PdvProductScreen: React.FC<SectorProductPosContainerProps> = ({
  // state,
  nextTab,
  backTab,
}) => {
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

  const controllerFormPos: formPdvProductProps = {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
  };

  return (
    <>
      <PdvProductContainer
        controllerFormPos={controllerFormPos}
        nextTab={nextTab}
        backTab={backTab}
        // state={state}
      />
    </>
  );
};
