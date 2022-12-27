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
import StatusType from '@/model/StatusType';
import Module from '@/model/Module';
import Permission from '@/model/Permission';
import Page from '@/model/Page';
import CustomError from '@/model/CustomError';
import { UserGroupList } from './ui/UserGroupList';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface CheckBoxUser {
  check: string;
  id: string;
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  imageBase64: string;
  imageName: string;
  password: string;
  userType: UserType;
  profiles?: Profile[];
  status: StatusType;
}

export interface CheckBoxGroup {
  check: string;
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  actived: boolean;
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

// eslint-disable-next-line no-shadow
export enum FormInputFilter {
  filterSearch = 'filterSearch',
  inputSearch = 'inputSearch',
}

// eslint-disable-next-line no-shadow
export enum FormInputUser {
  name = 'name',
  cpf = 'cpf',
  telephone = 'telephone',
  email = 'email',
  imageBase64 = 'imageBase64',
  imageName = 'imageName',
  password = 'password',
  userType = 'userType',
  status = 'status',
}

// eslint-disable-next-line no-shadow
export enum FormInputGroup {
  name = 'name',
  description = 'description',
  actived = 'actived',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  user = 'user',
}

export interface CheckBoxData {
  checked: boolean;
  id: string;
  name: string;
}

export const UserScreen: React.FC<any> = ({
  getUsersDropdown,
  userDropdownSelected,
}): JSX.Element => {
  const mountUserProfilesCheckBox = (): CheckBoxData[] => {
    const userProfileCheckBox: CheckBoxData[] = [];
    userProfileCheckBox.push({
      checked: false,
      id: '0',
      name: 'Funcionários',
    });

    userProfileCheckBox.push({
      checked: false,
      id: '1',
      name: 'PDV',
    });

    userProfileCheckBox.push({
      checked: false,
      id: '2',
      name: 'SubPDV',
    });

    userProfileCheckBox.push({
      checked: false,
      id: '3',
      name: 'POS',
    });

    userProfileCheckBox.push({
      checked: false,
      id: '4',
      name: 'Empresa',
    });
    return userProfileCheckBox;
  };

  const [state, setState] = useState(States.default);
  // const [title, setTitle] = useState('');
  const [shouldShowModal, setShouldShowModal] = useState({} as ShouldShowModal);
  const [users, setUsers] = useState([] as CheckBoxUser[]);
  const [user, setUser] = useState({} as User);
  const [userProfileCheckBox, setUserProfileCheckBox] = useState(mountUserProfilesCheckBox());
  const [userGroups, setUserGroups] = useState([] as CheckBoxGroup[]);
  const [modules, setModules] = useState([] as CheckBoxModule[]);
  const { visible, title, onChangeTitle, onToggle } = useDialog();

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

  const onlyNumbers = (value: string): string => {
    if (value) {
      const s = value.replace(/\D/g, '');
      return s;
    }
    return value;
  };

  const onBlurCPF = async (): Promise<void> => {
    const pageUser: Page<User, User> = {
      page: 1,
      pageSize: 1,
      sort: 'name',
      order: 'ASC',
    };
    if (formDataUser[FormInputUser.cpf]) {
      pageUser.entity = { cpf: onlyNumbers(formDataUser[FormInputUser.cpf]) } as User;
      const response = await api.post<Page<User, User>>('/user/page', pageUser);
      if (response.data.total && response.data.total > 0) {
        setErrorsUser({
          cpf: ['CPF já existente'],
          name: [undefined as unknown as string],
          telephone: [undefined as unknown as string],
          email: [undefined as unknown as string],
          userType: [undefined as unknown as string],
          password: [undefined as unknown as string],
        });
      } else {
        setErrorsUser({
          cpf: [undefined as unknown as string],
          name: [undefined as unknown as string],
          telephone: [undefined as unknown as string],
          email: [undefined as unknown as string],
          userType: [undefined as unknown as string],
          password: [undefined as unknown as string],
        });
      }
    }
  };

  const handleOnChangeFileInput =
    (inputName: string) =>
    (file: File | undefined): void => {
      // validate if file is image
      if (file && file.type.match(/image\/(jpg|jpeg|png)/)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result?.toString();
          if (base64) {
            onChangeFormInputUser(inputName)(base64);
            onChangeFormInputUser(FormInputUser.imageName)(file.name);
          }
        };
      } else {
        setErrorsUser({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };

  const getUsers = async (): Promise<void> => {
    try {
      setState(States.loading);
      const pageUser: Page<User, User> = {
        page: 1,
        pageSize: 200,
        sort: 'name',
        order: 'ASC',
      };
      const response = await api.post<Page<User, User>>('/user/page', pageUser);
      const listCheckBoxUsers: CheckBoxUser[] = [];
      if (response.data.list) {
        response.data.list.forEach(data => {
          const checkBoxUser: CheckBoxUser = {
            ...data,
            check: 'false',
          };
          listCheckBoxUsers.push(checkBoxUser);
        });
        setUsers(listCheckBoxUsers);
      }

      const pageGroup: Page<Profile, Profile> = {
        page: 1,
        pageSize: 200,
        sort: 'name',
        order: 'ASC',
      };

      const responseGroup = await api.post<Page<Profile, Profile>>('/profile/page', pageGroup);
      const listCheckBoxGroup: CheckBoxGroup[] = [];
      if (responseGroup.data.list) {
        responseGroup.data.list.forEach(data => {
          const checkBoxGroup: CheckBoxGroup = {
            ...data,
            check: 'false',
          };
          listCheckBoxGroup.push(checkBoxGroup);
        });
      }

      getUsersDropdown();
      setState(States.default);
    } catch (error) {
      setState(States.default);
    }
  };

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
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

  const getGroups = async (selectedUser?: User): Promise<void> => {
    try {
      setState(States.loading);
      const response = await api.get<Profile[]>('/profile/find');
      const list: CheckBoxGroup[] = [];
      if (response.data && response.data.length > 0) {
        response.data.forEach(data => {
          let checked = 'false';
          if (selectedUser && selectedUser.profiles && selectedUser.profiles.length > 0) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < selectedUser.profiles.length; i++) {
              if (data.id === selectedUser.profiles[i].id) {
                checked = 'true';
              }
            }
          }
          const checkBoxGroup: CheckBoxGroup = {
            ...data,
            check: checked,
          };
          list.push(checkBoxGroup);
        });
      }
      setUserGroups(list);
      setState(States.default);
    } catch (error) {
      setState(States.default);
    }
  };

  const openModal = async (
    value: ShouldShowModal,
    modalTitle: string,
    userSelected?: User,
  ): Promise<void> => {
    onChangeTitle(modalTitle);
    setShouldShowModal(value);
    if (value === ShouldShowModal.user) {
      await getGroups(userSelected);
      if (userSelected) {
        const userType = userTypeToString(userSelected.userType);
        const list: CheckBoxData[] = [];
        userProfileCheckBox.forEach(data => {
          const newData: CheckBoxData = {
            ...data,
          };
          if (data.id === userType) {
            newData.checked = true;
          }
          list.push(newData);
        });
        setUser(userSelected);
        setUserProfileCheckBox(list);
      } else {
        setUser(undefined as unknown as User);
        resetFormUser();
      }
    }
    onToggle();
  };

  const onSaveUser = async (): Promise<void> => {
    try {
      if (isFormValidUser()) {
        if (
          formDataUser[FormInputUser.userType] === '0' ||
          formDataUser[FormInputUser.userType] === '1' ||
          formDataUser[FormInputUser.userType] === '2' ||
          formDataUser[FormInputUser.userType] === '3' ||
          formDataUser[FormInputUser.userType] === '4'
        ) {
          setState(States.loading);
          const profiles: Profile[] = [];
          userGroups.forEach(data => {
            if (data.check === 'true') {
              const profile = {
                id: data.id,
              } as Profile;
              profiles.push(profile);
            }
          });
          const payload: User = {
            id: user?.id,
            name: formDataUser[FormInputUser.name],
            cpf: formDataUser[FormInputUser.cpf],
            telephone: formDataUser[FormInputUser.telephone],
            email: formDataUser[FormInputUser.email],
            imageBase64: formDataUser[FormInputUser.imageBase64],
            imageName: formDataUser[FormInputUser.imageName],
            userType: stringToUserType(formDataUser[FormInputUser.userType]),
            password: formDataUser[FormInputUser.password],
            status:
              formDataUser[FormInputUser.status] === 'true'
                ? StatusType.ACTIVE
                : StatusType.INACTIVE,
            profiles,
          };
          if (!payload.id) {
            await api.post<User>('/user', payload);
            toast.success(`Usuário "${formDataUser[FormInputUser.name]}" cadastrado com sucesso!`);
          } else {
            await api.put<User>('/user', payload);
            toast.success(`Usuário "${formDataUser[FormInputUser.name]}" atualizado com sucesso!`);
          }
          resetFormUser();
          setState(States.default);
          onToggle();
          getUsers();
        } else {
          toast.warn('Informar tipo do Usuário!');
        }
      }
    } catch (error) {
      setState(States.default);
      const err = error as AxiosError;
      if (err.response && err.response.data && err.response.data) {
        const customError = err.response.data as CustomError;
        if (customError.details && customError.details.length > 0) {
          customError.details.forEach(data => {
            if (err.response?.status === 400) {
              toast.warn(data);
            } else {
              toast.error(data);
            }
          });
        }
      } else {
        toast.error(err.message);
      }
    }
  };

  const onActivateAndInactivateUser = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    onChangeFormInputUser(FormInputUser.status)(String(e.target.checked));
  };

