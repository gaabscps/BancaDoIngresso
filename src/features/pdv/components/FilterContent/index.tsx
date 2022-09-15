import React from 'react';
import { Form } from 'reactstrap';
import { Button, Radio, InputText } from '@/components';
import useForm from '@/hooks/useForm';

interface FilterContentProps {
  onSubmit: (value: any) => Promise<void>;
}

// eslint-disable-next-line no-shadow
enum FormInputName {
  filterSearch = 'filterSearch',
  inputSearch = 'inputSearch',
}

export const FilterContent: React.FC<FilterContentProps> = ({ onSubmit }) => {
  const optionFilter = [
    { label: 'Nome', value: 'name' },
    { label: 'Cidade', value: 'city' },
  ];
  const { formData, formErrors, onChangeFormInput, isFormValid } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
    validators: {},
    formatters: {},
  });

  const handleOnEdit = (): void => {
    if (isFormValid()) {
      let payload = {};

      switch (formData[FormInputName.filterSearch]) {
        case 'name':
          payload = {
            entity: {
              [formData[FormInputName.filterSearch]]: formData[FormInputName.inputSearch],
            },
          };
          break;
        case 'city':
          payload = {
            entity: {
              address: {
                [formData[FormInputName.filterSearch]]: formData[FormInputName.inputSearch],
              },
            },
          };
          break;
        default:
          payload = {};
          break;
      }
      onSubmit(payload);
    }
  };

  return (
    <div className="filter-modal-content ">
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
          handleOnEdit();
        }}
      >
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
            placeholder={
              formData[FormInputName.filterSearch] === 'name' ? 'Nome do PDV' : 'Nome da Cidade'
            }
            maxLength={30}
            value={formData[FormInputName.inputSearch]}
            onChange={e => onChangeFormInput(FormInputName.inputSearch)(e.target.value)}
            error={formErrors.inputSearch && formErrors.inputSearch[0]}
          />
        )}
        <div className="d-flex justify-content-end">
          <Button title="Salvar" onClick={handleOnEdit} />
        </div>
      </Form>
    </div>
  );
};
