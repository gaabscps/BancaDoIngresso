import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ActionProps } from '@/components/Dialog';
import validators from '@/helpers/validators';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useDialog } from '@/hooks/useDialog';
import useForm from '@/hooks/useForm';
import Page from '@/model/Page';
import api, { AxiosError } from '@/services/api';
import Module from '@/model/Module';
import Permission from '@/model/Permission';
import Menu from '@/model/Menu';
import SubMenu from '@/model/SubMenu';
import { DeleteContent } from '../components/DeleteContent';
import { ListSubMenu } from './ui/ListSubMenu';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  submenu = 'submenu',
}

// eslint-disable-next-line no-shadow
export enum FormInputFilter {
  filterSearch = 'filterSearch',
  inputSearch = 'inputSearch',
}

// eslint-disable-next-line no-shadow
export enum FormInputSubMenu {
  name = 'name',
  menu = 'menu',
  module = 'module',
  permission = 'permission',
  icon = 'icon',
  link = 'link',
  position = 'position',
  actived = 'actived',
}

export const SubMenuScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState(States.default);
  const [shouldShowModal, setShouldShowModal] = useState({} as ShouldShowModal);
  const [subMenu, setSubMenu] = useState({} as SubMenu);
  const [subMenus, setSubMenus] = useState({} as Page<SubMenu, SubMenu>);
  const [menus, setMenus] = useState([] as Menu[]);
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
    formData: formDataSubMenu,
    formErrors: formErrorsSubMenu,
    onChangeFormInput: onChangeFormInputSubMenu,
    isFormValid: isFormValidSubMenu,
    resetForm: resetFormSubMenu,
  } = useForm({
    initialData: {
      name: '',
      menu: '',
      module: '',
      permission: '',
      icon: '',
      link: '',
      position: '',
    },
    validators: {
      name: [validators.required],
      menu: [validators.required],
      module: [validators.required],
      permission: [validators.required],
      link: [validators.required],
      position: [validators.required],
    },
  });

  const onActivateAndInactivate = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setState(States.loading);
    onChangeFormInputSubMenu(FormInputSubMenu.actived)(String(e.target.checked));
    subMenus.list?.forEach(data => {
      if (data.id === subMenu.id) {
        // eslint-disable-next-line no-param-reassign
        data.actived = e.target.checked;
      }
    });

    if (e.target.checked) {
      await api.patch<SubMenu>(`/sub-menu/activate/${subMenu.id}`);
      toast.success(`SubMenu "${formDataSubMenu[FormInputSubMenu.name]}" ativado com sucesso!`);
    } else {
      await api.patch<SubMenu>(`/sub-menu/inactivate/${subMenu.id}`);
      toast.success(`SubMenu "${formDataSubMenu[FormInputSubMenu.name]}" inativado com sucesso!`);
    }
    setState(States.default);
  };

  const getSubMenus = async (page: number): Promise<void> => {
    setState(States.loading);
    try {
      const payload: Page<SubMenu, SubMenu> = {
        page,
        pageSize: 10,
        sort: 'position',
        order: 'ASC',
      };

      if (subMenus && subMenus.page) {
        payload.pageSize = subMenus.pageSize;
        payload.entity = subMenus.entity;
        payload.sort = subMenus.sort;
        payload.order = subMenus.order;
      }
      if (
        formDataFilter[FormInputFilter.filterSearch] === 'name' &&
        formDataFilter[FormInputFilter.inputSearch]
      ) {
        if (!payload.entity) {
          payload.entity = {} as SubMenu;
        }
        payload.entity.name = formDataFilter[FormInputFilter.inputSearch];
      } else {
        payload.entity = undefined as unknown as SubMenu;
      }

      const response = await api.post<Page<SubMenu, SubMenu>>('/sub-menu/page', payload);
      setSubMenus(response.data);
      setState(States.default);
    } catch (error) {
      setState(States.default);
    }
  };

  const getMenuAndModules = async (): Promise<void> => {
    try {
      setState(States.loading);
      const responseMenu = await api.get<Menu[]>('/menu/find');
      const responseModule = await api.get<Module[]>('/module/find');
      setMenus(responseMenu.data);
      setModules(responseModule.data);
      setState(States.default);
    } catch (erro) {
      setState(States.default);
    }
  };

  const save = async (): Promise<void> => {
    try {
      if (isFormValidSubMenu()) {
        setState(States.loading);
        const payload = {
          id: subMenu?.id,
          name: formDataSubMenu[FormInputSubMenu.name],
          menu: { id: formDataSubMenu[FormInputSubMenu.menu] } as Menu,
          module: { id: formDataSubMenu[FormInputSubMenu.module] } as Module,
          permission: { id: formDataSubMenu[FormInputSubMenu.permission] } as Permission,
          icon: formDataSubMenu[FormInputSubMenu.icon],
          link: formDataSubMenu[FormInputSubMenu.link],
          position: Number(formDataSubMenu[FormInputSubMenu.position]),
        } as SubMenu;
        if (!payload.id) {
          await api.post<SubMenu>('/sub-menu', payload);
          toast.success(
            `SubMenu "${formDataSubMenu[FormInputSubMenu.name]}" cadastrado com sucesso!`,
          );
        } else {
          await api.put<SubMenu>('/sub-menu', payload);
          toast.success(
            `SubMenu "${formDataSubMenu[FormInputSubMenu.name]}" atualizado com sucesso!`,
          );
        }
        setState(States.default);
        resetFormSubMenu();
        onToggle();
        getSubMenus(1);
      }
    } catch (error) {
      setState(States.default);
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onFilter = async (): Promise<void> => {
    if (isFormValidFilter()) {
      await getSubMenus(1);
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
    SubMenuSelected: SubMenu,
  ): Promise<void> => {
    onChangeTitle(modalTitle);
    setShouldShowModal(value);
    if (value === ShouldShowModal.submenu) {
      await getMenuAndModules();
      if (SubMenuSelected) {
        setSubMenu(SubMenuSelected);
      } else {
        setSubMenu(undefined as unknown as SubMenu);
        resetFormSubMenu();
      }
    }
    onToggle();
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const onConfirmDelete = async (SubMenuSelected: SubMenu): Promise<void> => {
    try {
      await api.delete(`/sub-menu/${SubMenuSelected.id}`);
      toast.success('SubMenu excluído com sucesso!');
      handleOnClose();
      getSubMenus(1);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const onShowDelete = (SubMenuSelected: SubMenu): void => {
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
          onClick: (): Promise<void> => onConfirmDelete(SubMenuSelected),
        },
      ],
    });
  };

  const paginationChange = (pageNumber: number): void => {
    const page = {
      ...subMenus,
      page: pageNumber,
    };
    setSubMenus(page);
    getSubMenus(pageNumber);
  };

  useEffect(() => {
    if (subMenu?.id) {
      onChangeFormInputSubMenu(FormInputSubMenu.name)(subMenu.name);
      onChangeFormInputSubMenu(FormInputSubMenu.menu)(subMenu.menu.id);
      onChangeFormInputSubMenu(FormInputSubMenu.module)(subMenu.module.id);
      onChangeFormInputSubMenu(FormInputSubMenu.permission)(subMenu.permission.id);
      onChangeFormInputSubMenu(FormInputSubMenu.icon)(subMenu.icon);
      onChangeFormInputSubMenu(FormInputSubMenu.link)(subMenu.link);
      onChangeFormInputSubMenu(FormInputSubMenu.position)(String(subMenu.position));
      onChangeFormInputSubMenu(FormInputSubMenu.actived)(String(subMenu.actived));
    }
  }, [subMenu]);

  useEffect(() => {
    getSubMenus(1);
  }, []);

  return (
    <ListSubMenu
      state={state}
      modalTitle={title}
      visible={visible}
      shouldShowModal={shouldShowModal}
      renderActionDialogToClearFilter={renderActionDialogToClearFilter}
      renderModalActionProps={renderActionDialogToCancel}
      subMenu={subMenu}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      formDataSubMenu={formDataSubMenu}
      formErrorsSubMenu={formErrorsSubMenu}
      showActivateSwitch={!!(subMenu && subMenu.id)}
      menus={menus}
      modules={modules}
      title="SubMenus"
      subMenus={subMenus}
      onToggle={onToggle}
      onFilter={onFilter}
      save={save}
      changeFormInputFilter={onChangeFormInputFilter}
      changeFormInputSubMenu={onChangeFormInputSubMenu}
      onActivateAndInactivate={onActivateAndInactivate}
      openModal={openModal}
      showDelete={onShowDelete}
      paginationChange={paginationChange}
    />
  );
};
