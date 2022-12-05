/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDialog } from '@/hooks/useDialog';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import { FormInputName as FormInputNameToSavePdv } from '@/features/pdv/components/RegisterContent';
import api, { AxiosError } from '@/services/api';
import Pdv from '@/model/Pdv';
import Address from '@/model/Address';
import User from '@/model/User';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import { PdvContainer, States, ShouldShowModal } from './ui';
import { PdvSelectedProps } from '../../types';

interface PayloadPdv {
  id?: string;
  name: string;
  document: string;
  telephone: string;
  email: string;
  imageBase64: string;
  mapBase64: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  address: Address;
  amountSubPdvs?: number;
  batchClosed: boolean;
  askPasswordInactivity: boolean;
  inactivityTimeout: string;
}

export interface NameFiles {
  [key: string]: string;
}

export const PdvScreen: React.FC<PdvSelectedProps> = ({
  pdvSelected: pdvDropdownSelected,
  pdvActions,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);

  const [pdv, setPdv] = useState<Pdv>();

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.pdv);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const [listUsers, setListUsers] = useState<User[]>([]);
  const [listUsersDefault, setListUsersDefault] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  const {
    formData: formDataPdv,
    formErrors: formErrorsPdv,
    onChangeFormInput: onChangeFormInputPdv,
    isFormValid: isFormValidPdv,
    resetForm: resetFormPdv,
    setErrors: setErrorsPdv,
  } = useForm({
    initialData: {
      name: '',
      document: updateMaskCPFOrCNPJ(''),
      telephone: updateMaskMobilePhone(''),
      email: '',
      facebookUrl: '',
      instagramUrl: '',
      twitterUrl: '',
      linkedinUrl: '',
      zipCode: updateMaskCEP(''),
      state: '',
      city: '',
      district: '',
      street: '',
      complement: '',
      number: '',
      latitude: '',
      longitude: '',
      batchClosed: '',
      askPasswordInactivity: '',
      inactivityTimeout: '00:00:00',
    },
    validators: {
      name: [validators.required],
      document: [validators.required, validators.cpforcnpj],
      zipCode: [validators.required],
      state: [validators.required],
      city: [validators.required],
      district: [validators.required],
      street: [validators.required],
      number: [validators.required],
      telephone: [validators.required, validators.mobilePhone],
      batchClosed: [validators.required],
      askPasswordInactivity: [validators.required],
      inactivityTimeout: [validators.required],
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
        setPdv(undefined);
        resetFormPdv();
        setUsersSelected([]);
        setListUsers([]);
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
            setNameFiles({ ...nameFiles, [inputName]: file.name });
            onChangeFormInputPdv(inputName)('');
            onChangeFormInputPdv(inputName)(base64);
          }
        };
      } else {
        setErrorsPdv({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    pdv: pdvSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pdv?: Pdv;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);

    // reset list users
    setListUsers(listUsersDefault);
    setUsersSelected([]);

    setPdv(pdvSelected);

    setListUsers(() => {
      // remove users selected from list listUsersDefault
      const newListUsers = listUsersDefault.filter(
        item => !usersSelected?.find(user => user.id === item.id),
      );
      return newListUsers;
    });
  };

  const handleOnSavePdv = async (): Promise<void> => {
    try {
      if (isFormValidPdv()) {
        const dataUsers = usersSelected.map(item => item.id);

        const payload: PayloadPdv = {
          id: pdv?.id,
          name: formDataPdv[FormInputNameToSavePdv.name],
          document: formDataPdv[FormInputNameToSavePdv.document],
          telephone: formDataPdv[FormInputNameToSavePdv.telephone],
          email: formDataPdv[FormInputNameToSavePdv.email],
          facebookUrl: formDataPdv[FormInputNameToSavePdv.facebookUrl],
          instagramUrl: formDataPdv[FormInputNameToSavePdv.instagramUrl],
          twitterUrl: formDataPdv[FormInputNameToSavePdv.twitterUrl],
          linkedinUrl: formDataPdv[FormInputNameToSavePdv.linkedinUrl],
          batchClosed: convertToBoolean(formDataPdv[FormInputNameToSavePdv.batchClosed]),
          askPasswordInactivity: convertToBoolean(
            formDataPdv[FormInputNameToSavePdv.askPasswordInactivity],
          ),
          inactivityTimeout: formDataPdv[FormInputNameToSavePdv.inactivityTimeout],
          address: {
            id: pdv?.address.id,
            zipCode: formDataPdv[FormInputNameToSavePdv.zipCode],
            state: formDataPdv[FormInputNameToSavePdv.state],
            city: formDataPdv[FormInputNameToSavePdv.city],
            district: formDataPdv[FormInputNameToSavePdv.district],
            street: formDataPdv[FormInputNameToSavePdv.street],
            complement: formDataPdv[FormInputNameToSavePdv.complement],
            number: formDataPdv[FormInputNameToSavePdv.number],
            latitude: parseFloat(formDataPdv[FormInputNameToSavePdv.latitude]) || 0.0,
            longitude: parseFloat(formDataPdv[FormInputNameToSavePdv.longitude]) || 0.0,
          },
          mapBase64: formDataPdv[FormInputNameToSavePdv.mapBase64],
          imageBase64: formDataPdv[FormInputNameToSavePdv.imageBase64],
        };

        if (!payload.id) {
          delete payload.id;
          delete payload.address.id;

          const { data: dataPdv } = await api.post<Pdv>('/pdv', payload);

          await api.post('/pdv/user', {
            pdvId: dataPdv.id,
            users: dataUsers,
          });
          toast.success(
            `PDV "${formDataPdv[FormInputNameToSavePdv.name]}" cadastrado com sucesso!`,
          );
        } else {
          await api.put<Pdv>('/pdv', payload);

          await api.post('/pdv/user', {
            pdvId: pdv?.id,
            users: dataUsers,
          });
          toast.success(
            `PDV "${formDataPdv[FormInputNameToSavePdv.name]}" atualizado com sucesso!`,
          );
        }

        onToggle();
        pdvActions.onGetList();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (pdv?.id) {
      onChangeFormInputPdv(FormInputNameToSavePdv.name)(pdv.name);
      onChangeFormInputPdv(FormInputNameToSavePdv.document)(pdv.document);
      onChangeFormInputPdv(FormInputNameToSavePdv.email)(pdv.email);
      onChangeFormInputPdv(FormInputNameToSavePdv.zipCode)(pdv.address.zipCode);
      onChangeFormInputPdv(FormInputNameToSavePdv.city)(pdv.address.city);
      onChangeFormInputPdv(FormInputNameToSavePdv.district)(pdv.address.district);
      onChangeFormInputPdv(FormInputNameToSavePdv.street)(pdv.address.street);
      onChangeFormInputPdv(FormInputNameToSavePdv.number)(String(pdv.address.number));
      onChangeFormInputPdv(FormInputNameToSavePdv.complement)(String(pdv.address.complement));
      onChangeFormInputPdv(FormInputNameToSavePdv.state)(pdv.address.state);
      onChangeFormInputPdv(FormInputNameToSavePdv.latitude)(String(pdv.address.latitude));
      onChangeFormInputPdv(FormInputNameToSavePdv.longitude)(String(pdv.address.longitude));
      onChangeFormInputPdv(FormInputNameToSavePdv.telephone)(pdv.telephone);
      onChangeFormInputPdv(FormInputNameToSavePdv.inactivityTimeout)(pdv.inactivityTimeout);
      onChangeFormInputPdv(FormInputNameToSavePdv.batchClosed)(String(pdv.batchClosed));
      onChangeFormInputPdv(FormInputNameToSavePdv.askPasswordInactivity)(
        String(pdv.askPasswordInactivity),
      );
      onChangeFormInputPdv(FormInputNameToSavePdv.inactivityTimeout)(pdv.inactivityTimeout);
      onChangeFormInputPdv(FormInputNameToSavePdv.mapBase64)(pdv.mapBase64);
      onChangeFormInputPdv(FormInputNameToSavePdv.imageBase64)(pdv.imageBase64);

      setUsersSelected(pdv.users);
      setListUsers(user =>
        // remove users that are already selected
        user.filter(userItem => !pdv.users.find(userSelected => userSelected.id === userItem.id)),
      );
    } else {
      setUsersSelected([]);
    }
  }, [pdv]);

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <PdvContainer
      state={state}
      pdvDropdownSelected={pdvDropdownSelected}
      pdvState={pdv}
      nameFiles={nameFiles}
      title={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      formDataPdv={formDataPdv}
      formErrorsPdv={formErrorsPdv}
      onChangeFormInputPdv={onChangeFormInputPdv}
      onToggle={onToggle}
      onShouldShowModal={handleOnShouldShowModal}
      onSavePdv={handleOnSavePdv}
      onChangeFileInput={handleOnChangeFileInput}
      setErrorsPdv={setErrorsPdv}
      controllerAppendUser={controllerAppendUser}
    />
  );
};
