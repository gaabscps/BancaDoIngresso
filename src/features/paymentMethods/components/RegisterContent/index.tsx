import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Pdv from '@/model/Pdv';
import PaymentGateway from '@/model/PaymentGateway';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  listPaymentMethods: PaymentGateway[];
  listChargeSetup: any[];
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  paymentGateway = 'paymentGateway',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
  listChargeSetup,
}) => (
  <Form
    noValidate={true}
    onSubmit={(e): void => {
      e.preventDefault();
    }}
  >
    <Row>
      <Col md={12}>
        <FormGroup className="mb-2">
          <InputText
            name="name"
            label="Nome da forma de pagamento"
            placeholder="Digite o nome da forma de pagamento"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <SelectCustom
            name="paymentGateway"
            label="Gateway de pagamento"
            placeholder="Selecione ou digite o gateway de pagamento"
            onChange={e => onChangeFormInput(FormInputName.paymentGateway)(e?.value as string)}
            error={formErrors.paymentGateway && formErrors.paymentGateway[0]}
            value={formData[FormInputName.paymentGateway]}
            options={listChargeSetup?.map(item => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);
