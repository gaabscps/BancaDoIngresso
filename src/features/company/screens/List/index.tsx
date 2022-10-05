/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import Company from '@/model/Company';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import { CompanyResponse, CompanyRequestParams } from '@/features/company/types';
import useForm from '@/hooks/useForm';
import { States, CompanyContainer, ShouldShowModal } from '@/features/company/screens/List/ui';
import validators from '@/helpers/validators';
import { FormInputName as FormInputNameToSaveCompany } from '@/features/company/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/company/components/FilterContent';
import { colors } from '@/styles/colors';
import StatusType from '@/model/StatusType';
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadCompany {
  id?: string;
  name: string;
}

export const CompanyScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listCompany, setListCompany] = useState<Company[]>([]);
  const [listCompanyType, setListCompanyType] = useState<any[]>([]);
  const [listBank, setListBank] = useState<any[]>([]);
  const [listBankAccount, setListBankAccount] = useState<any[]>([]);
  const [bankAccount, setBankAccount] = useState<any[]>([]);
  const [company, setCompany] = useState<Company>();
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
      document: '',
      telephone: '',
      email: '',
      imageUrl: '',
      facebookUrl: '',
      instagramUrl: '',
      twitterUrl: '',
      linkedinUrl: '',
      urlApi: '',
      urlAdmin: '',
      urlSite: '',
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

  const controllerInputAppendBankAccount = {
    listBank,
    bankAccount,
    setBankAccount,
    handleAddBanckAccount(): void {
      setBankAccount([
        ...bankAccount,
        {
          id: '',
          name: '',
          agencia: '',
          conta: '',
        },
      ]);
    },
    handleChangeBanckAccount(inputName: string, index: number, value: string): void {
      console.log('value :>> ', value);
      const newFormValues = [...bankAccount] as any;
      newFormValues[index][inputName] = value;
      setBankAccount(newFormValues);
    },
    handleRemoveBanckAccount(index: number): void {
      const values = [...bankAccount];
      values.splice(index, 1);
      setBankAccount(values);
    },
  };

  const handleGetbankAccount = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<CompanyResponse>('/bank/page', {});

      if (data) {
        setListBank(data?.list ?? []);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetCompanyType = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<CompanyResponse>('/company/type/page', {});

      if (data) {
        setListCompanyType(data?.list ?? []);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

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
  const handleOnChangeColorColumn = (status: StatusType): string =>
    ({
      0: colors.green,
      1: colors.red,
    }[status] || colors.grey);
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    company: companySelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    company?: Company;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    if (value !== ShouldShowModal.filter) {
      setBankAccount(listBankAccount);
    }

    if (
      (companySelected?.id && value !== ShouldShowModal.filter) ||
      (!companySelected?.id && value !== ShouldShowModal.filter)
    ) {
      setCompany(companySelected);
      handleBankAccountList();
      if (companySelected?.id !== company?.id) {
        resetFormCompany();
      }
    } else {
      resetFormCompany();
      setCompany(undefined);
    }
    if (
      (!companySelected?.id && value !== ShouldShowModal.filter) ||
      (!companySelected?.id && value !== ShouldShowModal.registerCompany)
    ) {
      resetFormCompany();
    }
  };

  const handleOnSaveCompany = async (): Promise<void> => {
    try {
      if (isFormValidCompany()) {
        const payload: PayloadCompany = {
          id: company?.id,
          name: formDataCompany[FormInputNameToSaveCompany.name],
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<Company>('/company', payload);
          toast.success('empresa cadastrada com sucesso!');
        } else {
          await api.put<Company>('/company', payload);
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

  const handleOnBankAccount = async (): Promise<void> => {
    try {
      console.log('bankAccount :>> ', bankAccount);
      setListBankAccount(bankAccount);
      handleOnShouldShowModal({
        value: ShouldShowModal.registerCompany,
        newTitleModal: 'Cadastrar nova empresa',
      });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
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

  const handleOnDeleteRowBankAccount = (bankAccount): void => {
    listBankAccount.splice(listBankAccount.indexOf(bankAccount), 1);
    setListBankAccount([...listBankAccount]);
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
    if (company?.id) {
      onChangeFormInputCompany(FormInputNameToSaveCompany.name)(company.name);
      onChangeFormInputCompany(FormInputNameToSaveCompany.document)(company.document);
      onChangeFormInputCompany(FormInputNameToSaveCompany.companyType)(company.companyType?.id);
      onChangeFormInputCompany(FormInputNameToSaveCompany.telephone)(company.telephone);
      onChangeFormInputCompany(FormInputNameToSaveCompany.state)(company.address.state);
      onChangeFormInputCompany(FormInputNameToSaveCompany.city)(company.address.city);
      onChangeFormInputCompany(FormInputNameToSaveCompany.district)(company.address.district);
      onChangeFormInputCompany(FormInputNameToSaveCompany.street)(company.address.street);
      // onChangeFormInputCompany(FormInputNameToSaveCompany.number)(company.address.number);
      // onChangeFormInputCompany(FormInputNameToSaveCompany.complement)(company.address.complement);
      // onChangeFormInputCompany(FormInputNameToSaveCompany.latitude)(company.address.latitude);
      // onChangeFormInputCompany(FormInputNameToSaveCompany.longitude)(company.address.longitude);
      // onChangeFormInputCompany(FormInputNameToSaveCompany.pix)(company.pix);
      setListBankAccount(company.bankAccount);
    }
  }, [company]);

  useEffect(() => {
    handleFetch(currentPage);
    handleGetbankAccount();
    handleGetCompanyType();
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
      onSaveBankAccount={handleOnBankAccount}
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
      clearFilter={clearFilter}
      controllerInputAppendBankAccount={controllerInputAppendBankAccount}
      onDeleteRowBankAccount={handleOnDeleteRowBankAccount}
      isFormValidCompany={isFormValidCompany}
      listCompanyType={listCompanyType}
    />
  );
};
