/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useDialog } from '@/hooks/useDialog';

import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import Permission from '@/model/Permission';
import Module from '@/model/Module';

import User from '@/model/User';
import { formPdvUserProps, onShouldShowModalSectorProductUserProps } from '../types';
import { PdvUserContainer, ShouldShowModal } from './ui';
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
  // state: States;
  nextTab: () => void;
  backTab: () => void;
}
export const PdvUserScreen: React.FC<SectorProductPosContainerProps> = ({
  // state,
  nextTab,
  backTab,
}) => {
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.userRegister,
  );

  const [listUsers, setListUsers] = useState<User[]>([]);
  // const [listUsersDefault, setListUsersDefault] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);
  // const [userState, setUserState] = useState<any>();
  const { title, onChangeTitle, visible, onToggle } = useDialog();

  const {
    formData: formDataUser,
    formErrors: formErrorsUser,
    onChangeFormInput: onChangeFormInputUser,
    isFormValid: isFormValidUser,
    // setErrors: setErrorsUser,
    // resetForm: resetFormUser,
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

  const controllerFormUser: formPdvUserProps = {
    formData: formDataUser,
    formErrors: formErrorsUser,
    onChangeFormInput: onChangeFormInputUser,
    isFormValid: isFormValidUser,
  };
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
  }: // user: userSelected,
  onShouldShowModalSectorProductUserProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    // setUserState(userSelected);
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

  return (
    <>
      <PdvUserContainer
        controllerFormUser={controllerFormUser}
        nextTab={nextTab}
        backTab={backTab}
        title={title}
        onToggle={onToggle}
        visible={visible}
        shouldShowModal={shouldShowModal}
        onShouldShowModal={handleOnShouldShowModal}
        controllerAppendUser={controllerAppendUser}
      />
    </>
  );
};
