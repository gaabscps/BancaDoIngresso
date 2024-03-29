/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import validators from '@/helpers/validators';
import {
  formConfigSectorProps,
  configSectorActions,
  modalConfigSectorSettingsProps,
  onShouldShowModalSectorSettingsProps,
  sectorStatesProps,
  dataConfigStatesProps,
} from '../types';

export interface NameFiles {
  [key: string]: string;
}

type UrlParams = {
  id: string;
};

export const SectorProductConfigSectorScreen: React.FC<
  Omit<TabSectorProductActionsProps, 'onFirstTab'>
> = ({ backTab, nextTab, controllerEvent }): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [formNameFiles, setFormNameFiles] = useState<NameFiles>({});
  const [form, setForm] = useState<any>({});

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );

  const [sector, setSector] = useState<any>();
  // const [sectorConfig, setSectorConfig] = useState([]);
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

  const handleOnCancelEditSector = (): void => {
    try {
      setSector(undefined);
      setFormNameFiles({});
      resetFormConfigSector();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

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

  const handleOnConfirmDeleteSector = async (sectorSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(`/event/section-product/${params?.id}/section/${sectorSelected.sectionId}`);
      toast.success('Setor desviculado ao evento');
      handleGetSectorList(params.id);
    } catch (error) {
      const err = error as AxiosError | any;
      toast.error(`${err.response?.data.details}`);
    } finally {
      confirmDelete.hide();
      setState(States.default);
    }
  };

  const handleOnSaveConfigSector = async (): Promise<void> => {
    let productChecked;
    let combosChecked;
    if (form.products?.length > 0) {
      productChecked = form.products?.map((value: any) => {
        const productId = value.split('_')[2];
        return {
          id: productId,
        };
      });
    }
    if (form.combos?.length > 0) {
      combosChecked = form.combos?.map((value: any) => {
        const comboId = value.split('_')[2];
        return {
          id: comboId,
        };
      });
    }

    if (productChecked?.length > 0 || combosChecked?.length > 0) {
      try {
        setState(States.loading);

        const payloadSection = {
          id: formDataConfigSector[FormInputNameConfigSector.section],
          imageBase64: formDataConfigSector[FormInputNameConfigSector.imageBase64Sector],
        };

        const reponseSection = await api.post(
          `/event/section-product/${params.id}/section`,
          payloadSection,
        );

        const payloadSectionProducts = {
          section: reponseSection.data,
          products: productChecked || [],
          combos: combosChecked || [],
        };

        const reponseSectionProducts = await api.post(
          `/event/section-product/${params.id}/section/products`,
          payloadSectionProducts,
        );
        if (reponseSectionProducts) toast.success('Dados salvos com sucesso!');

        handleGetSectorList(params.id);
        handleOnCancelEditSector();
        onToggle();
      } catch (error) {
        const err = error as AxiosError | any;
        if (err.response?.data?.details.length > 0) {
          err.response?.data.details.forEach((error: any) => {
            toast.error(error);
          });
        } else {
          toast.error(err.response?.data.message);
        }
      } finally {
        setState(States.default);
      }
    } else {
      toast.error('Preencha os campos obrigatórios');
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
    nextTab();
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

    if (value === ShouldShowModal.configProduct) {
      if (sectorSelected) {
        setSector(sectorSelected);
      } else {
        setForm({});
      }
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
          onClick: (): Promise<void> => handleOnConfirmDeleteSector(sectorSelected),
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
    handleGetSectorList(params.id);
    handleGetProducComboConfigtList(params.id);
  }, []);

  useEffect(() => {
    if (!visible) {
      handleOnCancelEditSector();
    }
  }, [visible]);

  useEffect(() => {
    // verify if sector not array empty
    if (sector) {
      const _subgroup: any[] = [];
      const _products: any[] = [];
      const _combos: any[] = [];

      // push products by sectionGroup[].subGroups[].products[]
      sector.sectionGroup.map(({ categoryGroupId, categoryGroupName, subGroups }: any) => {
        subGroups.map((subgroup: any) => {
          _subgroup.push({ categoryGroupId, categoryGroupName, ...subgroup });
        });
      });

      _subgroup.map(({ products, combos, categoryGroupId, categorySubGroupId }: any) => {
        const newProducts = products.map(
          ({ id }: any) => `${categoryGroupId}_${categorySubGroupId}_${id}`,
        );
        const newCombos = combos.map(
          ({ id }: any) => `${categoryGroupId}_${categorySubGroupId}_${id}`,
        );

        _products.push(...newProducts);
        _combos.push(...newCombos);
      });

      setForm({
        products: _products,
        combos: _combos,
      });

      onChangeFormInputConfigSector(FormInputNameConfigSector.section)(sector.sectionId);
      onChangeFormInputConfigSector(FormInputNameConfigSector.imageBase64Sector)(
        sector.sectionImage,
      );
      setFormNameFiles(sector.imageBase64Sector);
      setFormNameFiles(filesValues => ({
        ...filesValues,
        [FormInputNameConfigSector.imageBase64Sector]: sector.sectionImage?.split('/').pop(),
      }));
      console.log(sector.sectionImage);
    }
  }, [sector]);

  return (
    <SectorProductConfigSectorContainer
      state={state}
      formConfigSector={controllerFormConfigSector}
      configSectorStates={controllerSectorStates}
      configSectorActions={controllerConfigSectorActions}
      modalConfig={controllerModalConfig}
      dataConfig={controllerDataConfig}
      controllerEvent={controllerEvent}
    />
  );
};
