/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import {
  GeneralInformationContainer,
  States,
} from '@/features/registerEvent/screens/GeneralInformation/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { NameFiles } from '../../types';

export const GeneralInformationScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});

  const {
    formData: formDataGeneralInformation,
    formErrors: formErrorsGeneralInformation,
    onChangeFormInput: onChangeFormInputGeneralInformation,
    setErrors: setErrorsGeneralInformation,
  } = useForm({
    initialData: {
      name: '',
    },
    validators: {
      name: [validators.required],
    },
    formatters: {},
  });

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
            onChangeFormInputGeneralInformation(inputName)('');
            onChangeFormInputGeneralInformation(inputName)(base64);
          }
        };
      } else {
        setErrorsGeneralInformation({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };

  const controllerFormGeneralInformation = {
    formData: formDataGeneralInformation,
    formErrors: formErrorsGeneralInformation,
    onChangeFormInput: onChangeFormInputGeneralInformation,
    onChanfeFormFileInput: handleOnChangeFileInput,
    formNameFiles,
  };

  return (
    <GeneralInformationContainer
      state={state}
      formGeneralInformation={controllerFormGeneralInformation}
    />
  );
};
