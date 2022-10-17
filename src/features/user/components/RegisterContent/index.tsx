import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, InputFile, Switch } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import { FormInputUser } from '../../screens/List';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
}

export const RegisterContent: React.FC<RegisterContentProps> = ({
  formData,
  formErrors,
  onChangeFormInput,
  onChangeFileInput,
}) => (
  <Form
    noValidate={true}
    onSubmit={(e): void => {
      e.preventDefault();
    }}
  >
    <Row>
      <Col md={8}>
        <h5 className="mb-5 border-bottom-title">Informações básicas</h5>
        <FormGroup className="mb-2">
          <InputText
            name="cpf"
            label="CPF (login)"
            placeholder="Ex: 123.456.789-00"
            maxLength={14}
            value={formData[FormInputUser.cpf]}
            onChange={e => onChangeFormInput(FormInputUser.cpf)(e.target.value)}
            error={formErrors.cpf && formErrors.cpf[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="email"
            type="email"
            label="E-mail"
            placeholder="Ex: josedasilva123@gmail.com"
            maxLength={18}
            value={formData[FormInputUser.email]}
            onChange={e => onChangeFormInput(FormInputUser.email)(e.target.value)}
            error={formErrors.email && formErrors.email[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="telephone"
            label="Celular"
            placeholder="(00) 0 0000-0000"
            maxLength={15}
            value={formData[FormInputUser.telephone]}
            onChange={e => onChangeFormInput(FormInputUser.telephone)(e.target.value)}
            error={formErrors.telephone && formErrors.telephone[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="name"
            label="Nome do usuário"
            placeholder="Ex:  José da Silva"
            value={formData[FormInputUser.name]}
            onChange={e => onChangeFormInput(FormInputUser.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputText
            name="password"
            label="Senha"
            type="password"
            placeholder="Ex: 1234abcd"
            value={formData[FormInputUser.password]}
            onChange={e => onChangeFormInput(FormInputUser.password)(e.target.value)}
            error={formErrors.password && formErrors.password[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <InputFile
            name="imageBase64"
            label="Imagem do PDV"
            placeholder=""
            fileName={FormInputUser.imageBase64}
            onChange={e =>
              onChangeFileInput(FormInputUser.imageBase64)(
                (e.target as HTMLInputElement)?.files?.[0],
              )
            }
            error={formErrors.imageBase64 && formErrors.imageBase64[0]}
          />
        </FormGroup>

        <h5 className="border-bottom-title mb-5 ">Tipo do usuário</h5>
        <FormGroup className="mb-2">
          <InputText
            name="telephone"
            label="Telefone celular"
            placeholder="(00) 0 000-0000"
            maxLength={15}
            value={formData[FormInputUser.telephone]}
            onChange={e => onChangeFormInput(FormInputUser.telephone)(e.target.value)}
            error={formErrors.telephone && formErrors.telephone[0]}
          />
        </FormGroup>
      </Col>
      <Col md={4}>
        <Switch
          name="status"
          label={`Usuário ${
            convertToBoolean(formData[FormInputUser.status]) ? 'ativo' : 'inativo'
          }`}
          onChange={e => onChangeFormInput(FormInputUser.status)(String(e.target.checked))}
          checked={convertToBoolean(formData[FormInputUser.status])}
        />
      </Col>
    </Row>
  </Form>
);
