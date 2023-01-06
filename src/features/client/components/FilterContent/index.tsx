import React from 'react';
import { Form } from 'reactstrap';
import { Radio, InputText } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { updateMask as updateMaskCPF } from '@/helpers/masks/cpf';
import { updateMask as updateMaskPhone } from '@/helpers/masks/mobilePhone';

interface FilterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  filterSearch = 'filterSearch',
  inputSearch = 'inputSearch',
}

export const FilterContent: React.FC<FilterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
}) => {
  const optionFilter = [
    { label: 'Nome', value: 'name' },
    { label: 'CPF', value: 'cpf' },
    { label: 'Celular', value: 'cellPhone' },
    { label: 'E-mail', value: 'email' },
  ];

  const getPlaceHolder = (value: string): string => {
    let s = 'name';
    if (value === 'name') {
      s = 'Nome do cliente';
    } else if (value === 'cpf') {
      s = '000.000.000-00';
    } else if (value === 'cellPhone') {
      s = '(00) 0 0000-0000';
    } else if (value === 'email') {
      s = 'E-mail do cliente';
    }
    return s;
  };

  const getMask = (filter: string, value: string): string => {
    let s = value;
    if (filter === 'cpf') {
      s = updateMaskCPF(value);
    } else if (filter === 'cellPhone') {
      s = updateMaskPhone(value);
    }
    return s;
  };

  return (
    <div className="filter-modal-content">
      <Form noValidate={true} onSubmit={(e): void => e.preventDefault()}>
        <span className="filter-name">Filtrar por:</span>
        <Radio
          options={optionFilter}
          name="filterSearch"
          style={{ fontSize: '21px' }}
          value={formData[FormInputName.filterSearch]}
          onChange={e => {
            onChangeFormInput(FormInputName.filterSearch)(e.target.value);
            onChangeFormInput(FormInputName.inputSearch)('');
          }}
          error={formErrors.filterSearch && formErrors.filterSearch[0]}
        />
        {formData[FormInputName.filterSearch] && (
          <InputText
            name="inputSearch"
            label={
              optionFilter.find(values => formData[FormInputName.filterSearch] === values.value)
                ?.label ?? ''
            }
            placeholder={getPlaceHolder(formData[FormInputName.filterSearch])}
            maxLength={30}
            value={formData[FormInputName.inputSearch]}
            onChange={e =>
              onChangeFormInput(FormInputName.inputSearch)(
                getMask(formData[FormInputName.filterSearch], e.target.value),
              )
            }
            error={formErrors.inputSearch && formErrors.inputSearch[0]}
          />
        )}
      </Form>
    </div>
  );
};
