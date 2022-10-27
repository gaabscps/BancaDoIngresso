import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';

interface RegisterGroupContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
}

export const RegisterGroupContent: React.FC<RegisterGroupContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
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
            label="Nome do grupo"
            placeholder="Digite o nome do grupo do produto"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);
