/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, InputText, SelectCustom } from '@/components';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { SectorProductContainerProps } from '../../screens/ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  group = 'group',
  subgroup = 'subgroup',
  name = 'name',
  allowOnline = 'allowOnline',
  unitMeasurement = 'unitMeasurement',
  amount = 'amount',
  unitValue = 'unitValue',
  totalValue = 'totalValue',
  imageBase64 = 'imageBase64',
}

export const ProductRegisterContent: React.FC<Pick<SectorProductContainerProps, 'formProduct'>> = ({
  formProduct,
}) => {
  const { formData, formErrors, onChangeFormInput } = formProduct;

  return (
    <Fragment>
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <FormGroup className="mb-2">
          <SelectCustom
            name="group"
            label="Grupo do produto"
            placeholder="Digite ou selecione o grupo do produto"
            value={formData[FormInputName.group]}
            onChange={e => onChangeFormInput(FormInputName.group)(e?.value as string)}
            error={formErrors.group && formErrors.group[0]}
            options={[]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <SelectCustom
            name="subgroup"
            label="Subgrupo do produto"
            placeholder="Digite ou selecione o subgrupo do produto"
            value={formData[FormInputName.subgroup]}
            onChange={e => onChangeFormInput(FormInputName.subgroup)(e?.value as string)}
            error={formErrors.subgroup && formErrors.subgroup[0]}
            options={[]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <InputText
            name="name"
            label="Nome do produto"
            placeholder="Digite  o nome do grupo"
            value={formData[FormInputName.name]}
            onChange={e => onChangeFormInput(FormInputName.name)(e.target.value)}
            error={formErrors.name && formErrors.name[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Vender online?"
            name="allowOnline"
            value={formData[FormInputName.allowOnline]}
            onChange={e => {
              onChangeFormInput(FormInputName.allowOnline)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.allowOnline && formErrors.allowOnline[0]}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Unidade de medida"
            name="unitMeasurement"
            value={formData[FormInputName.unitMeasurement]}
            onChange={e => {
              onChangeFormInput(FormInputName.unitMeasurement)(e.target.value);
            }}
            options={[
              { value: '0', label: 'Unitário' },
              { value: '1', label: 'Quilo' },
              { value: '2', label: 'Variável' },
            ]}
            error={formErrors.unitMeasurement && formErrors.unitMeasurement[0]}
          />
        </FormGroup>
        <Row>
          <Col md={6} className="pl-0">
            <FormGroup className="mb-2">
              <InputText
                name="amount"
                label="Quantidade"
                placeholder="Ex: 200"
                value={formData[FormInputName.amount]}
                onChange={e => onChangeFormInput(FormInputName.amount)(e.target.value)}
                error={formErrors.amount && formErrors.amount[0]}
              />
            </FormGroup>
          </Col>
          <Col md={6} className="pr-0">
            <FormGroup className="mb-2">
              <InputText
                name="unitValue"
                label="Valor unitário"
                placeholder="Ex: 20,00"
                value={formData[FormInputName.unitValue]}
                onChange={e => onChangeFormInput(FormInputName.unitValue)(e.target.value)}
                error={formErrors.unitValue && formErrors.unitValue[0]}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="mb-2">
          <InputText
            name="totalValue"
            label="Valor total"
            placeholder=""
            value={formData[FormInputName.totalValue]}
            onChange={e => onChangeFormInput(FormInputName.totalValue)(e.target.value)}
            error={formErrors.totalValue && formErrors.totalValue[0]}
            disabled
          />
        </FormGroup>
      </Form>
    </Fragment>
  );
};
