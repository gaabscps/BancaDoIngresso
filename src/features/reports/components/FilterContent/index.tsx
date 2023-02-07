import React from 'react';
import { Form } from 'reactstrap';
import { Radio, InputText, SelectCustom } from '@/components';
import { ControllerFormProps } from '../../types';

interface FilterContentProps {
  controllerFormFilter: ControllerFormProps;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  filterSearch = 'filterSearch',
  inputSearch = 'inputSearch',
  lastDate = 'lastDate',
}

export const FilterContent: React.FC<FilterContentProps> = ({ controllerFormFilter }) => {
  const { formDataFilter, formErrorsFilter, onChangeFormInputFilter, resetFormFilter } =
    controllerFormFilter;
  const optionFilter = [
    { label: 'Data', value: 'date' },
    { label: 'PDV', value: 'pdv' },
  ];

  const option = [
    { label: 'Bar do seu Zé', value: 'Bar do seu Zé' },
    { label: 'Aguardando', value: 'Aguardando' },
    { label: 'Em andamento', value: 'Em andamento' },
    { label: 'Finalizado', value: 'Finalizado' },
  ];

  return (
    <div className="filter-modal-content">
      <Form noValidate={true} onSubmit={(e): void => e.preventDefault()}>
        <span className="filter-name">Filtrar por:</span>
        <Radio
          options={optionFilter}
          name="filterSearch"
          style={{ fontSize: '21px' }}
          value={formDataFilter[FormInputName.filterSearch]}
          onChange={e => {
            resetFormFilter();
            onChangeFormInputFilter(FormInputName.filterSearch)(e.target.value);
          }}
          error={formErrorsFilter.filterSearch && formErrorsFilter.filterSearch[0]}
        />

        {formDataFilter[FormInputName.filterSearch] === 'date' ? (
          <>
            <InputText
              type={formDataFilter[FormInputName.filterSearch] === 'date' ? 'date' : 'text'}
              name="inputSearch"
              label={
                optionFilter.find(
                  values => formDataFilter[FormInputName.filterSearch] === values.value,
                )?.label ?? ''
              }
              placeholder={
                formDataFilter[FormInputName.filterSearch] === 'date' ? 'Data início' : 'PDV'
              }
              maxLength={30}
              value={formDataFilter[FormInputName.inputSearch]}
              onChange={e => onChangeFormInputFilter(FormInputName.inputSearch)(e.target.value)}
              error={formErrorsFilter.inputSearch && formErrorsFilter.inputSearch[0]}
            />
            <InputText
              type={formDataFilter[FormInputName.filterSearch] === 'date' ? 'date' : 'text'}
              name="filterSearch"
              label="Data fim"
              placeholder={
                formDataFilter[FormInputName.filterSearch] === 'date' ? 'Data Fim' : 'PDV'
              }
              maxLength={30}
              value={formDataFilter[FormInputName.lastDate]}
              onChange={e => onChangeFormInputFilter(FormInputName.lastDate)(e.target.value)}
              error={formErrorsFilter.lastDate && formErrorsFilter.lastDate[0]}
            />
          </>
        ) : (
          <SelectCustom
            name="inputSearch"
            value={formDataFilter[FormInputName.inputSearch]}
            options={option}
            onChange={e => onChangeFormInputFilter(FormInputName.inputSearch)(e?.value as string)}
            error={formErrorsFilter.inputSearch && formErrorsFilter.inputSearch[0]}
          />
        )}
      </Form>
    </div>
  );
};
