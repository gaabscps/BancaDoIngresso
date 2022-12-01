/* eslint-disable import/no-unresolved */
import { ButtonGroup, InputText, SelectCustom } from '@/components';
import React, { Fragment } from 'react';
import { Col, Form, FormGroup, Row } from 'reactstrap';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  physicalSaleAllowCreditCardPayment = 'physicalSaleAllowCreditCardPayment',
  physicalSaleDebit = 'physicalSaleDebit',
  physicalSaleCredit = 'physicalSaleCredit',
  physicalSalePix = 'physicalSalePix',
  physicalSaleAdministrateTax = 'physicalSaleAdministrateTax',
  physicalSaleInstallments = 'physicalSaleInstallments',
  physicalSaleFee = 'physicalSaleFee',
}

export const PosConfigContent: React.FC<any> = ({ formPosConfig }) => {
  const { formData, onChangeFormInput, formErrors } = formPosConfig;

  const optionCount = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];

  const optionLimiteCount = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
  ];

  return (
    <Fragment>
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <Row>
          <Col md={8}>
            <div className="container-event mb-4">
              <h5 className="mb-2 border-bottom-title mb-5">Taxas de cartão</h5>
            </div>
            <p style={{ fontSize: '21px', fontWeight: '500' }}>Venda física</p>

            <FormGroup className="mb-2">
              <ButtonGroup
                label="Permitir venda com cartão?"
                name="physicalSaleAllowCreditCardPayment"
                value={formData[FormInputName.physicalSaleAllowCreditCardPayment]}
                onChange={e =>
                  onChangeFormInput(FormInputName.physicalSaleAllowCreditCardPayment)(
                    e.target.value,
                  )
                }
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
                error={formErrors.allowCreditCardPayment && formErrors.allowCreditCardPayment[0]}
              />
            </FormGroup>

            <FormGroup>
              <InputText
                name="physicalSaleDebit"
                label="Débito %"
                className="w-input-sm"
                maxLength={2}
                value={formData[FormInputName.physicalSaleDebit]}
                placeholder="0"
                onChange={e =>
                  onChangeFormInput(FormInputName.physicalSaleDebit)(
                    e.target.value.replace(/\D/g, ''),
                  )
                }
                error={formErrors.physicalSaleDebit && formErrors.physicalSaleDebit[0]}
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
              <InputText
                name="physicalSaleCredit"
                label="Crédito %"
                className="w-input-sm"
                maxLength={2}
                value={formData[FormInputName.physicalSaleCredit]}
                placeholder="0"
                onChange={e =>
                  onChangeFormInput(FormInputName.physicalSaleCredit)(
                    e.target.value.replace(/\D/g, ''),
                  )
                }
                error={formErrors.physicalSaleCredit && formErrors.physicalSaleCredit[0]}
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
              <InputText
                name="physicalSalePix"
                label="PIX %"
                className="w-input-sm"
                maxLength={2}
                value={formData[FormInputName.physicalSalePix]}
                placeholder="0"
                onChange={e =>
                  onChangeFormInput(FormInputName.physicalSalePix)(
                    e.target.value.replace(/\D/g, ''),
                  )
                }
                error={formErrors.physicalSalePix && formErrors.physicalSalePix[0]}
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
              <InputText
                name="physicalSaleAdministrateTax"
                label="Taxa admin. %"
                className="w-input-sm"
                maxLength={2}
                value={formData[FormInputName.physicalSaleAdministrateTax]}
                placeholder="0"
                onChange={e =>
                  onChangeFormInput(FormInputName.physicalSaleAdministrateTax)(
                    e.target.value.replace(/\D/g, ''),
                  )
                }
                error={
                  formErrors.physicalSaleAdministrateTax &&
                  formErrors.physicalSaleAdministrateTax[0]
                }
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
            </FormGroup>
            <div className="d-flex">
              <SelectCustom
                name="physicalSaleInstallments"
                label="Qtd parcelas"
                placeholder="Ex: 2"
                className="w-input-sm"
                value={formData[FormInputName.physicalSaleInstallments]}
                onChange={e =>
                  onChangeFormInput(FormInputName.physicalSaleInstallments)(e?.value as string)
                }
                error={
                  formErrors.physicalSaleInstallments && formErrors.physicalSaleInstallments[0]
                }
                options={optionCount}
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
              <span className="mt-5 mr-3 ml-3 input-label"> + </span>
              <SelectCustom
                name="physicalSaleFee"
                label="Juros ao mês"
                placeholder="Ex: 4"
                className="w-input-sm"
                value={formData[FormInputName.physicalSaleFee]}
                onChange={e => onChangeFormInput(FormInputName.physicalSaleFee)(e?.value as string)}
                error={formErrors.physicalSaleFee && formErrors.physicalSaleFee[0]}
                options={optionLimiteCount}
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
