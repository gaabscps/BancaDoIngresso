import React from 'react';
import { Form } from 'reactstrap';
import { Radio, InputText } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';

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
  const optionFilter = [{ label: 'Nome', value: 'name' }];

  return (
    <div className="filter-modal-content">
      <Form noValidate={true} onSubmit={(e): void => e.preventDefault()}>
        <span className="filter-name">Filtrar por:</span>
        <Radio
          options={optionFilter}
          name="filterSearch"
          style={{ fontSize: '21px' }}
          value={formData[FormInputName.filterSearch]}
          onChange={e => onChangeFormInput(FormInputName.filterSearch)(e.target.value)}
          error={formErrors.filterSearch && formErrors.filterSearch[0]}
        />
        {formData[FormInputName.filterSearch] && (
          <InputText
            name="inputSearch"
            label={
              optionFilter.find(values => formData[FormInputName.filterSearch] === values.value)
                ?.label ?? ''
            }
            placeholder={formData[FormInputName.filterSearch] === 'name' ? 'Nome do evento' : ''}
            maxLength={30}
            value={formData[FormInputName.inputSearch]}
            onChange={e => onChangeFormInput(FormInputName.inputSearch)(e.target.value)}
            error={formErrors.inputSearch && formErrors.inputSearch[0]}
          />
        )}
      </Form>
    </div>
  );
};
