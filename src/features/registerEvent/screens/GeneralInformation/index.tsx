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
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@/services/api';
import EventCategory from '@/model/EventCategory';
import {
  categoryStatesProps,
  modalConfigProps,
  NameFiles,
  onShouldShowModalProps,
} from '../../types';

export const GeneralInformationScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.category);

  const [category, setCategory] = useState<EventCategory>();
  const [categoryList, setCategoryList] = useState<EventCategory[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();

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
    setErrors: setErrorsGeneralInformation,
  } = useForm({
    initialData: {
      name: '',
      namePos: '',
      establishmentName: '',
      eventPlace: '',
      state: '',
      city: '',
      expirationDate: '',
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
    },
    formatters: {},
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

  const controllerFormCategory = {
    formData: formDataCategory,
    formErrors: formErrorsCategory,
    onChangeFormInput: onChangeFormInputCategory,
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

  const controllerCategoryState: categoryStatesProps = {
    category,
    setCategory,
    categoryList,
    setCategoryList,
  };

  const handleOnSaveGroupProduct = async (): Promise<void> => {
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

  const controllerCategoryActions = {
    onSaveGroupProduct: handleOnSaveGroupProduct,
  };

  useEffect(() => {
    handleFecthCategoryList();
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
      modalConfig={controllerModalConfig}
      categoryStates={controllerCategoryState}
      categoryActions={controllerCategoryActions}
    />
  );
};