  const onChangeUserTypeSelected = (
    e: ChangeEvent<HTMLInputElement>,
    userType: CheckBoxData,
  ): void => {
    const list: CheckBoxData[] = [];
    userProfileCheckBox.forEach(data => {
      const checkBoxData: CheckBoxData = {
        ...data,
        checked: false,
      };
      if (data.id === userType.id) {
        checkBoxData.checked = e.target.checked;
        if (e.target.checked) {
          onChangeFormInputUser(FormInputUser.userType)(userType.id);
        }
      }
      list.push(checkBoxData);
    });
    setUserProfileCheckBox(list);
  };

  const onChangeUserGroupSelected = (
    e: ChangeEvent<HTMLInputElement>,
    groupSelected: CheckBoxGroup,
  ): void => {
    const list: CheckBoxGroup[] = [];
    userGroups.forEach(data => {
      if (data.id === groupSelected.id) {
        // eslint-disable-next-line no-param-reassign
        data.check = String(e.target.checked);
      }
      list.push(data);
    });
    setUserGroups(list);
  };

  const checkPermission = (
    e: React.ChangeEvent<HTMLInputElement>,
    permission: CheckBoxPermission,
  ): void => {
    const listCheckBoxModule: CheckBoxModule[] = [];
    // eslint-disable-next-line no-plusplus
    for (let m = 0; m < modules.length; m++) {
      let count = 0;
      // eslint-disable-next-line no-plusplus
      for (let p = 0; p < modules[m].permissions.length; p++) {
        if (modules[m].permissions[p].id === permission.id) {
          modules[m].permissions[p].check = String(e.target.checked);
        }
        if (modules[m].permissions[p].check === 'true') {
          // eslint-disable-next-line no-plusplus
          count++;
        }
      }
      modules[m].count = count;
      listCheckBoxModule.push(modules[m]);
    }
    setModules(listCheckBoxModule);
  };

