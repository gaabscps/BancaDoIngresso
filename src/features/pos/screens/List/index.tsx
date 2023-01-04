/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import Pos from '@/model/Pos';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import { PosResponse, PosRequestParams } from '@/features/pos/types';
import useForm from '@/hooks/useForm';
import { States, PosContainer, ShouldShowModal } from '@/features/pos/screens/List/ui';
import PosStatus from '@/model/PosStatus';
import validators from '@/helpers/validators';
import { FormInputName as FormInputNameToSavePos } from '@/features/pos/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/pos/components/FilterContent';
import Pdv from '@/model/Pdv';
import dayjs from 'dayjs';
import { colors } from '@/styles/colors';
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadPos {
  id?: string;
  name: string;
  serialNumber: string;
  status?: PosStatus;
  pdv?: {
    id?: string;
  };
  model?: string | null;
  telephoneOperator?: string | null;
  cardOperator?: string | null;
  expirationDate?: string | null;
}

export const PosScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listPos, setListPos] = useState<Pos[]>([]);
  const [listPdv, setListPdv] = useState<Pdv[]>([]);
  const [pos, setPos] = useState<Pos>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.pos);

  const [currentPage, setCurrentPage] = useState<PosRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
    resetForm: resetFormPos,
  } = useForm({
    initialData: {
      name: '',
      serialNumber: '',
      status: '',
      model: '',
      telephoneOperator: '',
      cardOperator: '',
      expirationDate: '',
    },
    validators: {
      name: [validators.required],
      serialNumber: [validators.required],
    },
    formatters: {},
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

  const handleFetch = async (values: PosRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<PosResponse>('/pos/page', values);

      if (data) {
        setListPos(data?.list ?? []);

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
  const handleOnChangeColorColumn = (status: PosStatus): string =>
    ({
      0: colors.lightBlue,
      1: colors.green,
      2: colors.yellow,
      3: colors.red,
    }[status] || colors.grey);
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    pos: posSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pos?: Pos;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (
      (posSelected?.id && value !== ShouldShowModal.filter) ||
      (!posSelected?.id && value !== ShouldShowModal.filter)
    ) {
      setPos(posSelected);
      handleFecthPdvList();
      if (posSelected?.id !== pos?.id) {
        resetFormPos();
      }
    } else {
      resetFormPos();
      setPos(undefined);
    }
    if (
      (!posSelected?.id && value !== ShouldShowModal.filter) ||
      (!posSelected?.id && value !== ShouldShowModal.pos)
    ) {
      resetFormPos();
    }
  };

  const handleOnSavePos = async (): Promise<void> => {
    try {
      if (isFormValidPos()) {
        const payload: PayloadPos = {
          id: pos?.id,
          name: formDataPos[FormInputNameToSavePos.name],
          serialNumber: formDataPos[FormInputNameToSavePos.serialNumber],
          status: +formDataPos[FormInputNameToSavePos.status] || 0,
          pdv: {
            id: formDataPos[FormInputNameToSavePos.pdv] || 'undefined',
          },
          model: formDataPos[FormInputNameToSavePos.model] || null,
          telephoneOperator: formDataPos[FormInputNameToSavePos.telephoneOperator] || null,
          cardOperator: formDataPos[FormInputNameToSavePos.cardOperator] || null,
          expirationDate: formDataPos[FormInputNameToSavePos.expirationDate] || null,
        };

        if (payload.model === null) {
          delete payload.model;
        }
        if (payload.status === 0) {
          delete payload.status;
        }

        if (payload.cardOperator === null) {
          delete payload.cardOperator;
        }

        if (payload.telephoneOperator === null) {
          delete payload.telephoneOperator;
        }

        if (payload.expirationDate === 'Invalid Date') {
          delete payload.expirationDate;
        }

        if (payload.pdv?.id === 'empty' || payload.pdv?.id === 'undefined') {
          delete payload.pdv;
        }

        if (!payload.id) {
          delete payload.id;

          await api.post<Pos>('/pos', payload);
          toast.success('POS cadastrado com sucesso!');
        } else {
          await api.put<Pos>('/pos', payload);
          toast.success('POS atualizado com sucesso!');
        }

        onToggle();
        handleFetch(currentPage);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleFecthPdvList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Pdv[]>('/pdv/find');
      setListPdv(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToPos = async (posSelected: Pos): Promise<void> => {
    try {
      await api.delete(`/pos/${posSelected?.id}`);

      toast.success('POS excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeletePos = (posSelected: Pos): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteToPos(posSelected),
        },
      ],
    });
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
            serialNumber: {
              entity: {
                serialNumber: formDataFilter[FormInputNameToFilter.inputSearch],
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

  const clearFilter = async (): Promise<void> => {
    resetFormFilter();
    await handleFetch({
      ...currentPage,
      entity: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    onToggle();
  };

  const handleOnPaginationChange = async (page: number): Promise<void> => {
    handleFetch({
      ...currentPage,
      page,
    });
  };

  useEffect(() => {
    if (pos?.id) {
      onChangeFormInputPos(FormInputNameToSavePos.name)(pos.name);
      onChangeFormInputPos(FormInputNameToSavePos.serialNumber)(pos.serialNumber);
      onChangeFormInputPos(FormInputNameToSavePos.status)(String(pos.status));
      onChangeFormInputPos(FormInputNameToSavePos.model)(pos?.model);
      onChangeFormInputPos(FormInputNameToSavePos.pdv)(String(pos?.pdv?.id));
      onChangeFormInputPos(FormInputNameToSavePos.telephoneOperator)(pos?.telephoneOperator);
      onChangeFormInputPos(FormInputNameToSavePos.cardOperator)(pos?.cardOperator);
      onChangeFormInputPos(FormInputNameToSavePos.expirationDate)(
        String(dayjs(pos?.expirationDate, 'YYYY-DD-MM hh:mm:ss').format('YYYY-MM-DD')),
      );
    }
  }, [pos]);

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <PosContainer
      state={state}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      shouldShowModal={shouldShowModal}
      onSavePos={handleOnSavePos}
      listPos={listPos}
      currentPage={currentPage}
      changeColorColumn={handleOnChangeColorColumn}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataPos={formDataPos}
      formErrorsPos={formErrorsPos}
      onChangeFormInputPos={onChangeFormInputPos}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onShowDeletePos={handleOnShowDeletePos}
      onFilter={handleOnFilter}
      listPdv={listPdv}
      posState={pos}
      clearFilter={clearFilter}
    />
  );
};
