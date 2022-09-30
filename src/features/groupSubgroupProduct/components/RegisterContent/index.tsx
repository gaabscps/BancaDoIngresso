import React from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { InputText, SelectCustom } from '@/components';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import Pdv from '@/model/Pdv';
import GroupSubgroupProduct from '@/model/GroupSubgroupProduct';

interface RegisterContentProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  listGroupSubgroupProduct: GroupSubgroupProduct[];
  listPdv: Pdv[];
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
  listPdv,
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
        <FormGroup className="mb-2">
          <InputText
            name="name"
            label="Nome do Grupo e subgrupo de produto"
            placeholder="Digite o nome do Grupo e subgrupo de produto"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="serialNumber"
            label="Numero de Série da Grupo e subgrupo de produtos"
            placeholder="Digite o numero de Série da Grupo e subgrupo de produtos"
            value={formData[FormInputName.serialNumber]}
            onChange={e => onChangeFormInput(FormInputName.serialNumber)(e.target.value)}
            error={formErrors.serialNumber && formErrors.serialNumber[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <SelectCustom
            name="pdv"
            label="PDV (opcional)"
            placeholder="Selecione ou digite o PDV à vincular"
            value={formData[FormInputName.pdv]}
            onChange={e => onChangeFormInput(FormInputName.pdv)(e?.value as string)}
            error={formErrors.pdv && formErrors.pdv[0]}
            options={listPdv.map(item => ({ value: item.id, label: item.name }))}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="model"
            label="Modelo da Grupo e subgrupo de produtos (opcional)"
            placeholder="Digite o modelo da Grupo e subgrupo de produtos"
            value={formData[FormInputName.model]}
            onChange={e => onChangeFormInput(FormInputName.model)(e.target.value)}
            error={formErrors.model && formErrors.model[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="telephoneOperator"
            label="Operadora telefônica (opcional)"
            placeholder="Digite a operadora telefônica"
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
            type="date"
            name="expirationDate"
            label="Data de validade (opcional)"
            placeholder="DD/MM/AAAA"
            value={formData[FormInputName.expirationDate]}
            onChange={e => onChangeFormInput(FormInputName.expirationDate)(e.target.value)}
            error={formErrors.expirationDate && formErrors.expirationDate[0]}
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);
