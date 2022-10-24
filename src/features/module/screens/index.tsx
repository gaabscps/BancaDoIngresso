import { ActionProps } from '@/components/Dialog';
import validators from '@/helpers/validators';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useDialog } from '@/hooks/useDialog';
import useForm from '@/hooks/useForm';
import Module from '@/model/Module';
import Page from '@/model/Page';
import api, { AxiosError } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteContent } from '../components/DeleteContent';
import { ModuleList } from './ui/ListModule';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  module = 'module',
}

// eslint-disable-next-line no-shadow
export enum FormInputFilter {
  filterSearch = 'filterSearch',
  inputSearch = 'inputSearch',
}

// eslint-disable-next-line no-shadow
export enum FormInputModule {
  name = 'name',
  description = 'description',
}

export const ModuleScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState(States.default);
  const [shouldShowModal, setShouldShowModal] = useState({} as ShouldShowModal);
  const [module, setModule] = useState({} as Module);
  const [modules, setModules] = useState({} as Page<Module, Module>);
  const { visible, title, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    resetForm: resetFormFilter,
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

  const {
    formData: formDataModule,
    formErrors: formErrorsModule,
    onChangeFormInput: onChangeFormInputModule,
    isFormValid: isFormValidModule,
    resetForm: resetFormModule,
  } = useForm({
    initialData: {
      name: '',
      description: '',
    },
    validators: {
      name: [validators.required],
      description: [validators.required],
    },
  });

  const getModules = async (page: number): Promise<void> => {
    setState(States.loading);
    try {
      const payload: Page<Module, Module> = {
        page,
        pageSize: 10,
        sort: 'name',
        order: 'ASC',
      };
      if (modules && modules.page) {
        payload.pageSize = modules.pageSize;
        payload.entity = modules.entity;
        payload.sort = modules.sort;
        payload.order = modules.order;
      }
      if (
        formDataFilter[FormInputFilter.filterSearch] === 'name' &&
        formDataFilter[FormInputFilter.inputSearch]
      ) {
        if (!payload.entity) {
          payload.entity = {} as Module;
        }
        payload.entity.name = formDataFilter[FormInputFilter.inputSearch];
      } else {
        payload.entity = undefined as unknown as Module;
      }

      const response = await api.post<Page<Module, Module>>('/module/page', payload);
      setModules(response.data);
      setState(States.default);
      setState(States.default);
    } catch (error) {
      setState(States.default);
    }
  };

  const save = async (): Promise<void> => {
    try {
      if (isFormValidModule()) {
        setState(States.loading);
        const payload = {
          id: module?.id,
          name: formDataModule[FormInputModule.name],
          description: formDataModule[FormInputModule.description],
        } as Module;

        if (!payload.id) {
          await api.post<Module>('/module', payload);
          toast.success(`Módulo "${formDataModule[FormInputModule.name]}" cadastrado com sucesso!`);
        } else {
          await api.put<Module>('/module', payload);
          toast.success(`Módulo "${formDataModule[FormInputModule.name]}" atualizado com sucesso!`);
        }
        setState(States.default);
        resetFormModule();
        onToggle();
        getModules(1);
      }
    } catch (error) {
      setState(States.default);
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onFilter = async (): Promise<void> => {
    if (isFormValidFilter()) {
      await getModules(1);
      resetFormFilter();
      onToggle();
    }
  };

  const clearFilter = (): void => {
    resetFormFilter();
    formDataFilter[FormInputFilter.inputSearch] = '';
    onFilter();
  };

  const renderActionDialogToClearFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): void => {
      clearFilter();
    },
    theme: 'noneBorder',
  };

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

  const openModal = async (
    value: ShouldShowModal,
    modalTitle: string,
    moduleSelected: Module,
  ): Promise<void> => {
    onChangeTitle(modalTitle);
    setShouldShowModal(value);
    if (value === ShouldShowModal.module) {
      if (moduleSelected) {
        setModule(moduleSelected);
      } else {
        setModule(undefined as unknown as Module);
        resetFormModule();
      }
    }
    onToggle();
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const onConfirmDelete = async (moduleSelected: Module): Promise<void> => {
    try {
      await api.delete(`/module/${moduleSelected.id}`);
      toast.success('Módulo excluído com sucesso!');
      handleOnClose();
      getModules(1);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onShowDelete = (moduleSelected: Module): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => handleOnClose(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): Promise<void> => onConfirmDelete(moduleSelected),
        },
      ],
    });
  };

  const paginationChange = (pageNumber: number): void => {
    const page = {
      ...modules,
      page: pageNumber,
    };
    setModules(page);
    getModules(pageNumber);
  };

  useEffect(() => {
    if (module?.id) {
      onChangeFormInputModule(FormInputModule.name)(module.name);
      onChangeFormInputModule(FormInputModule.description)(module.description);
    }
  }, [module]);

  useEffect(() => {
    getModules(1);
  }, []);

  return (
    <ModuleList
      state={state}
      modalTitle={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      renderActionDialogToClearFilter={renderActionDialogToClearFilter}
      renderModalActionProps={renderActionDialogToCancel}
      module={module}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      formDataModule={formDataModule}
      formErrorsModule={formErrorsModule}
      title="Módulos"
      modules={modules}
      onToggle={onToggle}
      onFilter={onFilter}
      save={save}
      changeFormInputFilter={onChangeFormInputFilter}
      changeFormInputModule={onChangeFormInputModule}
      openModal={openModal}
      showDelete={onShowDelete}
      paginationChange={paginationChange}
    />
  );
};
