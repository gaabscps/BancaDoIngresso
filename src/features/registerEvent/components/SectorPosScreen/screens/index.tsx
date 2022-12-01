import React, { useState } from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useDialog } from '@/hooks/useDialog';
import { SectorPosContainer, ShouldShowModal } from './ui';
import { formPosProps, modalConfigPosProps, onShouldShowModalSectorPosProps } from '../types';

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
export const SectorPosScreen: React.FC<SectorProductPosContainerProps> = ({
  // state,
  nextTab,
  backTab,
}) => {
  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configPos,
  );

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

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
  }: // product: productSelected,
  onShouldShowModalSectorPosProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    // if (productSelected?.id && value === ShouldShowModal.configPos) {
    //   setProduct(productSelected);
    // }
  };

  const controllerModalConfig: modalConfigPosProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
  };

  return (
    <>
      <SectorPosContainer
        controllerModalConfig={controllerModalConfig}
        controllerFormPos={controllerFormPos}
        nextTab={nextTab}
        backTab={backTab}
        // state={state}
      />
    </>
  );
};