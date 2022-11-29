import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText } from '@/components';
import { PdvContainerProps } from '../../screens/Pdv/ui';

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
}

export const MainPdvContent: React.FC<Pick<PdvContainerProps, 'formMainPdv'>> = ({
  formMainPdv,
}) => {
  const { formData, formErrors, onChangeFormInput } = formMainPdv;
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
              label="Nome da categoria"
              placeholder="Digite o nome da categoria"
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
