import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useDialog } from '@/hooks/useDialog';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import Section from '@/model/Section';
import { FormInputName as FormInputNameToSector } from '@/features/registerEvent/components/SectorRegisterToDropDownScreen/components/RegisterSectorContent';
import {
  ShouldShowModal,
  States,
  SectorRegisterContainer,
} from '@/features/registerEvent/components/SectorRegisterToDropDownScreen/screens/ui';
import {
  formSectorProps,
  modalConfigProps,
  onShouldShowModalSectorProps,
  sectorActionsProps,
} from '../types';

export const SectorRegisterToDropDownScreen: React.FC<any> = ({
  sectorActions: sectorSelectedActions,
  sectorStates: sectorSelectedStates,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.sector);

  const [sector, setSector] = useState<Section>();

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const {
    formData: formDataSector,
    formErrors: formErrorsSector,
    onChangeFormInput: onChangeFormInputSector,
    isFormValid: isFormValidSector,
    resetForm: resetFormSector,
  } = useForm({
    initialData: {
      name: '',
    },
    validators: {
      name: [validators.required],
    },
    formatters: {},
  });

  const handleOnSaveSector = async (): Promise<void> => {
    try {
      if (isFormValidSector()) {
        setState(States.loading);
        const payload = {
          id: sector?.id,
          name: formDataSector[FormInputNameToSector.name],
          description: '-',
          imageBase64: '',
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<Section>('/section', payload);
          toast.success('Setor cadastrado com sucesso!');
        } else {
          await api.put<Section>('/section', payload);
          toast.success('Setor atualizado com sucesso!');
        }

        onToggle();
        sectorSelectedActions.onGetAllSector();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
    setState(States.default);
  };

  // Config Modal --------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    sector: sectorSelected,
  }: onShouldShowModalSectorProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (sectorSelected?.id && value === ShouldShowModal.sector) {
      setSector(sectorSelected);
    }
  };

  const controllerModalConfig: modalConfigProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
  };
  // Config Modal --------------------------------------------------------------

  const controllerFormSector: formSectorProps = {
    formData: formDataSector,
    formErrors: formErrorsSector,
    onChangeFormInput: onChangeFormInputSector,
  };

  const controllerSectorStates: any = {
    sector,
    setSector,
  };

  const controllerSectorActions: sectorActionsProps = {
    onSave: handleOnSaveSector,
  };

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormSector();
        setSector(undefined);
      }, 500);
    }
  }, [visible]);

  useEffect(() => {
    if (sector?.id) {
      onChangeFormInputSector(FormInputNameToSector.name)(sectorSelectedStates.name);
    }
  }, [sector]);

  return (
    <SectorRegisterContainer
      state={state}
      sectorSelectedStates={sectorSelectedStates}
      formSector={controllerFormSector}
      sectorStates={controllerSectorStates}
      sectorActions={controllerSectorActions}
      modalConfig={controllerModalConfig}
    />
  );
};
