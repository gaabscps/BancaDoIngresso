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
import { FormInputName as FormInputNameToFilter } from '@/features/pdv/components/FilterContent';
import { PdvResponse, PdvRequestParams } from '@/features/pdv/types';
import api, { AxiosError } from '@/services/api';
import Pdv from '@/model/Pdv';
import SubPdv from '@/model/SubPdv';
import { PdvContainer, States, ShouldShowModal } from './ui';

export const PdvScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listPdv, setListPdv] = useState<Pdv[]>([]);
  const [pdv, setPdv] = useState<Pdv>();
  // const [subPdv, setSubPdv] = useState<SubPdv>();
  const [listSubPdv, setListSubPdv] = useState<SubPdv[]>([]);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.pdv);

  const [currentPage, setCurrentPage] = useState<PdvRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  // const { pdvState, onChange } = usePdv();
  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataPdv,
    formErrors: formErrorsPdv,
    onChangeFormInput: onChangeFormInputPdv,
    isFormValid: isFormValidPdv,
    resetForm: resetFormPdv,
    // setErrors: setErrorsPdv,
  } = useForm({
    initialData: {
      name: '',
      document: updateMaskCPFOrCNPJ(''),
      telephone: updateMaskMobilePhone(''),
      email: '',
      imageBase64: '',
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
      zipCode: [validators.required, validators.cep],
      state: [validators.required],
      city: [validators.required],
      district: [validators.required],
      street: [validators.required],
      number: [validators.required],
      telephone: [validators.required, validators.mobilePhone],
      email: [validators.required, validators.email],
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
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

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

      const { data } = await api.get<SubPdv[]>(`/sub-pdv/pdv/${pdvSelected?.id}`);
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
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pdv?: Pdv;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if ((!pdvSelected?.id && value === ShouldShowModal.pdv) || value !== ShouldShowModal.subpdv) {
      resetFormPdv();
    }

    if (pdvSelected && value === ShouldShowModal.subpdv) {
      handleOnShowListSubPdv(pdvSelected);
    }

    if (pdvSelected?.id && value !== ShouldShowModal.subpdv) {
      resetFormPdv();
      setPdv(pdvSelected);
    } else {
      setPdv(undefined);
    }
  };

  const handleOnSavePdv = async (): Promise<void> => {
    try {
      if (isFormValidPdv()) {
        const payload: Pdv = {
          id: pdv?.id,
          name: formDataPdv[FormInputNameToSavePdv.name],
          document: formDataPdv[FormInputNameToSavePdv.document],
          telephone: formDataPdv[FormInputNameToSavePdv.telephone],
          email: formDataPdv[FormInputNameToSavePdv.email],
          imageBase64: formDataPdv[FormInputNameToSavePdv.imageBase64],
          facebookUrl: formDataPdv[FormInputNameToSavePdv.facebookUrl],
          instagramUrl: formDataPdv[FormInputNameToSavePdv.instagramUrl],
          twitterUrl: formDataPdv[FormInputNameToSavePdv.twitterUrl],
          linkedinUrl: formDataPdv[FormInputNameToSavePdv.linkedinUrl],
          batchClosed: formDataPdv[FormInputNameToSavePdv.batchClosed],
          askPasswordInactivity: formDataPdv[FormInputNameToSavePdv.askPasswordInactivity],
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
            latitude: formDataPdv[FormInputNameToSavePdv.latitude] ?? 0,
            longitude: formDataPdv[FormInputNameToSavePdv.longitude] ?? 0,
          },
        };

        if (!payload.id) {
          delete payload.id;
          delete payload.address.id;

          await api.post<Pdv>('/pdv', payload);
          toast.success('PDV cadastrado com sucesso!');
        } else {
          await api.put<Pdv>('/pdv', payload);
          toast.success('PDV atualizado com sucesso!');
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
            address: {
              entity: {
                address: formDataFilter[FormInputNameToFilter.inputSearch],
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
          title: 'Sim, quero remover',
          onClick: (): Promise<void> => handleOnConfirmDeleteToPdv(pdvSelected),
        },
      ],
    });
  };

  const handleOnConfirmDeleteSubPdv = async (subPdvSelected: SubPdv): Promise<void> => {
    try {
      await api.delete(`/sub-pdv/${subPdvSelected?.id}`);

      toast.success('SubPdv excluído com sucesso!');
      handleOnShowListSubPdv(pdv as Pdv);
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
          title: 'Sim, quero remover',
          onClick: (): Promise<void> => handleOnConfirmDeleteSubPdv(subPdvSelected),
        },
      ],
    });
  };

  // ---------- SUB PDV ------------

  // const handleOnCloseSubPdv = (): void => {
  //   dialog.hide();
  //   handleOnShowListSubPdv(pdvState.idPdv, pdvState.namePdv);
  // };

  // Registra Sub PDV
  // const handleOnRegisterSubPdv = async (values: any): Promise<void> => {
  //   try {
  //     await api.post<any>('/sub-pdv', values);
  //     handleOnCloseSubPdv();
  //   } catch (error) {
  //     const err = error as AxiosError;
  //     toast.error(err.message);
  //   }
  // };

  // Renderiza Modal de Registro de Sub PDV
  // const handleOnShowRegisterSubPdv = (): void => {
  //   dialog.show({
  //     title: 'Cadastrar novo Sub-PDV',
  //     children: <RegisterContentSubPdv onSubmit={handleOnRegisterSubPdv} />,
  //     onClose: handleOnCloseSubPdv,
  //     isCard: true,
  //   });
  // };

  // Edita Sub PDV
  // const handleOnEditSaveSubPdv = async (values: any): Promise<void> => {
  //   try {
  //     await api.put<any>('/sub-pdv', values);
  //     handleOnCloseSubPdv();
  //   } catch (error) {
  //     const err = error as AxiosError;
  //     toast.error(err.message);
  //   }
  // };

  // Renderiza Modal de Edição de Sub PDV
  // const handleOnShowEditSubPdv = async (id: string): Promise<void> => {
  //   const { data } = await api.get(`/sub-pdv/${id}`);
  //   dialog.show({
  //     title: 'Editar Sub PDV',
  //     children: <RegisterContentSubPdv dataList={data} onSubmit={handleOnEditSaveSubPdv} />,
  //     onClose: handleOnCloseSubPdv,
  //     isCard: true,
  //   });
  // };

  // Deleta Sub PDV

  // Renderiza Modal de Deleção de Sub PDV
  // const handleOnShowDeleteSubPdv = async (value: any): Promise<void> => {
  //   dialog.show({
  //     title: '',
  //     children: (
  //       <DeleteContent id={value} onSubmit={handleOnDeleteSubPdv} onClose={handleOnCloseSubPdv} />
  //     ),
  //     onClose: handleOnCloseSubPdv,
  //   });
  // };

  // ----------------------

  // const handleOnShowListSubPdv = async (id: string, name: string): Promise<void> => {
  //   const { data } = await api.get(`/sub-pdv/pdv/${id}`);
  //   onChange({ idPdv: id, namePdv: name });
  //   dialog.show({
  //     title: (
  //       <div className="subpdv-modal-header-container">
  //         {name ?? 'Sub PDV'}
  //         <div className="subpdv-register-buttom">
  //           <a style={{ cursor: 'pointer' }} onClick={handleOnShowRegisterSubPdv}>
  //             + cadastrar novo Sub PDV
  //           </a>
  //         </div>
  //       </div>
  //     ),
  //     children: (
  //       <ListContentSub
  //         dataList={data}
  //         // stateContext={pdvState}
  //         // onCleanConstext={onClean}
  //         onSubmit={handleOnRegisterSubPdv}
  //         onShowRegisterSubPdv={handleOnShowRegisterSubPdv}
  //         onShowEditSubPdv={handleOnShowEditSubPdv}
  //         onShowDeleteSubPdv={handleOnShowDeleteSubPdv}
  //       />
  //     ),
  //     onClose: handleOnClose,
  //   });
  // };

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
      // onChangeFormInputPdv(FormInputNameToSavePdv.batchClosed)(pdv.batchClosed);
      // onChangeFormInputPdv(FormInputNameToSavePdv.askPasswordInactivity)(pdv.askPasswordInactivity);
      onChangeFormInputPdv(FormInputNameToSavePdv.inactivityTimeout)(pdv.inactivityTimeout);
    }
  }, [pdv]);

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <PdvContainer
      state={state}
      pdvState={pdv}
      listPdv={listPdv}
      listSubPdv={listSubPdv}
      title={title}
      currentPage={currentPage}
      visible={visible}
      shouldShowModal={shouldShowModal}
      formDataPdv={formDataPdv}
      formErrorsPdv={formErrorsPdv}
      onChangeFormInputPdv={onChangeFormInputPdv}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      onShouldShowModal={handleOnShouldShowModal}
      onSavePdv={handleOnSavePdv}
      onFilter={handleOnFilter}
      // onShowEdit={handleOnShowEditPdv}
      onShowDelete={handleOnShowDeletePdv}
      onShowDeleteSubPdv={handleOnShowDeleteSubPdv}
      // onShowListSub={handleOnShowListSubPdv}
    />
  );
};
