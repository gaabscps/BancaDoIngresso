/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import Contractor from '@/model/Contractor';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import {
  ContractorResponse,
  ContractorRequestParams,
  PixForm,
  BanckAccountForm,
  BankResponse,
} from '@/features/contractor/types';
import useForm from '@/hooks/useForm';
import {
  States,
  ContractorContainer,
  ShouldShowModal,
} from '@/features/contractor/screens/List/ui';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import { FormInputName as FormInputNameToSaveContractor } from '@/features/contractor/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/contractor/components/FilterContent';
import { colors } from '@/styles/colors';
import StatusType from '@/model/StatusType';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import ContractorType from '@/model/ContractorType';
import Bank from '@/model/Bank';
import PixType from '@/model/PixType';
import User from '@/model/User';
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadContractor {
  id?: string;
  name: string;
  document: string;
  telephone: string;
  email: string;
  address: {
    id?: string;
    zipCode: string;
    state: string;
    city: string;
    district: string;
    street: string;
    complement: string;
    number: string;
    latitude: string;
    longitude: string;
  };
  contractorType: {
    id: string;
  };
  bankAccount: {
    // id: string;
    contractorId?: string;
    agency: string;
    account: string;
    digit: string;
    bank: {
      id: string;
    };
  }[];
  pixKey: {
    // id?: string;
    contractorId?: string;
    key: string;
    pixKeyType: PixType;
    bank: {
      id: string;
    };
  }[];
  users: {
    id: string;
  }[];
}

