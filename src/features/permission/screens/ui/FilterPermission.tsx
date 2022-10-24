import { InputText, Radio } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import React from 'react';
import { Form } from 'reactstrap';
import { FormInputFilter } from '..';

interface StateProps {
  formData: FormData;
  formErrors: FormErrors;
}

interface DispatchProps {
  change: OnChangeFormInput;
}

type Props = StateProps & DispatchProps;

export const FilterPermission: React.FC<Props> = (props: Props) => {
  const optionFilter = [
    { label: 'Nome', value: 'name' },
    { label: 'Módulo', value: 'module' },
  ];

  return (
    <div className="filter-modal-content">
      <Form noValidate={true} onSubmit={(e): void => e.preventDefault()}>
        <span className="filter-name">Filtrar por:</span>
        <Radio
          options={optionFilter}
          name="filterSearch"
          style={{ fontSize: '21px' }}
          value={props.formData[FormInputFilter.filterSearch]}
          onChange={e => props.change(FormInputFilter.filterSearch)(e.target.value)}
          error={props.formErrors.filterSearch && props.formErrors.filterSearch[0]}
        />
        {props.formData[FormInputFilter.filterSearch] && (
          <InputText
            name="inputSearch"
            label={
              optionFilter.find(
                values => props.formData[FormInputFilter.filterSearch] === values.value,
              )?.label ?? ''
            }
            placeholder={
              props.formData[FormInputFilter.filterSearch] === 'name'
                ? 'Nome da permissão'
                : 'Módulo da permissão'
            }
            maxLength={30}
            value={props.formData[FormInputFilter.inputSearch]}
            onChange={e => props.change(FormInputFilter.inputSearch)(e.target.value)}
            error={props.formErrors.inputSearch && props.formErrors.inputSearch[0]}
          />
        )}
      </Form>
    </div>
  );
};
