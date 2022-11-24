import React, { useEffect, useState } from 'react';
import SectorProductGroup from '@/model/SectorProductGroup';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import { AxiosError } from 'axios';
import validators from '@/helpers/validators';
import api from '@/services/api';
import GroupProduct from '@/model/SubgruopProduct';
import ProductSubgroup from '@/model/ProductSubgroup';
import ProductGroup from '@/model/ProductGroup';
import { SectorProductGroupContainer } from './ui';
import { formGroupProps } from '../types';
import { States } from '../../ContractorScreen/screens/ui';

export const SectorProductGroupScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [subGroup, setSubGroup] = useState<GroupProduct[]>([{ id: '', name: '' }]);
  const [subGroupList, setSubGroupList] = useState<GroupProduct[]>([{ id: '', name: '' }]);
  const [listProductGroup, setListProductGroup] = useState<ProductGroup[]>([]);
  const [groupList, setGroupList] = useState<SectorProductGroup[]>([]);
  const [listProductSubGroup, setListProductSubGroup] = useState<ProductSubgroup[]>([]);

  const {
    formData: formDataGroup,
    formErrors: formErrorsGroup,
    onChangeFormInput: onChangeFormInputGroup,
    // isFormValid: isFormValidGroup,
  } = useForm({
    initialData: {
      name: '',
      image: '',
    },
    validators: {
      name: [validators.required],
      posGateway: [validators.required],
    },
    formatters: {},
  });

  const controllerFormGroup: formGroupProps = {
    onChangeFormInputGroup,
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

  // Será utilizado para adicionar um novo grupo na integracao com o backend
  // const resetForm = (): void => {
  //   setSubGroup([{ id: '', name: '' }]);
  //   setSubGroupList([{ id: '', name: '' }]);
  //   setGroupList([]);
  // };

  const handleAddGroup = async (): Promise<void> => {
    try {
      // Aqui será feito a integração com o backend
      // chamar a api para adicionar um novo grupo
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
      // resetForm();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

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

  useEffect(() => {
    handleFecthProductGroupList();
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
    />
  );
};
