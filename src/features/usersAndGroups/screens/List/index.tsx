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
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import StatusType from '@/model/StatusType';
import Module from '@/model/Module';
import Permission from '@/model/Permission';
import ProfilePermission from '@/model/ProfilePermission';
import Page from '@/model/Page';
import { UserGroupList } from './ui/UserGroupList';
import { DeleteContent } from '../../components/DeleteContent';

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
  filter = 'filter',
  user = 'user',
  group = 'group',
}

export interface CheckBoxData {
  checked: boolean;
  id: string;
  name: string;
}

export const UserScreen: React.FC = (): JSX.Element => {
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
  const [groups, setGroups] = useState([] as CheckBoxGroup[]);
  const [user, setUser] = useState({} as User);
  const [userProfileCheckBox, setUserProfileCheckBox] = useState(mountUserProfilesCheckBox());
  const [group, setGroup] = useState({} as Profile);
  const [userGroups, setUserGroups] = useState([] as CheckBoxGroup[]);
  const [modules, setModules] = useState([] as CheckBoxModule[]);
  const [userSelectedCount, setUserSelectedCount] = useState(0);
  const [groupSelectedCount, setGroupSelectedCount] = useState(0);
  const { visible, title, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

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
    },
    formatters: {
      cpf: updateMaskCPFOrCNPJ,
      telephone: updateMaskMobilePhone,
    },
  });

  const {
    formData: formDataGroup,
    formErrors: formErrorsGroup,
    onChangeFormInput: onChangeFormInputGroup,
    isFormValid: isFormValidGroup,
    resetForm: resetFormGroup,
  } = useForm({
    initialData: {
      name: '',
      description: '',
    },
    validators: {
      name: [validators.required],
      description: [validators.required],
    },
  });

  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    resetForm: resetFormFilter,
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

  const toUserType = (userType: UserType): string => {
    let result = '';
    switch (userType) {
      case UserType.Employee:
        result = 'Funcionários';
        break;
      case UserType.PDV:
        result = 'PDV';
        break;

      case UserType.SUB_PDV:
        result = 'SubPDV';
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

  const getUsers = async (): Promise<void> => {
    try {
      setState(States.loading);
      const pageUser: Page<User, User> = {
        page: 1,
        pageSize: 200,
        sort: 'name',
        order: 'ASC',
      };
      if (formDataFilter[FormInputFilter.filterSearch] === 'user') {
        pageUser.entity = { name: formDataFilter[FormInputFilter.inputSearch] } as User;
      }
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
      if (formDataFilter[FormInputFilter.filterSearch] === 'grop') {
        pageGroup.entity = { name: formDataFilter[FormInputFilter.inputSearch] } as Profile;
      }
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
      setGroups(listCheckBoxGroup);
      setState(States.default);
    } catch (error) {
      setState(States.default);
    }
  };

  const onFilter = async (): Promise<void> => {
    if (isFormValidFilter()) {
      await getUsers();
      resetFormFilter();
      onToggle();
    }
  };

  const clearFilter = (): void => {
    resetFormFilter();
    formDataFilter[FormInputFilter.inputSearch] = '';
    onFilter();
  };

  const renderActionDialogToClearFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): void => {
      clearFilter();
    },
    theme: 'noneBorder',
  };

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

  const getModules = async (selectedGroup: Profile | undefined): Promise<void> => {
    try {
      setState(States.loading);
      const response = await api.get<Module[]>('/module/find');
      const listCheckBoxModule: CheckBoxModule[] = [];
      response.data.forEach(data => {
        let count = 0;
        const listCheckBoxPermission: CheckBoxPermission[] = [];
        data.permissions.forEach(permission => {
          let checked = 'false';
          if (selectedGroup) {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < selectedGroup.permissions.length; i++) {
              if (selectedGroup.permissions[i].id === permission.id) {
                checked = 'true';
                // eslint-disable-next-line no-plusplus
                count++;
                break;
              }
            }
          }
          const checkBoxPermission: CheckBoxPermission = {
            ...permission,
            check: checked,
          };
          listCheckBoxPermission.push(checkBoxPermission);
        });

        const checkBoxModule: CheckBoxModule = {
          ...data,
          check: 'false',
          count,
          permissions: listCheckBoxPermission,
        };
        listCheckBoxModule.push(checkBoxModule);
      });
      setModules(listCheckBoxModule);
      setState(States.default);
    } catch (error) {
      setState(States.default);
      throw error;
    }
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

  const onSaveUser = async (): Promise<void> => {
    try {
      if (isFormValidUser()) {
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
        const payload = {
          id: user?.id,
          name: formDataUser[FormInputUser.name],
          cpf: formDataUser[FormInputUser.cpf],
          telephone: formDataUser[FormInputUser.telephone],
          email: formDataUser[FormInputUser.email],
          imageBase64: formDataUser[FormInputUser.imageBase64],
          userType: stringToUserType(formDataUser[FormInputUser.userType]),
          password: formDataUser[FormInputUser.password],
          profiles,
        } as User;
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
      }
    } catch (error) {
      setState(States.default);
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onActivateAndInactivateUser = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setState(States.loading);
    onChangeFormInputUser(FormInputUser.status)(String(e.target.checked));
    users.forEach(data => {
      if (data.id === user.id) {
        // eslint-disable-next-line no-param-reassign
        data.status = e.target.checked ? StatusType.ACTIVE : StatusType.INACTIVE;
      }
    });

    if (e.target.checked) {
      await api.patch<Profile>(`/user/activate/${user.id}`);
      toast.success(`Usuário "${formDataUser[FormInputUser.name]}" ativado com sucesso!`);
    } else {
      await api.patch<Profile>(`/user/inactivate/${user.id}`);
      toast.success(`Usuário "${formDataUser[FormInputUser.name]}" inativado com sucesso!`);
    }
    setState(States.default);
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

  const onSaveGroup = async (): Promise<void> => {
    try {
      if (isFormValidGroup()) {
        setState(States.loading);
        const permissions: string[] = [];
        modules.forEach(module => {
          module.permissions.forEach(modulePermission => {
            if (modulePermission.check === 'true') {
              permissions.push(modulePermission.id);
            }
          });
        });
        const payload = {
          id: group?.id,
          name: formDataGroup[FormInputGroup.name],
          description: formDataGroup[FormInputGroup.description],
        } as Profile;

        if (!payload.id) {
          const newProfile = await api.post<Profile>('/profile', payload);
          const profilePermission: ProfilePermission = {
            profileId: newProfile.data.id,
            permissions,
          };
          await api.post<Profile>('/profile/permission', profilePermission);
          toast.success(`Grupo "${formDataGroup[FormInputGroup.name]}" cadastrado com sucesso!`);
        } else {
          await api.put<Profile>('/profile', payload);
          const profilePermission: ProfilePermission = {
            profileId: group?.id,
            permissions,
          };
          await api.post<Profile>('/profile/permission', profilePermission);
          toast.success(`Grupo "${formDataGroup[FormInputGroup.name]}" atualizado com sucesso!`);
        }
        setState(States.default);
        resetFormGroup();
        onToggle();
        getUsers();
      }
    } catch (error) {
      setState(States.default);
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onActivateAndInactivateGroup = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setState(States.loading);
    onChangeFormInputGroup(FormInputGroup.actived)(String(e.target.checked));
    groups.forEach(data => {
      if (data.id === group.id) {
        // eslint-disable-next-line no-param-reassign
        data.actived = e.target.checked;
      }
    });

    if (e.target.checked) {
      await api.patch<Profile>(`/profile/activate/${group.id}`);
      toast.success(`Grupo "${formDataGroup[FormInputGroup.name]}" ativado com sucesso!`);
    } else {
      await api.patch<Profile>(`/profile/inactivate/${group.id}`);
      toast.success(`Grupo "${formDataGroup[FormInputGroup.name]}" inativado com sucesso!`);
    }
    setState(States.default);
  };

  const openModal = async (
    value: ShouldShowModal,
    modalTitle: string,
    userSelected?: User,
    groupSelected?: Profile,
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
    } else if (value === ShouldShowModal.group) {
      await getModules(groupSelected);
      if (groupSelected) {
        setGroup(groupSelected);
      } else {
        setGroup(undefined as unknown as Profile);
        resetFormGroup();
      }
    }
    onToggle();
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const onConfirmDeleteUser = async (userDelete: User): Promise<void> => {
    try {
      await api.delete(`/user/${userDelete.id}`);
      toast.success('Usuário excluído com sucesso!');
      handleOnClose();
      getUsers();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onShowDeleteUser = (userDelete: User): void => {
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
          onClick: (): Promise<void> => onConfirmDeleteUser(userDelete),
        },
      ],
    });
  };

  const onConfirmDeleteGroup = async (profile: Profile): Promise<void> => {
    try {
      await api.delete(`/profile/${profile.id}`);
      toast.success('Grupo excluído com sucesso!');
      handleOnClose();
      getUsers();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onShowDeleteGroup = (profile: Profile): void => {
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
          onClick: (): Promise<void> => onConfirmDeleteGroup(profile),
        },
      ],
    });
  };

  const checkAllUserList = (e: ChangeEvent<HTMLInputElement>): void => {
    const checked = String(e.target.checked);
    let count = 0;
    users.forEach(data => {
      // eslint-disable-next-line no-param-reassign
      data.check = checked;
      if (data.check === 'true') {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    });
    setUserSelectedCount(count);
  };

  const changeUserList = (
    e: React.ChangeEvent<HTMLInputElement>,
    checkBoxUser: CheckBoxUser,
  ): void => {
    let count = 0;
    users.forEach(data => {
      if (data.id === checkBoxUser.id) {
        // eslint-disable-next-line no-param-reassign
        data.check = String(e.target.checked);
      }
      if (data.check === 'true') {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    });
    setUserSelectedCount(count);
  };

  const confirmRemoveSelectedUsers = async (): Promise<void> => {
    setState(States.loading);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < users.length; i++) {
      if (users[i].check === 'true') {
        // eslint-disable-next-line no-await-in-loop
        await api.delete(`/user/${users[i].id}`);
      }
    }
    handleOnClose();
    setState(States.default);
    toast.success('Usuários excluídos com sucesso!');
    setUserSelectedCount(0);
    getUsers();
  };

  const removeSelectedUsers = (): void => {
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
          onClick: (): Promise<void> => confirmRemoveSelectedUsers(),
        },
      ],
    });
  };

  const checkAllGroupList = (e: ChangeEvent<HTMLInputElement>): void => {
    const checked = String(e.target.checked);
    let count = 0;
    groups.forEach(data => {
      // eslint-disable-next-line no-param-reassign
      data.check = checked;
      if (data.check === 'true') {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    });
    setGroupSelectedCount(count);
  };

  const changeGroupList = (
    e: React.ChangeEvent<HTMLInputElement>,
    checkBoxGroup: CheckBoxGroup,
  ): void => {
    let count = 0;
    groups.forEach(data => {
      if (data.id === checkBoxGroup.id) {
        // eslint-disable-next-line no-param-reassign
        data.check = String(e.target.checked);
      }
      if (data.check === 'true') {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    });
    setGroupSelectedCount(count);
  };

  const confirmRemoveSelectedGroups = async (): Promise<void> => {
    setState(States.loading);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].check === 'true') {
        // eslint-disable-next-line no-await-in-loop
        await api.delete(`/profile/${groups[i].id}`);
      }
    }
    handleOnClose();
    setState(States.default);
    toast.success('Grupos excluídos com sucesso!');
    setGroupSelectedCount(0);
    getUsers();
  };

  const removeSelectedGroups = (): void => {
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
          onClick: (): Promise<void> => confirmRemoveSelectedGroups(),
        },
      ],
    });
  };

  const checkAllModule = (e: ChangeEvent<HTMLInputElement>, module: CheckBoxModule): void => {
    const listCheckBoxModule: CheckBoxModule[] = [];
    // eslint-disable-next-line no-plusplus
    for (let m = 0; m < modules.length; m++) {
      let count = 0;
      // eslint-disable-next-line no-plusplus
      for (let p = 0; p < modules[m].permissions.length; p++) {
        if (modules[m].id === module.id) {
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
      onChangeFormInputUser(FormInputUser.password)(user.password);
      onChangeFormInputUser(FormInputUser.userType)(userTypeToString(user.userType));
      onChangeFormInputUser(FormInputUser.status)(toUserStatus(user.status));
    }
  }, [user]);

  useEffect(() => {
    if (group?.id) {
      onChangeFormInputGroup(FormInputGroup.name)(group.name);
      onChangeFormInputGroup(FormInputGroup.description)(group.description);
      onChangeFormInputGroup(FormInputGroup.actived)(group.actived ? 'true' : 'false');
    }
  }, [group]);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <UserGroupList
      state={state}
      title="Usuários e Grupos"
      modalTitle={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      renderActionDialogToClearFilter={renderActionDialogToClearFilter}
      renderModalActionProps={renderActionDialogToCancel}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      formDataUser={formDataUser}
      formErrorsUser={formErrorsUser}
      users={users}
      formDataGroup={formDataGroup}
      formErrorsGroup={formErrorsGroup}
      groups={groups}
      user={user}
      userProfileCheckBox={userProfileCheckBox}
      group={group}
      userModules={userGroups}
      modules={modules}
      showActivateSwitchUser={!!(user && user.id)}
      userSelectedCount={userSelectedCount}
      groupSelectedCount={groupSelectedCount}
      showActivateSwitchGroup={!!(group && group.id)}
      onToggle={onToggle}
      openModal={openModal}
      showDeleteUser={onShowDeleteUser}
      showDeleteGroup={onShowDeleteGroup}
      saveUser={onSaveUser}
      saveGroup={onSaveGroup}
      checkAllUserList={checkAllUserList}
      toUserType={toUserType}
      changeUserList={changeUserList}
      checkAllGroupList={checkAllGroupList}
      changeGroupList={changeGroupList}
      changeFormInputUser={onChangeFormInputUser}
      changeFileInputUser={handleOnChangeFileInput}
      onActivateAndInactivateUser={onActivateAndInactivateUser}
      onChangeUserTypeSelected={onChangeUserTypeSelected}
      onChangeUserGroupSelected={onChangeUserGroupSelected}
      changeFormInputGroup={onChangeFormInputGroup}
      onActivateAndInactivateGroup={onActivateAndInactivateGroup}
      checkAllModule={checkAllModule}
      checkPermission={checkPermission}
      removeSelectedUsers={removeSelectedUsers}
      removeSelectedGroups={removeSelectedGroups}
      changeFormInputFilter={onChangeFormInputFilter}
      onFilter={onFilter}
    />
  );
};
