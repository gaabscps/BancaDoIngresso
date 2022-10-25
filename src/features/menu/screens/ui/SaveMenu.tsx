import React, { ChangeEvent } from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom, Switch } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Module from '@/model/Module';
import Permission from '@/model/Permission';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import { FormInputMenu } from '..';

interface StateProps {
  formData: FormData;
  formErrors: FormErrors;
  showActivateSwitch: boolean;
  modules: Module[];
}

interface DispatchProps {
  change: OnChangeFormInput;
  onActivateAndInactivate(e: ChangeEvent<HTMLInputElement>): void;
}

type Props = StateProps & DispatchProps;

export const SaveMenu: React.FC<Props> = (props: Props) => {
  const permissions: Permission[] = [];
  if (props.formData[FormInputMenu.module] && props.formData[FormInputMenu.module].length > 0) {
    if (props.modules && props.modules.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < props.modules.length; i++) {
        if (props.modules[i].id === props.formData[FormInputMenu.module]) {
          if (props.modules[i].permissions && props.modules[i].permissions.length > 0) {
            props.modules[i].permissions.forEach(data => {
              permissions.push(data);
            });
          }
          break;
        }
      }
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
              name="name"
              label="Nome do menu"
              placeholder="Ex:  Administradores"
              maxLength={100}
              value={props.formData[FormInputMenu.name]}
              onChange={e => props.change(FormInputMenu.name)(e.target.value)}
              error={props.formErrors.name && props.formErrors.name[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <SelectCustom
              name="module"
              label="Módulo"
              placeholder="Digite ou selecione o módulo"
              onChange={e => props.change(FormInputMenu.module)(e?.value as string)}
              error={props.formErrors.module && props.formErrors.module[0]}
              value={props.formData[FormInputMenu.module]}
              options={props.modules.map(item => ({ value: item.id, label: item.name }))}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <SelectCustom
              name="permission"
              label="Permissão"
              placeholder="Digite ou selecione a permissão"
              onChange={e => props.change(FormInputMenu.permission)(e?.value as string)}
              error={props.formErrors.permission && props.formErrors.permission[0]}
              value={props.formData[FormInputMenu.permission]}
              options={permissions.map(item => ({ value: item.id, label: item.name }))}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="icon"
              label="Icone"
              placeholder="Ex:  icon-chevron"
              maxLength={50}
              value={props.formData[FormInputMenu.icon]}
              onChange={e => props.change(FormInputMenu.icon)(e.target.value)}
              error={props.formErrors.icon && props.formErrors.icon[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="link"
              label="Link"
              placeholder="Ex:  /dashboard/menu"
              maxLength={150}
              value={props.formData[FormInputMenu.link]}
              onChange={e => props.change(FormInputMenu.link)(e.target.value)}
              error={props.formErrors.link && props.formErrors.link[0]}
            />
          </FormGroup>
          <FormGroup className="mb-2">
            <InputText
              name="position"
              label="Posição"
              type="number"
              placeholder="Ex:  1"
              maxLength={3}
              value={props.formData[FormInputMenu.position]}
              onChange={e => props.change(FormInputMenu.position)(e.target.value)}
              error={props.formErrors.position && props.formErrors.position[0]}
            />
          </FormGroup>
        </Col>
        {props.showActivateSwitch && (
          <Col md={4}>
            <Switch
              name="status"
              label={`Grupo ${
                convertToBoolean(props.formData[FormInputMenu.actived]) ? 'ativo' : 'inativo'
              }`}
              onChange={e => props.onActivateAndInactivate(e)}
              checked={convertToBoolean(props.formData[FormInputMenu.actived])}
            />
          </Col>
        )}
      </Row>
    </Form>
  );
};
