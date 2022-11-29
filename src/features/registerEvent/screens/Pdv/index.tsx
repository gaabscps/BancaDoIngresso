/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { PdvEventContainer, States } from '@/features/registerEvent/screens/Pdv/ui';
import useForm from '@/hooks/useForm';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { DeleteContent } from '@/components/DeleteContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';

export const PdvEventScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);
  const confirmDelete = useConfirmDelete();

  const [mainPdv, setMainPdv] = useState();

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
    resetForm: resetFormMainPdv,
  } = useForm({
    initialData: {
      isPdv: '',
    },
    validators: {},
    formatters: {},
  });

  const handleOnShowDeleteMainPdv = (mainPdvSelected: any): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => confirmDelete.hide(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): void => {
            console.log('TODO: Add function exclude item :>> ', mainPdvSelected);
          },
        },
      ],
    });
  };

  const handleOnGetMainPdv = async (mainPdvSelected: any): Promise<void> => {
    try {
      if (mainPdvSelected) {
        setMainPdv(mainPdvSelected);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditMainPdv = (): void => {
    try {
      setMainPdv(undefined);
      resetFormMainPdv();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const controllerMainPdvActions: any = {
    onGet: handleOnGetMainPdv,
    onCancelEdit: handleOnCancelEditMainPdv,
    onShowModalDelete: handleOnShowDeleteMainPdv,
  };

  const controllerMainPdvStates: any = {
    mainPdv,
    setMainPdv,
  };

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
      mainPdvActions={controllerMainPdvActions}
      mainPdvStates={controllerMainPdvStates}
    />
  );
};
