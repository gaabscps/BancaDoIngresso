import React from 'react';
import { Col, Form, FormGroup, Input, Row } from 'reactstrap';
import { InputText, InputFile, Switch } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import Module from '@/model/Module';
import { CheckBoxData, FormInputUser } from '../../screens/List';

interface StateProps {
  formData: FormData;
  formErrors: FormErrors;
  userProfileCheckBox: CheckBoxData[];
  modules?: Module[];
}

interface DispatchProps {
  onChangeFormInput: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
}

type Props = StateProps & DispatchProps;

export const RegisterUserContent: React.FC<Props> = (props: Props) => {
  const tableModule = [];
  if (props.modules && props.modules.length > 0) {
    let modules: Module[] = [];
    props.modules.forEach(data => {
      if (modules.length === 3) {
        tableModule.push(modules);
        modules = [];
      }
      modules.push(data);
    });
    if (modules.length > 0) {
      tableModule.push(modules);
    }
  }
  return (
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
              value={props.formData[FormInputUser.cpf]}
              onChange={e => props.onChangeFormInput(FormInputUser.cpf)(e.target.value)}
              error={props.formErrors.cpf && props.formErrors.cpf[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="email"
              type="email"
              label="E-mail"
              placeholder="Ex: josedasilva123@gmail.com"
              maxLength={18}
              value={props.formData[FormInputUser.email]}
              onChange={e => props.onChangeFormInput(FormInputUser.email)(e.target.value)}
              error={props.formErrors.email && props.formErrors.email[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="telephone"
              label="Celular"
              placeholder="(00) 0 0000-0000"
              maxLength={15}
              value={props.formData[FormInputUser.telephone]}
              onChange={e => props.onChangeFormInput(FormInputUser.telephone)(e.target.value)}
              error={props.formErrors.telephone && props.formErrors.telephone[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="name"
              label="Nome do usuário"
              placeholder="Ex:  José da Silva"
              value={props.formData[FormInputUser.name]}
              onChange={e => props.onChangeFormInput(FormInputUser.name)(e.target.value)}
              error={props.formErrors.name && props.formErrors.name[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputText
              name="password"
              label="Senha"
              type="password"
              placeholder="Ex: 1234abcd"
              value={props.formData[FormInputUser.password]}
              onChange={e => props.onChangeFormInput(FormInputUser.password)(e.target.value)}
              error={props.formErrors.password && props.formErrors.password[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <InputFile
              name="imageBase64"
              label="Imagem do PDV"
              placeholder=""
              fileName={FormInputUser.imageBase64}
              onChange={e =>
                props.onChangeFileInput(FormInputUser.imageBase64)(
                  (e.target as HTMLInputElement)?.files?.[0],
                )
              }
              error={props.formErrors.imageBase64 && props.formErrors.imageBase64[0]}
            />
          </FormGroup>

          <h5>Tipo do usuário</h5>
          <h4 className="subtitle border-bottom-title">Papel do usuário dentro do sistema</h4>
          <table style={{ marginLeft: '20px' }}>
            <tbody>
              {props.userProfileCheckBox.map(data => (
                <tr key={data.id}>
                  <td style={{ verticalAlign: 'baseline' }}>
                    <Input type="checkbox" value={String(data.checked)} />
                  </td>
                  <td
                    style={{
                      fontSize: '16px',
                      fontWeight: '300',
                      lineHeight: '24px',
                      color: '#828282',
                    }}
                  >
                    {data.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5 style={{ marginTop: '30px' }}>Grupo</h5>
          <h4 className="subtitle border-bottom-title">
            Grupo de permissões que o usuário terá no sistema
          </h4>
          <table style={{ marginLeft: '20px' }}>
            <tbody>
              {tableModule.map((data, index) => (
                <tr key={index}>
                  {data.map(module => (
                    <>
                      <td key={module.id} style={{ verticalAlign: 'baseline' }}>
                        <Input type="checkbox" />
                      </td>
                      <td
                        style={{
                          fontSize: '16px',
                          fontWeight: '300',
                          lineHeight: '24px',
                          color: '#828282',
                        }}
                      >
                        {module.name}
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Col md={4}>
          <Switch
            name="status"
            label={`Usuário ${
              convertToBoolean(props.formData[FormInputUser.status]) ? 'ativo' : 'inativo'
            }`}
            onChange={e => props.onChangeFormInput(FormInputUser.status)(String(e.target.checked))}
            checked={convertToBoolean(props.formData[FormInputUser.status])}
          />
        </Col>
      </Row>
    </Form>
  );
};
