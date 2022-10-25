import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ActionProps } from '@/components/Dialog';
import validators from '@/helpers/validators';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useDialog } from '@/hooks/useDialog';
import useForm from '@/hooks/useForm';
import Page from '@/model/Page';
import Menu from '@/model/Menu';
import api, { AxiosError } from '@/services/api';
import Module from '@/model/Module';
import Permission from '@/model/Permission';
import { DeleteContent } from '../components/DeleteContent';
import { ListMenu } from './ui/ListMenu';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  menu = 'menu',
}

// eslint-disable-next-line no-shadow
export enum FormInputFilter {
  filterSearch = 'filterSearch',
  inputSearch = 'inputSearch',
}

// eslint-disable-next-line no-shadow
export enum FormInputMenu {
  name = 'name',
  module = 'module',
  permission = 'permission',
  icon = 'icon',
  link = 'link',
  position = 'position',
  actived = 'actived',
}

export const MenuScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState(States.default);
  const [shouldShowModal, setShouldShowModal] = useState({} as ShouldShowModal);
  const [menu, setMenu] = useState({} as Menu);
  const [menus, setMenus] = useState({} as Page<Menu, Menu>);
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
    formData: formDataMenu,
    formErrors: formErrorsMenu,
    onChangeFormInput: onChangeFormInputMenu,
    isFormValid: isFormValidMenu,
    resetForm: resetFormMenu,
  } = useForm({
    initialData: {
      name: '',
      module: '',
      permission: '',
      icon: '',
      link: '',
      position: '',
    },
    validators: {
      name: [validators.required],
      module: [validators.required],
      permission: [validators.required],
      icon: [validators.required],
      position: [validators.required],
    },
  });

  const onActivateAndInactivate = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setState(States.loading);
    onChangeFormInputMenu(FormInputMenu.actived)(String(e.target.checked));
    menus.list?.forEach(data => {
      if (data.id === menu.id) {
        // eslint-disable-next-line no-param-reassign
        data.actived = e.target.checked;
      }
    });

    if (e.target.checked) {
      await api.patch<Menu>(`/menu/activate/${menu.id}`);
      toast.success(`Menu "${formDataMenu[FormInputMenu.name]}" ativado com sucesso!`);
    } else {
      await api.patch<Menu>(`/menu/inactivate/${menu.id}`);
      toast.success(`Menu "${formDataMenu[FormInputMenu.name]}" inativado com sucesso!`);
    }
    setState(States.default);
  };

  const getMenus = async (page: number): Promise<void> => {
    setState(States.loading);
    try {
      const payload: Page<Menu, Menu> = {
        page,
        pageSize: 10,
        sort: 'name',
        order: 'ASC',
      };
      if (menus && menus.page) {
        payload.pageSize = menus.pageSize;
        payload.entity = menus.entity;
        payload.sort = menus.sort;
        payload.order = menus.order;
      }
      if (
        formDataFilter[FormInputFilter.filterSearch] === 'name' &&
        formDataFilter[FormInputFilter.inputSearch]
      ) {
        if (!payload.entity) {
          payload.entity = {} as Menu;
        }
        payload.entity.name = formDataFilter[FormInputFilter.inputSearch];
      } else {
        payload.entity = undefined as unknown as Menu;
      }

      const response = await api.post<Page<Menu, Menu>>('/menu/page', payload);
      setMenus(response.data);
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
      if (isFormValidMenu()) {
        setState(States.loading);
        const payload = {
          id: menu?.id,
          name: formDataMenu[FormInputMenu.name],
          module: { id: formDataMenu[FormInputMenu.module] } as Module,
          permission: { id: formDataMenu[FormInputMenu.permission] } as Permission,
          icon: formDataMenu[FormInputMenu.icon],
          link: formDataMenu[FormInputMenu.link],
          position: Number(formDataMenu[FormInputMenu.position]),
        } as Menu;
        if (!payload.id) {
          await api.post<Menu>('/menu', payload);
          toast.success(`Menu "${formDataMenu[FormInputMenu.name]}" cadastrado com sucesso!`);
        } else {
          await api.put<Menu>('/menu', payload);
          toast.success(`Menu "${formDataMenu[FormInputMenu.name]}" atualizado com sucesso!`);
        }
        setState(States.default);
        resetFormMenu();
        onToggle();
        getMenus(1);
      }
    } catch (error) {
      setState(States.default);
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onFilter = async (): Promise<void> => {
    if (isFormValidFilter()) {
      await getMenus(1);
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
    menuSelected: Menu,
  ): Promise<void> => {
    onChangeTitle(modalTitle);
    setShouldShowModal(value);
    if (value === ShouldShowModal.menu) {
      await getModules();
      if (menuSelected) {
        setMenu(menuSelected);
      } else {
        setMenu(undefined as unknown as Menu);
        resetFormMenu();
      }
    }
    onToggle();
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const onConfirmDelete = async (menuSelected: Menu): Promise<void> => {
    try {
      await api.delete(`/menu/${menuSelected.id}`);
      toast.success('Menu excluído com sucesso!');
      handleOnClose();
      getMenus(1);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onShowDelete = (menuSelected: Menu): void => {
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
          onClick: (): Promise<void> => onConfirmDelete(menuSelected),
        },
      ],
    });
  };

  const paginationChange = (pageNumber: number): void => {
    const page = {
      ...menus,
      page: pageNumber,
    };
    setMenus(page);
    getMenus(pageNumber);
  };

  useEffect(() => {
    if (menu?.id) {
      onChangeFormInputMenu(FormInputMenu.name)(menu.name);
      onChangeFormInputMenu(FormInputMenu.module)(menu.module.id);
      onChangeFormInputMenu(FormInputMenu.permission)(menu.permission.id);
      onChangeFormInputMenu(FormInputMenu.icon)(menu.icon);
      onChangeFormInputMenu(FormInputMenu.link)(menu.link);
      onChangeFormInputMenu(FormInputMenu.position)(String(menu.position));
      onChangeFormInputMenu(FormInputMenu.actived)(String(menu.actived));
    }
  }, [menu]);

  useEffect(() => {
    getMenus(1);
  }, []);

  return (
    <ListMenu
      state={state}
      modalTitle={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      renderActionDialogToClearFilter={renderActionDialogToClearFilter}
      renderModalActionProps={renderActionDialogToCancel}
      menu={menu}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      formDataMenu={formDataMenu}
      formErrorsMenu={formErrorsMenu}
      showActivateSwitch={!!(menu && menu.id)}
      modules={modules}
      title="Menus"
      menus={menus}
      onToggle={onToggle}
      onFilter={onFilter}
      save={save}
      changeFormInputFilter={onChangeFormInputFilter}
      changeFormInputMenu={onChangeFormInputMenu}
      onActivateAndInactivate={onActivateAndInactivate}
      openModal={openModal}
      showDelete={onShowDelete}
      paginationChange={paginationChange}
    />
  );
};
