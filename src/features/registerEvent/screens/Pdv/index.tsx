/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { PdvEventContainer, States } from '@/features/registerEvent/screens/Pdv/ui';
import useForm from '@/hooks/useForm';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { DeleteContent } from '@/components/DeleteContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import api from '@/services/api';
import Pdv from '@/model/Pdv';
import validators from '@/helpers/validators';
import { mainPdvStatesProps } from '../../components/PdvScreen/types';

export const PdvEventScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const confirmDelete = useConfirmDelete();

  const [mainPdv, setMainPdv] = useState<Pdv>();
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

  const handleFecthCategoryList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Pdv[]>(`/pdv/find`);
      setMainPdvList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
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
    onGetList: handleFecthCategoryList,
    onGet: handleOnGetMainPdv,
    onCancelEdit: handleOnCancelEditMainPdv,
    onShowModalDelete: handleOnShowDeleteMainPdv,
  };

  const controllerMainPdvStates: mainPdvStatesProps = {
    mainPdv,
    setMainPdv,
    mainPdvList,
    setMainPdvList,
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

  useEffect(() => {
    handleFecthCategoryList();
  }, []);

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
