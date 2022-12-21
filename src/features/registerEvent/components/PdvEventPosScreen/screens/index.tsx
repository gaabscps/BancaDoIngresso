import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import validators from '@/helpers/validators';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import Pos from '@/model/Pos';
import { useDialog } from '@/hooks/useDialog';
import { DeleteContent } from '@/components/DeleteContent';
import { TabPdvActionsProps } from '@/features/registerEvent/screens/Pdv/ui';
import { useParams } from 'react-router-dom';
import EventPdvPos from '@/model/EventPdvPos';
import Pdv from '@/model/Pdv';
import {
  formPosConfigProps,
  formPosProps,
  formPosRegisterProps,
  modalConfigPosSettingsProps,
  onShouldShowPosSettingsProps,
  posActionsProps,
} from '../types';
import { States, PdvEventPosContainer, ShouldShowModal, FormInputName } from './ui';
import { FormInputName as FormInputNameRegister } from '../components/PosContent';

type UrlParams = {
  id: string;
};

interface PdvEventPosScreen extends TabPdvActionsProps {
  pdvId?: string;
}

export const PdvEventPosScreen: React.FC<Omit<PdvEventPosScreen, 'firstTab'>> = ({
  pdvId,
  backTab,
  nextTab,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );

  const [pos, setPos] = useState<Pos>();
  const [posList, setPosList] = useState<EventPdvPos[]>([]);
  const [posOptions, setPosOptions] = useState<Pos[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const params = useParams<UrlParams>();

  const {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
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
  const handleOnConfirmDelete = async (posSelected: Pos): Promise<void> => {
    try {
      await api.delete(`/event/pdv/${params.id}/${posSelected.id}`);
      toast.success('POS excluída com sucesso!');
      confirmDelete.hide();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeletePos = (posSelected: Pos): void => {
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
            handleOnConfirmDelete(posSelected);
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

  const getPoss = async (): Promise<void> => {
    if (pdvId) {
      const response = await api.get<EventPdvPos[]>(`/event/pdv/${params.id}/pos/${pdvId}/`);
      if (response.data.length > 0) {
        onChangeFormInputPos(FormInputName.hasPos)('true');
      }
      setPosList(response.data);
    }
  };

  const handleGetAllPos = async (): Promise<void> => {
    try {
      setState(States.loading);
      await getPoss();
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
    if (isFormValidPos()) {
      nextTab();
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

  const handleInsertPos = async (): Promise<void> => {
    if (isFormValidPosRegister()) {
      try {
        setState(States.loading);
        const pdv = {
          id: pdvId,
        } as Pdv;
        const posReq = {
          id: formDataPosRegister[FormInputNameRegister.name],
        } as Pos;
        const request: EventPdvPos = {
          pdv,
          pos: posReq,
          waiter: formDataPosRegister[FormInputNameRegister.partialPayment] as unknown as number,
        };

        await api.post<EventPdvPos>(`/event/pdv/${params.id}/pos/`, request);
        resetFormPosRegister();
        await getPoss();
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
    }
  };

  const controllerFormPos: formPosProps = {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    onInsertPos: handleInsertPos,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
