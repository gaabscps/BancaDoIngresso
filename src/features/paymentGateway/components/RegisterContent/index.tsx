import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import PaymentGateway from '@/model/PaymentGateway';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  listPos: PaymentGateway[];
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  serialNumber = 'serialNumber',
  status = 'status',
  expirationDate = 'expirationDate',
  pdv = 'pdv',
  model = 'model',
  telephoneOperator = 'telephoneOperator',
  cardOperator = 'cardOperator',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
}) => {
  const statusOptions = [
    { value: '0', label: 'POS em estoque' },
    { value: '1', label: 'POS em uso' },
    { value: '2', label: 'POS reservada' },
    { value: '3', label: 'POS inativa' },
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
          <h5 className="mb-2">Informações gerais e endereço</h5>

          <FormGroup className="mb-2">
            <InputText
              name="name"
              label="Nome do gateway de pagamento"
              placeholder="Digite o nome do gateway de pagamento"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
              error={formErrors.name && formErrors.name[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <SelectCustom
              name="status"
              label="Tipo do gateway de pagamento"
              placeholder="Selecione ou digite o tipo do gateway de pagamento"
              onChange={e => onChangeFormInput(FormInputName.status)(e?.value as string)}
              error={formErrors.status && formErrors.status[0]}
              value={formData[FormInputName.status]}
              options={statusOptions}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="model"
              label="Token do gateway de pagamento"
              placeholder="Ex: 123456"
              value={formData[FormInputName.model]}
              onChange={e => onChangeFormInput(FormInputName.model)(e.target.value)}
              error={formErrors.model && formErrors.model[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="telephoneOperator"
              label="Secret"
              placeholder="Ex: 1234567"
              value={formData[FormInputName.telephoneOperator]}
              onChange={e => onChangeFormInput(FormInputName.telephoneOperator)(e.target.value)}
              error={formErrors.telephoneOperator && formErrors.telephoneOperator[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="telephoneOperator"
              label="Operadora de Cartão (opcional)"
              placeholder="Digite a operadora de Cartão"
              value={formData[FormInputName.cardOperator]}
              onChange={e => onChangeFormInput(FormInputName.cardOperator)(e.target.value)}
              error={formErrors.cardOperator && formErrors.cardOperator[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="expirationDate"
              label="Porta"
              placeholder="Ex: 123"
              value={formData[FormInputName.expirationDate]}
              onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
              error={formErrors.expirationDate && formErrors.expirationDate[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="expirationDate"
              label="IP de Destino"
              placeholder="Ex: 000.000.0.0"
              value={formData[FormInputName.expirationDate]}
              onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
              error={formErrors.expirationDate && formErrors.expirationDate[0]}
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};
