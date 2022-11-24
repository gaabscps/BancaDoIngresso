import React, { useState } from 'react';
import SectorProductGroup from '@/model/SectorProductGroup';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import { AxiosError } from 'axios';
import validators from '@/helpers/validators';
import GroupProduct from '@/model/SubgruopProduct';
import { SectorProductGroupContainer } from './ui';
import { formGroupProps } from '../types';

export const SectorProductGroupScreen: React.FC = (): JSX.Element => {
  const [subGroup, setSubGroup] = useState<GroupProduct[]>([{ id: '', name: '' }]);
  const [subGroupList, setSubGroupList] = useState<GroupProduct[]>([{ id: '', name: '' }]);
  const [groupList, setGroupList] = useState<SectorProductGroup[]>([]);

  const {
    formData: formDataGroup,
    formErrors: formErrorsGroup,
    onChangeFormInput: onChangeFormInputGroup,
    // isFormValid: isFormValidMainSettings,
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

  const handleChangeGroup = (inputName: string, index: number, value: string): void => {
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
      if (formDataGroup.name === '') {
        toast.warn('Preencha todos os campos ou remova o subgrupo que contém campos vazios');
        return;
      }

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

  return (
    <SectorProductGroupContainer
      subGroup={subGroup}
      addGroup={addGroup}
      removeGroup={removeGroup}
      groupList={groupList}
      subGroupList={subGroupList}
      handleAddGroup={handleAddGroup}
      controllerFormGroup={controllerFormGroup}
      handleChangeGroup={handleChangeGroup}
    />
  );
};
