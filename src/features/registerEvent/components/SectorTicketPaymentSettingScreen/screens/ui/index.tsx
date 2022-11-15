/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, Checkbox, InputText, Loading, Radio, SelectCustom } from '@/components';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { formPaymentSettingsProps } from '../../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorTicketMainSettingsContainerProps {
  state: States;
  formMainSettings: formPaymentSettingsProps;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  paymentGateway = 'paymentGateway',
  hasHalfPrice = 'hasHalfPrice',
  percentageHalfPrice = 'percentageHalfPrice',
  amountHalfPrice = 'amountHalfPrice',
  hasCourtesy = 'hasCourtesy',
  amountCourtesy = 'amountCourtesy',
  numberTickets = 'numberTickets',
  printLayoutBase64 = 'printLayoutBase64',
  printImageBase64 = 'printImageBase64',
  printer = 'printer',
  copies = 'copies',
  reprint = 'reprint',
  printBatchNumber = 'printBatchNumber',
  observation = 'observation',
}

// eslint-disable-next-line no-shadow
export enum FormInputNameBatchs {
  name = 'name',
  startDate = 'startDate',
  endDate = 'endDate',
  startTime = 'startTime',
  endTime = 'endTime',
  commission = 'commission',
  amount = 'amount',
  unitValue = 'unitValue',
  totalValue = 'totalValue',
  imageUrl = 'imageUrl',
}

export const SectorTicketPaymentSettingsContainer: React.FC<
  SectorTicketMainSettingsContainerProps
