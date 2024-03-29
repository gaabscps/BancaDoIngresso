import React, { ChangeEvent, useState } from 'react';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import eye from '@/assets/images/login/eye.png';
import closeEye from '@/assets/images/login/closeEye.png';
import { InputText, Switch } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import SuperInput from '@/components/sharedComponents/SuperInput';
import { CheckBoxData, CheckBoxGroup, FormInputUser } from '../../screens/List';

interface StateProps {
  formData: FormData;
  formErrors: FormErrors;
  userProfileCheckBox: CheckBoxData[];
  modules: CheckBoxGroup[];
}

interface DispatchProps {
  onChangeFormInput: OnChangeFormInput;
  onBlurCPF: () => void;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  onActivateAndInactivate(e: ChangeEvent<HTMLInputElement>): void;
  onChangeUserTypeSelected(e: ChangeEvent<HTMLInputElement>, userType: CheckBoxData): void;
  onChangeUserGroupSelected(e: ChangeEvent<HTMLInputElement>, group: CheckBoxGroup): void;
}

type Props = StateProps & DispatchProps;

export const RegisterUserContent: React.FC<Props> = (props: Props) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const callGetFileButton = (): void => {
    document.getElementById('imageBase64')?.click();
  };

  const tableModule = [];
  if (props.modules && props.modules.length > 0) {
    let modules: CheckBoxGroup[] = [];
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
              onBlur={() => props.onBlurCPF()}
              error={props.formErrors.cpf && props.formErrors.cpf[0]}
            />
          </FormGroup>
        </Col>
        <Switch
          name="status"
          label={`Usuário ${
            convertToBoolean(props.formData[FormInputUser.status]) ? 'ativo' : 'inativo'
          }`}
          onChange={e => props.onActivateAndInactivate(e)}
          checked={convertToBoolean(props.formData[FormInputUser.status])}
        />
      </Row>
      <Row>
        <Col md={8}>
          <FormGroup className="mb-2">
            <InputText
              name="email"
              type="email"
              label="E-mail"
              placeholder="Ex: josedasilva123@gmail.com"
              maxLength={100}
              value={props.formData[FormInputUser.email]}
              onChange={e => props.onChangeFormInput(FormInputUser.email)(e.target.value)}
              error={props.formErrors.email && props.formErrors.email[0]}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
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
        </Col>
      </Row>
      <Row>
        <Col md={8}>
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
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <FormGroup className="mb-2">
            <InputText
              name="password"
              label="Senha"
              type={togglePassword ? 'text' : 'password'}
              placeholder="Ex: 1234abcd"
              value={props.formData[FormInputUser.password]}
              onChange={e => props.onChangeFormInput(FormInputUser.password)(e.target.value)}
              error={props.formErrors.password && props.formErrors.password[0]}
              renderForward={
                <div
                  className="show-hide"
                  onClick={() => setTogglePassword(!togglePassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {togglePassword ? (
                    <img
                      className="d-flex justify-content-center align-items-center passwordIcon"
                      src={eye}
                    />
                  ) : (
                    <img
                      className="d-flex justify-content-center align-items-center passwordIcon"
                      src={closeEye}
                    />
                  )}
                </div>
              }
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <div className="">
              <Label
                className="fieldLabel"
                for="printLayoutBase64"
                style={{ paddingBottom: '0px !important;' }}
              >
                Imagem do Usuário (Opcional)
              </Label>

              <label
                style={{
                  // width: '546px',
                  height: '62px',
                  borderRadius: '5px',
                  backgroundColor: '#E6E6E6',
                  border: 'none',
                  width: '100%',
                }}
              >
                <button
                  onClick={() => callGetFileButton()}
                  style={{
                    marginLeft: '10px',
                    marginTop: '6px',
                    marginRight: '4px',
                    border: '0.1em solid',
                    borderRadius: '3px',
                  }}
                >
                  Escolher arquivo
                </button>
                {props.formData[FormInputUser.imageName]
                  ? props.formData[FormInputUser.imageName]
                  : 'Nenhum arquivo escolhido'}
              </label>

              <SuperInput
                id="imageBase64"
                placeholder={
                  props.formData[FormInputUser.imageName]
                    ? props.formData[FormInputUser.imageName]
                    : 'Nenhum arquivo escolhido'
                }
                title={
                  props.formData[FormInputUser.imageName]
                    ? props.formData[FormInputUser.imageName]
                    : 'Nenhum arquivo selecionado'
                }
                name="imageBase64"
                type="file"
                style={{ display: 'none' }}
                onChange={e =>
                  props.onChangeFileInput(FormInputUser.imageBase64)(
                    (e.target as HTMLInputElement)?.files?.[0],
                  )
                }
              />
            </div>
            {props.formData[FormInputUser.imageBase64] &&
              props.formData[FormInputUser.imageBase64].length > 0 && (
                <img
                  style={{ maxWidth: '100%', marginBottom: '30px' }}
                  src={props.formData[FormInputUser.imageBase64]}
                />
              )}
          </FormGroup>

          <h5>Tipo do usuário</h5>
          <h4 className="subtitle border-bottom-title">Papel do usuário dentro do sistema</h4>
          <table style={{ marginLeft: '20px' }}>
            <tbody>
              {props.userProfileCheckBox.map((data, index) => (
                <>
                  <div key={index} className="checkbox-list">
                    <Input
                      name="userType"
                      type="checkbox"
                      value={String(data.checked) || ''}
                      checked={data.checked}
                      onChange={e => props.onChangeUserTypeSelected(e, data)}
                    />
                    <span className="checkbox-list-label">{data.name}</span>
                  </div>
                </>
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
                <div
                  className="tbody-container"
                  style={{ display: 'flex' }}
                  key={index}
                  id={`${index}`}
                >
                  {data.map(module => (
                    <div key={index} id={`${index}`} className="checkbox-list">
                      <Input
                        name="group"
                        type="checkbox"
                        checked={module.check === 'true'}
                        onChange={e => props.onChangeUserGroupSelected(e, module)}
                      />
                      <span className="checkbox-list-label">{module.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Form>
  );
};
