/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  SectorTicketMainSettingsContainer,
  ShouldShowModal,
  States,
} from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { NameFiles } from '@/features/registerEvent/types';
import { useDialog } from '@/hooks/useDialog';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import { FormInputName as FormInputNameToSector } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/components/RegisterSectorContent';
import {
  formBatchsProps,
  formMainSettingsProps,
  formSectorProps,
  modalConfigTicketMainSettingsProps,
  onShouldShowModalTicketMainSettingsProps,
  sectorActionsProps,
  sectorStatesProps,
} from '../types';

export const SectorTicketMainSettingsScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.sector);

  const [sector, setSector] = useState<any>();
  const [sectorList, setSectorList] = useState<any>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const {
    formData: formDataMainSettings,
    formErrors: formErrorsMainSettings,
    onChangeFormInput: onChangeFormInputMainSettings,
    setErrors: setErrorsMainSettings,
  } = useForm({
    initialData: {
      name: '',
      eventSection: '',
      hasHalfPrice: '',
      percentageHalfPrice: '',
      amountHalfPrice: '',
      hasCourtesy: '',
      amountCourtesy: '',
      numberTickets: '',
      printLayoutBase64: '',
      printImageBase64: '',
      printer: '',
      copies: '',
      reprint: '',
      printBatchNumber: '',
      observation: '',
    },
    validators: {
      name: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataBatchs,
    formErrors: formErrorsBatchs,
    onChangeFormInput: onChangeFormInputBatchs,
    setErrors: setErrorsBatchs,
  } = useForm({
    initialData: {
      name: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      commission: '',
      amount: '',
      unitValue: '',
      totalValue: '',
      imageUrl: '',
    },
    validators: {
      name: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataSector,
    formErrors: formErrorsSector,
    onChangeFormInput: onChangeFormInputSector,
    isFormValid: isFormValidSector,
  } = useForm({
    initialData: {
      name: '',
    },
    validators: {
      name: [validators.required],
    },
    formatters: {},
  });

  // Change file input ---------------------------------------------------------
  const handleOnChangeFileInputMainSettings =
    (inputName: string) =>
    (file: File | undefined): void => {
      // validate if file is image
      if (file && file.type.match(/image\/(jpg|jpeg|png)/)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result?.toString();
          if (base64) {
            setFormNameFiles({ ...formNameFiles, [inputName]: file.name });
            onChangeFormInputBatchs(inputName)('');
            onChangeFormInputBatchs(inputName)(base64);
          }
        };
      } else {
        setErrorsMainSettings({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };

  const handleOnChangeFileInputBatch =
    (inputName: string) =>
    (file: File | undefined): void => {
      // validate if file is image
      if (file && file.type.match(/image\/(jpg|jpeg|png)/)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result?.toString();
          if (base64) {
            setFormNameFiles({ ...formNameFiles, [inputName]: file.name });
            onChangeFormInputMainSettings(inputName)('');
            onChangeFormInputMainSettings(inputName)(base64);
          }
        };
      } else {
        setErrorsBatchs({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };
  // Change file input ---------------------------------------------------------

  const handleFecthSectorList = async (): Promise<void> => {
    try {
      // setState(States.loading);
      const { data } = await api.get<any[]>(`/section/find`);
      // filter father event when event type is father

      setSectorList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      // setState(States.default);
    }
  };

  const handleOnSaveSector = async (): Promise<void> => {
    try {
      if (isFormValidSector()) {
        const payload: any = {
          id: sector,
          name: formDataSector[FormInputNameToSector.name],
          description: '-',
          imageBase64: '',
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<any>('/section', payload);
          toast.success('Setor cadastrado com sucesso!');
        } else {
          await api.put<any>('/section', payload);
          toast.success('Setor atualizado com sucesso!');
        }

        onToggle();
        handleFecthSectorList();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  // Config Modal --------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    sector: sectorSelected,
  }: onShouldShowModalTicketMainSettingsProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (sectorSelected?.id && value === ShouldShowModal.sector) {
      setSector(sectorSelected);
    }
  };

  const controllerModalConfig: modalConfigTicketMainSettingsProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
  };
  // Config Modal --------------------------------------------------------------

  const controllerFormMainSettings: formMainSettingsProps = {
    formData: formDataMainSettings,
    formErrors: formErrorsMainSettings,
    onChangeFormInput: onChangeFormInputMainSettings,
    onChangeFormFileInput: handleOnChangeFileInputMainSettings,
    formNameFiles,
  };

  const controllerFormBatchs: formBatchsProps = {
    formData: formDataBatchs,
    formErrors: formErrorsBatchs,
    onChangeFormInput: onChangeFormInputBatchs,
    onChangeFormFileInput: handleOnChangeFileInputBatch,
    formNameFiles,
  };

  const controllerFormSector: formSectorProps = {
    formData: formDataSector,
    formErrors: formErrorsSector,
    onChangeFormInput: onChangeFormInputSector,
  };

  const controllerSectorStates: sectorStatesProps = {
    sector,
    setSector,
    sectorList,
    setSectorList,
  };

  const controllerSectorActions: sectorActionsProps = {
    onSave: handleOnSaveSector,
  };

  useEffect(() => {
    handleFecthSectorList();
  }, []);

  return (
    <SectorTicketMainSettingsContainer
      state={state}
      formMainSettings={controllerFormMainSettings}
      formBatchs={controllerFormBatchs}
      formSector={controllerFormSector}
      sectorStates={controllerSectorStates}
      sectorActions={controllerSectorActions}
      modalConfig={controllerModalConfig}
    />
  );
};
