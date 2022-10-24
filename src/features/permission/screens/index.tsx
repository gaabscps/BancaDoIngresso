import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ActionProps } from '@/components/Dialog';
import validators from '@/helpers/validators';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useDialog } from '@/hooks/useDialog';
import useForm from '@/hooks/useForm';
import Page from '@/model/Page';
import Permission from '@/model/Permission';
import api, { AxiosError } from '@/services/api';
import Module from '@/model/Module';
import { DeleteContent } from '../components/DeleteContent';
import { ListPermission } from './ui/ListPermission';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  permission = 'permission',
}

// eslint-disable-next-line no-shadow
export enum FormInputFilter {
  filterSearch = 'filterSearch',
  inputSearch = 'inputSearch',
}

// eslint-disable-next-line no-shadow
export enum FormInputPermission {
  name = 'name',
  description = 'description',
  module = 'module',
  identifier = 'identifier',
}

export const PermissionScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState(States.default);
  const [shouldShowModal, setShouldShowModal] = useState({} as ShouldShowModal);
  const [permission, setPermission] = useState({} as Permission);
  const [permissions, setPermissions] = useState({} as Page<Permission, Permission>);
  const [modules, setModules] = useState([] as Module[]);
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
    formData: formDataPermission,
    formErrors: formErrorsPermission,
    onChangeFormInput: onChangeFormInputPermission,
    isFormValid: isFormValidPermission,
    resetForm: resetFormPermission,
  } = useForm({
    initialData: {
      name: '',
      description: '',
      module: '',
      identifier: '',
    },
    validators: {
      name: [validators.required],
      description: [validators.required],
      module: [validators.required],
      identifier: [validators.required],
    },
  });

  const getPermissions = async (page: number): Promise<void> => {
    setState(States.loading);
    try {
      const payload: Page<Permission, Permission> = {
        page,
        pageSize: 10,
        sort: 'name',
        order: 'ASC',
      };
      if (permissions && permissions.page) {
        payload.pageSize = permissions.pageSize;
        payload.entity = permissions.entity;
        payload.sort = permissions.sort;
        payload.order = permissions.order;
      }
      if (
        formDataFilter[FormInputFilter.filterSearch] === 'name' &&
        formDataFilter[FormInputFilter.inputSearch]
      ) {
        if (!payload.entity) {
          payload.entity = {} as Permission;
        }
        payload.entity.name = formDataFilter[FormInputFilter.inputSearch];
      } else if (
        formDataFilter[FormInputFilter.filterSearch] === 'module' &&
        formDataFilter[FormInputFilter.inputSearch]
      ) {
        if (!payload.entity) {
          payload.entity = {} as Permission;
        }
        if (!payload.entity.module) {
          payload.entity.module = {} as Module;
        }
        payload.entity.module.name = formDataFilter[FormInputFilter.inputSearch];
      } else {
        payload.entity = undefined as unknown as Permission;
      }

      const response = await api.post<Page<Permission, Permission>>('/permission/page', payload);
      setPermissions(response.data);
      setState(States.default);
    } catch (error) {
      setState(States.default);
    }
  };

  const getModules = async (): Promise<void> => {
    try {
      setState(States.loading);
      const response = await api.get<Module[]>('/module/find');
      setModules(response.data);
      setState(States.default);
    } catch (erro) {
      setState(States.default);
    }
  };

  const save = async (): Promise<void> => {
    try {
      if (isFormValidPermission()) {
        setState(States.loading);
        const payload = {
          id: permission?.id,
          name: formDataPermission[FormInputPermission.name],
          description: formDataPermission[FormInputPermission.description],
          module: { id: formDataPermission[FormInputPermission.module] } as Module,
          identifier: formDataPermission[FormInputPermission.identifier],
        } as Permission;

        if (!payload.id) {
          await api.post<Permission>('/permission', payload);
          toast.success(
            `Permissão "${formDataPermission[FormInputPermission.name]}" cadastrada com sucesso!`,
          );
        } else {
          await api.put<Permission>('/permission', payload);
          toast.success(
            `Permissão "${formDataPermission[FormInputPermission.name]}" atualizada com sucesso!`,
          );
        }
        setState(States.default);
        resetFormPermission();
        onToggle();
        getPermissions(1);
      }
    } catch (error) {
      setState(States.default);
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onFilter = async (): Promise<void> => {
    if (isFormValidFilter()) {
      await getPermissions(1);
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
    permissionSelected: Permission,
  ): Promise<void> => {
    onChangeTitle(modalTitle);
    setShouldShowModal(value);
    if (value === ShouldShowModal.permission) {
      await getModules();
      if (permissionSelected) {
        setPermission(permissionSelected);
      } else {
        setPermission(undefined as unknown as Permission);
        resetFormPermission();
      }
    }
    onToggle();
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const onConfirmDelete = async (permissionSelected: Permission): Promise<void> => {
    try {
      await api.delete(`/permission/${permissionSelected.id}`);
      toast.success('Permissão excluída com sucesso!');
      handleOnClose();
      getPermissions(1);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onShowDelete = (permissionSelected: Permission): void => {
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
          onClick: (): Promise<void> => onConfirmDelete(permissionSelected),
        },
      ],
    });
  };

  const paginationChange = (pageNumber: number): void => {
    const page = {
      ...permissions,
      page: pageNumber,
    };
    setPermissions(page);
    getPermissions(pageNumber);
  };

  useEffect(() => {
    if (permission?.id) {
      onChangeFormInputPermission(FormInputPermission.name)(permission.name);
      onChangeFormInputPermission(FormInputPermission.description)(permission.description);
      onChangeFormInputPermission(FormInputPermission.module)(permission.module.id);
      onChangeFormInputPermission(FormInputPermission.identifier)(permission.identifier);
    }
  }, [permission]);

  useEffect(() => {
    getPermissions(1);
  }, []);

  return (
    <ListPermission
      state={state}
      modalTitle={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      renderActionDialogToClearFilter={renderActionDialogToClearFilter}
      renderModalActionProps={renderActionDialogToCancel}
      permission={permission}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      formDataPermission={formDataPermission}
      formErrorsPermission={formErrorsPermission}
      modules={modules}
      title="Permissões"
      permissions={permissions}
      onToggle={onToggle}
      onFilter={onFilter}
      save={save}
      changeFormInputFilter={onChangeFormInputFilter}
      changeFormInputPermission={onChangeFormInputPermission}
      openModal={openModal}
      showDelete={onShowDelete}
      paginationChange={paginationChange}
    />
  );
};
