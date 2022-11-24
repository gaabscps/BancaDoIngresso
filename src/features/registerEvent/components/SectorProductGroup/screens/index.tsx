import React, { useState } from 'react';
import SectorProductGroup from '@/model/SectorProductGroup';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import { AxiosError } from 'axios';
import validators from '@/helpers/validators';
import { SectorProductGroupContainer } from './ui';
import { formGroupProps } from '../types';

export const SectorProductGroupScreen: React.FC = (): JSX.Element => {
  const [group, setGroup] = useState<SectorProductGroup[]>([
    { id: '', name: '', subgroup: [{ id: '', name: '' }] },
  ]);
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
    const newFormValues = [...group] as any;
    newFormValues[index][inputName] = value;
    setGroup(newFormValues);
  };

  const addGroup = (index: string): void => {
    setGroup([...group, { id: index, name: '', subgroup: [{ id: '', name: '' }] }]);
  };

  const removeGroup = (index: number): void => {
    const values = [...group];
    values.splice(index, 1);
    setGroup(values);
  };

  const handleAddGroup = async (): Promise<void> => {
    try {
      if (formDataGroup.name === '') {
        toast.warn('Preencha todos os campos ou remova o subgrupo que contém campos vazios');
        return;
      }
      setGroupList(group);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  return (
    <SectorProductGroupContainer
      group={group}
      addGroup={addGroup}
      removeGroup={removeGroup}
      groupList={groupList}
      handleAddGroup={handleAddGroup}
      controllerFormGroup={controllerFormGroup}
      handleChangeGroup={handleChangeGroup}
    />
  );
};
