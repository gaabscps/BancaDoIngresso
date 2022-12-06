import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useDialog } from '@/hooks/useDialog';
import { AxiosError } from 'axios';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { formPosProps, modalConfigPosProps, onShouldShowModalSectorPosProps } from '../types';
import { SectorPosContainer, ShouldShowModal } from './ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorProductPosContainerProps {
  nextTab: () => void;
  backTab: () => void;
}

type UrlParams = {
  id: string;
};

export const SectorPosScreen: React.FC<SectorProductPosContainerProps> = ({ nextTab, backTab }) => {
  // const [state, setState] = useState<States>(States.default);
  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configPos,
  );
  const [posList, setPosList] = useState<any[]>([]);

  const params = useParams<UrlParams>();

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

  const handleGetPosList = async (id: string): Promise<void> => {
    try {
      // setState(States.loading);
      const { data } = await api.get(`event/section-product/${id}/pos`);

      setPosList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      // setState(States.default);
    }
  };

  useEffect(() => {
    handleGetPosList(params.id);
  }, []);

  return (
    <>
      <SectorPosContainer
        // state={state}
        controllerModalConfig={controllerModalConfig}
        controllerFormPos={controllerFormPos}
        posList={posList}
        nextTab={nextTab}
        backTab={backTab}
      />
    </>
  );
};
