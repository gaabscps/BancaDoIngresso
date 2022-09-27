import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import {
  States,
  ShouldShowModal,
  PaymentGatewayContainer,
} from '@/features/paymentGateway/screens/List/ui';
import PosStatus from '@/model/PosStatus';
import { FormInputName as FormInputNameToSavePaymentGateway } from '@/features/paymentGateway/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/paymentGateway/components/FilterContent';
import ChargeSetup from '@/model/ChargeSetup';
import { colors } from '@/styles/colors';
import { ChargeSetupResponse, ChargeSetupRequestParams } from '@/features/paymentGateway/types';
import validators from '@/helpers/validators';
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadGateway {
  id?: string;
  name: string;
  url: string;
  token: string;
  frontToken: string;
  email: string;
  notificationURL: string;
  webhook: string;
  actived: boolean;
}

export const PaymentGatewayScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listPaymentGateway, setListPaymentGateway] = useState<ChargeSetup[]>([]);
  const [paymentGateway, setPaymentGateway] = useState<ChargeSetup>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.gateway);

  const [currentPage, setCurrentPage] = useState<ChargeSetupRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataPaymentGateway,
    formErrors: formErrorsPaymentGateway,
    onChangeFormInput: onChangeFormInputPaymentGateway,
    isFormValid: isFormValidPaymentGateway,
    resetForm: resetFormPaymentGateway,
  } = useForm({
    initialData: {
      id: '',
      name: '',
      url: '',
      token: '',
      frontToken: '',
      email: '',
      notificationURL: '',
      webhook: '',
    },
    validators: {
      name: [validators.required],
      url: [validators.required],
      token: [validators.required],
      frontToken: [validators.required],
      email: [validators.required],
      notificationURL: [validators.required],
      webhook: [validators.required],
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

  const handleFetch = async (values: ChargeSetupRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<ChargeSetupResponse>('/charge-setup/page', values);

      if (data) {
        setListPaymentGateway(data?.list ?? []);

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
  const handleOnChangeColorColumn = (status: PosStatus): string =>
    ({
      0: colors.lightBlue,
      1: colors.green,
      2: colors.yellow,
      3: colors.red,
    }[status] || colors.grey);

  const handleOnSavePaymentGateway = async (): Promise<void> => {
    try {
      if (isFormValidPaymentGateway()) {
        const payload: PayloadGateway = {
          id: paymentGateway?.id,
          name: formDataPaymentGateway[FormInputNameToSavePaymentGateway.name],
          actived: true,
          url: formDataPaymentGateway[FormInputNameToSavePaymentGateway.url],
          frontToken: formDataPaymentGateway[FormInputNameToSavePaymentGateway.frontToken],
          token: formDataPaymentGateway[FormInputNameToSavePaymentGateway.token],
          email: formDataPaymentGateway[FormInputNameToSavePaymentGateway.email],
          notificationURL:
            formDataPaymentGateway[FormInputNameToSavePaymentGateway.notificationURL],
          webhook: formDataPaymentGateway[FormInputNameToSavePaymentGateway.webhook],
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<ChargeSetup>('/charge-setup', payload);
          toast.success('Gateway de pagamento cadastrado com sucesso!');
        } else {
          await api.put<ChargeSetup>('/charge-setup', payload);
          toast.success('Gateway de pagamento atualizado com sucesso!');
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

  const handleOnConfirmDeleteToPaymentGateway = async (
    gatewaySelected: ChargeSetup,
  ): Promise<void> => {
    try {
      await api.delete(`/charge-setup/${gatewaySelected?.id}`);

      toast.success('Gateway de pagamento excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeletePaymentGateway = (gatewaySelected: ChargeSetup): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteToPaymentGateway(gatewaySelected),
        },
      ],
    });
  };
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    gateway: gatewaySelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    gateway?: ChargeSetup;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (gatewaySelected?.id && value === ShouldShowModal.gateway) {
      setPaymentGateway(gatewaySelected);
      if (gatewaySelected.id !== paymentGateway?.id) {
        resetFormPaymentGateway();
      }
    } else {
      resetFormPaymentGateway();
      setPaymentGateway(undefined);
    }
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
    if (paymentGateway?.id) {
      onChangeFormInputPaymentGateway(FormInputNameToSavePaymentGateway.name)(paymentGateway.name);
      onChangeFormInputPaymentGateway(FormInputNameToSavePaymentGateway.url)(paymentGateway.url);
      onChangeFormInputPaymentGateway(FormInputNameToSavePaymentGateway.frontToken)(
        paymentGateway.frontToken,
      );
      onChangeFormInputPaymentGateway(FormInputNameToSavePaymentGateway.token)(
        paymentGateway.token,
      );
      onChangeFormInputPaymentGateway(FormInputNameToSavePaymentGateway.email)(
        paymentGateway.email,
      );
      onChangeFormInputPaymentGateway(FormInputNameToSavePaymentGateway.notificationURL)(
        paymentGateway.notificationURL,
      );
      onChangeFormInputPaymentGateway(FormInputNameToSavePaymentGateway.webhook)(
        paymentGateway.webhook,
      );
      onChangeFormInputPaymentGateway(FormInputNameToSavePaymentGateway.status)(
        String(paymentGateway.status),
      );
    }
  }, [paymentGateway]);

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <PaymentGatewayContainer
      state={state}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      shouldShowModal={shouldShowModal}
      onSavePaymentGateway={handleOnSavePaymentGateway}
      listPaymentGateway={listPaymentGateway}
      currentPage={currentPage}
      changeColorColumn={handleOnChangeColorColumn}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataPaymentGateway={formDataPaymentGateway}
      formErrorsPaymentGateway={formErrorsPaymentGateway}
      onChangeFormInputPaymentGateway={onChangeFormInputPaymentGateway}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onShowDeletePaymentGateway={handleOnShowDeletePaymentGateway}
      onFilter={handleOnFilter}
      gatewayState={paymentGateway}
    />
  );
};
