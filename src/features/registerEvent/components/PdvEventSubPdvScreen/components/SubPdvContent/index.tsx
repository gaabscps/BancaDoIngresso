/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { InputText } from '@/components';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { SubPdvContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
}

export const SubPdvContent: React.FC<
  Pick<
    SubPdvContainerProps,
    'formSubPdvRegister'
    // | 'subPdvStates'
  >
> = ({
  formSubPdvRegister,
  // subPdvStates
}) => {
  const { formData, formErrors, onChangeFormInput } = formSubPdvRegister;

  return (
    <Fragment>
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <Row>
          <Col md={6}>
            <FormGroup className="mb-2">
              <InputText
                name="name"
                label="Nome do Sub PDV"
                maxLength={18}
                placeholder="Digite o nome do Sub PDV"
                value={formData[FormInputName.name]}
                onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
                error={formErrors.name && formErrors.name[0]}
              />
            </FormGroup>
          </Col>
          <Col md={6} />
        </Row>
      </Form>
    </Fragment>
  );
};
