import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import { AxiosError } from 'axios';
// import validators from '@/helpers/validators';
import api from '@/services/api';
import GroupProduct from '@/model/SubgruopProduct';
import ProductSubgroup from '@/model/ProductSubgroup';
import ProductGroup from '@/model/ProductGroup';
import { TabSectorProductActionsProps } from '@/features/registerEvent/screens/SectorProduct/ui';
import EventGroupSubgroup from '@/model/EventGroupSubgroup';
import { useParams } from 'react-router-dom';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
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
> = ({ nextTab }): JSX.Element => {
  const initialData = {};

  const [state, setState] = useState<States>(States.default);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});
  const [nameFilesSub, setNameFilesSub] = useState<NameFiles>(initialData);
  const [subGroup, setSubGroup] = useState<GroupProduct[]>([{ id: '', name: '', imageBase64: '' }]);
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
    isFormValid,
    resetForm,
  } = useForm({
    initialData: {
      categoryGroupName: '',
      imageBase64Group: '',
    },
    validators: {
      // categoryGroupName: [validators.required],
    },
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

  const addAppendSubGroup = (index: string): void => {
    setSubGroup([...subGroup, { id: index, name: '' }]);
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
      if (isFormValid()) {
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

        if (!payload.id) {
          // cenário de edição
          delete payload.id;
          const response = await api.post(`/event/section-product/${params.id}/group`, payload);
          if (response) toast.success('Dados salvos com sucesso!');
          setGroupSubgroup(response.data);
          resetForm();
        } else {
          // cenário de criação
          if (payload.subGroups.find(sub => sub.id === '')) {
            // remove o subgrupo sem ID (criação de um novo subgrupo)
            delete payload.subGroups.find(subd => subd.id === '')?.id;
          }
          const response = await api.post(`/event/section-product/${params.id}/group`, payload);
          if (response) toast.success('Dados salvos com sucesso!');
          setGroupSubgroup(response.data);
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
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

  // Deleta um grupo de produtos
  const handleOnConfirmDeleteTopProduct = async (groupSelected: string): Promise<void> => {
    try {
      await api.delete(`/event/section-product/${params?.id}/group/${groupSelected}`);
      toast.success('Produto excluído com sucesso!');
      handleGetGroupSubgroupList(params.id);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      confirmDelete.hide();
    }
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
  };

  // Constroller das requisições
  const controllerRequest: requestProps = {
    onSaveGroup: handleOnSaveGroup,
    onGetProductSubGroupList: handleFecthProductSubGroupList,
  };

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
      handleOnConfirmDeleteTopProduct={handleOnConfirmDeleteTopProduct}
    />
  );
};
