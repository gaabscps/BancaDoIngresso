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
import {
  formConfigSectorProps,
  configSectorActions,
  modalConfigSectorSettingsProps,
  onShouldShowModalSectorSettingsProps,
  sectorStatesProps,
} from '../types';

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

  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );

  const [sector, setSector] = useState<Section>();
  const [sectorList, setSectorList] = useState<Section[]>([]);

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
    validators: {},
    formatters: {},
  });

  const handleOnSaveConfigSector = async (): Promise<void> => {
    try {
      if (isFormValidConfigSector()) {
        // TODO: Remove mock
        const payload = {
          section: {
            id: 'b6ea5435-7738-4251-b11a-81ac40f3b14f',
          },
          products: [
            {
              id: '95e4cfdd-1388-41fa-b5d5-fecdead2dea9',
            },
          ],
          combos: [
            {
              id: 'd3df424d-bd4f-4ba5-99b1-476af1c0b89f',
            },
          ],
        };

        const reponse = await api.post(`/event/section-product/${params.id}/section`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');
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
  };

  useEffect(() => {
    handleFecthSectorList();
  }, []);

  return (
    <SectorProductConfigSectorContainer
      state={state}
      formConfigSector={controllerFormConfigSector}
      configSectorStates={controllerSectorStates}
      configSectorActions={controllerConfigSectorActions}
      modalConfig={controllerModalConfig}
    />
  );
};