export const ContractorScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listContractor, setListContractor] = useState<Contractor[]>([]);
  const [listContractorType, setListContractorType] = useState<ContractorType[]>([]);
  const [listBank, setListBank] = useState<Bank[]>([]);
  const [listBankAccount, setListBankAccount] = useState<BanckAccountForm[]>([]);
  const [listPixTable, setListPixTable] = useState<PixForm[]>([]);

  const [pixTypes, setPixTypes] = useState<PixType>(0);

  const [listUsers, setListUsers] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  const [pix, setPix] = useState<PixForm[]>([]);
  const [bankAccount, setBankAccount] = useState<BanckAccountForm[]>([]);
  const [contractor, setContractor] = useState<Contractor>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.registerContractor,
  );
  const [currentPage, setCurrentPage] = useState<ContractorRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataContractor,
    formErrors: formErrorsContractor,
    onChangeFormInput: onChangeFormInputContractor,
    isFormValid: isFormValidContractor,
    resetForm: resetFormContractor,
  } = useForm({
    initialData: {
      name: '',
      document: '',
      companyType: '',
      telephone: '',
      email: '',
      zipCode: '',
      state: '',
      city: '',
      district: '',
      street: '',
      number: '',
      complement: '',
      latitude: '',
      longitude: '',
      pix: '',
      status: '',
      user: '',
    },
    validators: {
      name: [validators.required],
      document: [validators.required, validators.cpforcnpj],
      zipCode: [validators.required],
      state: [validators.required],
      city: [validators.required],
      district: [validators.required],
      street: [validators.required],
      number: [validators.required],
      telephone: [validators.required, validators.mobilePhone],
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

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormContractor();
        resetFormFilter();
        setListBankAccount([]);
        setListPixTable([]);
        setContractor(undefined);
      }, 500);
    }
  }, [visible]);

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

  const controllerInputAppendPix = {
    pixTypes,
    listPixTable,
    listBank,
    pix,
    setPix,
    handleAddPix(): void {
      setPix([
        ...pix,
        {
          idInstitution: '',
          nameInstitution: '',
          idType: 0,
          nameType: '',
          pix: '',
        },
      ]);
    },
    handleChangePix(inputName: string, index: number, value: string): void {
      const newFormValues = [...pix] as any;
      newFormValues[index][inputName] = value;
      setPix(newFormValues);
    },
    handleRemovePix(index: number): void {
      const values = [...pix];
      values.splice(index, 1);
      setPix(values);
    },
  };

  const controllerAppendUser = {
    listUsers,
    usersSelected,
    handleAddUser(userId: string): void {
      const newUsersSelected = listUsers.filter(item => item.id === userId)[0];
      // not add user if already exists
      if (usersSelected.find(item => item.id === newUsersSelected.id)) {
        return;
      }
      setUsersSelected([...usersSelected, newUsersSelected]);
    },
    handleRemoveUser(index: number): void {
      const values = [...usersSelected];
      values.splice(index, 1);
      setUsersSelected(values);
    },
  };

  const handleGetbankAccount = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<BankResponse>('/bank/page', {});

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

  const handleGetUsers = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<User[]>('/user/find');

      if (data) {
        setListUsers(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetPixTypes = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<PixType>('/bank/pix/types');

      if (data) {
        setPixTypes(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetContractorType = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<ContractorResponse>('/contractor/type/page', {});

      if (data) {
        setListContractorType(data?.list ?? []);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFetch = async (values: ContractorRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<ContractorResponse>('/contractor/page', values);

      if (data) {
        setListContractor(data?.list ?? []);

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
    contractor: companySelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    contractor?: Contractor;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    if (value !== ShouldShowModal.filter) {
      setBankAccount(listBankAccount);
      setPix(listPixTable);
    }

    if (
      (companySelected?.id && value !== ShouldShowModal.filter) ||
      (!companySelected?.id && value !== ShouldShowModal.filter)
    ) {
      setContractor(companySelected);
    }
  };

  const handleOnSaveContractor = async (): Promise<void> => {
    try {
      if (isFormValidContractor()) {
        const activedInput = convertToBoolean(
          formDataContractor[FormInputNameToSaveContractor.status],
        );
        const payloadBankAccount = listBankAccount.map(bank => ({
          // id: bank?.bankAccount?.id,
          contractorId: contractor?.id,
          agency: bank.agencia,
          account: bank.conta.split('-')[0],
          digit: bank.conta.split('-')[1],
          bank: {
            id: bank.id,
          },
        }));

        const payloadPix = listPixTable.map(item => ({
          // id: contractor?.pix?.id,
          contractorId: contractor?.id,
          key: item.pix,
          pixKeyType: +item.idType,
          bank: {
            id: item.idInstitution,
          },
        }));

        const payloadUsers = usersSelected.map(item => ({
          id: item.id,
        }));

        const payload: PayloadContractor = {
          id: contractor?.id,
          name: formDataContractor[FormInputNameToSaveContractor.name],
          document: formDataContractor[FormInputNameToSaveContractor.document],
          telephone: formDataContractor[FormInputNameToSaveContractor.telephone],
          email: formDataContractor[FormInputNameToSaveContractor.email],
          address: {
            id: contractor?.address?.id,
            zipCode: formDataContractor[FormInputNameToSaveContractor.zipCode],
            state: formDataContractor[FormInputNameToSaveContractor.state],
            city: formDataContractor[FormInputNameToSaveContractor.city],
            district: formDataContractor[FormInputNameToSaveContractor.district],
            street: formDataContractor[FormInputNameToSaveContractor.street],
            complement: formDataContractor[FormInputNameToSaveContractor.complement],
            number: formDataContractor[FormInputNameToSaveContractor.number],
            latitude: formDataContractor[FormInputNameToSaveContractor.latitude],
            longitude: formDataContractor[FormInputNameToSaveContractor.longitude],
          },
          contractorType: {
            id: formDataContractor[FormInputNameToSaveContractor.companyType],
          },
          bankAccount: payloadBankAccount,
          pixKey: payloadPix,
          users: payloadUsers,
        };

        if (!payload.id) {
          delete payload.id;

          const { data: dataContractor } = await api.post<Contractor>('/contractor', payload);

          await api.patch<Contractor>(
            `/contractor${activedInput ? '/activate' : '/inactivate'}/${dataContractor.id}`,
          );
          toast.success('Empresa cadastrada com sucesso!');
        } else {
          await api.put<Contractor>('/contractor', payload);
          await api.patch<Contractor>(
            `/contractor${activedInput ? '/activate' : '/inactivate'}/${contractor?.id}`,
          );
          toast.success('Empresa atualizada com sucesso!');
        }

        onToggle();
        handleFetch(currentPage);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
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
        value: ShouldShowModal.registerContractor,
        newTitleModal: contractor?.id ? contractor.name : 'Cadastrar nova empresa',
        contractor,
      });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnPix = async (): Promise<void> => {
    try {
      console.log('pix :>> ', pix);
      // verify if the bank account not exists values empty
      const pixEmpty = pix.find(
        item =>
          item.idInstitution === '' ||
          item.idType === '' ||
          item.nameType === '' ||
          item.pix === '',
      );
      if (pixEmpty) {
        toast.warn('Preencha todos os campos ou remova a Chave Pix que contém campos vazios');
        return;
      }
      setListPixTable(pix);
      handleOnShouldShowModal({
        value: ShouldShowModal.registerContractor,
        newTitleModal: contractor?.id ? contractor.name : 'Cadastrar nova empresa',
        contractor,
      });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToContractor = async (posSelected: Contractor): Promise<void> => {
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

  const handleOnShowDeleteContractor = (posSelected: Contractor): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteToContractor(posSelected),
        },
      ],
    });
  };

  const handleOnDeleteRowBankAccount = (values: BanckAccountForm): void => {
    listBankAccount.splice(listBankAccount.indexOf(values), 1);
    setListBankAccount([...listBankAccount]);
  };

  const handleOnDeleteRowPix = (values: PixForm): void => {
    listPixTable.splice(listPixTable.indexOf(values), 1);
    setListPixTable([...listPixTable]);
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
    if (contractor?.id) {
      const statusBooleanString = {
        0: 'true',
        1: 'false',
      }[contractor.status];

      onChangeFormInputContractor(FormInputNameToSaveContractor.name)(contractor.name);
      onChangeFormInputContractor(FormInputNameToSaveContractor.document)(contractor.document);
      onChangeFormInputContractor(FormInputNameToSaveContractor.companyType)(
        contractor.contractorType?.id,
      );
      onChangeFormInputContractor(FormInputNameToSaveContractor.telephone)(contractor.telephone);
      onChangeFormInputContractor(FormInputNameToSaveContractor.email)(contractor.email);
      onChangeFormInputContractor(FormInputNameToSaveContractor.zipCode)(
        contractor.address.zipCode,
      );
      onChangeFormInputContractor(FormInputNameToSaveContractor.state)(contractor.address.state);
      onChangeFormInputContractor(FormInputNameToSaveContractor.city)(contractor.address.city);
      onChangeFormInputContractor(FormInputNameToSaveContractor.district)(
        contractor.address.district,
      );
      onChangeFormInputContractor(FormInputNameToSaveContractor.street)(contractor.address.street);
      onChangeFormInputContractor(FormInputNameToSaveContractor.number)(
        contractor.address.number ?? '',
      );
      onChangeFormInputContractor(FormInputNameToSaveContractor.complement)(
        contractor.address.complement ?? '',
      );
      onChangeFormInputContractor(FormInputNameToSaveContractor.latitude)(
        String(contractor.address.latitude),
      );
      onChangeFormInputContractor(FormInputNameToSaveContractor.longitude)(
        String(contractor.address.longitude),
      );
      onChangeFormInputContractor(FormInputNameToSaveContractor.status)(statusBooleanString);
      // onChangeFormInputContractor(FormInputNameToSaveContractor.pix)(contractor.pix);
      setListBankAccount(
        contractor.bankAccount.map(item => ({
          id: item.bank.id,
          name: item.bank.fullName,
          agencia: item.agency,
          conta: `${item.account}-${item.digit}`,
        })),
      );
      setListPixTable(
        contractor.pixKey.map(item => ({
          idInstitution: item.bank.id,
          nameInstitution: item.bank.fullName,
          idType: item.pixKeyType,
          nameType: pixTypes.find(pixType => pixType.id === item.pixKeyType).type,
          pix: item.key,
        })),
      );
    }
  }, [contractor]);

  useEffect(() => {
    handleFetch(currentPage);
    handleGetbankAccount();
    handleGetContractorType();
    handleGetUsers();
    handleGetPixTypes();
  }, []);

  return (
    <ContractorContainer
      state={state}
      contractorState={contractor}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      shouldShowModal={shouldShowModal}
      onSaveContractor={handleOnSaveContractor}
      onSaveBankAccount={handleOnBankAccount}
      onSavePix={handleOnPix}
      listContractor={listContractor}
      currentPage={currentPage}
      changeColorColumn={handleOnChangeColorColumn}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataContractor={formDataContractor}
      formErrorsContractor={formErrorsContractor}
      onChangeFormInputContractor={onChangeFormInputContractor}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onShowDeleteContractor={handleOnShowDeleteContractor}
      onFilter={handleOnFilter}
      listBankAccount={listBankAccount}
      listPixTable={listPixTable}
      clearFilter={clearFilter}
      controllerInputAppendBankAccount={controllerInputAppendBankAccount}
      controllerInputAppendPix={controllerInputAppendPix}
      controllerAppendUser={controllerAppendUser}
      onDeleteRowBankAccount={handleOnDeleteRowBankAccount}
      onDeleteRowPix={handleOnDeleteRowPix}
      listContractorType={listContractorType}
    />
  );
};
