/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import Contractor from '@/model/Contractor';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import {
  ContractorTypeResponse,
  PixForm,
  BanckAccountForm,
  BankResponse,
  ContractorSelectedProps,
  onShouldShowModalProps,
} from '@/features/registerEvent/components/ContractorScreen/types';
import useForm from '@/hooks/useForm';
import {
  States,
  ContractorContainer,
  ShouldShowModal,
} from '@/features/registerEvent/components/ContractorScreen/screens/ui';
import validators from '@/helpers/validators';
import {
  updateMask as updateMaskCPFOrCNPJ,
  unmask as unMaskCPFOrCNPJ,
} from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskCEP, unmask as unMaskCEP } from '@/helpers/masks/cep';
import {
  updateMask as updateMaskMobilePhone,
  unmask as unMaskMobilePhone,
} from '@/helpers/masks/mobilePhone';
import { FormInputName as FormInputNameToSaveContractor } from '@/features/registerEvent/components/ContractorScreen/components/RegisterContent';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import ContractorType from '@/model/ContractorType';
import Bank from '@/model/Bank';
import PixType from '@/model/PixType';
import User from '@/model/User';
import PixTypes from '@/model/PixTypes';
import Address from '@/model/Address';

export default interface PayloadContractor {
  id?: string;
  name: string;
  document: string;
  telephone: string;
  email: string;
  address: Address;
  contractorType?: {
    id?: string;
  };
  bankAccount: {
    id?: string;
    contractorId?: string;
    agency: string;
    account: string;
    digit: string;
    bank: {
      id: string;
    };
  }[];
  pixKey: {
    id?: string;
    contractorId?: string;
    key: string;
    pixKeyType: PixType;
    bank: {
      id: string;
    };
  }[];
}

