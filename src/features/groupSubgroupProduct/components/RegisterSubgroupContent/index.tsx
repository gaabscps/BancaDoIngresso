import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Pdv from '@/model/Pdv';
import GroupSubgroupProduct from '@/model/GroupSubgroupProduct';

interface RegisterSubgroupContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  listGroupSubgroupProduct: GroupSubgroupProduct[];
  listPdv: Pdv[];
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
}

export const RegisterSubgroupContent: React.FC<RegisterSubgroupContentProps> = ({
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
    <Row>
      <Col md={8}>
        <FormGroup>
          <InputText
            name="name"
            label="Nome do Grupo"
            placeholder="Digite o nome do Grupo e subgrupo de produto"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);
