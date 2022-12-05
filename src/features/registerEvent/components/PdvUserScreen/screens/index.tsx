/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { ChangeEvent, useState } from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useDialog } from '@/hooks/useDialog';
import Page from '@/model/Page';
import User from '@/model/User';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import api, { AxiosError } from '@/services/api';
import Permission from '@/model/Permission';
import UserType from '@/model/UserType';
import Module from '@/model/Module';
import Profile from '@/model/Profile';
import StatusType from '@/model/StatusType';
import { toast } from 'react-toastify';
import CustomError from '@/model/CustomError';
import { CheckBoxUser } from '@/features/usersAndGroups/screens/List';
import { formPdvUserProps, onShouldShowModalSectorProductUserProps } from '../types';
import { FormInputUser, PdvUserContainer, ShouldShowModal } from './ui';
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

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.userRegister,
  );
  const [userProfileCheckBox, setUserProfileCheckBox] = useState(mountUserProfilesCheckBox());
  const [modules, setModules] = useState([] as CheckBoxModule[]);
  const [user, setUser] = useState({} as User);
  const [users, setUsers] = useState([] as CheckBoxUser[]);
  const [groups, setGroups] = useState([] as CheckBoxGroup[]);
  const [userGroups, setUserGroups] = useState([] as CheckBoxGroup[]);
  // const [userState, setUserState] = useState<any>();
  const { title, onChangeTitle, visible, onToggle } = useDialog();

  const {
    formData: formDataUser,
    formErrors: formErrorsUser,
    onChangeFormInput: onChangeFormInputUser,
    isFormValid: isFormValidUser,
    setErrors: setErrorsUser,
    resetForm: resetFormUser,
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

  /// CONFIG MODAL USUARIOS

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
        window.console.log(response.data.list);
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

  const onActivateAndInactivateUser = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    onChangeFormInputUser(FormInputUser.status)(String(e.target.checked));
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
  const getUsers = async (): Promise<void> => {
    try {
      // setState(States.loading);
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
      setGroups(listCheckBoxGroup);
      // setState(States.default);
    } catch (error) {
      // setState(States.default);
    }
  };

  const onSaveUser = async (): Promise<void> => {
    try {
      if (isFormValidUser()) {
        console.log(formDataUser[FormInputUser.userType]);
        if (
          formDataUser[FormInputUser.userType] === '0' ||
          formDataUser[FormInputUser.userType] === '1' ||
          formDataUser[FormInputUser.userType] === '2' ||
          formDataUser[FormInputUser.userType] === '3' ||
          formDataUser[FormInputUser.userType] === '4'
        ) {
          // setState(States.loading);
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
          // setState(States.default);
          onToggle();
          getUsers();
        } else {
          toast.warn('Informar tipo do Usuário!');
        }
      }
    } catch (error) {
      // setState(States.default);
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
        onBlurCPF={onBlurCPF}
        onActivateAndInactivate={onActivateAndInactivateUser}
        changeFileInputUser={handleOnChangeFileInput}
        modules={modules}
        userProfileCheckBox={userProfileCheckBox}
        onChangeUserTypeSelected={onChangeUserTypeSelected}
        onChangeUserGroupSelected={onChangeUserGroupSelected}
        saveUser={onSaveUser}
        // state={state}
      />
    </>
  );
};
