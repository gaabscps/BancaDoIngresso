import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, Switch } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  id = 'id',
  url = 'url',
  token = 'token',
  frontToken = 'frontToken',
  email = 'email',
  notificationURL = 'notificationURL',
  webhook = 'webhook',
  status = 'status',
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
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
    <Row className="container-with-buttom">
      <Col md={8}>
        <FormGroup className="mb-2">
          <InputText
            name="Name"
            label="Nome do gateway de pagamento"
            placeholder="Digite o nome do gateway de pagamento"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="token"
            label="Token do gateway de pagamento"
            placeholder="Dado fornecido pelo gateway de pagamento"
            value={formData[FormInputName.token]}
            onChange={e => onChangeFormInput(FormInputName.token)(e.target.value)}
            error={formErrors.token && formErrors.token[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="frontToken"
            label="Secret"
            placeholder="Dado fornecido pelo gateway de pagamento"
            value={formData[FormInputName.frontToken]}
            onChange={e => onChangeFormInput(FormInputName.frontToken)(e.target.value)}
            error={formErrors.frontToken && formErrors.frontToken[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="url"
            label="URL"
            placeholder="https://www.exemplo.com"
            value={formData[FormInputName.url]}
            onChange={e => onChangeFormInput(FormInputName.url)(e.target.value)}
            error={formErrors.url && formErrors.url[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="notificationURL"
            label="URL de Notificação"
            placeholder="https://www.exemplo.com"
            value={formData[FormInputName.notificationURL]}
            onChange={e => onChangeFormInput(FormInputName.notificationURL)(e.target.value)}
            error={formErrors.notificationURL && formErrors.notificationURL[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="webhook"
            label="Webhook"
            placeholder="https://www.exemplo.com"
            value={formData[FormInputName.webhook]}
            onChange={e => onChangeFormInput(FormInputName.webhook)(e.target.value)}
            error={formErrors.webhook && formErrors.webhook[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="email"
            label="Email"
            placeholder="Ex: email@email.com"
            value={formData[FormInputName.email]}
            onChange={e => onChangeFormInput(FormInputName.email)(e.target.value)}
            error={formErrors.email && formErrors.email[0]}
          />
        </FormGroup>
      </Col>

      <Col md={4}>
        <Switch
          name="status"
          label={`Gateway ${
            convertToBoolean(formData[FormInputName.status]) ? 'ativo' : 'inativo'
          }`}
          onChange={e => onChangeFormInput(FormInputName.status)(String(e.target.checked))}
          checked={convertToBoolean(formData[FormInputName.status])}
        />
      </Col>
    </Row>
  </Form>
);
