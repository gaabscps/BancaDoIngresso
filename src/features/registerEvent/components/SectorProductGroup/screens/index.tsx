import React, { useEffect, useState } from 'react';
import SectorProductGroup from '@/model/SectorProductGroup';
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
import { FormInputName, SectorProductGroupContainer } from './ui';
import { formGroupProps } from '../types';
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
  const [state, setState] = useState<States>(States.default);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});
  const [subGroup, setSubGroup] = useState<GroupProduct[]>([{ id: '', name: '' }]);
  const [subGroupList, setSubGroupList] = useState<GroupProduct[]>([{ id: '', name: '' }]);
  const [listProductGroup, setListProductGroup] = useState<ProductGroup[]>([]);
  const [groupList, setGroupList] = useState<SectorProductGroup[]>([]);
  const [listProductSubGroup, setListProductSubGroup] = useState<ProductSubgroup[]>([]);

  const [listGroupSubgroup, setListGroupSubgroup] = useState<EventGroupSubgroup[]>([]);

  const params = useParams<UrlParams>();

  const {
    formData: formDataGroup,
    formErrors: formErrorsGroup,
    onChangeFormInput: onChangeFormInputGroup,
    setErrors: setErrorsGroup,
    isFormValid,
  } = useForm({
    initialData: {
      categoryGroupName: '',
      image: '',
      productSubGroupName: '',
    },
    validators: {
      // categoryGroupName: [validators.required],
      // productSubGroupName: [validators.required],
    },
    formatters: {},
  });
  // OncChange do input de imagem
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

  const controllerFormGroup: formGroupProps = {
    onChangeFormInputGroup,
    handleOnChangeFileInput,
    formDataGroup,
    formErrorsGroup,
  };

  const handleChangeGroup = (inputName: string, index: number, value: string | undefined): void => {
    const newFormValues = [...subGroup] as any;
    newFormValues[index][inputName] = value;
    setSubGroup(newFormValues);
  };

  const addGroup = (index: string): void => {
    setSubGroup([...subGroup, { id: index, name: '' }]);
  };

  const removeGroup = (index: number): void => {
    const values = [...subGroup];
    values.splice(index, 1);
    setSubGroup(values);
  };

  // Monta a tabela da página
  const handleGetGroupSubgroupList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<EventGroupSubgroup[]>(
        `/event/section-product/${params.id}/group`,
      );

      if (data) {
        setListGroupSubgroup(data);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnSaveGroup = async (): Promise<void> => {
    try {
      if (isFormValid()) {
        const dataSubgGroup = subGroup.map(sub => ({
          productSubGroupName: sub?.name,
          image: sub.imageBase64,
        }));

        const payload = {
          categoryGroupName: formDataGroup[FormInputName.categoryGroupName],
          image: formDataGroup[FormInputName.imageBase64Group],
          subGroups: [dataSubgGroup],
        };
        const reponse = await api.post(`/event/event-section/${params.id}/group`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleAddGroup = async (): Promise<void> => {
    try {
      // Aqui será feito a integração com o backend
      // chamar a api para adicionar um novo grupo
      handleOnSaveGroup();
      setSubGroupList(subGroup);
      setGroupList([
        ...groupList,
        {
          id: '',
          name: formDataGroup.name,
          imageBase64: formDataGroup.image,
          subgroup: subGroup,
        },
      ]);
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
      setListProductGroup(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  // Busca por subgrupos de produtos cadastrados na sidebar
  const handleFecthProductSubGroupList = async (dataSubgGroup: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ProductSubgroup[]>(
        `/category-subgroup/find/group/${dataSubgGroup}`,
      );
      setListProductSubGroup(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleNextTab = async (): Promise<void> => {
    // if (isFormValidGroup()) {
    nextTab();
    // }
  };

  useEffect(() => {
    handleFecthProductGroupList();
    handleGetGroupSubgroupList();
  }, []);

  return (
    <SectorProductGroupContainer
      state={state}
      listProductSubGroup={listProductSubGroup}
      listProductGroup={listProductGroup}
      subGroup={subGroup}
      addGroup={addGroup}
      removeGroup={removeGroup}
      groupList={groupList}
      subGroupList={subGroupList}
      handleAddGroup={handleAddGroup}
      controllerFormGroup={controllerFormGroup}
      handleChangeGroup={handleChangeGroup}
      handleFecthProductSubGroupList={handleFecthProductSubGroupList}
      onNextTab={handleNextTab}
      listGroupSubgroup={listGroupSubgroup}
      nameFiles={nameFiles}
      handleOnSaveGroup={handleOnSaveGroup}
    />
  );
};
