import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText } from '@/components';
import { SectorTicketMainSettingsContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
}

export const RegisterSectorContent: React.FC<
  Pick<SectorTicketMainSettingsContainerProps, 'formSector'>
> = ({ formSector }) => {
  const { formData, onChangeFormInput, formErrors } = formSector;
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
              label="Nome do setor"
              placeholder="Digite o nome do setor"
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