  const toUserStatus = (statusType: StatusType | undefined): string => {
    let status = 'false';
    switch (statusType) {
      case StatusType.ACTIVE:
        status = 'true';
        break;
      case StatusType.INACTIVE:
        status = 'false';
        break;
      default:
        status = 'false';
        break;
    }
    return status;
  };

  useEffect(() => {
    if (user?.id) {
      onChangeFormInputUser(FormInputUser.name)(user.name);
      onChangeFormInputUser(FormInputUser.cpf)(user.cpf);
      onChangeFormInputUser(FormInputUser.telephone)(user.telephone);
      onChangeFormInputUser(FormInputUser.email)(user.email);
      onChangeFormInputUser(FormInputUser.imageBase64)(user.imageBase64);
      onChangeFormInputUser(FormInputUser.imageName)(user.imageName);
      onChangeFormInputUser(FormInputUser.password)(user.password);
      onChangeFormInputUser(FormInputUser.userType)(userTypeToString(user.userType));
      onChangeFormInputUser(FormInputUser.status)(toUserStatus(user.status));
    }
  }, [user]);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <UserGroupList
      state={state}
      userDropdownSelected={userDropdownSelected}
      title="Usuários e Grupos"
      modalTitle={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      renderModalActionProps={renderActionDialogToCancel}
      formDataUser={formDataUser}
      formErrorsUser={formErrorsUser}
      users={users}
      user={user}
      userProfileCheckBox={userProfileCheckBox}
      userModules={userGroups}
      modules={modules}
      onToggle={onToggle}
      openModal={openModal}
      saveUser={onSaveUser}
      changeFormInputUser={onChangeFormInputUser}
      onBlurCPF={onBlurCPF}
      checkPermission={checkPermission}
      changeFileInputUser={handleOnChangeFileInput}
      onActivateAndInactivateUser={onActivateAndInactivateUser}
      onChangeUserTypeSelected={onChangeUserTypeSelected}
      onChangeUserGroupSelected={onChangeUserGroupSelected}
    />
  );
};
