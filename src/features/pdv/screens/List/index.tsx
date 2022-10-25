/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDialog } from '@/hooks/useDialog';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/features/pdv/components/DeleteContent';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { updateMask as updateMaskCPFOrCNPJ } from '@/helpers/masks/cpfCnpj';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import { updateMask as updateMaskMobilePhone } from '@/helpers/masks/mobilePhone';
import { FormInputName as FormInputNameToSavePdv } from '@/features/pdv/components/RegisterContent';
import { FormInputName as FormInputNameToSaveSubPdv } from '@/features/pdv/components/RegisterContentSubPdv';
import { FormInputName as FormInputNameToFilter } from '@/features/pdv/components/FilterContent';
import { PdvResponse, PdvRequestParams } from '@/features/pdv/types';
import api, { AxiosError } from '@/services/api';
import Pdv from '@/model/Pdv';
import SubPdv from '@/model/SubPdv';
import Address from '@/model/Address';
import User from '@/model/User';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import { PdvContainer, States, ShouldShowModal } from './ui';

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

export const PdvScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listPdv, setListPdv] = useState<Pdv[]>([]);
  const [pdv, setPdv] = useState<Pdv>();
  const [subPdv, setSubPdv] = useState<SubPdv>();
  const [listSubPdv, setListSubPdv] = useState<SubPdv[]>([]);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.pdv);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});

  const [currentPage, setCurrentPage] = useState<PdvRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

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
        resetFormPdv();
        resetFormSubPdv();
        resetFormFilter();
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

  const handleFetch = async (values: PdvRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<PdvResponse>('/pdv/page', values);

      if (data) {
        setListPdv(data?.list ?? []);

        setCurrentPage(currentPageState => ({
          ...currentPageState,
          ...data,
        }));
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnShowListSubPdv = async (pdvSelected: Pdv): Promise<void> => {
    try {
      setState(States.loading);

      const { data } = await api.get<SubPdv[]>(`/sub-pdv/pdv/${subPdv?.id ?? pdvSelected?.id}`);
      setListSubPdv(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
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

    if (pdvSelected && value === ShouldShowModal.subpdv) {
      handleOnShowListSubPdv(pdvSelected);
    }
    if (value !== ShouldShowModal.filter) {
      setPdv(pdvSelected);
      setSubPdv(subPdvSelected);
    }

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
        handleFetch(currentPage);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnFilter = async (): Promise<void> => {
    try {
      if (isFormValidFilter()) {
        const payload =
          {
            name: {
              entity: {
                name: formDataFilter[FormInputNameToFilter.inputSearch],
              },
            },
            city: {
              entity: {
                address: {
                  city: formDataFilter[FormInputNameToFilter.inputSearch],
                },
              },
            },
          }[formDataFilter[FormInputNameToFilter.filterSearch]] || {};

        onToggle();
        await handleFetch({
          ...currentPage,
          ...payload,
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const clearFilter = (): void => {
    resetFormFilter();
    formDataFilter[FormInputNameToFilter.inputSearch] = '';
    handleOnFilter();
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToPdv = async (pdvSelected: Pdv): Promise<void> => {
    try {
      await api.delete(`/pdv/${pdvSelected?.id}`);

      toast.success('PDV excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeletePdv = (pdvSelected: Pdv): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteToPdv(pdvSelected),
        },
      ],
    });
  };

  const handleOnConfirmDeleteSubPdv = async (subPdvSelected: SubPdv): Promise<void> => {
    try {
      await api.delete(`/sub-pdv/${subPdvSelected?.id}`);

      toast.success('SubPdv excluído com sucesso!');
      // handleOnShowListSubPdv(pdv as Pdv);
      handleOnClose();
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
          onClick: (): void => handleOnClose(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): Promise<void> => handleOnConfirmDeleteSubPdv(subPdvSelected),
        },
      ],
    });
  };

  // ---------- SUB PDV ------------

  const handleOnSaveSubPdv = async (): Promise<void> => {
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

      onToggle();
      handleFetch(currentPage);
    }
  };

  // Renderiza Modal de Edição de Sub PDV
  const handleOnShowEditSubPdv = async (subPdvSelected: SubPdv): Promise<void> => {
    const { data: subPdvSelectedFetch } = await api.get(`/sub-pdv/${subPdvSelected.id}`);
    setSubPdv(subPdvSelectedFetch);
    handleOnShouldShowModal({
      value: ShouldShowModal.subpdvRegister,
      newTitleModal: 'Editar Sub PDV',
      subPdv: subPdvSelectedFetch,
    });
  };

  const handleOnPaginationChange = async (page: number): Promise<void> => {
    handleFetch({
      ...currentPage,
      page,
    });
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
    handleFetch(currentPage);
    handleGetUsers();
  }, []);

  return (
    <PdvContainer
      state={state}
      pdvState={pdv}
      subPdvState={subPdv}
      listPdv={listPdv}
      listSubPdv={listSubPdv}
      nameFiles={nameFiles}
      title={title}
      currentPage={currentPage}
      visible={visible}
      shouldShowModal={shouldShowModal}
      formDataPdv={formDataPdv}
      formErrorsPdv={formErrorsPdv}
      onChangeFormInputPdv={onChangeFormInputPdv}
      formDataSubPdv={formDataSubPdv}
      formErrorsSubPdv={formErrorsSubPdv}
      onChangeFormInputSubPdv={onChangeFormInputSubPdv}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      onShouldShowModal={handleOnShouldShowModal}
      onSavePdv={handleOnSavePdv}
      onSaveSubPdv={handleOnSaveSubPdv}
      onFilter={handleOnFilter}
      // onShowEdit={handleOnShowEditPdv}
      onShowDelete={handleOnShowDeletePdv}
      onShowDeleteSubPdv={handleOnShowDeleteSubPdv}
      onShowEditSubPdv={handleOnShowEditSubPdv}
      onChangeFileInput={handleOnChangeFileInput}
      // onShowListSub={handleOnShowListSubPdv}
      clearFilter={clearFilter}
      setErrorsPdv={setErrorsPdv}
      controllerAppendUser={controllerAppendUser}
    />
  );
};
