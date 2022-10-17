import { ActionProps } from '@/components/Dialog';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import useForm from '@/hooks/useForm';
import Profile from '@/model/Profile';
import User from '@/model/User';
import api, { AxiosError } from '@/services/api';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserType from '@/model/UserType';
import { useDialog } from '@/hooks/useDialog';
import { UserGroupList } from './ui/UserGroupList';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputUser {
  name = 'name',
  cpf = 'cpf',
  telephone = 'telephone',
  email = 'email',
  imageBase64 = 'imageBase64',
  password = 'password',
  userType = 'userType',
  status = 'status',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  user = 'user',
  group = 'group',
}

export const UserScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState(States.default);
  const [title, setTitle] = useState('Usuários e Grupos');
  const [shouldShowModal, setShouldShowModal] = useState({} as ShouldShowModal);
  const [users, setUsers] = useState([] as User[]);
  const [groups, setGroups] = useState([] as Profile[]);
  const [user, setUser] = useState({} as User);
  const [group, setGroup] = useState({} as Profile);

  const { visible, onToggle } = useDialog();

  const {
    formData: formDataUser,
    formErrors: formErrorsUser,
    onChangeFormInput: onChangeFormInputUser,
    isFormValid: isFormValidUser,
    resetForm: resetFormUser,
    setErrors: setErrorsUser,
  } = useForm({
    initialData: {
      name: '',
      cpf: updateMaskCPFOrCNPJ(''),
      telephone: updateMaskMobilePhone(''),
      email: '',
      imageBase64: '',
      usertype: '0',
      password: '',
      status: '',
    },
    validators: {
      name: [validators.required],
      cpf: [validators.required, validators.cpforcnpj],
      telephone: [validators.required, validators.mobilePhone],
      email: [validators.required],
      userType: [validators.required],
      password: [validators.required],
    },
    formatters: {
      cpf: updateMaskCPFOrCNPJ,
      telephone: updateMaskMobilePhone,
    },
  });

  const toUserType = (userType: UserType): string => {
    let result = '';
    switch (userType) {
      case UserType.Employee:
        result = 'Funcionário';
        break;
      case UserType.PDV:
        result = 'PDV';
        break;

      case UserType.SUB_PDV:
        result = 'Sub PDV';
        break;
      case UserType.POS:
        result = 'POS';
        break;
      case UserType.CONTRACTOR:
        result = 'Empresa';
        break;
      default:
        break;
    }
    return result;
  };

  const handleOnChangeFileInput =
    (inputName: string) =>
    (file: File | undefined): void => {
      // validate if file is image
      if (file && file.type.includes('image')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result?.toString();
          if (base64) {
            onChangeFormInputUser(inputName)(base64);
          }
        };
      } else {
        setErrorsUser({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

  const getUsers = async (): Promise<void> => {
    setState(States.loading);
    const response = await api.get<User[]>('/user/find');
    setUsers(response.data);
    const profiles = [] as Profile[];
    response.data.forEach(data => {
      if (data.profiles && data.profiles.length > 0) {
        // eslint-disable-next-line no-plusplus
        for (let p = 0; p < data.profiles.length; p++) {
          let exists = false;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < profiles.length; i++) {
            if (data.profiles[p].id === profiles[i].id) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            profiles.push(data.profiles[p]);
          }
        }
      }
    });
    setGroups(profiles);
    setState(States.default);
  };

  const stringToUserType = (value: string): UserType => {
    let userType = UserType.Employee;
    switch (value) {
      case '0':
        userType = UserType.Employee;
        break;
      case '1':
        userType = UserType.PDV;
        break;
      case '2':
        userType = UserType.SUB_PDV;
        break;
      case '3':
        userType = UserType.POS;
        break;
      case '4':
        userType = UserType.CONTRACTOR;
        break;
      default:
        userType = UserType.Employee;
        break;
    }
    return userType;
  };

  const userTypeToString = (userType: UserType): string => {
    let result = '0';
    switch (userType) {
      case UserType.Employee:
        result = '0';
        break;
      case UserType.PDV:
        result = '1';
        break;

      case UserType.SUB_PDV:
        result = '2';
        break;
      case UserType.POS:
        result = '3';
        break;
      case UserType.CONTRACTOR:
        result = '4';
        break;
      default:
        break;
    }
    return result;
  };

  const onSaveUser = async (): Promise<void> => {
    try {
      if (isFormValidUser()) {
        const payload: User = {
          id: user?.id,
          name: formDataUser[FormInputUser.name],
          cpf: formDataUser[FormInputUser.cpf],
          telephone: formDataUser[FormInputUser.telephone],
          email: formDataUser[FormInputUser.email],
          imageBase64: formDataUser[FormInputUser.imageBase64],
          userType: stringToUserType(formDataUser[FormInputUser.userType]),
          password: formDataUser[FormInputUser.password],
        };

        if (!payload.id) {
          await api.post<User>('/user', payload);
          toast.success(`PDV "${formDataUser[FormInputUser.name]}" cadastrado com sucesso!`);
        } else {
          await api.put<User>('/user', payload);
          toast.success(`PDV "${formDataUser[FormInputUser.name]}" atualizado com sucesso!`);
        }
        resetFormUser();
        onToggle();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const openModal = (
    value: ShouldShowModal,
    modalTitle: string,
    userSelected?: User,
    groupSelected?: Profile,
  ): void => {
    setTitle(modalTitle);
    setShouldShowModal(value);
    if (userSelected) {
      setUser(userSelected);
    }
    if (groupSelected) {
      setGroup(groupSelected);
    }
    onToggle();
  };

  const checkAllUserList = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e);
  };

  const changeUserList = (userList: User): void => {
    console.log(userList);
  };

  const checkAllGroupList = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e);
  };

  const changeGroupList = (groupList: Profile): void => {
    console.log(groupList);
  };

  useEffect(() => {
    if (user?.id) {
      onChangeFormInputUser(FormInputUser.name)(user.name);
      onChangeFormInputUser(FormInputUser.cpf)(user.cpf);
      onChangeFormInputUser(FormInputUser.telephone)(user.telephone);
      onChangeFormInputUser(FormInputUser.email)(user.email);
      onChangeFormInputUser(FormInputUser.imageBase64)(user.imageBase64);
      onChangeFormInputUser(FormInputUser.password)(user.password);
      onChangeFormInputUser(FormInputUser.userType)(userTypeToString(user.userType));
      onChangeFormInputUser(FormInputUser.status)('true');
    }
  }, [user]);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <UserGroupList
      state={state}
      title={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      renderModalActionProps={renderActionDialogToCancel}
      formDataUser={formDataUser}
      formErrorsUser={formErrorsUser}
      users={users}
      groups={groups}
      user={user}
      group={group}
      onToggle={onToggle}
      openModal={openModal}
      saveUser={onSaveUser}
      checkAllUserList={checkAllUserList}
      toUserType={toUserType}
      changeUserList={changeUserList}
      checkAllGroupList={checkAllGroupList}
      changeGroupList={changeGroupList}
      changeFormInputUser={onChangeFormInputUser}
      changeFileInputUser={handleOnChangeFileInput}
    />
  );
};
