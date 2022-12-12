import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useDialog } from '@/hooks/useDialog';
import { AxiosError } from 'axios';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Pos from '@/model/Pos';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/components/DeleteContent';
import { formPosProps, modalConfigPosProps, onShouldShowModalSectorPosProps } from '../types';
import { SectorPosContainer, ShouldShowModal } from './ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorProductPosContainerProps {
  nextTab: () => void;
  backTab: () => void;
}

type UrlParams = {
  id: string;
};

export const SectorPosScreen: React.FC<SectorProductPosContainerProps> = ({ nextTab, backTab }) => {
  const [state, setState] = useState<States>(States.default);
  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configPos,
  );
  const [posList, setPosList] = useState<any[]>([]);

  const [posOptions, setPosOptions] = useState<Pos[]>([]);

  const confirmDelete = useConfirmDelete();

  const params = useParams<UrlParams>();

  const {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
    // setErrors: setErrorsProduct,
    // resetForm: resetFormProduct,
  } = useForm({
    initialData: {
      allowPos: '',
      pos: '',
      waiter: '',
      commission: '',
      allowDiscount: '',
    },
    validators: {
      allowPos: [validators.required],
      pos: [validators.required],
      waiter: [validators.required],
      commission: [validators.required],
      allowDiscount: [validators.required],
    },
    formatters: {},
  });

  const controllerFormPos: formPosProps = {
    formData: formDataPos,
    formErrors: formErrorsPos,
    onChangeFormInput: onChangeFormInputPos,
    isFormValid: isFormValidPos,
  };

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
  }: // product: productSelected,
  onShouldShowModalSectorPosProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    // if (productSelected?.id && value === ShouldShowModal.configPos) {
    //   setProduct(productSelected);
    // }
  };

  const controllerModalConfig: modalConfigPosProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
  };

  const handleGetPosList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/section-product/${id}/pos`);

      setPosList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetAllPos = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Pos[]>('/pos/find');
      setPosOptions(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnSavePos = async (): Promise<void> => {
    try {
      const payload = {};

      const reponse = await api.post(`/event/section-product/${params.id}/pos`, payload);
      if (reponse) toast.success('Dados salvos com sucesso!');
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnConfirmDeleteToPos = async (posSelected: Pos): Promise<void> => {
    try {
      await api.delete(`/combo/${posSelected?.id}`);

      toast.success('Pos excluído com sucesso!');
      confirmDelete.hide();
      handleGetPosList(params.id);
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
          onClick: (): void => confirmDelete.hide(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): Promise<void> => handleOnConfirmDeleteToPos(posSelected),
        },
      ],
    });
  };

  useEffect(() => {
    handleGetAllPos();
    handleGetPosList(params.id);
  }, []);

  return (
    <>
      <SectorPosContainer
        state={state}
        controllerModalConfig={controllerModalConfig}
        controllerFormPos={controllerFormPos}
        posList={posList}
        posOptions={posOptions}
        nextTab={nextTab}
        backTab={backTab}
        handleOnSavePos={handleOnSavePos}
        handleOnShowDeletePos={handleOnShowDeletePos}
      />
    </>
  );
};
