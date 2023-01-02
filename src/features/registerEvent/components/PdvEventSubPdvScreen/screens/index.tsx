/* eslint-disable no-shadow */
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
import { useParams } from 'react-router-dom';
import {
  formSubPdvProps,
  formSubPdvRegisterProps,
  modalConfigSubPdvSettingsProps,
  onShouldShowSubPdvSettingsProps,
  subPdvActionsProps,
} from '../types';
import { States, PdvEventSubPdvContainer, ShouldShowModal, FormInputName } from './ui';
import { FormInputName as FormInputNameSubPdv } from '../components/SubPdvContent';

type UrlParams = {
  id: string;
};

interface PdvEventSubPdvScreenProps extends TabPdvActionsProps {
  pdvId?: string;
}

export const PdvEventSubPdvScreen: React.FC<Omit<PdvEventSubPdvScreenProps, 'nextTab'>> = ({
  pdvId,
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
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [listUsersDefault, setListUsersDefault] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();
  const params = useParams<UrlParams>();

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

  const handleGetSubPdvs = async (users: User[]): Promise<void> => {
    try {
      const usersVar: User[] = [];
      if (pdvId) {
        setState(States.loading);
        const { data } = await api.get<SubPdv[]>(`/event/pdv/${params.id}/sub-pdv/${pdvId}`);
        if (data && data.length > 0) {
          data.forEach(sub => {
            if (sub.users && sub.users.length > 0) {
              sub.users.forEach(u => {
                usersVar.push(u);
              });
            }
          });
          onChangeFormInputSubPdv(FormInputName.hasSubPdv)('true');
        }
        setSubPdvList(data);
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
      setOriginalUsers(data);
      if (data) {
        setListUsers(data);
        setListUsersDefault(data);
      }
      handleGetSubPdvs(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFirstGet = async (): Promise<void> => {
    await handleGetUsers();
  };

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

  const handleBackTab = (): void => {
    backTab();
  };

  const handleAddUser = async (userId: string): Promise<void> => {
    const newUsersSelected = listUsers.filter(item => item.id === userId)[0];
    if (usersSelected.find(item => item.id === newUsersSelected.id)) {
      return;
    }
    try {
      setState(States.loading);
      const users: User[] = [];
      const user: User = {
        id: userId,
      } as User;
      users.push(user);
      const request = {
        id: formDataSubPdvRegister[FormInputNameSubPdv.name],
        users,
      } as SubPdv;
      await api.post(
        `/event/pdv/${params.id}/sub-pdv/${pdvId}/user/${
          formDataSubPdvRegister[FormInputNameSubPdv.name]
        }`,
        request,
      );

      const listUsersSelected: User[] = [];
      usersSelected.forEach(data => {
        listUsersSelected.push(data);
      });
      listUsersSelected.push(newUsersSelected);
      setUsersSelected(listUsersSelected);
      await handleGetSubPdvs(originalUsers);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
    /*
    const newUsersSelected = listUsers.filter(item => item.id === userId)[0];
    // not add user if already exists
    if (usersSelected.find(item => item.id === newUsersSelected.id)) {
      return;
    }
    setUsersSelected([...usersSelected, newUsersSelected]);
    // remove user selected from list
    const newListUsers = listUsers.filter(item => item.id !== userId);
    setListUsers(newListUsers);
    */
  };

  const handleRemoveUser = async (user: User): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(`/event/pdv/${params.id}/sub-pdv/${pdvId}/user/${subPdv?.id}/${user.id}/`);
      await handleGetSubPdvs(originalUsers);
      const newUsersSelected = usersSelected.filter(item => item.id !== user.id);
      setUsersSelected(newUsersSelected);
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

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    subPdv: subPdvSelected,
  }: onShouldShowSubPdvSettingsProps): void => {
    if (subPdvSelected && subPdvSelected.id) {
      onChangeFormInputSubPdvRegister(FormInputNameSubPdv.name)(subPdvSelected.id);
      setUsersSelected(subPdvSelected.users);
    }

    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (subPdvSelected?.id && value === ShouldShowModal.configProduct) {
      setSubPdv(subPdvSelected);
    }

    // reset list users
    setListUsers(listUsersDefault);

    setListUsers(() => {
      // remove users selected from list listUsersDefault
      const newListUsers = listUsersDefault.filter(
        item => !usersSelected?.find(user => user.id === item.id),
      );
      return newListUsers;
    });
  };

  const handleOnConfirmDelete = async (subPdvSelected: SubPdv): Promise<void> => {
    try {
      await api.delete(`/event/pdv/${params.id}/${subPdvSelected.id}`);
      toast.success('PDV excluído com sucesso!');
      confirmDelete.hide();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeleteSubPdv = (subPdvSelected: SubPdv): void => {
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
            handleOnConfirmDelete(subPdvSelected);
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

  const handleGetSubPdvOptions = async (pdvId: string | undefined): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<SubPdv[]>(`/sub-pdv/pdv/${pdvId}`);
      if (data) {
        setSubPdvOptions(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controllerSubPdvStates: any = {
    subPdv,
    setSubPdv,
    subPdvList,
    setSubPdvList,
    subPdvOptions,
  };

  const controllerSubPdvActions: subPdvActionsProps = {
    // onSave: () => Promise<void>;
    onGet: handleOnGetSubPdv,
    onGetSubPdv: () => handleGetSubPdvOptions(pdvId),
    onCancelEdit: handleOnCancelEditSubPdv,
    onFirstTab: firstTab,
    onReturnTap: handleBackTab,
  };

  useEffect(() => {
    if (pdvId) {
      handleGetSubPdvs(originalUsers);
      handleGetSubPdvOptions(pdvId);
    }
  }, [pdvId]);

  useEffect(() => {
    handleFirstGet();
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
