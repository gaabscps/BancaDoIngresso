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
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
    // resetForm: resetFormProduct,
  } = useForm({
    initialData: {
      allowProduct: 'true',
      sector: '',
      product: '',
    },
    validators: {
      allowProduct: [validators.required],
      sector: [validators.required],
      product: [validators.required],
    },
    formatters: {},
  });

  const controllerFormPos: formPdvProductProps = {
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
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
