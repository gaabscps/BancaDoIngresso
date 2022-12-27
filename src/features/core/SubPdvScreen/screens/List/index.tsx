/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDialog } from '@/hooks/useDialog';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import { FormInputName as FormInputNameToSaveSubPdv } from '@/features/pdv/components/RegisterContentSubPdv';
import api, { AxiosError } from '@/services/api';
import Pdv from '@/model/Pdv';
import SubPdv from '@/model/SubPdv';
import Address from '@/model/Address';
import User from '@/model/User';
import { States, ShouldShowModal, SubPdvContainer } from './ui';
import { PdvSelectedProps } from '../../types';

interface PayloadSubPdv {
  id?: string;
  name: string;
  document: string;
  telephone: string;
  email: string;
  imageBase64?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  address: Address;
  pdv?: {
    id?: string;
  };
}
export interface NameFiles {
  [key: string]: string;
}

export const SubPdvScreen: React.FC<PdvSelectedProps> = ({
  subPdvSelected: subPdvDropdownSelected,
  subPdvActions,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [pdv, setPdv] = useState<Pdv>();
  const [subPdv, setSubPdv] = useState<SubPdv>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.subpdvRegister,
  );

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const [listUsers, setListUsers] = useState<User[]>([]);
  const [listUsersDefault, setListUsersDefault] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  const {
    formData: formDataSubPdv,
    formErrors: formErrorsSubPdv,
    onChangeFormInput: onChangeFormInputSubPdv,
    isFormValid: isFormValidSubPdv,
    resetForm: resetFormSubPdv,
    // setErrors: setErrorsSubPdv,
  } = useForm({
    initialData: {
      name: '',
      document: updateMaskCPFOrCNPJ(''),
      zipCode: updateMaskCEP(''),
      state: '',
      city: '',
      district: '',
      street: '',
      number: '',
      complement: '',
      latitude: '',
      longitude: '',
      telephone: updateMaskMobilePhone(''),
      email: '',
      instagramUrl: '',
      facebookUrl: '',
      linkedinUrl: '',
      twitterUrl: '',
      // users: [], TO-DO Adicionar usuarios
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
      // users: [validators.required], TO-DO Adicionar usuarios
    },
    formatters: {
      document: updateMaskCPFOrCNPJ,
      zipCode: updateMaskCEP,
      telephone: updateMaskMobilePhone,
    },
  });

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormSubPdv();
        setUsersSelected([]);
        setListUsers([]);
        setPdv(undefined);
        setSubPdv(undefined);
      }, 500);
    }
  }, [visible]);

  const handleGetUsers = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<User[]>('/user/find');

      if (data) {
        setListUsers(data);
        setListUsersDefault(data);
        setUsersSelected([]);
      }
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

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    pdv: pdvSelected,
    subPdv: subPdvSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pdv?: Pdv;
    subPdv?: SubPdv;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);

    // reset list users
    setListUsers(listUsersDefault);
    setUsersSelected([]);

    setPdv(pdvSelected);
    setSubPdv(subPdvSelected);

    setListUsers(() => {
      // remove users selected from list listUsersDefault
      const newListUsers = listUsersDefault.filter(
        item => !usersSelected?.find(user => user.id === item.id),
      );
      return newListUsers;
    });
  };

  const handleOnShowEditSubPdv = async (subPdvSelected: SubPdv): Promise<void> => {
    const { data: subPdvSelectedFetch } = await api.get(`/sub-pdv/${subPdvSelected.id}`);
    // setSubPdv(subPdvSelectedFetch);
    handleOnShouldShowModal({
      value: ShouldShowModal.subpdvRegister,
      newTitleModal: 'Editar Sub PDV',
      subPdv: subPdvSelectedFetch,
    });
  };

  // ---------- SUB PDV ------------

  const handleOnSaveSubPdv = async (): Promise<void> => {
    try {
      if (isFormValidSubPdv()) {
        const dataUsers = usersSelected.map(item => item.id);
        // TODO: change type to sub-Pdv
        const payload: PayloadSubPdv = {
          id: subPdv?.id ?? undefined,
          name: formDataSubPdv[FormInputNameToSaveSubPdv.name],
          document: formDataSubPdv[FormInputNameToSaveSubPdv.document],
          telephone: formDataSubPdv[FormInputNameToSaveSubPdv.telephone],
          email: formDataSubPdv[FormInputNameToSaveSubPdv.email],
          facebookUrl: formDataSubPdv[FormInputNameToSaveSubPdv.facebookUrl],
          instagramUrl: formDataSubPdv[FormInputNameToSaveSubPdv.instagramUrl],
          twitterUrl: formDataSubPdv[FormInputNameToSaveSubPdv.twitterUrl],
          linkedinUrl: formDataSubPdv[FormInputNameToSaveSubPdv.linkedinUrl],
          address: {
            id: subPdv?.address?.id ?? undefined,
            zipCode: formDataSubPdv[FormInputNameToSaveSubPdv.zipCode],
            state: formDataSubPdv[FormInputNameToSaveSubPdv.state],
            city: formDataSubPdv[FormInputNameToSaveSubPdv.city],
            district: formDataSubPdv[FormInputNameToSaveSubPdv.district],
            street: formDataSubPdv[FormInputNameToSaveSubPdv.street],
            complement: formDataSubPdv[FormInputNameToSaveSubPdv.complement],
            number: formDataSubPdv[FormInputNameToSaveSubPdv.number],
            latitude: parseFloat(formDataSubPdv[FormInputNameToSaveSubPdv.latitude]) || 0,
            longitude: parseFloat(formDataSubPdv[FormInputNameToSaveSubPdv.longitude]) || 0,
          },
          pdv: {
            id: subPdv?.pdv.id ?? pdv?.id,
          },
        };
        if (!payload.id) {
          delete payload.id;
          delete payload.address.id;

          const { data: dataSubPdv } = await api.post<Pdv>('/sub-pdv', payload);

          await api.post('/sub-pdv/user', {
            subPdvId: dataSubPdv.id,
            users: dataUsers,
          });
          toast.success(
            `Sub PDV "${formDataSubPdv[FormInputNameToSaveSubPdv.name]}" cadastrado com sucesso!`,
          );
        } else {
          await api.put<Pdv>('/sub-pdv', payload);

          await api.post('/sub-pdv/user', {
            subPdvId: subPdv?.id,
            users: dataUsers,
          });
          toast.success(
            `Sub PDV "${formDataSubPdv[FormInputNameToSaveSubPdv.name]}" atualizado com sucesso!`,
          );
        }
        subPdvActions.onGetSubPdv();
        onToggle();
      }
    } catch (error) {
      console.log('error :>> ', error);
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (subPdv?.id) {
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.name)(subPdv.name);
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.document)(subPdv.document);
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.email)(subPdv.email);
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.telephone)(subPdv.telephone);
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.facebookUrl)(subPdv.facebookUrl ?? '');
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.instagramUrl)(subPdv.instagramUrl ?? '');
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.twitterUrl)(subPdv.twitterUrl ?? '');
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.linkedinUrl)(subPdv.linkedinUrl ?? '');
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.zipCode)(subPdv.address?.zipCode);
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.state)(subPdv.address?.state);
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.city)(subPdv.address?.city);
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.district)(subPdv.address?.district);
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.street)(subPdv.address?.street);
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.complement)(
        subPdv.address?.complement ?? '',
      );
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.number)(subPdv.address?.number ?? '');
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.latitude)(String(subPdv.address?.latitude));
      onChangeFormInputSubPdv(FormInputNameToSaveSubPdv.longitude)(
        String(subPdv.address?.longitude),
      );

      setUsersSelected(subPdv.users);
      setListUsers(user =>
        // remove users that are already selected
        user.filter(
          userItem => !subPdv.users.find(userSelected => userSelected.id === userItem.id),
        ),
      );
    }
  }, [subPdv]);

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <SubPdvContainer
      state={state}
      subPdvDropdownSelected={subPdvDropdownSelected}
      subPdvState={subPdv}
      title={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      formDataSubPdv={formDataSubPdv}
      formErrorsSubPdv={formErrorsSubPdv}
      onChangeFormInputSubPdv={onChangeFormInputSubPdv}
      onToggle={onToggle}
      onShouldShowModal={handleOnShouldShowModal}
      onSaveSubPdv={handleOnSaveSubPdv}
      controllerAppendUser={controllerAppendUser}
      onShowEditSubPdv={handleOnShowEditSubPdv}
    />
  );
};
