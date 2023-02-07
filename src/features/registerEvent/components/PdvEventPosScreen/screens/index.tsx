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
import Pdv from '@/model/Pdv';
import CardFees from '@/model/CardFees';
import EventPdvPos from '@/model/EventPdvPos';
import { unmask } from '@/helpers/masks/cashNumber';
import { toPercentage } from '@/helpers/common/amount';
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
import { FormInputName as FormInputNameConfig } from '../components/PosConfigContent';

type UrlParams = {
  id: string;
};

interface PdvEventPosScreen extends TabPdvActionsProps {
  pdvId?: string;
  handleGetEventPhaseCompletion: () => void;
}

export const PdvEventPosScreen: React.FC<Omit<PdvEventPosScreen, 'firstTab'>> = ({
  pdvId,
  handleGetEventPhaseCompletion,
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
      hasPos: 'false',
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
    resetForm: resetFormPosConfig,
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
    if (posSelected.cardFees) {
      onChangeFormInputPosConfig(FormInputNameConfig.physicalSaleAllowCreditCardPayment)(
        posSelected.cardFees.allowCreditCardPayment ? 'true' : 'false',
      );
      onChangeFormInputPosConfig(FormInputNameConfig.physicalSaleDebit)(
        posSelected.cardFees.debit ? toPercentage(posSelected.cardFees.debit) : '',
      );
      onChangeFormInputPosConfig(FormInputNameConfig.physicalSaleCredit)(
        posSelected.cardFees.credit ? toPercentage(posSelected.cardFees.credit) : '',
      );
      onChangeFormInputPosConfig(FormInputNameConfig.physicalSalePix)(
        posSelected.cardFees.pix ? toPercentage(posSelected.cardFees.pix) : '',
      );
      onChangeFormInputPosConfig(FormInputNameConfig.physicalSaleAdministrateTax)(
        posSelected.cardFees.administrateTax
          ? toPercentage(posSelected.cardFees.administrateTax)
          : '',
      );
      onChangeFormInputPosConfig(FormInputNameConfig.physicalSaleInstallments)(
        posSelected.cardFees.installments ? String(posSelected.cardFees.installments) : '',
      );
      onChangeFormInputPosConfig(FormInputNameConfig.physicalSaleFee)(
        posSelected.cardFees.fee ? toPercentage(posSelected.cardFees.fee) : '',
      );
    }
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (posSelected.pos.id && value === ShouldShowModal.configProduct) {
      setPos(posSelected.pos);
    }
  };

  const getPos = async (): Promise<void> => {
    if (pdvId) {
      const response = await api.get<EventPdvPos[]>(`/event/pdv/${params.id}/pos/${pdvId}/`);
      if (response.data.length > 0) {
        onChangeFormInputPos(FormInputName.hasPos)('true');
      }
      setPosList(response.data);
    }
    handleGetEventPhaseCompletion();
  };

  const handleOnConfirmDelete = async (posSelected: Pos): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(`/event/pdv/${params.id}/pos/${pdvId}/${posSelected.id}`);
      await getPos();
      toast.success('POS excluída com sucesso!');
      confirmDelete.hide();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleHasPos = async (b: string): Promise<void> => {
    try {
      handleGetEventPhaseCompletion();
      setState(States.loading);
      await api.patch(`/event/pdv/${params.id}/pos/${pdvId}/has/${b}`);
    } finally {
      setState(States.default);
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

  const handleGetAllPos = async (): Promise<void> => {
    try {
      setState(States.loading);
      await getPos();
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

  const handleOnGetPos = async (posSelected: EventPdvPos): Promise<void> => {
    if (posSelected) {
      setPos(posSelected.pos);

      onChangeFormInputPosRegister(FormInputNameRegister.name)(posSelected.pos.id as string);
      onChangeFormInputPosRegister(FormInputNameRegister.partialPayment)(
        toPercentage(posSelected.waiter),
      );
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
        const request = {
          pdv,
          pos: posReq,
          waiter: unmask(
            formDataPosRegister[FormInputNameRegister.partialPayment],
          ) as unknown as number,
        } as EventPdvPos;
        // if (posList.find(list => list.pos.id === request.pos.id)) {
        //   toast.error('POS já cadastrada!');
        //   return;
        // }
        await api.post<EventPdvPos>(`/event/pdv/${params.id}/pos/`, request);
        resetFormPosRegister();
        await getPos();
        toast.success('POS cadastrada com sucesso!');
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
    }
  };

  const handleOnSavePosConfg = async (): Promise<void> => {
    if (isFormValidPosConfig()) {
      try {
        setState(States.loading);
        const cardFees = {
          allowCreditCardPayment:
            formDataPosConfig[FormInputNameConfig.physicalSaleAllowCreditCardPayment] === 'true',
          debit: +unmask(formDataPosConfig[FormInputNameConfig.physicalSaleDebit]),
          credit: +unmask(formDataPosConfig[FormInputNameConfig.physicalSaleCredit]),
          pix: +unmask(formDataPosConfig[FormInputNameConfig.physicalSalePix]),
          administrateTax: +unmask(
            formDataPosConfig[FormInputNameConfig.physicalSaleAdministrateTax],
          ),
          installments: Number(formDataPosConfig[FormInputNameConfig.physicalSaleInstallments]),
          fee: +unmask(formDataPosConfig[FormInputNameConfig.physicalSaleFee]),
        } as CardFees;

        await api.post(`/event/pdv/${params.id}/pos/${pdvId}/fee/${pos?.id}`, cardFees);

        toast.success('Configurações salvas com sucesso!');

        resetFormPosConfig();
        handleOnCancelEditPos();
        onToggle();
        await handleGetEventPhaseCompletion();
        await getPos();
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
    onSave: handleOnSavePosConfg,
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
    getPos();
  }, [pdvId]);

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
      handleHasPos={handleHasPos}
    />
  );
};
