import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import validators from '@/helpers/validators';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
// import { FormInputName as FormInputNameToPosRegister } from '@/features/registerEvent/components/PdvEventPosScreen/components/PosContent';
import Pos from '@/model/Pos';
import { useDialog } from '@/hooks/useDialog';
import { DeleteContent } from '@/components/DeleteContent';
import {
  formPosConfigProps,
  formPosProps,
  formPosRegisterProps,
  modalConfigPosSettingsProps,
  onShouldShowPosSettingsProps,
  posActionsProps,
} from '../types';
import { States, PdvEventPosContainer, ShouldShowModal } from './ui';

export const PdvEventPosScreen: React.FC<any> = ({ backTab, onFirstTab }): JSX.Element => {
  const [state, setState] = useState<States>(States.default);

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );

  const [pos, setPos] = useState<Pos>();
  const [posList, setPosList] = useState<Pos[]>([]);
  const [posOptions, setPosOptions] = useState<Pos[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
    // resetForm: resetFormPos,
  } = useForm({
    initialData: {
      hasPos: '',
    },
    validators: {
      hasPos: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataPosRegister,
    formErrors: formErrorsPosRegister,
    onChangeFormInput: onChangeFormInputPosRegister,
    isFormValid: isFormValidPosRegister,
    resetForm: resetFormPosRegister,
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

  const {
    formData: formDataPosConfig,
    formErrors: formErrorsPosConfig,
    onChangeFormInput: onChangeFormInputPosConfig,
    isFormValid: isFormValidPosConfig,
    // resetForm: resetFormPosConfig,
  } = useForm({
    initialData: {
      physicalSaleAllowCreditCardPayment: '',
      physicalSaleDebit: '',
      physicalSaleCredit: '',
      physicalSalePix: '',
      physicalSaleAdministrateTax: '',
      physicalSaleInstallments: '',
      physicalSaleFee: '',
    },
    validators: {},
    formatters: {},
  });

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    pos: posSelected,
  }: onShouldShowPosSettingsProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (posSelected?.id && value === ShouldShowModal.configProduct) {
      setPos(posSelected);
    }
  };

  const handleOnShowDeletePos = (posSelected: any): void => {
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
            console.log('TODO: Add function exclud item :>> ', posSelected);
          },
        },
      ],
    });
  };

  const controllerModalConfig: modalConfigPosSettingsProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
    onShowModalDelete: handleOnShowDeletePos,
  };
  // modal config ------------------------------------------------------------

  const handleGetAllPos = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Pos[]>('/pos/find');
      setPosOptions(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleNextTab = async (): Promise<void> => {
    // await handleOnSaveGeneralSettings();
    if (isFormValidPos()) {
      onFirstTab();
    }
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const handleOnGetPos = async (posSelected: Pos): Promise<void> => {
    try {
      if (posSelected) {
        setPos(posSelected);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditPos = (): void => {
    try {
      setPos(undefined);
      resetFormPosRegister();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const controllerFormPos: formPosProps = {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
  };

  const controllerFormPosRegister: formPosRegisterProps = {
    formData: formDataPosRegister,
    formErrors: formErrorsPosRegister,
    onChangeFormInput: onChangeFormInputPosRegister,
    isFormValid: isFormValidPosRegister,
  };

  const controllerFormPosConfig: formPosConfigProps = {
    formData: formDataPosConfig,
    formErrors: formErrorsPosConfig,
    onChangeFormInput: onChangeFormInputPosConfig,
    isFormValid: isFormValidPosConfig,
  };

  const controllerPosStates: any = {
    pos,
    setPos,
    posList,
    setPosList,
    posOptions,
    setPosOptions,
  };

  const controllerPosActions: posActionsProps = {
    // onSave: () => Promise<void>;
    onGet: handleOnGetPos,
    onCancelEdit: handleOnCancelEditPos,
    onFirstTab,
    onReturnTap: handleBackTab,
    onNextTap: handleNextTab,
  };

  useEffect(() => {
    handleGetAllPos();
  }, []);

  return (
    <PdvEventPosContainer
      state={state}
      formPos={controllerFormPos}
      formPosRegister={controllerFormPosRegister}
      formPosConfig={controllerFormPosConfig}
      posStates={controllerPosStates}
      posActions={controllerPosActions}
      modalConfig={controllerModalConfig}
    />
  );
};
