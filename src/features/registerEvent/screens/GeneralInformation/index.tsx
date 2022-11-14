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
import { FormInputName as FormInputNameToSaveCategory } from '@/features/registerEvent/components/RegisterCategoryContent';
import { FormInputName as FormInputNameToSaveFatherEvent } from '@/features/registerEvent/components/RegisterFatherEvent';
import { FormInputName as FormInputNameToSaveGeneralInformation } from '@/features/registerEvent/components/GeneralInformationContent';
import { updateMask as updateMaskCEP } from '@/helpers/masks/cep';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';
import EventCategory from '@/model/EventCategory';
import Contractor from '@/model/Contractor';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
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

type UrlParams = {
  id: string;
};

export const GeneralInformationScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const history = useHistory();
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.category);

  const [category, setCategory] = useState<EventCategory>();
  const [categoryList, setCategoryList] = useState<EventCategory[]>([]);

  const [fatherEvent, setFatherEvent] = useState<any>();
  const [fatherEventList, setFatherEventList] = useState<any[]>([]);

  const [contractorList, setContractorList] = useState<Contractor[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const { eventState, onChange: onChangeEvent } = useEvent();
  const params = useParams<UrlParams>();

  const [dataCurrentStep, setDataCurrentStep] = useState<any>({});

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
    setFormErrors: setFormErrorsGeneralInformation,
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
      zipCode: [validators.required, validators.cep],
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

  // Config Modal --------------------------------------------------------------
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
  // Change file input ---------------------------------------------------------

  // Controller Forms ----------------------------------------------------------
  const controllerFormGeneralInformation = {
    formData: formDataGeneralInformation,
    formErrors: formErrorsGeneralInformation,
    onChangeFormInput: onChangeFormInputGeneralInformation,
    setFormErrors: setFormErrorsGeneralInformation,
    onChangeFormFileInput: handleOnChangeFileInput,
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
  // Controller Forms ----------------------------------------------------------

  // Controller States ----------------------------------------------------------
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
  // Controller States ----------------------------------------------------------

  // Fetch Data -----------------------------------------------------------------
  const handleGetEvetById = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<any[]>(`/event/general-information/${id}`);
      setDataCurrentStep(data);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFecthContractorList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Contractor[]>(`/contractor/find`);
      setContractorList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFecthCategoryList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<any[]>(`/event-category/find`);
      setCategoryList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFecthFatherEventList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<any[]>(`/event/find`);
      // filter father event when event type is father
      const fatherEventListFiltered = data.filter(
        fatherEventValue => fatherEventValue.eventType === 1,
      );
      setFatherEventList(fatherEventListFiltered ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
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
      const childrenType =
        formDataGeneralInformation[FormInputNameToSaveGeneralInformation.eventType] === '2';

      if (isFormValidGeneralInformation()) {
        if (childrenType && !fatherEvent) {
          setFormErrorsGeneralInformation({
            [FormInputNameToSaveGeneralInformation.eventType]: [
              'É necessário vincular o evento pai',
            ],
          });
          return;
        }

        const payloadStartData = dayjs(
          `${formDataGeneralInformation[FormInputNameToSaveGeneralInformation.startDate]}T${
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.startTime]
          }`,
        ).format('YYYY-MM-DDTHH:mm');

        const payloadEndData = dayjs(
          `${formDataGeneralInformation[FormInputNameToSaveGeneralInformation.endDate]}T${
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.endTime]
          }`,
        ).format('YYYY-MM-DDTHH:mm');

        const payload: any = {
          id: dataCurrentStep?.id,
          fatherEvent: childrenType ? fatherEvent : '',
          name: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.name],
          posName: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.namePos],
          establishmentName:
            formDataGeneralInformation[FormInputNameToSaveGeneralInformation.establishmentName],
          eventPlace: formDataGeneralInformation[FormInputNameToSaveGeneralInformation.eventPlace],
          eventType: +formDataGeneralInformation[FormInputNameToSaveGeneralInformation.eventType],
          address: {
            id: dataCurrentStep.address?.id,
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
          startDate: payloadStartData,
          endDate: payloadEndData,
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
          delete payload.address.id;
        }
        const { data } = await api.post<any>('/event/general-information', payload);

        onToggle();
        onChangeEvent({ ...eventState, currentStep: eventState.currentStep + 1 });
        history.push(`/dashboard/event/edit/${data.id}`);
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
        setFormErrorsGeneralInformation({
          [FormInputNameToSaveGeneralInformation.eventType]: [''],
        });
        onToggle();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };
  // Fetch Data -----------------------------------------------------------------

  // Controllers Actions --------------------------------------------------------
  const controllerGeneralInformationActions = {
    onSave: handleOnSaveGeneralInformation,
  };

  const controllerCategoryActions = {
    onSave: handleOnSaveCategory,
  };

  const controllerFatherEventActions = {
    onSave: handleOnSaveFatherEvent,
  };

  const controllerContractorActions = {
    onGetList: handleFecthContractorList,
  };
  // Controllers Actions --------------------------------------------------------

  // Execute Actions ------------------------------------------------------------
  useEffect(() => {
    handleFecthCategoryList();
    handleFecthFatherEventList();
    handleFecthContractorList();
  }, []);

  useEffect(() => {
    if (params.id) {
      handleGetEvetById(params.id);
    }
  }, [params]);
  // Execute Actions ------------------------------------------------------------

  useEffect(() => {
    if (dataCurrentStep?.id) {
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.name)(
        dataCurrentStep?.name ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.namePos)(
        dataCurrentStep?.posName ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.establishmentName)(
        dataCurrentStep?.establishmentName ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.eventPlace)(
        dataCurrentStep?.eventPlace ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.eventType)(
        String(dataCurrentStep?.eventType) ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.zipCode)(
        dataCurrentStep?.address?.zipCode ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.state)(
        dataCurrentStep?.address?.state ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.city)(
        dataCurrentStep?.address?.city ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.district)(
        dataCurrentStep?.address?.district ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.street)(
        dataCurrentStep?.address?.street ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.complement)(
        dataCurrentStep?.address?.complement ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.number)(
        dataCurrentStep?.address?.number ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.latitude)(
        dataCurrentStep?.address?.latitude ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.longitude)(
        dataCurrentStep?.address?.longitude ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.startDate)(
        dayjs(dataCurrentStep?.startDate).format('YYYY-MM-DD') ?? '',
      );

      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.endDate)(
        dayjs(dataCurrentStep?.endDate).format('YYYY-MM-DD') ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.startTime)(
        dataCurrentStep?.startDate.split('T')[1].slice(0, 5) ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.endTime)(
        dataCurrentStep?.endDate.split('T')[1].slice(0, 5) ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.eventCategory)(
        dataCurrentStep?.eventCategory?.id ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.contractor)(
        dataCurrentStep?.contractor?.id ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.censure)(
        String(dataCurrentStep?.censure) ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.facebookUrl)(
        dataCurrentStep?.facebookUrl ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.instagramUrl)(
        dataCurrentStep?.instagramUrl ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.publishWebsite)(
        String(dataCurrentStep.publishWebsite),
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.textSize)(
        String(dataCurrentStep?.textSize) ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.ticketPhrase)(
        dataCurrentStep?.ticketPhrase ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.websiteDescription)(
        String(dataCurrentStep?.websiteDescription) ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.imageBase64)(
        dataCurrentStep?.imageBase64 ?? '',
      );
      onChangeFormInputGeneralInformation(FormInputNameToSaveGeneralInformation.imagePosBase64)(
        dataCurrentStep?.imagePosBase64 ?? '',
      );
      setFormNameFiles(filesValues => ({
        ...filesValues,
        imageBase64: dataCurrentStep?.imageBase64?.split('/').pop(),
        imagePosBase64: dataCurrentStep?.imagePosBase64?.split('/').pop(),
      }));
      setFatherEvent(dataCurrentStep?.fatherEvent ?? '');
    }
  }, [dataCurrentStep]);

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
      contractorActions={controllerContractorActions}
    />
  );
};
