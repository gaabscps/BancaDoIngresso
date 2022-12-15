import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import { TabSectorProductActionsProps } from '@/features/registerEvent/screens/SectorProduct/ui';
import {
  SectorProductConfigSectorContainer,
  States,
  ShouldShowModal,
} from '@/features/registerEvent/components/SectorProductConfigSectorSreen/screens/ui';
import { useParams } from 'react-router-dom';
import { useDialog } from '@/hooks/useDialog';
import { DeleteContent } from '@/components/DeleteContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import Section from '@/model/Section';
import { FormInputName as FormInputNameConfigSector } from '@/features/registerEvent/components/SectorProductConfigSectorSreen/components/SectorTicketConfigSectorContent';
import {
  formConfigSectorProps,
  configSectorActions,
  modalConfigSectorSettingsProps,
  onShouldShowModalSectorSettingsProps,
  sectorStatesProps,
  dataConfigStatesProps,
} from '../types';
import validators from '@/helpers/validators';

export interface NameFiles {
  [key: string]: string;
}

type UrlParams = {
  id: string;
};

export const SectorProductConfigSectorScreen: React.FC<
  Omit<TabSectorProductActionsProps, 'onFirstTab'>
> = ({ backTab, nextTab }): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});
  const [form, setForm] = useState<any>({});

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );

  const [sector, setSector] = useState<Section>();
  const [sectorList, setSectorList] = useState<Section[]>([]);
  const [sectorTableList, setSectorTableList] = useState<Section[]>([]);

  const [configList, setConfigList] = useState<Section[]>([]);

  const [sectorDropdown, setSectorDropdown] = useState<Section[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const params = useParams<UrlParams>();

  const {
    formData: formDataConfigSector,
    formErrors: formErrorsConfigSector,
    onChangeFormInput: onChangeFormInputConfigSector,
    isFormValid: isFormValidConfigSector,
    setErrors: setErrorsConfigSector,
    resetForm: resetFormConfigSector,
  } = useForm({
    initialData: {
      section: '',
      imageBase64Sector: '',
    },
    validators: {
      section: [validators.required],
    },
  });

  const handleGetProducComboConfigtList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/section-product/${id}/product/section`);

      setConfigList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetSectorList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`/event/section-product/${id}/section`);

      setSectorTableList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnSaveConfigSector = async (): Promise<void> => {
    try {
      if (isFormValidConfigSector()) {
        const productChecked = form.products?.map((value: any) => {
          const productId = value.split('_')[2];
          return {
            id: productId,
          };
        });

        const combosChecked = form.combos?.map((value: any) => {
          const comboId = value.split('_')[2];
          return {
            id: comboId,
          };
        });

        const payload = {
          section: {
            id: formDataConfigSector[FormInputNameConfigSector.section],
          },
          products: productChecked || [],
          combos: combosChecked || [],
        };

        const reponse = await api.post(`/event/section-product/${params.id}/section`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');

        handleGetSectorList(params.id);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

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
            onChangeFormInputConfigSector(inputName)('');
            onChangeFormInputConfigSector(inputName)(base64);
          }
        };
      } else {
        setErrorsConfigSector({
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

      setSectorDropdown(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleNextTab = async (): Promise<void> => {
    await handleOnSaveConfigSector();
    // if (isFormValidConfigSector()) {
    nextTab();
    // }
  };

  const handleBackTab = (): void => {
    backTab();
  };

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    sector: sectorSelected,
  }: onShouldShowModalSectorSettingsProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();
    console.log('sectorSelected :>> ', sectorSelected);
    if (sectorSelected?.id && value === ShouldShowModal.configProduct) {
      setSector(sectorSelected);
    }
  };

  const handleOnShowDeleteProduct = (sectorSelected: any): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => confirmDelete.hide(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): void => {
            console.log('TODO: Add function exclud item :>> ', sectorSelected);
          },
        },
      ],
    });
  };

  const handleOnGetSector = async (productSelected: any): Promise<void> => {
    try {
      if (productSelected) {
        setSector(productSelected);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditSector = (): void => {
    try {
      setSector(undefined);
      resetFormConfigSector();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const controllerModalConfig: modalConfigSectorSettingsProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
    onShowModalDelete: handleOnShowDeleteProduct,
  };

  // modal config ------------------------------------------------------------

  const controllerDataConfig: dataConfigStatesProps = {
    form,
    setForm,
    configList,
  };

  const controllerFormConfigSector: formConfigSectorProps = {
    formData: formDataConfigSector,
    formErrors: formErrorsConfigSector,
    onChangeFormInput: onChangeFormInputConfigSector,
    isFormValid: isFormValidConfigSector,
    onChangeFormFileInput: handleOnChangeFileInput,
    formNameFiles,
  };

  const controllerConfigSectorActions: configSectorActions = {
    onGetAllSector: handleFecthSectorList,
    onGet: handleOnGetSector,
    onCancelEdit: handleOnCancelEditSector,
    onSave: handleOnSaveConfigSector,
    onReturnTab: handleBackTab,
    onNextTab: handleNextTab,
  };

  const controllerSectorStates: sectorStatesProps = {
    sector,
    setSector,
    sectorList,
    setSectorList,
    sectorDropdown,
    setSectorDropdown,
    sectorTableList,
  };

  useEffect(() => {
    handleFecthSectorList();
    handleGetProducComboConfigtList(params.id);
    handleGetSectorList(params.id);
  }, []);

  return (
    <SectorProductConfigSectorContainer
      state={state}
      formConfigSector={controllerFormConfigSector}
      configSectorStates={controllerSectorStates}
      configSectorActions={controllerConfigSectorActions}
      modalConfig={controllerModalConfig}
      dataConfig={controllerDataConfig}
    />
  );
};
