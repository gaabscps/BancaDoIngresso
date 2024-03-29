/* eslint-disable no-param-reassign */
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
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import Section from '@/model/Section';
import TicketBatch from '@/model/TicketBatch';
import Printer from '@/model/Printer';
import {
  SectorTicketContainerProps,
  TabSectorTicketActionsProps,
} from '@/features/registerEvent/screens/SectorTicket/ui';

import { unmask } from '@/helpers/masks/cashNumber';
import { toPercentage } from '@/helpers/common/amount';
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

export const SectorTicketMainSettingsScreen: React.FC<
  Pick<SectorTicketContainerProps, 'ticketStates'> &
    Pick<SectorTicketContainerProps, 'ticketStep'> &
    Omit<TabSectorTicketActionsProps, 'backTab'>
> = ({ ticketStates, ticketStep, nextTab, onFirstTab, reloadTickets }): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.sector);

  const [sector, setSector] = useState<Section>();
  const [sectorList, setSectorList] = useState<Section[]>([]);

  const [batch, setBatch] = useState<TicketBatch>();
  const [batchList, setBatchList] = useState<TicketBatch[]>([]);

  const [printerList, setPrinterList] = useState<Printer[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const params = useParams<UrlParams>();

  const {
    formData: formDataMainSettings,
    formErrors: formErrorsMainSettings,
    onChangeFormInput: onChangeFormInputMainSettings,
    setErrors: setErrorsMainSettings,
    isFormValid: isFormValidMainSettings,
    resetForm: resetFormMainSettings,
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
      name: [validators.required],
      startDate: [validators.required],
      endDate: [validators.required],
      startTime: [validators.required],
      endTime: [validators.required],
      commission: [validators.required],
      amount: [validators.required],
      unitValue: [validators.required],
    },
    formatters: {},
  });

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
      setState(States.loading);
      const { data } = await api.get<Section[]>(`/section/find`);
      // filter father event when event type is father

      setSectorList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFecthPrinterList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Printer[]>(`/printer/find`);
      // filter father event when event type is father

      setPrinterList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnSaveSector = async (): Promise<void> => {
    try {
      setState(States.loading);
      if (isFormValidSector()) {
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
        handleFecthSectorList();
        resetFormSector();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.loading);
    }
  };

  const handleOnSaveMainSettings = async ({ isBntNext }: { isBntNext: boolean }): Promise<void> => {
    try {
      setState(States.loading);
      const isFormValid = isFormValidMainSettings();
      // validate percentageHalfPrice and amountHalfPrice if hasHalfPrice is true
      if (
        isFormValid &&
        convertToBoolean(formDataMainSettings[FormInputNameToMainSettings.hasHalfPrice])
      ) {
        const percentageHalfPrice =
          +formDataMainSettings[FormInputNameToMainSettings.percentageHalfPrice];
        const amountHalfPrice = +formDataMainSettings[FormInputNameToMainSettings.amountHalfPrice];
        if (percentageHalfPrice <= 0 || percentageHalfPrice > 100) {
          setErrorsMainSettings({
            [FormInputNameToMainSettings.percentageHalfPrice]: ['O valor deve ser entre 1 e 100'],
          });
          return;
        }

        if (amountHalfPrice <= 0) {
          setErrorsMainSettings({
            [FormInputNameToMainSettings.amountHalfPrice]: ['O valor deve ser maior que 0'],
          });
          return;
        }
      }

      // validate amountCourtesy if hasHalfPrice is true
      if (
        isFormValid &&
        convertToBoolean(formDataMainSettings[FormInputNameToMainSettings.hasCourtesy])
      ) {
        const amountCourtesy = +formDataMainSettings[FormInputNameToMainSettings.amountCourtesy];
        if (amountCourtesy <= 0) {
          setErrorsMainSettings({
            [FormInputNameToMainSettings.amountCourtesy]: ['O valor deve ser maior que 0'],
          });
          return;
        }
      }

      if (isFormValid) {
        const payloadBatchs = batchList;

        // continue someone batchList is not array empty
        if (payloadBatchs.length === 0) {
          toast.warn('Adicione ao menos um lote para continuar');
          return;
        }

        const payload: any = {
          id: ticketStates.ticket?.id,
          eventSection: {
            id: formDataMainSettings[FormInputNameToMainSettings.eventSection],
          },
          name: formDataMainSettings[FormInputNameToMainSettings.name],
          hasHalfPrice: convertToBoolean(
            formDataMainSettings[FormInputNameToMainSettings.hasHalfPrice],
          ),
          percentageHalfPrice: +unmask(
            formDataMainSettings[FormInputNameToMainSettings.percentageHalfPrice],
          ),
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

        if (!payload.printer.id) {
          delete payload.printer;
        }

        if (!payload.id) {
          delete payload.id;
        }
        const response = await api.post(`/event/ticket/${params.id}/main-settings`, payload);

        if (response && isBntNext) {
          nextTab();
        }
        if (!isBntNext) {
          reloadTickets();
        }
        if (response) toast.success('Dados salvos com sucesso!');
        ticketStates.setTicket({ ...ticketStates.ticket, ...response.data });
        ticketStep.setTicketState({ ...ticketStates.ticket, ...response.data });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnAddBatch = async (): Promise<void> => {
    try {
      setState(States.loading);
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
          commission: +unmask(formDataBatchs[FormInputNameToBatch.commission]),
          amount: +formDataBatchs[FormInputNameToBatch.amount],
          unitValue: formDataBatchs[FormInputNameToBatch.unitValue],
          totalValue: formDataBatchs[FormInputNameToBatch.totalValue],
          imageUrl: formDataBatchs[FormInputNameToBatch.imageUrl],
        };

        // dont add batch if already exists
        const batchExists = batchList.find(
          (batch: { name: string }) => batch.name === payload.name,
        );

        if (!batchExists) {
          setBatchList([...batchList, payload]);
          onChangeFormInputBatchs(FormInputNameToBatch.name)('');
          resetFormBatchs();
          toast.success('Lote adicionado com sucesso!');
        } else {
          toast.error('Lote com o mesmo nome já existe');
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setTimeout(() => {
        setState(States.default);
      }, 500);
    }
  };

  const handleOnDeleteBatch = async (batchSelected: TicketBatch): Promise<void> => {
    try {
      // delete batch from list
      // eslint-disable-next-line no-shadow
      const newBatchList = batchList.filter(
        (batch: TicketBatch) => batch.name !== batchSelected?.name,
      );

      setBatchList(newBatchList);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnGetBatch = async (batchSelected: TicketBatch): Promise<void> => {
    try {
      setBatch(batchSelected);
      if (batchSelected.imageUrl) {
        // genetare string witch 10 random numbers
        const randomNumbers = (): string => {
          let result = '';
          const characters = '0123456789';
          const charactersLength = characters.length;
          for (let i = 0; i < 10; i += 1) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
        };

        setFormNameFiles({
          ...formNameFiles,
          [FormInputNameToBatch.imageUrl]: `${randomNumbers()}.JPEG`,
        });
      } else {
        setFormNameFiles({
          ...formNameFiles,
          [FormInputNameToBatch.imageUrl]: 'Nenhum arquivo selecionado',
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnEditBatch = async (batchSelected: TicketBatch): Promise<void> => {
    try {
      if (isFormValidBatchs()) {
        const newBatchList: any = batchList.map((batch: TicketBatch) => {
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
              commission: +unmask(formDataBatchs[FormInputNameToBatch.commission]),
              amount: +formDataBatchs[FormInputNameToBatch.amount],
              unitValue: formDataBatchs[FormInputNameToBatch.unitValue],
              totalValue: formDataBatchs[FormInputNameToBatch.totalValue],
              imageUrl: formDataBatchs[FormInputNameToBatch.imageUrl],
            };
          }

          return batch;
        });

        setBatchList(newBatchList);
        setBatch(undefined);
        setFormNameFiles({ ...formNameFiles, [FormInputNameToBatch.imageUrl]: '' });
        resetFormBatchs();
        toast.success('Lote editado com sucesso.');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditBatch = async (): Promise<void> => {
    try {
      setBatch(undefined);
      setFormNameFiles({ ...formNameFiles, [FormInputNameToBatch.imageUrl]: '' });
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
    isFormValid: isFormValidMainSettings,
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
    onSave: () => handleOnSaveMainSettings({ isBntNext: false }),
    onNextTab: () => handleOnSaveMainSettings({ isBntNext: true }),
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
    if (!visible) {
      setTimeout(() => {
        resetFormSector();
        setSector(undefined);
      }, 500);
    }
  }, [visible]);

  useEffect(() => {
    const { ticket } = ticketStates;
    if (!ticket) {
      resetFormMainSettings();
      resetFormBatchs();
      setBatch(undefined);
      setBatchList([]);
      setFormNameFiles({});
      onFirstTab();
    }
  }, [ticketStates.ticket]);

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
        String(batch?.startDate).split('T')[1].slice(0, 5) ?? '',
      );
      onChangeFormInputBatchs(FormInputNameToBatch.endTime)(
        String(batch?.endDate).split('T')[1].slice(0, 5) ?? '',
      );
      onChangeFormInputBatchs(FormInputNameToBatch.commission)(
        String(toPercentage(batch.commission)),
      );
      onChangeFormInputBatchs(FormInputNameToBatch.amount)(String(batch.amount));
      onChangeFormInputBatchs(FormInputNameToBatch.unitValue)(String(batch.unitValue));
      onChangeFormInputBatchs(FormInputNameToBatch.totalValue)(String(batch.totalValue));
      onChangeFormInputBatchs(FormInputNameToBatch.imageUrl)(String(batch.imageUrl ?? ''));
    }
  }, [batch]);

  useEffect(() => {
    const { ticket } = ticketStates;

    if (ticket) {
      onChangeFormInputMainSettings(FormInputNameToMainSettings.name)(ticket.name);
      onChangeFormInputMainSettings(FormInputNameToMainSettings.eventSection)(
        ticket.eventSection.id,
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.hasHalfPrice)(
        String(ticket.hasHalfPrice),
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.percentageHalfPrice)(
        toPercentage(ticket.percentageHalfPrice),
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.amountHalfPrice)(
        String(ticket.amountHalfPrice),
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.hasCourtesy)(
        String(ticket.hasCourtesy),
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.amountCourtesy)(
        String(ticket.amountCourtesy),
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.numberTickets)(
        String(ticket.numberTickets),
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.printLayoutBase64)(
        ticket.printLayoutBase64,
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.printImageBase64)(
        ticket.printImageBase64,
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.printer)(ticket?.printer?.id);
      onChangeFormInputMainSettings(FormInputNameToMainSettings.copies)(String(ticket.copies));
      onChangeFormInputMainSettings(FormInputNameToMainSettings.reprint)(String(ticket.reprint));
      onChangeFormInputMainSettings(FormInputNameToMainSettings.printBatchNumber)(
        String(ticket.printBatchNumber),
      );
      onChangeFormInputMainSettings(FormInputNameToMainSettings.observation)(ticket.observation);

      setBatchList(
        ticket.batchs.map((item): any => ({
          id: item.id,
          name: item.name,
          startDate: item.startDate,
          endDate: item.endDate,
          commission: item.commission,
          amount: item.amount,
          unitValue: validators.applyDecimalMask(String(item.unitValue)),
          totalValue: validators.applyDecimalMask(String(item.totalValue)),
          imageUrl: item.imageUrl,
        })),
      );
    }
  }, [ticketStates.ticket]);

  useEffect(() => {
    if (sector?.id) {
      onChangeFormInputSector(FormInputNameToSector.name)(
        sectorList.find(item => item.id === sector.id)?.name ?? '',
      );
    }
  }, [sector]);

  return (
    <SectorTicketMainSettingsContainer
      state={state}
      ticketStates={ticketStates}
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
