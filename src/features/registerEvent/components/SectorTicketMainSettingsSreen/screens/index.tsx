/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { unmask as unMaskCash } from '@/helpers/masks/cash';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import dayjs from 'dayjs';
// import { useEvent } from '@/features/registerEvent/hook/useEvent';
import { useParams } from 'react-router-dom';
import {
  batchActionsProps,
  batchStatesProps,
  formBatchsProps,
  formMainSettingsProps,
  formSectorProps,
  mainSettingsProps,
  modalConfigTicketMainSettingsProps,
  onShouldShowModalTicketMainSettingsProps,
  printerStatesProps,
  sectorActionsProps,
  sectorStatesProps,
} from '../types';

type UrlParams = {
  id: string;
};

export const SectorTicketMainSettingsScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.sector);

  const [sector, setSector] = useState<any>();
  const [sectorList, setSectorList] = useState<any>([]);

  const [batch, setBatch] = useState<any>();
  const [batchList, setBatchList] = useState<any>([]);

  const [printerList, setPrinterList] = useState<any>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  // const { eventState, onChange: onChangeEvent } = useEvent();]
  const params = useParams<UrlParams>();

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
      name: [validators.required],
      eventSection: [validators.required],
      hasHalfPrice: [validators.required],
      hasCourtesy: [validators.required],
      numberTickets: [validators.required],
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
            onChangeFormInputMainSettings(inputName)('');
            onChangeFormInputMainSettings(inputName)(base64);
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
            onChangeFormInputBatchs(inputName)('');
            onChangeFormInputBatchs(inputName)(base64);
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

  const handleFecthPrinterList = async (): Promise<void> => {
    try {
      // setState(States.loading);
      const { data } = await api.get<any[]>(`/printer/find`);
      // filter father event when event type is father

      setPrinterList(data ?? []);
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
        const payloadBatchs: any = batchList.map((batch: any) => {
          if (batch.id) {
            return {
              ...batch,
              commission: +batch.commission,
              amount: +batch.amount,
              unitValue: +batch.unitValue,
              totalValue: +batch.totalValue,
            };
          }
          // eslint-disable-next-line no-param-reassign
          delete batch.id;
          return {
            ...batch,
            commission: +batch.commission,
            amount: +batch.amount,
            unitValue: +batch.unitValue,
            totalValue: +batch.totalValue,
          };
        });

        // continue someone batchList is not array empty
        if (payloadBatchs.length === 0) {
          toast.warn('Adicione ao menos um lote para continuar');
          return;
        }

        const payload: any = {
          id: sector?.id,
          eventSection: {
            id: formDataMainSettings[FormInputNameToMainSettings.eventSection],
          },
          name: formDataMainSettings[FormInputNameToMainSettings.name],
          hasHalfPrice: convertToBoolean(
            formDataMainSettings[FormInputNameToMainSettings.hasHalfPrice],
          ),
          percentageHalfPrice:
            +formDataMainSettings[FormInputNameToMainSettings.percentageHalfPrice],
          amountHalfPrice: +formDataMainSettings[FormInputNameToMainSettings.amountHalfPrice],
          hasCourtesy: convertToBoolean(
            formDataMainSettings[FormInputNameToMainSettings.hasCourtesy],
          ),
          amountCourtesy: +formDataMainSettings[FormInputNameToMainSettings.amountCourtesy],
          numberTickets: convertToBoolean(
            formDataMainSettings[FormInputNameToMainSettings.numberTickets],
          ),
          printLayoutBase64: formDataMainSettings[FormInputNameToMainSettings.printLayoutBase64],
          printImageBase64: formDataMainSettings[FormInputNameToMainSettings.printImageBase64],
          printer: {
            id: formDataMainSettings[FormInputNameToMainSettings.printer],
          },
          copies: +formDataMainSettings[FormInputNameToMainSettings.copies],
          reprint: convertToBoolean(formDataMainSettings[FormInputNameToMainSettings.reprint]),
          printBatchNumber: convertToBoolean(
            formDataMainSettings[FormInputNameToMainSettings.printBatchNumber],
          ),
          observation: formDataMainSettings[FormInputNameToMainSettings.observation],
          batchs: payloadBatchs,
        };

        if (!payload.id) {
          delete payload.id;
        }
        await api.post<any>(`/event/ticket/${params.id}/main-settings`, payload);

        // onChangeEvent({ ...eventState, currentStep: eventState.currentStep + 1 });
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
          name: formDataBatchs[FormInputNameToBatch.name],
          startDate: payloadStartData,
          endDate: payloadEndData,
          commission: +formDataBatchs[FormInputNameToBatch.commission],
          amount: String(formDataBatchs[FormInputNameToBatch.amount]),
          unitValue: String(+unMaskCash(formDataBatchs[FormInputNameToBatch.unitValue])),
          totalValue: String(
            (
              +unMaskCash(formDataBatchs[FormInputNameToBatch.unitValue]) *
              +unMaskCash(formDataBatchs[FormInputNameToBatch.amount])
            ).toFixed(2),
          ),
          imageUrl: formDataBatchs[FormInputNameToBatch.imageUrl],
        };

        // dont add batch if already exists
        const batchExists = batchList.find((batch: any) => batch.name === payload.name);

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

  const handleOnDeleteBatch = async (batchSelected: any): Promise<void> => {
    try {
      // delete batch from list
      // eslint-disable-next-line no-shadow
      const newBatchList = batchList.filter((batch: any) => batch.name !== batchSelected?.name);

      setBatchList(newBatchList);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnGetBatch = async (batchSelected: any): Promise<void> => {
    try {
      if (batchSelected) {
        console.log('batchSelected :>> ', batchSelected);
        setBatch(batchSelected);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnEditBatch = async (batchSelected: any): Promise<void> => {
    try {
      // edit batch from list
      const newBatchList = batchList.map((batch: any) => {
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
        if (batch.name === batchSelected?.name) {
          return {
            ...batch,
            id: batchSelected?.id,
            name: formDataBatchs[FormInputNameToBatch.name],
            startDate: payloadStartData,
            endDate: payloadEndData,
            commission: +formDataBatchs[FormInputNameToBatch.commission],
            amount: String(formDataBatchs[FormInputNameToBatch.amount]),
            unitValue: String(+unMaskCash(formDataBatchs[FormInputNameToBatch.unitValue])),
            totalValue: String(
              (
                +unMaskCash(formDataBatchs[FormInputNameToBatch.unitValue]) *
                +unMaskCash(formDataBatchs[FormInputNameToBatch.amount])
              ).toFixed(2),
            ),
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

  const controllerPrinterStates: printerStatesProps = {
    printerList,
    setPrinterList,
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
    handleFecthPrinterList();
  }, []);

  useEffect(() => {
    if (batch) {
      onChangeFormInputBatchs(FormInputNameToBatch.name)(batch.name);
      onChangeFormInputBatchs(FormInputNameToBatch.startDate)(
        dayjs(batch?.startDate).format('YYYY-MM-DD') ?? '',
      );
      onChangeFormInputBatchs(FormInputNameToBatch.endDate)(
        dayjs(batch?.endDate).format('YYYY-MM-DD') ?? '',
      );
      onChangeFormInputBatchs(FormInputNameToBatch.startTime)(
        batch?.startDate.split('T')[1].slice(0, 5) ?? '',
      );
      onChangeFormInputBatchs(FormInputNameToBatch.endTime)(
        batch?.endDate.split('T')[1].slice(0, 5) ?? '',
      );
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
      printerStates={controllerPrinterStates}
      modalConfig={controllerModalConfig}
    />
  );
};
