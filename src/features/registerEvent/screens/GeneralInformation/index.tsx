/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  GeneralInformationContainer,
  ShouldShowModal,
  States,
} from '@/features/registerEvent/screens/GeneralInformation/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useDialog } from '@/hooks/useDialog';
import { FormInputName as FormInputNameToSaveCategory } from '@/features/registerEvent/component/RegisterCategoryContent';
import { FormInputName as FormInputNameToSaveFatherEvent } from '@/features/registerEvent/component/RegisterFatherEvent';
import { FormInputName as FormInputNameToSaveGeneralInformation } from '@/features/registerEvent/component/GeneralInformationContent';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';
import EventCategory from '@/model/EventCategory';
import Contractor from '@/model/Contractor';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import {
  categoryStatesProps,
  fatherEventStatesProps,
  formCategoryProps,
  formFatherEventProps,
  modalConfigProps,
  NameFiles,
  onShouldShowModalProps,
  contractorStatesProps,
} from '../../types';
import { useEvent } from '../../hook/useEvent';

export const GeneralInformationScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.category);

  const [category, setCategory] = useState<EventCategory>();
  const [categoryList, setCategoryList] = useState<EventCategory[]>([]);

  const [fatherEvent, setFatherEvent] = useState<any>();
  const [fatherEventList, setFatherEventList] = useState<any[]>([]);

  const [contractorList, setContractorList] = useState<Contractor[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const { eventState, onChange: onChangeEvent } = useEvent();

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormCategory();
        setCategory(undefined);
      }, 500);
    }
  }, [visible]);

  const {
    formData: formDataGeneralInformation,
    formErrors: formErrorsGeneralInformation,
    onChangeFormInput: onChangeFormInputGeneralInformation,
    isFormValid: isFormValidGeneralInformation,
    setErrors: setErrorsGeneralInformation,
  } = useForm({
    initialData: {
      name: '',
      namePos: '',
      establishmentName: '',
      eventPlace: '',
      zipCode: updateMaskCEP(''),
      state: '',
      city: '',
      district: '',
      street: '',
      complement: '',
      number: '',
      eventType: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      eventCategory: '',
      contractor: '',
      censure: '',
      facebookUrl: '',
      instagramUrl: '',
      imageBase64: '',
      imagePosBase64: '',
      publishWebsite: '',
      textSize: '',
      ticketPhrase: '',
      websiteDescription: '',
    },
    validators: {
      name: [validators.required],
      namePos: [validators.required],
      establishmentName: [validators.required],
      eventPlace: [validators.required],
      zipCode: [validators.required],
      state: [validators.required],
      city: [validators.required],
      district: [validators.required],
      street: [validators.required],
      number: [validators.required],
      eventType: [validators.required],
      startDate: [validators.required],
      endDate: [validators.required],
      startTime: [validators.required],
      endTime: [validators.required],
      eventCategory: [validators.required],
      censure: [validators.required],
      publishWebsite: [validators.required],
      textSize: [validators.required],
      contractor: [validators.required],
    },
    formatters: {
      zipCode: updateMaskCEP,
    },
  });

  const {
    formData: formDataCategory,
    formErrors: formErrorsCategory,
    onChangeFormInput: onChangeFormInputCategory,
    isFormValid: isFormValidCategory,
    resetForm: resetFormCategory,
  } = useForm({
    initialData: {
      name: '',
    },
    validators: {
      name: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataFatherEvent,
    formErrors: formErrorsFatherEvent,
    onChangeFormInput: onChangeFormInputFatherEvent,
    isFormValid: isFormValidFatherEvent,
    // resetForm: resetFormFatherEvent,
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

  const controllerFormCategory: formCategoryProps = {
    formData: formDataCategory,
    formErrors: formErrorsCategory,
    onChangeFormInput: onChangeFormInputCategory,
  };

  const controllerFormFatherEvent: formFatherEventProps = {
    formData: formDataFatherEvent,
    formErrors: formErrorsFatherEvent,
    onChangeFormInput: onChangeFormInputFatherEvent,
  };

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    category: categorySelected,
  }: onShouldShowModalProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (categorySelected?.id && value === ShouldShowModal.category) {
      setCategory(categorySelected);
    }
    // if (comboSelected?.id && value === ShouldShowModal.combo) {
    //   setCombo(comboSelected);
    //   if (comboSelected.id !== combo?.id) {
    //     handleFecthComboGroupList();
    //     handleFecthComboSubGroupList(comboSelected.categorySubGroup.categoryGroup.id);
    //   }
    // }
    // if (!comboSelected?.id && value === ShouldShowModal.combo) {
    //   handleFecthComboGroupList();
    // }
  };

  const controllerModalConfig: modalConfigProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
  };

  const handleFecthContractorList = async (): Promise<void> => {
    try {
      // setState(States.loading);
      const { data } = await api.get<Contractor[]>(`/contractor/find`);
      setContractorList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      // setState(States.default);
    }
  };

  const handleFecthCategoryList = async (): Promise<void> => {
    try {
      // setState(States.loading);
      const { data } = await api.get<any[]>(`/event-category/find`);
      setCategoryList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      // setState(States.default);
    }
  };

  const handleFecthFatherEventList = async (): Promise<void> => {
    try {
      // setState(States.loading);
      const { data } = await api.get<any[]>(`/event/find`);
      setFatherEventList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      // setState(States.default);
    }
  };

  const controllerContractorState: contractorStatesProps = {
    contractorList,
    setContractorList,
  };

  const controllerCategoryState: categoryStatesProps = {
    category,
    setCategory,
    categoryList,
    setCategoryList,
  };

  const controllerFatherEventState: fatherEventStatesProps = {
    fatherEvent,
    setFatherEvent,
    fatherEventList,
    setFatherEventList,
  };

  const handleOnSaveCategory = async (): Promise<void> => {
    try {
      if (isFormValidCategory()) {
        const payload: any = {
          id: category,
          name: formDataCategory[FormInputNameToSaveCategory.name],
          description: 'Campo não existe',
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<any>('/event-category', payload);
          toast.success('Categoria cadastrado com sucesso!');
        } else {
          await api.put<any>('/event-category', payload);
          toast.success('Categoria atualizada com sucesso!');
        }

        onToggle();
        handleFecthCategoryList();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnSaveGeneralInformation = async (): Promise<void> => {
    try {
      console.log(
        'Submit Informações Gerais :>> ',
        isFormValidGeneralInformation(),
        formErrorsGeneralInformation,
        formDataGeneralInformation,
      );
      if (isFormValidGeneralInformation()) {
        const payload: any = {
          // id: '',
          fatherEvent:
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.eventType] === '2'
              ? fatherEvent
              : '',
          name: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.name],
          posName: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.namePos],
          establishmentName:
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.establishmentName],
          eventType: +formDataGeneralInformation[FormInputNameToSaveGeneralInformation.eventType],
          address: {
            // id: 'string',
            zipCode: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.zipCode],
            state: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.state],
            city: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.city],
            district: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.district],
            street: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.street],
            complement:
              formDataGeneralInformation[FormInputNameToSaveGeneralInformation.complement],
            number: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.number],
            latitude:
              parseFloat(
                formDataGeneralInformation[FormInputNameToSaveGeneralInformation.latitude],
              ) || 0.0,
            longitude:
              parseFloat(
                formDataGeneralInformation[FormInputNameToSaveGeneralInformation.longitude],
              ) || 0.0,
          },
          startDate: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.startDate],
          endDate: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.endDate],
          eventCategory: {
            id: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.eventCategory],
          },
          contractor: {
            id: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.contractor],
          },
          censure: +formDataGeneralInformation[FormInputNameToSaveGeneralInformation.censure],
          facebookUrl:
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.facebookUrl],
          instagramUrl:
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.instagramUrl],
          imageBase64:
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.imageBase64],
          imagePosBase64:
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.imagePosBase64],
          publishWebsite: convertToBoolean(
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.publishWebsite],
          ),
          textSize: +formDataGeneralInformation[FormInputNameToSaveGeneralInformation.textSize],
          ticketPhrase:
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.ticketPhrase],
          websiteDescription:
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.websiteDescription],
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<any>('/event/general-information', payload);
          // toast.success('Categoria cadastrado com sucesso!');
        } else {
          await api.put<any>('/event/general-information', payload);
          // toast.success('Categoria atualizada com sucesso!');
        }

        onToggle();
        onChangeEvent({ ...eventState, currentStep: eventState.currentStep + 1 });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnSaveFatherEvent = async (): Promise<void> => {
    try {
      if (isFormValidFatherEvent()) {
        setFatherEvent(formDataFatherEvent[FormInputNameToSaveFatherEvent.name]);

        onToggle();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const controllerGeneralInformationActions = {
    onSave: handleOnSaveGeneralInformation,
  };

  const controllerCategoryActions = {
    onSave: handleOnSaveCategory,
  };

  const controllerFatherEventActions = {
    onSave: handleOnSaveFatherEvent,
  };

  useEffect(() => {
    handleFecthCategoryList();
    handleFecthFatherEventList();
    handleFecthContractorList();
  }, []);

  useEffect(() => {
    if (category?.id) {
      onChangeFormInputCategory(FormInputNameToSaveCategory.name)(
        categoryList.find(item => item.id === category.id)?.name ?? '',
      );
    }
  }, [category]);

  return (
    <GeneralInformationContainer
      state={state}
      formGeneralInformation={controllerFormGeneralInformation}
      formCategory={controllerFormCategory}
      formFatherEvent={controllerFormFatherEvent}
      modalConfig={controllerModalConfig}
      GeneralInformationActions={controllerGeneralInformationActions}
      categoryStates={controllerCategoryState}
      categoryActions={controllerCategoryActions}
      fatherEventStates={controllerFatherEventState}
      fatherEventActions={controllerFatherEventActions}
      contractorState={controllerContractorState}
    />
  );
};
