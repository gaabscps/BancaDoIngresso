import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
// import GroupProduct from '@/model/GroupProduct';

interface RegisterSubgroupContentProps {
  formSubgroup: {
    formData: FormData;
    formErrors: FormErrors;
    onChangeFormInput: OnChangeFormInput;
    resetForm: () => void;
  };
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
}

export const RegisterSubgroupContent: React.FC<RegisterSubgroupContentProps> = ({
  formSubgroup,
}) => {
  const { formData, formErrors, onChangeFormInput } = formSubgroup;
  return (
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
      }}
    >
      <Row>
        <Col md={8}>
          <FormGroup>
            <InputText
              name="name"
              label="Nome do Subgrupo"
              placeholder="Digite o nome do subgrupo de produto"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
              error={formErrors.name && formErrors.name[0]}
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};
