import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import validators from '@/helpers/validators';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import SubPdv from '@/model/SubPdv';
import { useDialog } from '@/hooks/useDialog';
import { DeleteContent } from '@/components/DeleteContent';
import {
  formSubPdvProps,
  formSubPdvRegisterProps,
  modalConfigSubPdvSettingsProps,
  onShouldShowSubPdvSettingsProps,
  subPdvActionsProps,
} from '../types';
import { States, PdvEventSubPdvContainer, ShouldShowModal } from './ui';

export const PdvEventSubPdvScreen: React.FC<any> = ({ backTab, onFirstTab }): JSX.Element => {
  const [state, setState] = useState<States>(States.default);

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );

  const [subPdv, setSubPdv] = useState<SubPdv>();
  const [subPdvList, setSubPdvList] = useState<SubPdv[]>([]);
  const [subPdvOptions, setSubPdvOptions] = useState<SubPdv[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataSubPdv,
    formErrors: formErrorsSubPdv,
    onChangeFormInput: onChangeFormInputSubPdv,
    isFormValid: isFormValidSubPdv,
  } = useForm({
    initialData: {
      hasSubPdv: '',
    },
    validators: {
      hasSubPdv: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataSubPdvRegister,
    formErrors: formErrorsSubPdvRegister,
    onChangeFormInput: onChangeFormInputSubPdvRegister,
    isFormValid: isFormValidSubPdvRegister,
    resetForm: resetFormSubPdvRegister,
  } = useForm({
    initialData: {
      name: '',
      partialPayment: '',
    },
    validators: {
      name: [validators.required],
      partialPayment: [validators.required],
    },
    formatters: {},
  });

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    subPdv: subPdvSelected,
  }: onShouldShowSubPdvSettingsProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (subPdvSelected?.id && value === ShouldShowModal.configProduct) {
      setSubPdv(subPdvSelected);
    }
  };

  const handleOnShowDeleteSubPdv = (subPdvSelected: any): void => {
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
            console.log('TODO: Add function exclud item :>> ', subPdvSelected);
          },
        },
      ],
    });
  };

  const controllerModalConfig: modalConfigSubPdvSettingsProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
    onShowModalDelete: handleOnShowDeleteSubPdv,
  };
  // modal config ------------------------------------------------------------

  const handleGetAllSubPdv = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<SubPdv[]>('/subPdv/find');
      setSubPdvOptions(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleNextTab = async (): Promise<void> => {
    if (isFormValidSubPdv()) {
      onFirstTab();
    }
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const handleOnGetSubPdv = async (subPdvSelected: SubPdv): Promise<void> => {
    try {
      if (subPdvSelected) {
        setSubPdv(subPdvSelected);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditSubPdv = (): void => {
    try {
      setSubPdv(undefined);
      resetFormSubPdvRegister();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const controllerFormSubPdv: formSubPdvProps = {
    formData: formDataSubPdv,
    formErrors: formErrorsSubPdv,
    onChangeFormInput: onChangeFormInputSubPdv,
    isFormValid: isFormValidSubPdv,
  };

  const controllerFormSubPdvRegister: formSubPdvRegisterProps = {
    formData: formDataSubPdvRegister,
    formErrors: formErrorsSubPdvRegister,
    onChangeFormInput: onChangeFormInputSubPdvRegister,
    isFormValid: isFormValidSubPdvRegister,
  };

  const controllerSubPdvStates: any = {
    subPdv,
    setSubPdv,
    subPdvList,
    setSubPdvList,
    subPdvOptions,
    setSubPdvOptions,
  };

  const controllerSubPdvActions: subPdvActionsProps = {
    // onSave: () => Promise<void>;
    onGet: handleOnGetSubPdv,
    onCancelEdit: handleOnCancelEditSubPdv,
    onFirstTab,
    onReturnTap: handleBackTab,
    onNextTap: handleNextTab,
  };

  useEffect(() => {
    handleGetAllSubPdv();
  }, []);

  return (
    <PdvEventSubPdvContainer
      state={state}
      formSubPdv={controllerFormSubPdv}
      formSubPdvRegister={controllerFormSubPdvRegister}
      subPdvStates={controllerSubPdvStates}
      subPdvActions={controllerSubPdvActions}
      modalConfig={controllerModalConfig}
    />
  );
};
