/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/combo/components/FilterContent';
import { DeleteContent } from '@/features/combo/components/DeleteContent';
import Client from '@/model/Client';
import { updateMask as updateMaskCPF } from '@/helpers/masks/cpf';
import { updateMask as updateMaskPhone } from '@/helpers/masks/mobilePhone';
import { updateMask as updateMaskDate, unmask, dateToString } from '@/helpers/masks/generalDate';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import Gender from '@/model/Gender';
import Address from '@/model/Address';
import ClientComment from '@/model/ClientComment';
import StatusType from '@/model/StatusType';
import { ClientCommentController, ClientRequestParams, ClientResponse } from '../../types';
import { ClientContainer, ShouldShowModal, States } from './ui';
import { FormInputName } from '../../components/RegisterContent';
import { FormInputComment } from '../../components/RegisterCommentContent';

export const ClientScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listClient, setListClient] = useState<Client[]>([]);
  const [client, setClient] = useState<Client>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.client);
  const [currentPage, setCurrentPage] = useState<ClientRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });
  const [comments, setComments] = useState<ClientComment[]>([]);
  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataClient,
    formErrors: formErrorsClient,
    onChangeFormInput: onChangeFormInputClient,
    isFormValid: isFormValidClient,
    resetForm: resetFormClient,
  } = useForm({
    initialData: {
      name: '',
      cpf: '',
      rg: '',
      cellPhone: '',
      telephone: '',
      email: '',
      gender: '',
      birthDate: '',
      motherName: '',
      imageBase64: '',
      zipCode: '',
      state: '',
      city: '',
      district: '',
      street: '',
      complement: '',
      number: '',
    },
    validators: {
      name: [validators.required],
      cpf: [validators.required, validators.cpf],
      rg: [validators.required],
      cellPhone: [validators.required, validators.mobilePhone],
      email: [validators.required, validators.email],
      birthDate: [validators.required, validators.validDate],
      zipCode: [validators.required, validators.cep],
      state: [validators.required],
      city: [validators.required],
      district: [validators.required],
      street: [validators.required],
    },
    formatters: {
      cpf: updateMaskCPF,
      cellPhone: updateMaskPhone,
      birthDate: updateMaskDate,
      zipCode: updateMaskCEP,
    },
  });

  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
    resetForm: resetFormFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

  const {
    formData: formDataComment,
    formErrors: formErrorsComment,
    onChangeFormInput: onChangeFormInputComment,
    isFormValid: isFormValidComment,
    resetForm: resetFormComment,
  } = useForm({
    initialData: {
      comment: '',
    },
    validators: {
      comment: [validators.required],
    },
  });

  const handleFetch = async (params: ClientRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<ClientResponse>('/client/find', params);

      if (data) {
        setListClient(data?.list ?? []);

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

  const fromGender = (gender: Gender): string => {
    let s = 'O';
    switch (gender) {
      case Gender.OTHERS:
        s = 'O';
        break;
      case Gender.MALE:
        s = 'M';
        break;
      case Gender.FEMALE:
        s = 'F';
        break;
      default:
        s = 'O';
        break;
    }
    return s;
  };

  const handleFetchComment = async (selectedClient: Client): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ClientComment[]>(`/client/${selectedClient.id}/comment`);
      setComments(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnShouldShowModal = async ({
    value,
    newTitleModal,
    client: clientSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    client?: Client;
  }): Promise<void> => {
    if (clientSelected?.id && value === ShouldShowModal.client) {
      setClient(clientSelected);
      onChangeFormInputClient(FormInputName.name)(clientSelected.name);
      onChangeFormInputClient(FormInputName.cpf)(clientSelected.cpf);
      onChangeFormInputClient(FormInputName.rg)(clientSelected.rg);
      onChangeFormInputClient(FormInputName.cellPhone)(clientSelected.cellPhone);
      onChangeFormInputClient(FormInputName.telephone)(clientSelected.telephone);
      onChangeFormInputClient(FormInputName.email)(clientSelected.email);
      onChangeFormInputClient(FormInputName.gender)(fromGender(clientSelected.gender));
      onChangeFormInputClient(FormInputName.birthDate)(dateToString(clientSelected.birthDate));
      onChangeFormInputClient(FormInputName.motherName)(clientSelected.motherName);
      onChangeFormInputClient(FormInputName.imageBase64)(clientSelected.imageBase64 as string);
      if (clientSelected.address) {
        onChangeFormInputClient(FormInputName.zipCode)(clientSelected.address.zipCode);
        onChangeFormInputClient(FormInputName.state)(clientSelected.address.state);
        onChangeFormInputClient(FormInputName.city)(clientSelected.address.city);
        onChangeFormInputClient(FormInputName.district)(clientSelected.address.district);
        onChangeFormInputClient(FormInputName.street)(clientSelected.address.street);
        onChangeFormInputClient(FormInputName.complement)(
          clientSelected.address.complement as string,
        );
        onChangeFormInputClient(FormInputName.number)(clientSelected.address.number as string);
      }
    } else if (clientSelected?.id && value === ShouldShowModal.comment) {
      setClient(clientSelected);
      await handleFetchComment(clientSelected);
    }
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();
  };

  const toGender = (value: string): Gender => {
    let gender = Gender.OTHERS;
    switch (value) {
      case 'O':
        gender = Gender.OTHERS;
        break;
      case 'M':
        gender = Gender.MALE;
        break;
      case 'F':
        gender = Gender.FEMALE;
        break;
      default:
        gender = Gender.OTHERS;
        break;
    }
    return gender;
  };

  const handleOnSaveClient = async (): Promise<void> => {
    try {
      if (isFormValidClient()) {
        setState(States.loading);
        const birthDate = unmask(formDataClient[FormInputName.birthDate]);
        const address: Address = {
          id: client?.address?.id as string,
          zipCode: formDataClient[FormInputName.zipCode],
          state: formDataClient[FormInputName.state],
          city: formDataClient[FormInputName.city],
          district: formDataClient[FormInputName.district],
          street: formDataClient[FormInputName.street],
          complement: formDataClient[FormInputName.complement],
          number: formDataClient[FormInputName.number],
          latitude: client?.address?.latitude,
          longitude: client?.address?.longitude,
        };
        const payload = {
          id: client?.id as string,
          name: formDataClient[FormInputName.name],
          cpf: formDataClient[FormInputName.cpf],
          rg: formDataClient[FormInputName.rg],
          cellPhone: formDataClient[FormInputName.cellPhone],
          telephone: formDataClient[FormInputName.telephone],
          email: formDataClient[FormInputName.email],
          gender: toGender(formDataClient[FormInputName.gender]),
          birthDate: birthDate ? new Date(birthDate) : new Date(),
          motherName: formDataClient[FormInputName.motherName],
          imageBase64: formDataClient[FormInputName.imageBase64],
          address,
        } as Client;
        await api.put('/client', payload);
        await handleFetch(currentPage);
        toast.success('Cliente atualizado com sucesso!');
        resetFormClient();
        onToggle();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnAddComment = async (): Promise<void> => {
    try {
      if (isFormValidComment()) {
        setState(States.loading);
        const payload = {
          comment: formDataComment[FormInputComment.comment],
        } as ClientComment;
        await api.post(`/client/${client?.id}/comment`, payload);
        await handleFetchComment(client as Client);
        await handleFetch(currentPage);
        toast.success('Comentário adcionado com sucesso!');
        resetFormComment();
        onToggle();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const controllerComment: ClientCommentController = {
    client,
    comments,
    formData: formDataComment,
    formErrors: formErrorsComment,
    onChange: onChangeFormInputComment,
    onAdd: handleOnAddComment,
  };

  const handleAlterFraudAlert = async (clientSelected: Client): Promise<void> => {
    try {
      setState(States.loading);
      if (clientSelected.fraudAlert) {
        await api.patch(`/client/fraud/${clientSelected?.id}/remove`);
        toast.success('Alerta de fraude removido com sucesso!');
      } else {
        await api.patch(`/client/fraud/${clientSelected?.id}/add`);
        toast.success('Alerta de fraude adcionado com sucesso!');
      }
      await handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleBockClient = async (clientSelected: Client): Promise<void> => {
    try {
      setState(States.loading);
      if (clientSelected.status === StatusType.ACTIVE) {
        await api.patch(`/client/inactivate/${clientSelected?.id}`);
        toast.success('Cliente bloqueado com sucesso!');
      } else {
        await api.patch(`/client/activate/${clientSelected?.id}`);
        toast.success('Cliente desbloqueado com sucesso!');
      }
      await handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToClient = async (clientSelected: Client): Promise<void> => {
    try {
      await api.delete(`/client/${clientSelected?.id}`);
      toast.success('Cliente excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeleteClient = (clientSelected: Client): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteToClient(clientSelected),
        },
      ],
    });
  };

  const handleOnFilter = async (): Promise<void> => {
    try {
      if (isFormValidFilter()) {
        const clientPage = {} as Client;

        const filter = formDataFilter[FormInputNameToFilter.filterSearch];
        const value = formDataFilter[FormInputNameToFilter.inputSearch];

        const entity = {
          ...clientPage,
          [filter]: filter === 'cpf' || filter === 'cellPhone' ? value.replace(/\D/g, '') : value,
        } as Client;

        const newPage: ClientRequestParams = {
          ...currentPage,
          entity,
        };
        onToggle();
        await handleFetch(newPage);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnPaginationChange = async (page: number): Promise<void> => {
    handleFetch({
      ...currentPage,
      page,
    });
  };

  const clearFilter = async (): Promise<void> => {
    resetFormFilter();
    await handleFetch({
      ...currentPage,
      entity: {},
    } as ClientRequestParams);
    onToggle();
  };

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <ClientContainer
      state={state}
      clientState={client}
      title={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      listClient={listClient}
      currentPage={currentPage}
      formDataClient={formDataClient}
      formErrorsClient={formErrorsClient}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      controllerComment={controllerComment}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      onSaveClient={handleOnSaveClient}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      onChangeFormInputClient={onChangeFormInputClient}
      onShowDeleteClient={handleOnShowDeleteClient}
      onFilter={handleOnFilter}
      clearFilter={clearFilter}
      onAlterFraudAlert={handleAlterFraudAlert}
      onBockClient={handleBockClient}
    />
  );
};
