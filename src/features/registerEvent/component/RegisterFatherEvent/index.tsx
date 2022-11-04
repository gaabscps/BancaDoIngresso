import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { fatherEventStatesProps, formFatherEventProps } from '../../types';

interface RegisterFatherEventContentProps {
  formFatherEvent: formFatherEventProps;
  fatherEventStates: fatherEventStatesProps;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
}

export const RegisterFatherEventContent: React.FC<RegisterFatherEventContentProps> = ({
  formFatherEvent,
  fatherEventStates,
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
          <SelectCustom
            name="eventType"
            label="Tipo de evento"
            placeholder="Digite ou selecione o tipo do evento"
            onChange={e => {
              formFatherEvent.onChangeFormInput(FormInputName.name)(e?.value as string);
            }}
            error={formFatherEvent.formErrors.name && formFatherEvent.formErrors.name[0]}
            value={formFatherEvent.formData[FormInputName.name]}
            options={
              fatherEventStates.fatherEventList.map(fatherEvent => ({
                value: fatherEvent.id,
                label: fatherEvent.name,
              })) || []
            }
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);
