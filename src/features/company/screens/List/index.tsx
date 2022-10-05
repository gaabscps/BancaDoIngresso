/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import Company from '@/model/Company';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import { CompanyResponse, CompanyRequestParams } from '@/features/company/types';
import useForm from '@/hooks/useForm';
import { States, CompanyContainer, ShouldShowModal } from '@/features/company/screens/List/ui';
import CompanyStatus from '@/model/CompanyStatus';
import validators from '@/helpers/validators';
import { FormInputName as FormInputNameToSaveCompany } from '@/features/company/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/company/components/FilterContent';
import Pdv from '@/model/Pdv';
import dayjs from 'dayjs';
import { colors } from '@/styles/colors';
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadCompany {
  id?: string;
  name: string;
  serialNumber: string;
  status?: CompanyStatus;
  pdv?: {
    id?: string;
  };
  model?: string | null;
  telephoneOperator?: string | null;
  cardOperator?: string | null;
  expirationDate?: string | null;
}

export const CompanyScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listCompany, setListCompany] = useState<Company[]>([]);
  const [listBankAccount, setListBankAccount] = useState<any[]>([]);
  const [pos, setCompany] = useState<Company>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.registerCompany,
  );

  const [currentPage, setCurrentPage] = useState<CompanyRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataCompany,
    formErrors: formErrorsCompany,
    onChangeFormInput: onChangeFormInputCompany,
    isFormValid: isFormValidCompany,
    resetForm: resetFormCompany,
  } = useForm({
    initialData: {
      name: '',
      serialNumber: '',
      status: '',
      model: '',
      telephoneOperator: '',
      cardOperator: '',
      expirationDate: '',
    },
    validators: {
      name: [validators.required],
      serialNumber: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
    resetForm: resetFormFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

  const handleFetch = async (values: CompanyRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<CompanyResponse>('/company/page', values);

      if (data) {
        setListCompany(data?.list ?? []);

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
  const handleOnChangeColorColumn = (status: CompanyStatus): string =>
    ({
      0: colors.lightBlue,
      1: colors.green,
      2: colors.yellow,
      3: colors.red,
    }[status] || colors.grey);
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    pos: posSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pos?: Company;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (
      (posSelected?.id && value !== ShouldShowModal.filter) ||
      (!posSelected?.id && value !== ShouldShowModal.filter)
    ) {
      setCompany(posSelected);
      handleBankAccountList();
      if (posSelected?.id !== pos?.id) {
        resetFormCompany();
      }
    } else {
      resetFormCompany();
      setCompany(undefined);
    }
    if (
      (!posSelected?.id && value !== ShouldShowModal.filter) ||
      (!posSelected?.id && value !== ShouldShowModal.registerCompany)
    ) {
      resetFormCompany();
    }
  };

  const handleOnSaveCompany = async (): Promise<void> => {
    try {
      if (isFormValidCompany()) {
        const payload: PayloadCompany = {
          id: pos?.id,
          name: formDataCompany[FormInputNameToSaveCompany.name],
          serialNumber: formDataCompany[FormInputNameToSaveCompany.serialNumber],
          status: +formDataCompany[FormInputNameToSaveCompany.status] || 0,
          pdv: {
            id: formDataCompany[FormInputNameToSaveCompany.pdv] || 'undefined',
          },
          model: formDataCompany[FormInputNameToSaveCompany.model] || null,
          telephoneOperator: formDataCompany[FormInputNameToSaveCompany.telephoneOperator] || null,
          cardOperator: formDataCompany[FormInputNameToSaveCompany.cardOperator] || null,
          expirationDate: formDataCompany[FormInputNameToSaveCompany.expirationDate] || null,
        };

        if (payload.model === null) {
          delete payload.model;
        }
        if (payload.status === 0) {
          delete payload.status;
        }

        if (payload.cardOperator === null) {
          delete payload.cardOperator;
        }

        if (payload.telephoneOperator === null) {
          delete payload.telephoneOperator;
        }

        if (payload.expirationDate === 'Invalid Date') {
          delete payload.expirationDate;
        }

        if (payload.pdv?.id === 'empty' || payload.pdv?.id === 'undefined') {
          delete payload.pdv;
        }

        if (!payload.id) {
          delete payload.id;

          await api.post<Company>('/pos', payload);
          toast.success('empresa cadastrada com sucesso!');
        } else {
          await api.put<Company>('/pos', payload);
          toast.success('empresa atualizada com sucesso!');
        }

        onToggle();
        handleFetch(currentPage);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleBankAccountList = async (): Promise<void> => {
    // TODO: implementar
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToCompany = async (posSelected: Company): Promise<void> => {
    try {
      await api.delete(`/company/${posSelected?.id}`);

      toast.success('empresa excluída com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeleteCompany = (posSelected: Company): void => {
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
          title: 'Sim, quero excluir',
          onClick: (): Promise<void> => handleOnConfirmDeleteToCompany(posSelected),
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

  const clearFilter = (): void => {
    resetFormFilter();
    formDataFilter[FormInputNameToFilter.inputSearch] = '';
    handleOnFilter();
  };

  const handleOnPaginationChange = async (page: number): Promise<void> => {
    handleFetch({
      ...currentPage,
      page,
    });
  };

  useEffect(() => {
    if (pos?.id) {
      onChangeFormInputCompany(FormInputNameToSaveCompany.name)(pos.name);
      onChangeFormInputCompany(FormInputNameToSaveCompany.serialNumber)(pos.serialNumber);
      onChangeFormInputCompany(FormInputNameToSaveCompany.status)(String(pos.status));
      onChangeFormInputCompany(FormInputNameToSaveCompany.model)(pos?.model);
      onChangeFormInputCompany(FormInputNameToSaveCompany.pdv)(String(pos?.pdv?.id));
      onChangeFormInputCompany(FormInputNameToSaveCompany.telephoneOperator)(
        pos?.telephoneOperator,
      );
      onChangeFormInputCompany(FormInputNameToSaveCompany.cardOperator)(pos?.cardOperator);
      onChangeFormInputCompany(FormInputNameToSaveCompany.expirationDate)(
        String(dayjs(pos?.expirationDate, 'YYYY-DD-MM hh:mm:ss').format('YYYY-MM-DD')),
      );
    }
  }, [pos]);

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <CompanyContainer
      state={state}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      shouldShowModal={shouldShowModal}
      onSaveCompany={handleOnSaveCompany}
      listCompany={listCompany}
      currentPage={currentPage}
      changeColorColumn={handleOnChangeColorColumn}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataCompany={formDataCompany}
      formErrorsCompany={formErrorsCompany}
      onChangeFormInputCompany={onChangeFormInputCompany}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onShowDeleteCompany={handleOnShowDeleteCompany}
      onFilter={handleOnFilter}
      listBankAccount={listBankAccount}
      posState={pos}
      clearFilter={clearFilter}
    />
  );
};
