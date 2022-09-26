import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import { States, ShouldShowModal } from '@/features/pos/screens/List/ui';
import PosStatus from '@/model/PosStatus';
import validators from '@/helpers/validators';
import { FormInputName as FormInputNameToSavePos } from '@/features/pos/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/paymentGateway/components/FilterContent';
import {
  PaymentGatewayResponse,
  PaymentGatewayRequestParams,
} from '@/features/paymentGateway/types';
import PaymentGateway from '@/model/PaymentGateway';
import { colors } from '@/styles/colors';
import { DeleteContent } from '../../components/DeleteContent';
import { PaymentGatewayContainer } from './ui';

export default interface PayloadPos {
  id?: string;
  name: string;
  serialNumber: string;
  status: PosStatus;
  pdv: {
    id: string;
  };
  model: string;
  telephoneOperator: string;
  cardOperator: string;
  expirationDate: string;
}

export const PaymentGatewayScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listPaymentGateway, setListPaymentGateway] = useState<PaymentGateway[]>([]);
  const [paymentGateway, setPaymentGateway] = useState<PaymentGateway>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.pos);

  const [currentPage, setCurrentPage] = useState<PaymentGatewayRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
    resetForm: resetFormPos,
  } = useForm({
    initialData: {
      name: '',
      serialNumber: '',
      status: '',
      pdv: '',
      model: '',
      telephoneOperator: '',
      cardOperator: '',
      expirationDate: '',
    },
    validators: {
      name: [validators.required],
      serialNumber: [validators.required],
      status: [validators.required],
      expirationDate: [validators.isDateLessThanCurrentDate],
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

  const handleFetch = async (values: PaymentGatewayRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<PaymentGatewayResponse>('/payment-gateway/page', values);

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

  const handleOnSavePos = async (): Promise<void> => {
    try {
      if (isFormValidPos()) {
        const payload: PayloadPos = {
          id: paymentGateway?.id,
          name: formDataPos[FormInputNameToSavePos.name],
          serialNumber: formDataPos[FormInputNameToSavePos.serialNumber],
          status: +formDataPos[FormInputNameToSavePos.status],
          pdv: {
            id: formDataPos[FormInputNameToSavePos.pdv],
          },
          model: formDataPos[FormInputNameToSavePos.model],
          telephoneOperator: formDataPos[FormInputNameToSavePos.telephoneOperator],
          cardOperator: formDataPos[FormInputNameToSavePos.cardOperator],
          expirationDate: formDataPos[FormInputNameToSavePos.expirationDate],
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<PaymentGateway>('/payment-gateway', payload);
          toast.success('Gateway de pagamento cadastrado com sucesso!');
        } else {
          await api.put<PaymentGateway>('/payment-gateway', payload);
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

  const handleFecthPdvList = async (): Promise<void> => {
    try {
      setState(States.loading);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToPos = async (posSelected: PaymentGateway): Promise<void> => {
    try {
      await api.delete(`/pos/${posSelected?.id}`);

      toast.success('POS excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeletePos = (posSelected: PaymentGateway): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteToPos(posSelected),
        },
      ],
    });
  };
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    pos: posSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pos?: PaymentGateway;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (posSelected?.id && value === ShouldShowModal.pos) {
      setPaymentGateway(posSelected);
      handleFecthPdvList();
      if (posSelected.id !== paymentGateway?.id) {
        resetFormPos();
      }
    } else {
      resetFormPos();
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
            serialNumber: {
              entity: {
                serialNumber: formDataFilter[FormInputNameToFilter.inputSearch],
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
      onSavePos={handleOnSavePos}
      listPos={listPaymentGateway}
      currentPage={currentPage}
      changeColorColumn={handleOnChangeColorColumn}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataPos={formDataPos}
      formErrorsPos={formErrorsPos}
      onChangeFormInputPos={onChangeFormInputPos}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onShowDeletePos={handleOnShowDeletePos}
      onFilter={handleOnFilter}
      posState={paymentGateway}
    />
  );
};
