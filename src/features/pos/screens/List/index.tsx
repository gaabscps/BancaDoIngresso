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
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadPos {
  id?: string;
  name: string;
  serialNumber: string;
  status: PosStatus;
  pdv: {
    id: string;
  };
  model: string;
  telephoneOperator: string;
  cardOperator: string;
  expirationDate: string;
}

export const PosScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listPos, setListPos] = useState<Pos[]>([]);
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
    // setErrors: setErrorsPos,
  } = useForm({
    initialData: {
      name: '',
      serialNumber: '',
      status: '',
      pdv: '',
      model: '',
      telephoneOperator: '',
      cardOperator: '',
      expirationDate: '',
    },
    validators: {
      name: [validators.required],
      serialNumber: [validators.required],
      status: [validators.required],
      expirationDate: [validators.isDateLessThanCurrentDate],
      // adicionar validação de data de expiração maior que a data atual
    },
    formatters: {},
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
  const handleOnChangeColorColumn = (status: PosStatus): string => {
    switch (status) {
      case 0:
        return '#3CAFC8';
      case 1:
        return '#7AD81B';
      case 2:
        return '#FFE249';
      case 3:
        return '#E64F49';
      default:
        return 'grey';
    }
  };

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

    if (posSelected?.id && value === ShouldShowModal.pos) {
      resetFormPos();
      setPos(posSelected);
    } else {
      resetFormPos();
      setPos(undefined);
    }
  };

  const handleOnSavePos = async (): Promise<void> => {
    console.log('handleOnSavePos');

    try {
      if (isFormValidPos()) {
        const payload: PayloadPos = {
          id: pos?.id,
          name: formDataPos[FormInputNameToSavePos.name],
          serialNumber: formDataPos[FormInputNameToSavePos.serialNumber],
          status: +formDataPos[FormInputNameToSavePos.status],
          pdv: {
            id: formDataPos[FormInputNameToSavePos.pdv],
          },
          model: formDataPos[FormInputNameToSavePos.model],
          telephoneOperator: formDataPos[FormInputNameToSavePos.telephoneOperator],
          cardOperator: formDataPos[FormInputNameToSavePos.cardOperator],
          expirationDate: formDataPos[FormInputNameToSavePos.expirationDate],
        };

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
      } else {
        console.log('form invalido');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
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
          title: 'Sim, quero remover',
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
      onChangeFormInputPos(FormInputNameToSavePos.model)(pos.model);
      onChangeFormInputPos(FormInputNameToSavePos.telephoneOperator)(pos.telephoneOperator);
      onChangeFormInputPos(FormInputNameToSavePos.cardOperator)(pos.cardOperator);
      onChangeFormInputPos(FormInputNameToSavePos.expirationDate)(String(pos.expirationDate));
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
      isFormValidFilter={isFormValidFilter}
      onShowDeletePos={handleOnShowDeletePos}
      onFilter={handleOnFilter}
    />
  );
};
