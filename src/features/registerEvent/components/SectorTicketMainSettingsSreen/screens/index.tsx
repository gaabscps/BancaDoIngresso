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
import { FormInputName as FormInputNameToMainSettings } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/components/SectorTicketMainSettingsContent';
import { FormInputName as FormInputNameToSector } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/components/RegisterSectorContent';
import { FormInputName as FormInputNameToBatch } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/components/BatchContent';
import dayjs from 'dayjs';
import {
  batchActionsProps,
  batchStatesProps,
  formBatchsProps,
  formMainSettingsProps,
  formSectorProps,
  mainSettingsProps,
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

  const [batch, setBatch] = useState<any>();
  const [batchList, setBatchList] = useState<any>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const {
    formData: formDataMainSettings,
    formErrors: formErrorsMainSettings,
    onChangeFormInput: onChangeFormInputMainSettings,
    setErrors: setErrorsMainSettings,
    isFormValid: isFormValidMainSettings,
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
      // name: [validators.required],
      // eventSection: [validators.required],
      // hasHalfPrice: [validators.required],
      // hasCourtesy: [validators.required],
      // numberTickets: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataBatchs,
    formErrors: formErrorsBatchs,
    onChangeFormInput: onChangeFormInputBatchs,
    setErrors: setErrorsBatchs,
    isFormValid: isFormValidBatchs,
    resetForm: resetFormBatchs,
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
      // name: [validators.required],
      // startDate: [validators.required],
      // endDate: [validators.required],
      // startTime: [validators.required],
      // endTime: [validators.required],
      // commission: [validators.required],
      // amount: [validators.required],
      // unitValue: [validators.required],
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

  const handleOnSaveMainSettings = async (): Promise<void> => {
    try {
      if (isFormValidMainSettings()) {
        const payload: any = {
          id: sector?.id,
          eventSection: {
            id: formDataMainSettings[FormInputNameToMainSettings.eventSection],
          },
          name: formDataMainSettings[FormInputNameToMainSettings.name],
          hasHalfPrice: formDataMainSettings[FormInputNameToMainSettings.hasHalfPrice],
          percentageHalfPrice:
            formDataMainSettings[FormInputNameToMainSettings.percentageHalfPrice],
          amountHalfPrice: formDataMainSettings[FormInputNameToMainSettings.amountHalfPrice],
          hasCourtesy: formDataMainSettings[FormInputNameToMainSettings.hasCourtesy],
          amountCourtesy: formDataMainSettings[FormInputNameToMainSettings.amountCourtesy],
          numberTickets: formDataMainSettings[FormInputNameToMainSettings.numberTickets],
          printLayoutBase64: formDataMainSettings[FormInputNameToMainSettings.printLayoutBase64],
          printImageBase64: formDataMainSettings[FormInputNameToMainSettings.printImageBase64],
          printer: {
            id: formDataMainSettings[FormInputNameToMainSettings.printer],
          },
          copies: formDataMainSettings[FormInputNameToMainSettings.copies],
          reprint: formDataMainSettings[FormInputNameToMainSettings.reprint],
          printBatchNumber: formDataMainSettings[FormInputNameToMainSettings.printBatchNumber],
          observation: formDataMainSettings[FormInputNameToMainSettings.observation],
          batchs: batchList,
        };

        console.log('payload :>> ', payload);

        // if (!payload.id) {
        //   delete payload.id;

        //   await api.post<any>('/section', payload);
        //   toast.success('Setor cadastrado com sucesso!');
        // } else {
        //   await api.put<any>('/section', payload);
        //   toast.success('Setor atualizado com sucesso!');
        // }

        // onToggle();
        // handleFecthSectorList();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnAddBatch = async (): Promise<void> => {
    try {
      if (isFormValidBatchs()) {
        const payloadStartData = dayjs(
          `${formDataBatchs[FormInputNameToBatch.startDate]}T${
            formDataBatchs[FormInputNameToBatch.startTime]
          }`,
        ).format('YYYY-MM-DDTHH:mm');

        const payloadEndData = dayjs(
          `${formDataBatchs[FormInputNameToBatch.endDate]}T${
            formDataBatchs[FormInputNameToBatch.endTime]
          }`,
        ).format('YYYY-MM-DDTHH:mm');

        const payload: any = {
          id: sector,
          name: formDataBatchs[FormInputNameToBatch.name],
          startDate: payloadStartData,
          endDate: payloadEndData,
          commission: formDataBatchs[FormInputNameToBatch.commission],
          amount: formDataBatchs[FormInputNameToBatch.amount],
          unitValue: formDataBatchs[FormInputNameToBatch.unitValue],
          totalValue: formDataBatchs[FormInputNameToBatch.totalValue],
          imageUrl: formDataBatchs[FormInputNameToBatch.imageUrl],
        };

        // dont add batch if already exists
        const batchExists = batchList.find(batch => batch.name === payload.name);

        if (!batchExists) {
          setBatchList([...batchList, payload]);
        } else {
          toast.error('Lote com o mesmo nome já existe');
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnDeleteBatch = async (batchSelected): Promise<void> => {
    try {
      // delete batch from list
      const newBatchList = batchList.filter(batch => batch.name !== batchSelected?.name);

      setBatchList(newBatchList);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnGetBatch = async (batchSelected): Promise<void> => {
    try {
      if (batchSelected) {
        setBatch(batchSelected);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnEditBatch = async (batchSelected): Promise<void> => {
    try {
      // edit batch from list
      const newBatchList = batchList.map(batch => {
        if (batch.name === batchSelected?.name) {
          return {
            ...batch,
            name: formDataBatchs[FormInputNameToBatch.name],
            startDate: formDataBatchs[FormInputNameToBatch.startDate],
            endDate: formDataBatchs[FormInputNameToBatch.endDate],
            commission: formDataBatchs[FormInputNameToBatch.commission],
            amount: formDataBatchs[FormInputNameToBatch.amount],
            unitValue: formDataBatchs[FormInputNameToBatch.unitValue],
            totalValue: formDataBatchs[FormInputNameToBatch.totalValue],
            imageUrl: formDataBatchs[FormInputNameToBatch.imageUrl],
          };
        }

        return batch;
      });

      setBatchList(newBatchList);
      setBatch(undefined);
      resetFormBatchs();
      toast.success('Lote editado com sucesso.');
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditBatch = async (): Promise<void> => {
    try {
      setBatch(undefined);
      resetFormBatchs();
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

  const controllerBatchsStates: batchStatesProps = {
    batch,
    setBatch,
    batchList,
    setBatchList,
  };

  const controllerMainSettingsActions: mainSettingsProps = {
    onSave: handleOnSaveMainSettings,
  };

  const controllerSectorActions: sectorActionsProps = {
    onSave: handleOnSaveSector,
  };

  const controllerBatchActions: batchActionsProps = {
    onAdd: handleOnAddBatch,
    onEdit: handleOnEditBatch,
    onCancelEdit: handleOnCancelEditBatch,
    onGet: handleOnGetBatch,
    onDelete: handleOnDeleteBatch,
  };

  useEffect(() => {
    handleFecthSectorList();
  }, []);

  useEffect(() => {
    if (batch) {
      onChangeFormInputBatchs(FormInputNameToBatch.name)(batch.name);
      // onChangeFormInputBatchs(FormInputNameToBatch.startDate)(
      //   dayjs(batch?.startDate).format('YYYY-MM-DD') ?? '',
      // );
      // onChangeFormInputBatchs(FormInputNameToBatch.endDate)(
      //   dayjs(batch?.endDate).format('YYYY-MM-DD') ?? '',
      // );
      // onChangeFormInputBatchs(FormInputNameToBatch.startTime)(
      //   batch?.startDate.split('T')[1].slice(0, 5) ?? '',
      // );
      // onChangeFormInputBatchs(FormInputNameToBatch.endTime)(
      //   batch?.endDate.split('T')[1].slice(0, 5) ?? '',
      // );
      onChangeFormInputBatchs(FormInputNameToBatch.commission)(batch.commission);
      onChangeFormInputBatchs(FormInputNameToBatch.amount)(batch.amount);
      onChangeFormInputBatchs(FormInputNameToBatch.unitValue)(batch.unitValue);
      onChangeFormInputBatchs(FormInputNameToBatch.totalValue)(batch.totalValue);
      onChangeFormInputBatchs(FormInputNameToBatch.imageUrl)(batch.imageUrl);
    }
  }, [batch]);

  return (
    <SectorTicketMainSettingsContainer
      state={state}
      formMainSettings={controllerFormMainSettings}
      formBatchs={controllerFormBatchs}
      formSector={controllerFormSector}
      sectorStates={controllerSectorStates}
      sectorActions={controllerSectorActions}
      mainSettingsActions={controllerMainSettingsActions}
      batchStates={controllerBatchsStates}
      batchActions={controllerBatchActions}
      modalConfig={controllerModalConfig}
    />
  );
};
