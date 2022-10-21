import React, { ChangeEvent } from 'react';
import { Col, Form, FormGroup, Input, Row } from 'reactstrap';
import { InputText, Switch, TextArea } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import Module from '@/model/Module';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import Permission from '@/model/Permission';
import { FormInputGroup } from '../../screens/List';
import { ListModule } from './ListModule';

interface StateProps {
  formData: FormData;
  formErrors: FormErrors;
  modules?: Module[];
}

interface DispatchProps {
  onChangeFormInput: OnChangeFormInput;
  checkAllModule(e: ChangeEvent<HTMLInputElement>): void;
  checkPermission(permission: Permission): void;
}

type Props = StateProps & DispatchProps;

export const RegisterGroupContent: React.FC<Props> = (props: Props) => {
  const checkBoxAll = (): JSX.Element => (
    <div className="checkFieldSpacing">
      <Input type="checkbox" onChange={e => props.checkAllModule(e)} />
    </div>
  );
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
              name="name"
              label="Nome do grupo"
              placeholder="Ex:  Administradores"
              maxLength={100}
              value={props.formData[FormInputGroup.name]}
              onChange={e => props.onChangeFormInput(FormInputGroup.name)(e.target.value)}
              error={props.formErrors.name && props.formErrors.name[0]}
            />
          </FormGroup>

          <FormGroup className="mb-2">
            <TextArea
              name="description"
              label="Descrição"
              placeholder="Digite aqui uma descrição para o grupo"
              maxLength={250}
              rows={4}
              value={props.formData[FormInputGroup.description]}
              onChange={e => props.onChangeFormInput(FormInputGroup.description)(e.target.value)}
              error={props.formErrors.description && props.formErrors.description[0]}
            />
          </FormGroup>

          <h5>Permissões do grupo</h5>
          <h4 className="subtitle border-bottom-title">
            Seções e ações que este grupo poderá acessar e realizar
          </h4>
          <div>
            {props.modules?.map(data => (
              <SuperCollapse
                key={data.id}
                title={data.name}
                content={
                  data && data.permissions.length > 0 ? (
                    <ListModule module={data} check={props.checkPermission} />
                  ) : (
                    'Nenhuma permissão cadastrada. Aqui será exibida uma lista de permissões'
                  )
                }
                leftIcon={checkBoxAll}
              />
            ))}
          </div>
        </Col>
        <Col md={4}>
          <Switch
            name="status"
            label={`Grupo ${
              convertToBoolean(props.formData[FormInputGroup.actived]) ? 'ativo' : 'inativo'
            }`}
            onChange={e =>
              props.onChangeFormInput(FormInputGroup.actived)(String(e.target.checked))
            }
            checked={convertToBoolean(props.formData[FormInputGroup.actived])}
          />
        </Col>
      </Row>
    </Form>
  );
};
