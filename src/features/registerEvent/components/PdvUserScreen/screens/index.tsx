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
import { useParams } from 'react-router-dom';
import PdvUser from '@/model/PdvUser';
import { PdvUserContainer } from './ui';
import { formPdvUserProps } from '../types';
import { mainPdvStatesProps } from '../../PdvScreen/types';
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

type UrlParams = {
  id: string;
};

interface PdvUserScreenProps extends SectorProductPosContainerProps {
  pdvId?: string;
  mainPdvStates: mainPdvStatesProps;
}

export const PdvUserScreen: React.FC<PdvUserScreenProps> = ({ pdvId, nextTab, backTab }) => {
  const params = useParams<UrlParams>();
  const [state, setState] = useState<States>(States.default);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
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

  const getPdvUsers = async (users: User[]): Promise<void> => {
    try {
      setState(States.loading);
      let usersVar: User[] = [];
      if (pdvId) {
        const { data } = await api.get<User[]>(`/event/pdv/${params.id}/user/${pdvId}`);
        usersVar = data;
      }

      const newListUsers = users.filter(item => {
        let found = false;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < usersVar.length; i++) {
          if (item.id === usersVar[i].id) {
            found = true;
            break;
          }
        }
        if (!found) {
          return true;
        }
        return false;
      });
      setListUsers(newListUsers);
      setUsersSelected(usersVar);
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
      setOriginalUsers(data);
      await getPdvUsers(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const controllerFormUser: formPdvUserProps = {
    formData: formDataUser,
    formErrors: formErrorsUser,
    onChangeFormInput: onChangeFormInputUser,
    isFormValid: isFormValidUser,
  };

  const handleAddUser = async (userId: string): Promise<void> => {
    const newUsersSelected = listUsers.filter(item => item.id === userId)[0];
    if (usersSelected.find(item => item.id === newUsersSelected.id)) {
      return;
    }
    try {
      setState(States.loading);
      const request: PdvUser = {
        pdvId: pdvId as string,
        users: [],
      };
      request.users.push(userId);
      await api.post(`/event/pdv/${params.id}/user`, request);
      await getPdvUsers(originalUsers);
    } catch (error) {
      const err = error as AxiosError | any;
      toast.error(err.detail.message);
    } finally {
      setState(States.default);
    }
  };

  const handleRemoveUser = async (userId: string): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(`/event/pdv/${params.id}/user/${pdvId}/${userId}`);
      await getPdvUsers(originalUsers);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const controllerAppendUser = {
    listUsers,
    usersSelected,
    handleAddUser,
    handleRemoveUser,
    handleGetUsers,
  };

  useEffect(() => {
    handleGetUsers();
    getPdvUsers(usersSelected);
  }, [pdvId]);

  useEffect(() => {
    handleGetUsers();
    getPdvUsers(usersSelected);
  }, []);

  return (
    <>
      <PdvUserContainer
        state={state}
        controllerFormUser={controllerFormUser}
        nextTab={nextTab}
        backTab={backTab}
        controllerAppendUser={controllerAppendUser}
      />
    </>
  );
};
