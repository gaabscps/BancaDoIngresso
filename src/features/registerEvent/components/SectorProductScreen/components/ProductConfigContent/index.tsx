/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, InputText, SelectCustom } from '@/components';
import { Form, FormGroup } from 'reactstrap';
import { SectorProductContainerProps } from '../../screens/ui';
import { RegisterDiscountCoupon } from '../RegisterDiscountCoupon';

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
  websiteSaleAllowCreditCardPayment = 'websiteSaleAllowCreditCardPayment',
  websiteSaleDebit = 'websiteSaleDebit',
  websiteSaleCredit = 'websiteSaleCredit',
  websiteSalePix = 'websiteSalePix',
  websiteSaleAdministrateTax = 'websiteSaleAdministrateTax',
  websiteSaleInstallments = 'websiteSaleInstallments',
  websiteSaleFee = 'websiteSaleFee',
  allowDiscountCoupon = 'allowDiscountCoupon',
  partialPayment = 'partialPayment',
  waiter = 'waiter',
  websiteSaleBankSlip = 'websiteSaleBankSlip',
}

export const ProductConfigContent: React.FC<
  Pick<SectorProductContainerProps, 'formConfigProduct' | 'formDiscountCoupon'>
> = ({ formConfigProduct, formDiscountCoupon }) => {
  const { formData, formErrors, onChangeFormInput } = formConfigProduct;

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

  return (
    <Fragment>
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <div className="container-event mb-4 p-2">
          <h5 className="mb-2 border-bottom-title mb-5">Taxa de cartão</h5>

          <p style={{ fontSize: '21px', fontWeight: '500' }}>Venda física</p>

          <FormGroup className="mb-2">
            <ButtonGroup
              label="Permitir venda com cartão?"
              name="physicalSaleAllowCreditCardPayment"
              value={formData[FormInputName.physicalSaleAllowCreditCardPayment]}
              onChange={e =>
                onChangeFormInput(FormInputName.physicalSaleAllowCreditCardPayment)(e.target.value)
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
              label="Débito"
              className="w-input-sm"
              addon="%"
              maxLength={5}
              value={formData[FormInputName.physicalSaleDebit]}
              placeholder="0"
              onChange={e =>
                onChangeFormInput(FormInputName.physicalSaleDebit)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={formErrors.physicalSaleDebit && formErrors.physicalSaleDebit[0]}
            />
            <InputText
              name="physicalSaleCredit"
              label="Crédito"
              className="w-input-sm"
              addon="%"
              maxLength={5}
              value={formData[FormInputName.physicalSaleCredit]}
              placeholder="0"
              onChange={e =>
                onChangeFormInput(FormInputName.physicalSaleCredit)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={formErrors.physicalSaleCredit && formErrors.physicalSaleCredit[0]}
            />
            <InputText
              name="physicalSalePix"
              label="PIX"
              className="w-input-sm"
              addon="%"
              maxLength={5}
              value={formData[FormInputName.physicalSalePix]}
              placeholder="0"
              onChange={e =>
                onChangeFormInput(FormInputName.physicalSalePix)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={formErrors.physicalSalePix && formErrors.physicalSalePix[0]}
            />
            <InputText
              name="physicalSaleAdministrateTax"
              label="Taxa administrativa"
              className="w-input-sm"
              addon="%"
              maxLength={5}
              value={formData[FormInputName.physicalSaleAdministrateTax]}
              placeholder="0"
              onChange={e =>
                onChangeFormInput(FormInputName.physicalSaleAdministrateTax)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={
                formErrors.physicalSaleAdministrateTax && formErrors.physicalSaleAdministrateTax[0]
              }
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
              error={formErrors.physicalSaleInstallments && formErrors.physicalSaleInstallments[0]}
              options={optionCount}
            />
            <span className="mt-5 mr-3 ml-3 input-label"> + </span>
            <InputText
              name="physicalSaleFee"
              label="Juros ao mês"
              className="w-input-sm"
              addon="%"
              placeholder="Ex: 4"
              maxLength={5}
              value={formData[FormInputName.physicalSaleFee]}
              onChange={e =>
                onChangeFormInput(FormInputName.physicalSaleFee)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={formErrors.physicalSaleFee && formErrors.physicalSaleFee[0]}
            />
          </div>

          <p style={{ fontSize: '21px', fontWeight: '500' }}>Venda e-commerce</p>

          <FormGroup className="mb-2">
            <ButtonGroup
              label="Permitir venda com cartão?"
              name="websiteSaleAllowCreditCardPayment"
              value={formData[FormInputName.websiteSaleAllowCreditCardPayment]}
              onChange={e =>
                onChangeFormInput(FormInputName.websiteSaleAllowCreditCardPayment)(e.target.value)
              }
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={
                formErrors.websiteSaleAllowCreditCardPayment &&
                formErrors.websiteSaleAllowCreditCardPayment[0]
              }
            />
          </FormGroup>
          <FormGroup>
            <InputText
              name="websiteSaleBankSlip"
              label="Boleto"
              className="w-input-sm"
              addon="%"
              maxLength={5}
              value={formData[FormInputName.websiteSaleBankSlip]}
              placeholder="0"
              onChange={e =>
                onChangeFormInput(FormInputName.websiteSaleBankSlip)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={formErrors.websiteSaleBankSlip && formErrors.websiteSaleBankSlip[0]}
            />
            <InputText
              name="websiteSaleCredit"
              label="Crédito"
              className="w-input-sm"
              addon="%"
              maxLength={5}
              value={formData[FormInputName.websiteSaleCredit]}
              placeholder="0"
              onChange={e =>
                onChangeFormInput(FormInputName.websiteSaleCredit)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={formErrors.websiteSaleCredit && formErrors.websiteSaleCredit[0]}
            />
            <InputText
              name="websiteSalePix"
              label="PIX"
              className="w-input-sm"
              addon="%"
              maxLength={5}
              value={formData[FormInputName.websiteSalePix]}
              placeholder="0"
              onChange={e =>
                onChangeFormInput(FormInputName.websiteSalePix)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={formErrors.websiteSalePix && formErrors.websiteSalePix[0]}
            />
            <InputText
              name="websiteSaleAdministrateTax"
              label="Taxa administrativa"
              className="w-input-sm"
              addon="%"
              maxLength={5}
              value={formData[FormInputName.websiteSaleAdministrateTax]}
              placeholder="0"
              onChange={e =>
                onChangeFormInput(FormInputName.websiteSaleAdministrateTax)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={
                formErrors.websiteSaleAdministrateTax && formErrors.websiteSaleAdministrateTax[0]
              }
            />
          </FormGroup>
          <div className="d-flex">
            <SelectCustom
              name="websiteSaleInstallments"
              label="Qtd parcelas"
              placeholder="Ex: 2"
              className="w-input-sm"
              value={formData[FormInputName.websiteSaleInstallments]}
              onChange={e =>
                onChangeFormInput(FormInputName.websiteSaleInstallments)(e?.value as string)
              }
              error={formErrors.websiteSaleInstallments && formErrors.websiteSaleInstallments[0]}
              options={optionCount}
            />
            <span className="mt-5 mr-3 ml-3 input-label"> + </span>
            <InputText
              name="websiteSaleFee"
              label="Juros ao mês"
              className="w-input-sm"
              addon="%"
              placeholder="Ex: 4"
              maxLength={5}
              value={formData[FormInputName.websiteSaleFee]}
              onChange={e =>
                onChangeFormInput(FormInputName.websiteSaleFee)(
                  e.target.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1'),
                )
              }
              error={formErrors.websiteSaleFee && formErrors.websiteSaleFee[0]}
            />
          </div>
          <div className="container-event mb-4">
            <h5 className="mb-2 border-bottom-title mb-5">Cupons e descontos</h5>
          </div>

          <FormGroup>
            <InputText
              name="waiter"
              label="Porcentagem do Garçom %"
              addon="%"
              placeholder="0"
              className="w-input-sm"
              maxLength={2}
              value={formData[FormInputName.waiter]}
              onChange={e =>
                onChangeFormInput(FormInputName.waiter)(e.target.value.replace(/\D/g, ''))
              }
              error={formErrors.waiter && formErrors.waiter[0]}
            />
            <ButtonGroup
              label="Pagamento parcial(rateio)?"
              name="partialPayment"
              value={formData[FormInputName.partialPayment]}
              onChange={e => onChangeFormInput(FormInputName.partialPayment)(e.target.value)}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={formErrors.partialPayment && formErrors.partialPayment[0]}
            />
            <ButtonGroup
              label="Permitir cupom de desconto?"
              name="allowDiscountCoupon"
              value={formData[FormInputName.allowDiscountCoupon]}
              onChange={e => onChangeFormInput(FormInputName.allowDiscountCoupon)(e.target.value)}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={formErrors.allowDiscountCoupon && formErrors.allowDiscountCoupon[0]}
            />
          </FormGroup>
        </div>
      </Form>
      {formData[FormInputName.allowDiscountCoupon] === 'true' ? (
        <RegisterDiscountCoupon formDiscountCoupon={formDiscountCoupon} />
      ) : null}
    </Fragment>
  );
};
