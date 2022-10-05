import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom, Switch } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import PaymentGateway from '@/model/PaymentGateway';
import ChargeSetup from '@/model/ChargeSetup';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  listPaymentMethods: PaymentGateway[];
  listChargeSetup: ChargeSetup[];
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  paymentGateway = 'paymentGateway',
  status = 'status',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
  listChargeSetup,
}) => (
  // TODO : Caso seja Opcional
  // const newListPaymentGateway = [{ id: 'empty', name: 'Nenhum' }, ...listChargeSetup];

  <Form
    noValidate={true}
    onSubmit={(e): void => {
      e.preventDefault();
    }}
  >
    <Row>
      <Col md={8}>
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
            // TODO : Caso seja opcional
            // options={newListPaymentGateway.map(item => ({ value: item.id, label: item.name }))}
          />
        </FormGroup>
      </Col>
      <Col md={4}>
        <Switch
          name="status"
          label={`Forma de pagamento ${
            convertToBoolean(formData[FormInputName.status]) ? 'ativa' : 'inativa'
          }`}
          onChange={e => onChangeFormInput(FormInputName.status)(String(e.target.checked))}
          checked={convertToBoolean(formData[FormInputName.status])}
        />
      </Col>
    </Row>
  </Form>
);
