/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { InputText, SelectCustom } from '@/components';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { updateMask as updateMaskCash } from '@/helpers/masks/cashNumber';
import { PosContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  partialPayment = 'partialPayment',
}

export const PosContent: React.FC<Pick<PosContainerProps, 'formPosRegister' | 'posStates'>> = ({
  formPosRegister,
  posStates,
}) => {
  const { formData, formErrors, onChangeFormInput } = formPosRegister;

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
              <SelectCustom
                name="name"
                label="POS"
                placeholder="Digite ou selecione a POS"
                disabled={!!posStates.pos}
                value={formData[FormInputName.name]}
                onChange={e => onChangeFormInput(FormInputName.name)(e?.value as string)}
                error={formErrors.name && formErrors.name[0]}
                options={posStates.posOptions
                  .map(pos => ({
                    value: posStates.posList.find(posList => posList.pos.id === pos.id)
                      ? undefined
                      : pos.id,
                    label: posStates.posList.find(posList => posList.pos.name === pos.name)
                      ? undefined
                      : pos.name,
                  }))
                  .filter(option => option.value !== undefined && option.label !== undefined)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup className="mb-2">
              <InputText
                name="partialPayment"
                label="Porcentagem do Garçom"
                addon="%"
                maxLength={5}
                placeholder="0"
                className="w-input-sm"
                value={formData[FormInputName.partialPayment]}
                onChange={e =>
                  onChangeFormInput(FormInputName.partialPayment)(updateMaskCash(e?.target?.value))
                }
                error={formErrors.partialPayment && formErrors.partialPayment[0]}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
