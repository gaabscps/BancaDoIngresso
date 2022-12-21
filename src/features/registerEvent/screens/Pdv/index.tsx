/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { FormInputName, PdvEventContainer, States } from '@/features/registerEvent/screens/Pdv/ui';
import useForm from '@/hooks/useForm';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { DeleteContent } from '@/components/DeleteContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import api from '@/services/api';
import EventPdv from '@/model/EventPdv';
import Pdv from '@/model/Pdv';
import validators from '@/helpers/validators';
import { useParams } from 'react-router-dom';
import EventPdvMain from '@/model/EventPdvMain';
import { mainPdvStatesProps } from '../../components/PdvScreen/types';
import { FormInputName as FormInputMainName } from '../../components/MainPdvContent';

type UrlParams = {
  id: string;
};

export const PdvEventScreen: React.FC = (): JSX.Element => {
  const params = useParams<UrlParams>();
  const [state, setState] = useState<States>(States.default);
  const [pdvId, setPdvId] = useState<string>();
  const [numberTab, setNumberTab] = useState(0);
  const confirmDelete = useConfirmDelete();
  const [mainPdv, setMainPdv] = useState<Pdv>();
  const [eventPDVs, setEventPDVs] = useState<EventPdv[]>([]);
  const [mainPdvList, setMainPdvList] = useState<Pdv[]>([]);

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
      pdv: '',
      allowMoney: 'true',
      allowAdvanceFee: 'true',
      allowDebit: 'true',
      allowCreditCard: 'true',
      // allowBankSlip:'true',
      allowPix: 'true',
      allowSellingWebsite: 'false',
      allowDiscount: 'true',
    },
    validators: {
      pdv: [validators.required],
      allowMoney: [validators.required],
      allowAdvanceFee: [validators.required],
      allowDebit: [validators.required],
      allowCreditCard: [validators.required],
      // allowBankSlip:[validators.required],
      allowPix: [validators.required],
      allowSellingWebsite: [validators.required],
      allowDiscount: [validators.required],
    },
    formatters: {},
  });

  const handleOnShowDeleteMainPdv = (mainPdvSelected: Pdv): void => {
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

  const handleFecthPdvList = async (): Promise<void> => {
    if (params.id) {
      try {
        setState(States.loading);
        const responseEventPDVs = await api.get<EventPdv[]>(`/event/pdv/${params.id}`);
        if (responseEventPDVs.data && responseEventPDVs.data.length > 0) {
          onChangeFormInputPdv(FormInputName.isPdv)('true');
          setEventPDVs(responseEventPDVs.data);
          const { data } = await api.get<Pdv[]>(`/pdv/find`);
          setMainPdvList(data ?? []);
        }
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
    }
  };

  const handleOnGetMainPdv = async (mainPdvSelected: Pdv): Promise<void> => {
    try {
      if (mainPdvSelected) {
        setMainPdv(mainPdvSelected);
        handleChangeSelectedPdv(mainPdvSelected.id as string);
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
    onGetList: handleFecthPdvList,
    onGet: handleOnGetMainPdv,
    onCancelEdit: handleOnCancelEditMainPdv,
    onShowModalDelete: handleOnShowDeleteMainPdv,
  };

  const controllerMainPdvStates: mainPdvStatesProps = {
    mainPdv,
    setMainPdv,
    mainPdvList,
    setMainPdvList,
    eventPDVs,
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

  const handleChangeSelectedPdv = (value: string): void => {
    setPdvId(value);
    let found = false;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < eventPDVs.length; i++) {
      if (eventPDVs[i].pdv.id === value) {
        onChangeFormInputPdv(FormInputName.isPdv)('true');
        onChangeFormInputMainPdv(FormInputMainName.pdv)(eventPDVs[i].pdv.id as string);
        onChangeFormInputMainPdv(FormInputMainName.allowMoney)(
          eventPDVs[i].allowMoney ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowAdvanceFee)(
          eventPDVs[i].allowAdvanceFee ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowDebit)(
          eventPDVs[i].allowDebit ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowCreditCard)(
          eventPDVs[i].allowCreditCard ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowPix)(
          eventPDVs[i].allowPix ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowSellingWebsite)(
          eventPDVs[i].allowSellingWebsite ? 'true' : 'false',
        );
        onChangeFormInputMainPdv(FormInputMainName.allowDiscount)(
          eventPDVs[i].allowDiscount ? 'true' : 'false',
        );
        found = true;
        break;
      }
    }
    if (!found) {
      resetFormMainPdv();
    }
  };

  const saveEventPdvMain = async (): Promise<void> => {
    if (isFormValidMainPdv()) {
      try {
        setState(States.loading);
        const pdv = {
          id: pdvId,
        } as Pdv;
        const eventPdvMain: EventPdvMain = {
          pdv,
          allowMoney: formDataMainPdv[FormInputMainName.allowMoney] === 'true',
          allowAdvanceFee: formDataMainPdv[FormInputMainName.allowAdvanceFee] === 'true',
          allowDebit: formDataMainPdv[FormInputMainName.allowDebit] === 'true',
          allowCreditCard: formDataMainPdv[FormInputMainName.allowCreditCard] === 'true',
          allowBankSlip: false,
          allowPix: formDataMainPdv[FormInputMainName.allowPix] === 'true',
          allowSellingWebsite: formDataMainPdv[FormInputMainName.allowSellingWebsite] === 'true',
          allowDiscount: formDataMainPdv[FormInputMainName.allowDiscount] === 'true',
        };

        await api.post(`/event/pdv/${params.id}/main`, eventPdvMain);
      } catch (error) {
        const err = error as AxiosError;
        toast.error(err.message);
      } finally {
        setState(States.default);
      }
    }
  };

  const handleNextTab = async (): Promise<void> => {
    if (numberTab === 0) {
      await saveEventPdvMain();
    }
    setNumberTab(numberTab + 1);
  };

  useEffect(() => {
    handleFecthPdvList();
  }, []);

  return (
    <PdvEventContainer
      state={state}
      pdvId={pdvId}
      numberTab={numberTab}
      formPdv={controllerFormPdv}
      formMainPdv={controllerFormMainPdv}
      mainPdvActions={controllerMainPdvActions}
      mainPdvStates={controllerMainPdvStates}
      onChangeSelectedPdv={handleChangeSelectedPdv}
      setNumberTab={setNumberTab}
      nextTab={handleNextTab}
    />
  );
};