> = ({ state, formMainSettings }) => {
  const { formData, formErrors, onChangeFormInput } = formMainSettings;

  const paymentGatewayOptions = [
    { label: 'Paypal', value: 0 },
    { label: 'Pagseguro', value: 1 },
    { label: 'Picpay', value: 2 },
    { label: 'Rico', value: 3 },
    { label: 'Ricopay', value: 4 },
  ];

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="container-event">
          <Form
            noValidate={true}
            onSubmit={(e): void => {
              e.preventDefault();
            }}
          >
            <Col>
              <Row>
                <FormGroup className="mb-2">
                  <Radio
                    name="paymentGateway"
                    label="Gateway de pagamento POS"
                    placeholder="Gateway de pagamento POS"
                    value={formData[FormInputName.paymentGateway]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.paymentGateway)(e?.target?.value as string)
                    }
                    error={formErrors.paymentGateway && formErrors.paymentGateway[0]}
                    options={paymentGatewayOptions}
                  />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup className="mb-2">
                  <label className="input-label mb-4">Gateway de pagamento SITE</label>
                  <Checkbox
                    name="sitePaymentGateway"
                    label="Paypal"
                    onChange={e =>
                      onChangeFormInput(FormInputName.paymentGateway)(e?.target?.value as string)
                    }
                    checked={formData[FormInputName.paymentGateway] === 'true'}
                  />
                  <Checkbox
                    name="sitePaymentGateway"
                    label="Pagseguro"
                    onChange={e =>
                      onChangeFormInput(FormInputName.paymentGateway)(e?.target?.value as string)
                    }
                    checked={formData[FormInputName.paymentGateway] === 'true'}
                  />
                  <Checkbox
                    name="sitePaymentGateway"
                    label="Picpay"
                    onChange={e =>
                      onChangeFormInput(FormInputName.paymentGateway)(e?.target?.value as string)
                    }
                    checked={formData[FormInputName.paymentGateway] === 'true'}
                  />
                  <Checkbox
                    name="sitePaymentGateway"
                    label="Rico"
                    onChange={e =>
                      onChangeFormInput(FormInputName.paymentGateway)(e?.target?.value as string)
                    }
                    checked={formData[FormInputName.paymentGateway] === 'true'}
                  />
                  <Checkbox
                    name="sitePaymentGateway"
                    label="Ricopay"
                    onChange={e =>
                      onChangeFormInput(FormInputName.paymentGateway)(e?.target?.value as string)
                    }
                    checked={formData[FormInputName.paymentGateway] === 'true'}
                  />
                </FormGroup>
              </Row>
            </Col>
            <label htmlFor="" className="ml-3 input-label">
              Limite de parcelamento online
            </label>
            <Col md={4}>
              <Row>
                <FormGroup>
                  <SelectCustom
                    name="name"
                    label=""
                    placeholder="0"
                    value={formData[FormInputName.name]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.name)(e?.target?.value as string)
                    }
                    error={formErrors.name && formErrors.name[0]}
                    options={[]}
                  />
                </FormGroup>
              </Row>
            </Col>
            <label htmlFor="" className="ml-3 input-label">
              Limite de parcelamento POS
            </label>
            <Col md={4}>
              <Row>
                <FormGroup>
                  <SelectCustom
                    name="name"
                    label=""
                    placeholder="0"
                    value={formData[FormInputName.name]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.name)(e?.target?.value as string)
                    }
                    error={formErrors.name && formErrors.name[0]}
                    options={[]}
                  />
                </FormGroup>
              </Row>
            </Col>
            <Col>
              <Row>
                <FormGroup className="mb-2">
                  <ButtonGroup
                    label="Permitir pagamento fracionado?"
                    name="hasHalfPrice"
                    value={formData[FormInputName.hasHalfPrice]}
                    onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
                  />
                  <ButtonGroup
                    label="Permitir taxa variavel?"
                    name="hasHalfPrice"
                    value={formData[FormInputName.hasHalfPrice]}
                    onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
                  />
                  <ButtonGroup
                    label="Permitir valor variavel?"
                    name="hasHalfPrice"
                    value={formData[FormInputName.hasHalfPrice]}
                    onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
                  />
                  <ButtonGroup
                    label="Permitir pagamento com PIX?"
                    name="hasHalfPrice"
                    value={formData[FormInputName.hasHalfPrice]}
                    onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
                  />
                  <ButtonGroup
                    label="Permitir pagamento por aproximação?"
                    name="hasHalfPrice"
                    value={formData[FormInputName.hasHalfPrice]}
                    onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
                  />
                  <ButtonGroup
                    label="Permitir vender online?"
                    name="hasHalfPrice"
                    value={formData[FormInputName.hasHalfPrice]}
                    onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
                  />
                  <ButtonGroup
                    label="Permitir vender na POS?"
                    name="hasHalfPrice"
                    value={formData[FormInputName.hasHalfPrice]}
                    onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
                  />
                  <ButtonGroup
                    label="Imprimir recibo (POS)?"
                    name="hasHalfPrice"
                    value={formData[FormInputName.hasHalfPrice]}
                    onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
                  />
                </FormGroup>
              </Row>
            </Col>
          </Form>
        </div>
        <Col>
          <div className="container-event mb-4">
            <h5 className="mb-2 border-bottom-title mb-5">Taxas de cartão</h5>
          </div>
          <p style={{ fontSize: '21px', fontWeight: '500' }}>Venda física</p>
          <Row>
            <FormGroup className="mb-2">
              <ButtonGroup
                label="Permitir venda com cartão?"
                name="hasHalfPrice"
                value={formData[FormInputName.hasHalfPrice]}
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
                error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
              />
            </FormGroup>
          </Row>
        </Col>
        <Col md={1}>
          <Row>
            <FormGroup>
              <InputText
                name="debit"
                label="Débito"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
              />
              <InputText
                name="credit"
                label="Crédito"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
              />
              <InputText
                name="pix"
                label="PIX"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
              />
              <InputText
                name="admFees"
                label="Taxa administrativa"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
              />
            </FormGroup>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <SelectCustom
              name="name"
              label="Qtd parcelas"
              placeholder="Ex: 2"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e?.target?.value as string)}
              error={formErrors.name && formErrors.name[0]}
              options={[]}
            />
            <span className="mt-5 mr-3 ml-3 input-label"> + </span>
            <SelectCustom
              name="name"
              label="Juros ao mês"
              placeholder="Ex: 4"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e?.target?.value as string)}
              error={formErrors.name && formErrors.name[0]}
              options={[]}
            />
          </Row>
        </Col>
        <Col>
          <Row>
            <p style={{ fontSize: '21px', fontWeight: '500' }}>Venda e-commerce</p>
          </Row>
          <Row>
            <FormGroup className="mb-2">
              <ButtonGroup
                label="Permitir venda com cartão?"
                name="hasHalfPrice"
                value={formData[FormInputName.hasHalfPrice]}
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
                error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
              />
            </FormGroup>
          </Row>
        </Col>
        <Col md={1}>
          <Row>
            <FormGroup>
              <InputText
                name="debit"
                label="Débito"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
              />
              <InputText
                name="credit"
                label="Crédito"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
              />
              <InputText
                name="pix"
                label="PIX"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
              />
              <InputText
                name="admFees"
                label="Taxa administrativa"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
              />
            </FormGroup>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <SelectCustom
              name="name"
              label="Qtd parcelas"
              placeholder="Ex: 2"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e?.target?.value as string)}
              error={formErrors.name && formErrors.name[0]}
              options={[]}
            />
            <span className="mt-5 mr-3 ml-3 input-label"> + </span>
            <SelectCustom
              name="name"
              label="Juros ao mês"
              placeholder="Ex: 4"
              value={formData[FormInputName.name]}
              onChange={e => onChangeFormInput(FormInputName.name)(e?.target?.value as string)}
              error={formErrors.name && formErrors.name[0]}
              options={[]}
            />
          </Row>
        </Col>
        <Col>
          <div className="container-event mb-4">
            <h5 className="mb-2 border-bottom-title mb-5">Cupons e descontos</h5>
          </div>
          <Row>
            <FormGroup>
              <ButtonGroup
                label="Permitir desconto?"
                name="hasHalfPrice"
                value={formData[FormInputName.hasHalfPrice]}
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
                error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
              />
              <ButtonGroup
                label="Permitir cupom de desconto??"
                name="hasHalfPrice"
                value={formData[FormInputName.hasHalfPrice]}
                onChange={e => onChangeFormInput(FormInputName.hasHalfPrice)(e.target.value)}
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
                error={formErrors.hasHalfPrice && formErrors.hasHalfPrice[0]}
              />
            </FormGroup>
          </Row>
        </Col>
      </Container>
    </Fragment>
  );
};
