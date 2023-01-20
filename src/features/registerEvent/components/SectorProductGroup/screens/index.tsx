/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import { AxiosError } from 'axios';
import api from '@/services/api';
import ProductSubgroup from '@/model/ProductSubgroup';
import ProductGroup from '@/model/ProductGroup';
import { TabSectorProductActionsProps } from '@/features/registerEvent/screens/SectorProduct/ui';
import EventGroupSubgroup from '@/model/EventGroupSubgroup';
import { useParams } from 'react-router-dom';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
// import validators from '@/helpers/validators';
import { DeleteContent } from '@/components/DeleteContent';
import { FormInputName, SectorProductGroupContainer } from './ui';
import { appendFormProps, formGroupProps, groupStateProps, requestProps } from '../types';
import { States } from '../../ContractorScreen/screens/ui';

type UrlParams = {
  id: string;
};

export interface NameFiles {
  [key: string]: string;
}

export const SectorProductGroupScreen: React.FC<
  Omit<TabSectorProductActionsProps, 'onFirstTab' | 'backTab'>
> = ({ nextTab, controllerEvent }): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});
  const [nameFilesSub, setNameFilesSub] = useState<NameFiles>({});
  const [subGroup, setSubGroup] = useState<any[]>([{ id: '', name: '', imageBase64: '' }]);
  const [group, setGroup] = useState<any>();
  const [groupOptions, setGroupOptions] = useState<ProductGroup[]>([]);
  const [subGroupOptions, setSubGroupOptions] = useState<ProductSubgroup[]>([]);

  const [listGroupSubGroup, setListGroupSubGroup] = useState<EventGroupSubgroup[]>([]);
  const [groupSubgroup, setGroupSubgroup] = useState<EventGroupSubgroup[]>([]);

  const confirmDelete = useConfirmDelete();
  const params = useParams<UrlParams>();

  // Configuração do formulário de grupo
  const {
    formData: formDataGroup,
    formErrors: formErrorsGroup,
    onChangeFormInput: onChangeFormInputGroup,
    setErrors: setErrorsGroup,
    resetForm,
  } = useForm({
    initialData: {
      id: '',
      name: '',
      imageBase64Group: '',
    },
    validators: {},
    formatters: {},
  });

  // OncChange do input de imagem do grupo
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
            setNameFiles({ ...nameFiles, [inputName]: file.name });
            onChangeFormInputGroup(inputName)('');
            onChangeFormInputGroup(inputName)(base64);
          }
        };
      } else {
        setErrorsGroup({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };
  // FIM Configuração do formulário de grupo

  // Configuração do formulário de subgrupo

  // onChange do select de subGrupo
  const handleChangeAppendSubGroup = (
    inputName: string,
    index: number,
    value: string | undefined,
  ): void => {
    const newFormValues = [...subGroup] as any;
    newFormValues[index][inputName] = value;
    setSubGroup(newFormValues);
  };

  const addAppendSubGroup = (): void => {
    setSubGroup([...subGroup, { id: '', name: '', imageBase64: '' }]);
  };

  const removeAppendSubGroup = (index: number): void => {
    const values = [...subGroup];
    values.splice(index, 1);
    setSubGroup(values);
  };

  // onChange do input de imagem do subgrupo
  const handleChangeAppendFileInput =
    (inputName: string, index: number) =>
    (file: File | undefined): void => {
      if (file && file.type.match(/image\/(jpg|jpeg|png)/)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result?.toString();
          if (base64) {
            setNameFilesSub({ ...nameFilesSub, [inputName]: file.name });
            const newFormValues = [...subGroup] as any;
            newFormValues[index][inputName] = base64;
            setSubGroup([
              ...subGroup.slice(0, index),
              {
                id: newFormValues[index].id,
                name: newFormValues[index].name,
                imageBase64: base64,
              },
              ...subGroup.slice(index + 1),
            ]);
          }
        };
      } else {
        setErrorsGroup({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };

  // Reseta o input de imagem do subgrupo
  const handleResetAppendFileInput = (inputName: string, index: number): void => {
    const newFormValues = [...subGroup] as any;
    newFormValues[index][inputName] = '';
    setSubGroup([
      ...subGroup.slice(0, index),
      {
        id: newFormValues[index].id,
        name: newFormValues[index].name,
        imageBase64: '',
      },
      ...subGroup.slice(index + 1),
    ]);
    setNameFilesSub({ ...nameFilesSub, [inputName]: '' });
  };

  // FIM Configuração do formulário de subgrupo

  // GET com dados para montar a tabela da página
  const handleGetGroupSubgroupList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<EventGroupSubgroup[]>(`/event/section-product/${id}/group`);

      if (data || []) {
        setListGroupSubGroup(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  // Payload para envio de cadastro/edição de grupo
  const handleOnSaveGroup = async (): Promise<void> => {
    try {
      const validation =
        !(formDataGroup[FormInputName.name] === '' && formDataGroup[FormInputName.id] === '') ||
        formDataGroup[FormInputName.id] !== '';

      if (validation) {
        const dataSubgGroup = subGroup.map(sub => ({
          id: sub?.id,
          name: sub.name,
          categoryGroup: {
            id: formDataGroup[FormInputName.id],
            name: formDataGroup[FormInputName.name],
            imageBase64: formDataGroup[FormInputName.imageBase64Group],
          },
          imageBase64: sub?.imageBase64,
        }));

        const payload = {
          id: formDataGroup[FormInputName.id] || undefined,
          name: formDataGroup[FormInputName.name],
          imageBase64: formDataGroup[FormInputName.imageBase64Group],
          subGroups: dataSubgGroup,
        };

        // cenário de criação
        if (payload.id === '') {
          delete payload.id;
        }

        // condição para remover o subgrupo caso o campo esteja vazio
        payload.subGroups = payload.subGroups.filter(sub => sub.name !== '');

        // Condição para remover o id do subgrupo caso seja um novo subgrupo
        payload.subGroups.forEach(sub => {
          if (sub.id === '') {
            delete sub.id;
          }
        });

        if (payload.subGroups.length === 0) {
          toast.error('É necessário cadastrar pelo menos um subgrupo');
          return;
        }

        const response = await api.post(`/event/section-product/${params.id}/group`, payload);
        if (response) toast.success('Dados salvos com sucesso!');
        setGroupSubgroup(response.data);
        handleOnCancelEditGroup();
      } else {
        setErrorsGroup({
          [FormInputName.id]: ['Campo obrigatório'],
        });
      }
    } catch (error) {
      const err = error as AxiosError | any;
      if (err.response.data.details) {
        toast.error(
          `${err.response?.data.message} o item "${err.response?.data.details}" está vinculado ao evento`,
        );
      }
    }
  };

  // Busca por grupos de produtos cadastrados na sidebar
  const handleFecthProductGroupList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ProductGroup[]>('/category-group/find');
      setGroupOptions(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  // Busca por um grupo de produtos específico
  const handleOnGetGroup = async (groupSelected: any): Promise<void> => {
    try {
      if (groupSelected) {
        setGroup(groupSelected);
        setSubGroup(
          groupSelected.subGroups.map((sub: any) => ({
            id: sub.id,
            name: sub.name,
            imageBase64: sub.imageBase64,
          })),
        );
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  // Deleta um grupo de produtos
  const handleOnConfirmDeleteGroup = async (groupSelected: string): Promise<void> => {
    try {
      await api.delete(`/event/section-product/${params?.id}/group/${groupSelected}`);
      toast.success('Produto excluído com sucesso!');
      handleGetGroupSubgroupList(params.id);
    } catch (error) {
      const err = error as AxiosError | any;
      throw new Error(err.response?.data.message);
    } finally {
      confirmDelete.hide();
    }
  };

  // Abre o modal de confirmação de exclusão de grupo
  const handleOnShowDeleteProduct = (groupSelected: any): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteGroup(groupSelected),
        },
      ],
    });
  };

  // Busca por subgrupos de produtos cadastrados na sidebar
  const handleFecthProductSubGroupList = async (dataSubgGroup: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ProductSubgroup[]>(
        `/category-subgroup/find/group/${dataSubgGroup}`,
      );
      setSubGroupOptions(data ?? []);
    } finally {
      setState(States.default);
    }
  };

  const handleOnCancelEditGroup = (): void => {
    try {
      setGroup(undefined);
      resetForm();
      setNameFiles({});
      setSubGroup([{ id: '', name: '', imageBase64: '' }]);
      setNameFilesSub({});
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  // avança para o próximo passo do cadastro
  const handleNextTab = async (): Promise<void> => {
    if (listGroupSubGroup.length > 0) {
      nextTab();
    } else {
      toast.error('É necessário cadastrar pelo menos um grupo');
    }
  };

  // Controller do formulário de grupos com useForm
  const controllerFormGroup: formGroupProps = {
    onChangeFormInputGroup,
    onChangeFileInput: handleOnChangeFileInput,
    setErrorsGroup,
    formDataGroup,
    formErrorsGroup,
    nameFiles,
  };

  // Controller do formulário de subgrupos sem useForm
  const controllerAppendForm: appendFormProps = {
    addSubGroup: addAppendSubGroup,
    removeSubGroup: removeAppendSubGroup,
    onChangeSubGroup: handleChangeAppendSubGroup,
    onChangeAppendFileInput: handleChangeAppendFileInput,
    onResetAppendFileInput: handleResetAppendFileInput,
    nameFilesSub,
  };

  // Controller dos estados da pagina
  const controllerGroupState: groupStateProps = {
    groupOptions,
    subGroupOptions,
    subGroup,
    listGroupSubGroup,
    groupsState: group,
  };

  // Constroller das requisições
  const controllerRequest: requestProps = {
    onSaveGroup: handleOnSaveGroup,
    onGetProductSubGroupList: handleFecthProductSubGroupList,
    onGetGroup: handleOnGetGroup,
    onCancelEdit: handleOnCancelEditGroup,
    onGetGroupOption: controllerEvent.handleGetGroupList,
  };

  useEffect(() => {
    if (group) {
      const groupEdit = groupOptions.find((item: any) => item.id === group.id);
      if (groupEdit) {
        onChangeFormInputGroup(FormInputName.id)(group.id);
        onChangeFormInputGroup(FormInputName.name)(group.name);
        onChangeFormInputGroup(FormInputName.imageBase64Group)(group.imageBase64);

        setNameFiles(filesValues => ({
          ...filesValues,
          [FormInputName.imageBase64Group]: group?.imageBase64?.split('/').pop(),
        }));
        subGroup.map((item: any, index) => {
          setNameFilesSub(filesValues => ({
            ...filesValues,
            [`imageBase64SubGroup-${index}`]: item?.imageBase64?.split('/').pop(),
          }));
        });
      }
      handleFecthProductSubGroupList(group.id);
    }
  }, [group]);

  useEffect(() => {
    handleFecthProductGroupList();
    handleGetGroupSubgroupList(params.id);
  }, [groupSubgroup]);

  return (
    <SectorProductGroupContainer
      state={state}
      controllerAppendForm={controllerAppendForm}
      controllerFormGroup={controllerFormGroup}
      controllerRequest={controllerRequest}
      groupState={controllerGroupState}
      onNextTab={handleNextTab}
      onShowDeleteProduct={handleOnShowDeleteProduct}
    />
  );
};
