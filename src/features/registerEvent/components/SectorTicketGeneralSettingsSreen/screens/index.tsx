/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  SectorTicketGeneralSettingsContainer,
  States,
} from '@/features/registerEvent/components/SectorTicketGeneralSettingsSreen/screens/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import { FormInputName as FormInputNameToGeneralSettings } from '@/features/registerEvent/components/SectorTicketGeneralSettingsSreen/components/SectorTicketGeneralSettingsContent';
import { useParams } from 'react-router-dom';
import {
  SectorTicketContainerProps,
  TabSectorTicketActionsProps,
} from '@/features/registerEvent/screens/SectorTicket/ui';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import { formGeneralSettingsProps, generalSettingsProps } from '../types';

type UrlParams = {
  id: string;
};

export const SectorTicketGeneralSettingsScreen: React.FC<
  Pick<SectorTicketContainerProps, 'ticketStates'> & TabSectorTicketActionsProps
> = ({ ticketStates, backTab, onFirstTab }): JSX.Element => {
  const [state] = useState<States>(States.default);

  const params = useParams<UrlParams>();

  const {
    formData: formDataGeneralSettings,
    formErrors: formErrorsGeneralSettings,
    onChangeFormInput: onChangeFormInputGeneralSettings,
    isFormValid: isFormValidGeneralSettings,
    resetForm: resetFormGeneralSettings,
  } = useForm({
    initialData: {
      sendTicketWhatsApp: '',
      codeType: '',
      printType: '',
      entranceGate: '',
      nameBeforePurchase: '',
      printNameTicket: '',
      requestCpf: '',
      printCpfTicket: '',
      validateCpf: '',
      purchaseLimitCpf: '',
    },
    validators: {
      sendTicketWhatsApp: [validators.required],
      codeType: [validators.required],
      printType: [validators.required],
      nameBeforePurchase: [validators.required],
      printNameTicket: [validators.required],
      requestCpf: [validators.required],
      printCpfTicket: [validators.required],
      validateCpf: [validators.required],
      purchaseLimitCpf: [validators.required, validators.between(1, 50)],
    },
    formatters: {},
  });

  const handleOnSaveGeneralSettings = async (): Promise<void> => {
    try {
      if (isFormValidGeneralSettings()) {
        const payload = {
          eventTickets: [
            {
              id: ticketStates.ticket?.id,
            },
          ],
          sendTicketWhatsApp: convertToBoolean(
            formDataGeneralSettings[FormInputNameToGeneralSettings.sendTicketWhatsApp],
          ),
          codeType: +formDataGeneralSettings[FormInputNameToGeneralSettings.codeType],
          printType: +formDataGeneralSettings[FormInputNameToGeneralSettings.printType],
          entranceGate: formDataGeneralSettings[FormInputNameToGeneralSettings.entranceGate],
          nameBeforePurchase: convertToBoolean(
            formDataGeneralSettings[FormInputNameToGeneralSettings.nameBeforePurchase],
          ),
          printNameTicket: convertToBoolean(
            formDataGeneralSettings[FormInputNameToGeneralSettings.printNameTicket],
          ),
          requestCpf: convertToBoolean(
            formDataGeneralSettings[FormInputNameToGeneralSettings.requestCpf],
          ),
          printCpfTicket: convertToBoolean(
            formDataGeneralSettings[FormInputNameToGeneralSettings.printCpfTicket],
          ),
          validateCpf: convertToBoolean(
            formDataGeneralSettings[FormInputNameToGeneralSettings.validateCpf],
          ),
          purchaseLimitCpf:
            +formDataGeneralSettings[FormInputNameToGeneralSettings.purchaseLimitCpf],
        };

        // if (!payload.id) {
        //   delete payload.id;
        // }
        const reponse = await api.post(`/event/ticket/${params.id}/general-settings`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleNextTab = async (): Promise<void> => {
    await handleOnSaveGeneralSettings();
    if (isFormValidGeneralSettings()) {
      onFirstTab();
    }
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const controllerFormGeneralSettings: formGeneralSettingsProps = {
    formData: formDataGeneralSettings,
    formErrors: formErrorsGeneralSettings,
    onChangeFormInput: onChangeFormInputGeneralSettings,
    isFormValid: isFormValidGeneralSettings,
  };

  const controllerGeneralSettingsActions: generalSettingsProps = {
    onSave: handleOnSaveGeneralSettings,
    onFirstTab,
    onReturnTap: handleBackTab,
    onNextTap: handleNextTab,
  };

  useEffect(() => {
    const { ticket } = ticketStates;

    onFirstTab();
    resetFormGeneralSettings();

    if (ticket?.generalSettings) {
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.sendTicketWhatsApp)(
        String(ticket.generalSettings.sendTicketWhatsApp),
      );
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.codeType)(
        String(ticket.generalSettings.codeType),
      );
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.printType)(
        String(ticket.generalSettings.printType),
      );
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.entranceGate)(
        String(ticket.generalSettings.entranceGate ?? ''),
      );
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.nameBeforePurchase)(
        String(ticket.generalSettings.nameBeforePurchase),
      );
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.printNameTicket)(
        String(ticket.generalSettings.printNameTicket),
      );
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.requestCpf)(
        String(ticket.generalSettings.requestCpf),
      );
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.printCpfTicket)(
        String(ticket.generalSettings.printCpfTicket),
      );
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.validateCpf)(
        String(ticket.generalSettings.validateCpf),
      );
      onChangeFormInputGeneralSettings(FormInputNameToGeneralSettings.purchaseLimitCpf)(
        String(ticket.generalSettings.purchaseLimitCpf ?? ''),
      );
    }
  }, [ticketStates.ticket]);

  return (
    <SectorTicketGeneralSettingsContainer
      state={state}
      formGeneralSettings={controllerFormGeneralSettings}
      generalSettingsActions={controllerGeneralSettingsActions}
    />
  );
};
