/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import {
  PaymentMethodsResponse,
  PaymentMethodsRequestParams,
} from '@/features/paymentMethods/types';
import useForm from '@/hooks/useForm';
import {
  States,
  PaymentMethodsContainer,
  ShouldShowModal,
} from '@/features/paymentMethods/screens/List/ui';
import validators from '@/helpers/validators';
import { FormInputName as FormInputNameToSavePaymentMethods } from '@/features/paymentMethods/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/paymentMethods/components/FilterContent';
import PaymentMethodsStatus from '@/model/StatusType';
import ChargeSetup from '@/model/ChargeSetup';
import PaymentGateway from '@/model/PaymentGateway';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import { colors } from '@/styles/colors';
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadPaymentMethods {
  id?: string;
  name: string;
  charge: { id: string };
}

export const PaymentMethodsScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listPaymentMethods, setListPaymentMethods] = useState<PaymentGateway[]>([]);
  const [listChargeSetup, setListChargeSetup] = useState<ChargeSetup[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentGateway>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.paymentMethods,
  );

  const [currentPage, setCurrentPage] = useState<PaymentMethodsRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataPaymentMethods,
    formErrors: formErrorsPaymentMethods,
    onChangeFormInput: onChangeFormInputPaymentMethods,
    isFormValid: isFormValidPaymentMethods,
    resetForm: resetFormPaymentMethods,
  } = useForm({
    initialData: {
      name: '',
      paymentGateway: '',
    },
    validators: {
      name: [validators.required],
      paymentGateway: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

  const handleFecthChargeSetupList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ChargeSetup[]>('/charge-setup/find');
      setListChargeSetup(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFetch = async (values: PaymentMethodsRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<PaymentMethodsResponse>('/payment-gateway/page', values);

      if (data) {
        setListPaymentMethods(data?.list ?? []);

        setCurrentPage(currentPageState => ({
          ...currentPageState,
          ...data,
        }));
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnChangeColorColumn = (status: PaymentMethodsStatus): string =>
    ({
      0: colors.green,
      1: colors.red,
    }[status] || colors.grey);

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    paymentMethods: paymentMethodsSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    paymentMethods?: PaymentGateway;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();
    console.log('paymentMethodsSelected', paymentMethodsSelected);
    handleFecthChargeSetupList();
    if (paymentMethodsSelected?.id && value === ShouldShowModal.paymentMethods) {
      setPaymentMethods(paymentMethodsSelected);
      if (paymentMethodsSelected.id !== paymentMethods?.id) {
        resetFormPaymentMethods();
      }
    } else {
      resetFormPaymentMethods();
      setPaymentMethods(undefined);
    }
  };

  const handleOnSavePaymentMethods = async (): Promise<void> => {
    try {
      if (isFormValidPaymentMethods()) {
        const activedInput = convertToBoolean(
          formDataPaymentMethods[FormInputNameToSavePaymentMethods.status],
        );

        const payload: PayloadPaymentMethods = {
          id: paymentMethods?.id,
          name: formDataPaymentMethods[FormInputNameToSavePaymentMethods.name],
          charge: {
            id: formDataPaymentMethods[FormInputNameToSavePaymentMethods.paymentGateway],
          },
        };

        if (!payload.id) {
          delete payload.id;

          const { data: dataPostGateway } = await api.post<PaymentGateway>(
            '/payment-gateway',
            payload,
          );
          await api.patch<PaymentGateway>(
            `/payment-gateway${activedInput ? '/activate' : '/inactivate'}/${dataPostGateway.id}`,
          );
          toast.success('Forma de pagamento cadastrado com sucesso!');
        } else {
          await api.put<PaymentGateway>('/payment-gateway', payload);
          await api.patch<PaymentGateway>(
            `/payment-gateway${activedInput ? '/activate' : '/inactivate'}/${paymentMethods?.id}`,
          );
          toast.success('Forma de pagamento atualizado com sucesso!');
        }

        onToggle();
        handleFetch(currentPage);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToPaymentMethods = async (
    paymentMethodsSelected: PaymentGateway,
  ): Promise<void> => {
    try {
      await api.delete(`/payment-gateway/${paymentMethodsSelected?.id}`);

      toast.success('Forma de pagamento excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeletePaymentMethods = (paymentMethodsSelected: PaymentGateway): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => handleOnClose(),
        },
        {
          title: 'Sim, quero remover',
          onClick: (): Promise<void> =>
            handleOnConfirmDeleteToPaymentMethods(paymentMethodsSelected),
        },
      ],
    });
  };

  const handleOnFilter = async (): Promise<void> => {
    try {
      if (isFormValidFilter()) {
        const payload =
          {
            name: {
              entity: {
                name: formDataFilter[FormInputNameToFilter.inputSearch],
              },
            },
          }[formDataFilter[FormInputNameToFilter.filterSearch]] || {};

        onToggle();
        await handleFetch({
          ...currentPage,
          ...payload,
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnPaginationChange = async (page: number): Promise<void> => {
    handleFetch({
      ...currentPage,
      page,
    });
  };

  useEffect(() => {
    if (paymentMethods?.id) {
      onChangeFormInputPaymentMethods(FormInputNameToSavePaymentMethods.name)(paymentMethods.name);
      onChangeFormInputPaymentMethods(FormInputNameToSavePaymentMethods.paymentGateway)(
        paymentMethods.charge.id,
      );
    }
  }, [paymentMethods]);

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <PaymentMethodsContainer
      state={state}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      shouldShowModal={shouldShowModal}
      onSavePaymentMethods={handleOnSavePaymentMethods}
      listPaymentMethods={listPaymentMethods}
      listChargeSetup={listChargeSetup}
      currentPage={currentPage}
      changeColorColumn={handleOnChangeColorColumn}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataPaymentMethods={formDataPaymentMethods}
      formErrorsPaymentMethods={formErrorsPaymentMethods}
      onChangeFormInputPaymentMethods={onChangeFormInputPaymentMethods}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onShowDeletePaymentMethods={handleOnShowDeletePaymentMethods}
      onFilter={handleOnFilter}
      paymentMethodsState={paymentMethods}
    />
  );
};