export const ContractorScreen: React.FC<ContractorSelectedProps> = ({
  contractorSelected,
  contractorActions,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listContractorType, setListContractorType] = useState<ContractorType[]>([]);
  const [listBank, setListBank] = useState<Bank[]>([]);
  const [listBankAccount, setListBankAccount] = useState<BanckAccountForm[]>([]);
  const [listPixTable, setListPixTable] = useState<PixForm[]>([]);

  const [pixTypes, setPixTypes] = useState<PixTypes[]>([]);

  const [listUsers, setListUsers] = useState<User[]>([]);
  const [listUsersDefault, setListUsersDefault] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  const [pix, setPix] = useState<PixForm[]>([
    {
      idInstitution: '',
      nameInstitution: '',
      idType: '',
      nameType: '',
      pix: '',
    },
  ]);
  const [bankAccount, setBankAccount] = useState<BanckAccountForm[]>([]);
  const [contractor, setContractor] = useState<Contractor>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.registerContractor,
  );

  const { title, visible, onChangeTitle, onToggle } = useDialog();

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
      zipCode: [validators.required, validators.cep],
      state: [validators.required],
      city: [validators.required],
      district: [validators.required],
      street: [validators.required],
      number: [validators.required],
      telephone: [validators.required, validators.mobilePhone],
      email: [validators.required, validators.email],
    },
    formatters: {
      document: updateMaskCPFOrCNPJ,
      telephone: updateMaskMobilePhone,
      zipCode: updateMaskCEP,
    },
  });

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormContractor();
        setListBankAccount([]);
        setListPixTable([]);
        setUsersSelected([]);
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
          idType: '',
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
      // remove user selected from list
      const newListUsers = listUsers.filter(item => item.id !== userId);
      setListUsers(newListUsers);
    },
    handleRemoveUser(index: number): void {
      const values = [...usersSelected];
      values.splice(index, 1);
      setUsersSelected(values);
      // add user removed to list
      const newUser = listUsers.concat(usersSelected[index]);
      setListUsers(newUser);
    },
  };

  const handleGetbankAccount = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<BankResponse[]>('/bank/find');

      if (data) {
        setListBank(data);
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
        setListUsersDefault(data);
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
      const { data } = await api.get<PixTypes[]>('/bank/pix/types');

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
      const { data } = await api.post<ContractorTypeResponse>('/contractor/type/page', {});

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

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    contractor: companySelected,
    isEdit,
  }: onShouldShowModalProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);

    // reset list users
    setListUsers(listUsersDefault);

    if (!isEdit) {
      setBankAccount([...listBankAccount, { id: '', name: '', agencia: '', conta: '' }]);
      setPix([
        ...listPixTable,
        { idInstitution: '', nameInstitution: '', idType: '', nameType: '', pix: '' },
      ]);
    } else {
      setBankAccount([...listBankAccount]);
      setPix([...listPixTable]);
    }

    setContractor(companySelected);
    setListUsers(() => {
      // remove users selected from list listUsersDefault
      const newListUsers = listUsersDefault.filter(
        item => !usersSelected?.find(user => user.id === item.id),
      );
      return newListUsers;
    });
  };

  const handleOnSaveContractor = async (): Promise<void> => {
    try {
      if (isFormValidContractor()) {
        const activedInput = convertToBoolean(
          formDataContractor[FormInputNameToSaveContractor.status],
        );
        const dataBankAccount = listBankAccount.map(bank => ({
          contractorId: contractor?.id,
          agency: bank.agencia,
          account: bank.conta.split('-')[0],
          digit: bank.conta.split('-')[1],
          bank: {
            id: bank.id,
          },
        }));

        const dataPix = listPixTable.map(item => ({
          contractorId: contractor?.id,
          key: item.pix,
          pixKeyType: +item.idType,
          bank: {
            id: item.idInstitution,
          },
        }));

        const dataUsers = usersSelected.map(item => item.id);

        const payload: PayloadContractor = {
          id: contractor?.id,
          name: formDataContractor[FormInputNameToSaveContractor.name],
          document: unMaskCPFOrCNPJ(formDataContractor[FormInputNameToSaveContractor.document]),
          telephone: unMaskMobilePhone(formDataContractor[FormInputNameToSaveContractor.telephone]),
          email: formDataContractor[FormInputNameToSaveContractor.email],
          address: {
            id: contractor?.address?.id,
            zipCode: unMaskCEP(formDataContractor[FormInputNameToSaveContractor.zipCode]),
            state: formDataContractor[FormInputNameToSaveContractor.state],
            city: formDataContractor[FormInputNameToSaveContractor.city],
            district: formDataContractor[FormInputNameToSaveContractor.district],
            street: formDataContractor[FormInputNameToSaveContractor.street],
            complement: formDataContractor[FormInputNameToSaveContractor.complement],
            number: formDataContractor[FormInputNameToSaveContractor.number],
            latitude: parseFloat(formDataContractor[FormInputNameToSaveContractor.latitude]) || 0.0,
            longitude:
              parseFloat(formDataContractor[FormInputNameToSaveContractor.longitude]) || 0.0,
          },
          contractorType: {
            id: formDataContractor[FormInputNameToSaveContractor.companyType],
          },
          bankAccount: dataBankAccount,
          pixKey: dataPix,
        };

        if (payload.contractorType?.id === 'empty' || payload.contractorType?.id === 'undefined') {
          delete payload.contractorType;
        }

        if (!payload.id) {
          delete payload.id;

          setState(States.loading);
          const { data: dataContractor } = await api.post<Contractor>('/contractor', payload);

          await api.post('/contractor/user', {
            contractorId: dataContractor.id,
            users: dataUsers,
          });

          await api.patch<Contractor>(
            `/contractor${activedInput ? '/activate' : '/inactivate'}/${dataContractor.id}`,
          );
          toast.success('Empresa cadastrada com sucesso!');
        } else {
          setState(States.loading);
          await api.put<Contractor>('/contractor', payload);

          await api.patch<Contractor>(
            `/contractor${activedInput ? '/activate' : '/inactivate'}/${contractor?.id}`,
          );

          await api.post('/contractor/user', {
            contractorId: contractor?.id,
            users: dataUsers,
          });
          toast.success('Empresa atualizada com sucesso!');
        }

        contractorActions.onGetList();
        onToggle();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
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
        newTitleModal: contractor?.id ? contractor.name : 'Cadastrar nova empresa (contratante)',
        contractor,
      });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnPix = async (): Promise<void> => {
    try {
      // verify if the bank account not exists values empty
      const pixEmpty = pix.find(
        item => item.idInstitution === '' || item.nameType === '' || item.pix === '',
      );
      if (pixEmpty) {
        toast.warn('Preencha todos os campos ou remova a Chave Pix que contém campos vazios');
        return;
      }
      setListPixTable(pix);
      handleOnShouldShowModal({
        value: ShouldShowModal.registerContractor,
        newTitleModal: contractor?.id ? contractor.name : 'Cadastrar nova empresa (contratante)',
        contractor,
      });
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnDeleteRowBankAccount = (values: BanckAccountForm): void => {
    listBankAccount.splice(listBankAccount.indexOf(values), 1);
    setListBankAccount([...listBankAccount]);
  };

  const handleOnDeleteRowPix = (values: PixForm): void => {
    listPixTable.splice(listPixTable.indexOf(values), 1);
    setListPixTable([...listPixTable]);
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
          idType: String(item.pixKeyType),
          nameType:
            pixTypes.find(pixType => String(pixType.id) === String(item.pixKeyType))?.type ?? '',
          pix: item.key,
        })),
      );
      setUsersSelected(contractor.users);
      setListUsers(user =>
        // remove users that are already selected
        user.filter(
          userItem => !contractor.users.find(userSelected => userSelected.id === userItem.id),
        ),
      );
    }
  }, [contractor]);

  useEffect(() => {
    handleGetbankAccount();
    handleGetContractorType();
    handleGetUsers();
    handleGetPixTypes();
  }, []);

  return (
    <ContractorContainer
      contractorSelected={contractorSelected}
      state={state}
      contractorState={contractor}
      title={title}
      visible={visible}
      onToggle={onToggle}
      shouldShowModal={shouldShowModal}
      onSaveContractor={handleOnSaveContractor}
      onSaveBankAccount={handleOnBankAccount}
      onSavePix={handleOnPix}
      onShouldShowModal={handleOnShouldShowModal}
      formDataContractor={formDataContractor}
      formErrorsContractor={formErrorsContractor}
      onChangeFormInputContractor={onChangeFormInputContractor}
      listBankAccount={listBankAccount}
      listPixTable={listPixTable}
      controllerInputAppendBankAccount={controllerInputAppendBankAccount}
      controllerInputAppendPix={controllerInputAppendPix}
      controllerAppendUser={controllerAppendUser}
      onDeleteRowBankAccount={handleOnDeleteRowBankAccount}
      onDeleteRowPix={handleOnDeleteRowPix}
      listContractorType={listContractorType}
    />
  );
};
