/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import {
  SectorTicketMainSettingsContainer,
  States,
} from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { NameFiles } from '@/features/registerEvent/types';
import { formMainSettingsProps } from '../types';

export const SectorTicketMainSettingsScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});

  const {
    formData: formDataMainSettings,
    formErrors: formErrorsMainSettings,
    onChangeFormInput: onChangeFormInputMainSettings,
    setErrors: setErrorsMainSettings,
  } = useForm({
    initialData: {
      sector: '',
      name: '',
      halfPrice: '',
      halfEntryPercentage: '',
      numbeHalfPrice: '',
      courtesy: 's',
    },
    validators: {
      name: [validators.required],
    },
    formatters: {},
  });

  // Change file input ---------------------------------------------------------
  const handleOnChangeFileInput =
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
  // Change file input ---------------------------------------------------------

  const controllerFormMainSettings: formMainSettingsProps = {
    formData: formDataMainSettings,
    formErrors: formErrorsMainSettings,
    onChangeFormInput: onChangeFormInputMainSettings,
    onChangeFormFileInput: handleOnChangeFileInput,
    formNameFiles,
  };

  return (
    <SectorTicketMainSettingsContainer
      state={state}
      formMainSettings={controllerFormMainSettings}
    />
  );
};
