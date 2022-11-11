import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText } from '@/components';
import { formCategoryProps } from '../../types';

interface RegisterCategoryContentProps {
  formCategory: formCategoryProps;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
}

export const RegisterCategoryContent: React.FC<RegisterCategoryContentProps> = ({
  formCategory,
}) => (
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
            label="Nome da categoria"
            placeholder="Digite o nome da categoria"
            value={formCategory.formData[FormInputName.name]}
            onChange={e => formCategory.onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formCategory.formErrors.name && formCategory.formErrors.name[0]}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);
