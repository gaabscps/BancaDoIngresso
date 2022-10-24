import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom, TextArea } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Module from '@/model/Module';
import { FormInputPermission } from '..';

interface StateProps {
  formData: FormData;
  formErrors: FormErrors;
  modules: Module[];
}

interface DispatchProps {
  change: OnChangeFormInput;
}

type Props = StateProps & DispatchProps;

export const SavePermission: React.FC<Props> = (props: Props) => (
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
            value={props.formData[FormInputPermission.name]}
            onChange={e => props.change(FormInputPermission.name)(e.target.value)}
            error={props.formErrors.name && props.formErrors.name[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <TextArea
            name="description"
            label="Descrição"
            placeholder="Digite aqui uma descrição para o módulo"
            maxLength={100}
            rows={4}
            value={props.formData[FormInputPermission.description]}
            onChange={e => props.change(FormInputPermission.description)(e.target.value)}
            error={props.formErrors.description && props.formErrors.description[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <SelectCustom
            name="module"
            label="Módulo"
            placeholder="Digite ou selecione o módulo"
            onChange={e => props.change(FormInputPermission.module)(e?.value as string)}
            error={props.formErrors.module && props.formErrors.module[0]}
            value={props.formData[FormInputPermission.module]}
            options={props.modules.map(item => ({ value: item.id, label: item.name }))}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="identifier"
            label="Identificador"
            placeholder="Ex:  Adm-Delete-Entity"
            maxLength={100}
            value={props.formData[FormInputPermission.identifier]}
            onChange={e => props.change(FormInputPermission.identifier)(e.target.value)}
            error={props.formErrors.identifier && props.formErrors.identifier[0]}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);
