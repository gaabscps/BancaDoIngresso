import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import validators from '@/helpers/validators';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import SubPdv from '@/model/SubPdv';
import { useDialog } from '@/hooks/useDialog';
import { DeleteContent } from '@/components/DeleteContent';
import User from '@/model/User';
import { TabPdvActionsProps } from '@/features/registerEvent/screens/Pdv/ui';
import {
  formSubPdvProps,
  formSubPdvRegisterProps,
  modalConfigSubPdvSettingsProps,
  onShouldShowSubPdvSettingsProps,
  subPdvActionsProps,
} from '../types';
import { States, PdvEventSubPdvContainer, ShouldShowModal } from './ui';

export const PdvEventSubPdvScreen: React.FC<Omit<TabPdvActionsProps, 'nextTab'>> = ({
  backTab,
  firstTab,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );

  const [subPdv, setSubPdv] = useState<SubPdv>();
  const [subPdvList, setSubPdvList] = useState<SubPdv[]>([]);
  const [subPdvOptions, setSubPdvOptions] = useState<SubPdv[]>([]);

  const [listUsers, setListUsers] = useState<User[]>([]);
  const [listUsersDefault, setListUsersDefault] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataSubPdv,
    formErrors: formErrorsSubPdv,
    onChangeFormInput: onChangeFormInputSubPdv,
    isFormValid: isFormValidSubPdv,
  } = useForm({
    initialData: {
      hasSubPdv: '',
    },
    validators: {
      hasSubPdv: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataSubPdvRegister,
    formErrors: formErrorsSubPdvRegister,
    onChangeFormInput: onChangeFormInputSubPdvRegister,
    isFormValid: isFormValidSubPdvRegister,
    resetForm: resetFormSubPdvRegister,
  } = useForm({
    initialData: {
      name: '',
      partialPayment: '',
    },
    validators: {
      name: [validators.required],
      partialPayment: [validators.required],
    },
    formatters: {},
  });

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormSubPdvRegister();
        setUsersSelected([]);
        setListUsers([]);
        setSubPdv(undefined);
      }, 500);
    }
  }, [visible]);

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

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    subPdv: subPdvSelected,
  }: onShouldShowSubPdvSettingsProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (subPdvSelected?.id && value === ShouldShowModal.configProduct) {
      setSubPdv(subPdvSelected);
    }

    // reset list users
    setListUsers(listUsersDefault);
    setUsersSelected([]);

    setListUsers(() => {
      // remove users selected from list listUsersDefault
      const newListUsers = listUsersDefault.filter(
        item => !usersSelected?.find(user => user.id === item.id),
      );
      return newListUsers;
    });
  };

  const handleOnShowDeleteSubPdv = (subPdvSelected: any): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => confirmDelete.hide(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): void => {
            console.log('TODO: Add function exclud item :>> ', subPdvSelected);
          },
        },
      ],
    });
  };

  const controllerModalConfig: modalConfigSubPdvSettingsProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
    onShowModalDelete: handleOnShowDeleteSubPdv,
  };
  // modal config ------------------------------------------------------------

  const handleGetAllSubPdv = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<SubPdv[]>('/subPdv/find');
      setSubPdvOptions(data ?? []);
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

  const handleBackTab = (): void => {
    backTab();
  };

  const handleOnGetSubPdv = async (subPdvSelected: SubPdv): Promise<void> => {
    try {
      if (subPdvSelected) {
        setSubPdv(subPdvSelected);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditSubPdv = (): void => {
    try {
      setSubPdv(undefined);
      resetFormSubPdvRegister();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const controllerFormSubPdv: formSubPdvProps = {
    formData: formDataSubPdv,
    formErrors: formErrorsSubPdv,
    onChangeFormInput: onChangeFormInputSubPdv,
    isFormValid: isFormValidSubPdv,
  };

  const controllerFormSubPdvRegister: formSubPdvRegisterProps = {
    formData: formDataSubPdvRegister,
    formErrors: formErrorsSubPdvRegister,
    onChangeFormInput: onChangeFormInputSubPdvRegister,
    isFormValid: isFormValidSubPdvRegister,
  };

  const controllerSubPdvStates: any = {
    subPdv,
    setSubPdv,
    subPdvList,
    setSubPdvList,
    subPdvOptions,
    setSubPdvOptions,
  };

  const controllerSubPdvActions: subPdvActionsProps = {
    // onSave: () => Promise<void>;
    onGet: handleOnGetSubPdv,
    onCancelEdit: handleOnCancelEditSubPdv,
    onFirstTab: firstTab,
    onReturnTap: handleBackTab,
  };

  useEffect(() => {
    handleGetAllSubPdv();
    handleGetUsers();
  }, []);

  return (
    <PdvEventSubPdvContainer
      state={state}
      formSubPdv={controllerFormSubPdv}
      formSubPdvRegister={controllerFormSubPdvRegister}
      subPdvStates={controllerSubPdvStates}
      subPdvActions={controllerSubPdvActions}
      modalConfig={controllerModalConfig}
      appendUser={controllerAppendUser}
    />
  );
};
