import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, TextArea } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { FormInputModule } from '..';

interface StateProps {
  formData: FormData;
  formErrors: FormErrors;
}

interface DispatchProps {
  change: OnChangeFormInput;
}

type Props = StateProps & DispatchProps;

export const SaveModule: React.FC<Props> = (props: Props) => (
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
            value={props.formData[FormInputModule.name]}
            onChange={e => props.change(FormInputModule.name)(e.target.value)}
            error={props.formErrors.name && props.formErrors.name[0]}
          />
        </FormGroup>

        <FormGroup className="mb-2">
          <TextArea
            name="description"
            label="Descrição"
            placeholder="Digite aqui uma descrição para o módulo"
            maxLength={250}
            rows={4}
            value={props.formData[FormInputModule.description]}
            onChange={e => props.change(FormInputModule.description)(e.target.value)}
            error={props.formErrors.description && props.formErrors.description[0]}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);
