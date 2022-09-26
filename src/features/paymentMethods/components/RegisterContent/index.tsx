import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Pdv from '@/model/Pdv';
import PaymentMethods from '@/model/PaymentMethods';
// import PaymentMethods from '@/model/PaymentMethods';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  listPaymentMethods: PaymentMethods[];
  listPdv: Pdv[];
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
}) => {
  const paymentGatewayOptions = [
    { value: '0', label: 'Gateway 0' },
    { value: '1', label: 'Gateway 1' },
    { value: '2', label: 'Gateway 2' },
  ];

  return (
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
              options={paymentGatewayOptions}
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};
