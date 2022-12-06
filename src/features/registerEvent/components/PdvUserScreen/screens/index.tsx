/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import Permission from '@/model/Permission';
import Module from '@/model/Module';
import User from '@/model/User';
import { AxiosError } from 'axios';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { PdvUserContainer } from './ui';
import { formPdvUserProps } from '../types';
// import { formPdvProductProps } from '../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface CheckBoxData {
  checked: boolean;
  id: string;
  name: string;
}
export interface CheckBoxPermission {
  check: string;
  id: string;
  name: string;
  description: string;
  module: Module;
  identifier: string;
}
export interface CheckBoxModule {
  check: string;
  id: string;
  name: string;
  description: string;
  count: number;
  permissions: CheckBoxPermission[];
}

export interface CheckBoxGroup {
  check: string;
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  actived: boolean;
}

interface SectorProductPosContainerProps {
  nextTab: () => void;
  backTab: () => void;
}
export const PdvUserScreen: React.FC<SectorProductPosContainerProps> = ({ nextTab, backTab }) => {
  // const [state, setState] = useState<States>(States.default);
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  const {
    formData: formDataUser,
    formErrors: formErrorsUser,
    onChangeFormInput: onChangeFormInputUser,
    isFormValid: isFormValidUser,
  } = useForm({
    initialData: {
      name: '',
      cpf: updateMaskCPFOrCNPJ(''),
      telephone: updateMaskMobilePhone(''),
      email: '',
      imageBase64: '',
      usertype: '0',
      password: '',
      status: 'true',
    },
    validators: {
      name: [validators.required],
      cpf: [validators.required, validators.cpforcnpj],
      telephone: [validators.required, validators.mobilePhone],
      email: [validators.required, validators.email],
      password: [validators.required, validators.hasPasswordOnlyNumberCharacteres],
      status: [validators.required],
    },
    formatters: {
      cpf: updateMaskCPFOrCNPJ,
      telephone: updateMaskMobilePhone,
    },
  });
  const handleGetUsers = async (): Promise<void> => {
    try {
      // setState(States.loading);
      const { data } = await api.get<User[]>('/user/find');

      if (data) {
        setListUsers(data);
        // setListUsersDefault(data);
        setUsersSelected([]);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      // setState(States.default);
    }
  };

  const controllerFormUser: formPdvUserProps = {
    formData: formDataUser,
    formErrors: formErrorsUser,
    onChangeFormInput: onChangeFormInputUser,
    isFormValid: isFormValidUser,
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
    handleGetUsers,
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <>
      <PdvUserContainer
        controllerFormUser={controllerFormUser}
        nextTab={nextTab}
        backTab={backTab}
        controllerAppendUser={controllerAppendUser}
      />
    </>
  );
};
