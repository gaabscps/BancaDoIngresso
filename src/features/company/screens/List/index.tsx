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
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import { FormInputName as FormInputNameToSaveCompany } from '@/features/company/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/company/components/FilterContent';
import { colors } from '@/styles/colors';
import StatusType from '@/model/StatusType';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
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
      zipCode: '',
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
      // serialNumber: [validators.required],
    },
    formatters: {
      document: updateMaskCPFOrCNPJ,
      telephone: updateMaskMobilePhone,
      zipCode: updateMaskCEP,
    },
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
      const { data } = await api.post<CompanyResponse>('/contractor/type/page', {});

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
      const { data } = await api.post<CompanyResponse>('/contractor/page', values);

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
        const activedInput = convertToBoolean(formDataCompany[FormInputNameToSaveCompany.status]);

        const payload: PayloadCompany = {
          id: company?.id,
          name: formDataCompany[FormInputNameToSaveCompany.name],
          document: formDataCompany[FormInputNameToSaveCompany.document],
          telephone: formDataCompany[FormInputNameToSaveCompany.telephone],
          email: 'email@email.com',
          address: {
            id: company?.address?.id,
            zipCode: formDataCompany[FormInputNameToSaveCompany.zipCode],
            state: formDataCompany[FormInputNameToSaveCompany.state],
            city: formDataCompany[FormInputNameToSaveCompany.city],
            district: formDataCompany[FormInputNameToSaveCompany.district],
            street: formDataCompany[FormInputNameToSaveCompany.street],
            complement: formDataCompany[FormInputNameToSaveCompany.complement],
            number: formDataCompany[FormInputNameToSaveCompany.number],
            latitude: formDataCompany[FormInputNameToSaveCompany.latitude],
            longitude: formDataCompany[FormInputNameToSaveCompany.longitude],
          },
          contractorType: {
            id: formDataCompany[FormInputNameToSaveCompany.companyType],
          },
          bankAccount: listBankAccount.map(bank => ({
            id: company?.bankAccount?.id,
            contractorId: company?.id,
            agency: bank.agencia,
            account: bank.conta.split('-')[0],
            digit: bank.conta.split('-')[1],
            bank: {
              id: bank.id,
            },
          })),
        };

        if (!payload.id) {
          delete payload.id;

          const { data: dataContractor } = await api.post<Company>('/contractor', payload);

          await api.patch<Company>(
            `/charge-setup${activedInput ? '/activate' : '/inactivate'}/${dataContractor.id}`,
          );
          toast.success('empresa cadastrada com sucesso!');
        } else {
          await api.put<Company>('/contractor', payload);
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
      // verify if the bank account not exists values empty
      const bankAccountEmpty = bankAccount.find(
        item => item.id === '' || item.name === '' || item.agencia === '' || item.conta === '',
      );
      if (bankAccountEmpty) {
        toast.warn('Preencha todos os campos ou remova a conta bancária que contém campos vazios');
        return;
      }
      setListBankAccount(bankAccount);
      handleOnShouldShowModal({
        value: ShouldShowModal.registerCompany,
        newTitleModal: company?.id ? company.name : 'Cadastrar nova empresa',
        company,
      });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToCompany = async (posSelected: Company): Promise<void> => {
    try {
      await api.delete(`/contractor/${posSelected?.id}`);

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
      companyState={company}
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
      formErrorsCompany={formErrorsCompany}
      listCompanyType={listCompanyType}
    />
  );
};
