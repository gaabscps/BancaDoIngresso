/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-body-style */
import React from 'react';
import { ButtonGroup, InputText } from '@/components';
import DiscountCoupon from '@/model/DiscountCoupon';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Card, Col, Form, FormGroup, Row } from 'reactstrap';
import { formComboConfigProps } from '../../types';

export interface DataRow {
  id: string;
  description: string;
  value: number;
  user: string;
  code: string;
  actions: string;
}

// eslint-disable-next-line no-shadow
export enum FormInputNameComboConfig {
  formPrinting = 'formPrinting',
  hasCourtesy = 'hasCourtesy',
  physicalSaleAllowCreditCardPayment = 'physicalSaleAllowCreditCardPayment',
  physicalSaleDebit = 'physicalSaleDebit',
  physicalSaleCredit = 'physicalSaleCredit',
  physicalSaleBankSlip = 'physicalSaleBankSlip',
  physicalSalePix = 'physicalSalePix',
  physicalSaleAdministrateTax = 'physicalSaleAdministrateTax',
  physicalSaleInstallments = 'physicalSaleInstallments',
  physicalSaleFee = 'physicalSaleFee',
  websiteSaleAllowCreditCardPayment = 'websiteSaleAllowCreditCardPayment',
  websiteSaleDebit = 'websiteSaleDebit',
  websiteSaleCredit = 'websiteSaleCredit',
  websiteSaleBankSlip = 'websiteSaleBankSlip',
  websiteSalePix = 'websiteSalePix',
  websiteSaleAdministrateTax = 'websiteSaleAdministrateTax',
  websiteSaleInstallments = 'websiteSaleInstallments',
  websiteSaleFee = 'websiteSaleFee',
  waiter = 'waiter',
  partialPayment = 'partialPayment',
  allowDiscountCoupon = 'allowDiscountCoupon',
  discountsName = 'discountsName',
  discountsCode = 'discountsCode',
  discountsAmount = 'discountsAmount',
  discountsDiscount = 'discountsDiscount',
}
interface RegisterContentProps {
  handleAddDiscountCoupon: () => void;
  handleChangeDiscountCoupon: (name: string, index: number, value: string) => void;
  handleRemoveDiscountCoupon: (index: number) => void;
  discountCoupon: DiscountCoupon[];
  controllerFormComboConfig: formComboConfigProps;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  description = 'description',
  value = 'value',
}

export const RegisterContentComboConfig: React.FC<RegisterContentProps> = ({
  handleAddDiscountCoupon,
  handleChangeDiscountCoupon,
  handleRemoveDiscountCoupon,
  discountCoupon,
  controllerFormComboConfig: {
    onChangeFormInputComboConfig,
    formDataComboConfig,
    // formErrorsComboConfig,
  },
}) => {
  return (
    <>
      <Form>
        <Row>
          <Col md={8}>
            <FormGroup className="mb-2">
              <ButtonGroup
                name="formPrinting"
                label="Impressão da ficha por Item ou Total?"
                value={formDataComboConfig[FormInputNameComboConfig.formPrinting]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.formPrinting)(
                    e?.target?.value as string,
                  )
                }
                options={[
                  { value: 0, label: 'Item' },
                  { value: 1, label: 'Total' },
                ]}
              />
              <ButtonGroup
                name="hasCourtesy"
                label="Permitir cortesia?"
                value={formDataComboConfig[FormInputNameComboConfig.hasCourtesy]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.hasCourtesy)(
                    e?.target?.value as string,
                  )
                }
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
              />
              <div className="mb-4 border-bottom-title w-100">
                <h5 className="mb-2mb-5">Taxas de cartão</h5>
              </div>
              <h6 className="mb-5 mt-5" style={{ fontWeight: '500' }}>
                Venda física
              </h6>
              <ButtonGroup
                name="physicalSaleAllowCreditCardPayment"
                label="Permitir venda com cartão? "
                value={
                  formDataComboConfig[FormInputNameComboConfig.physicalSaleAllowCreditCardPayment]
                }
                onChange={e =>
                  onChangeFormInputComboConfig(
                    FormInputNameComboConfig.physicalSaleAllowCreditCardPayment,
                  )(e?.target?.value as string)
                }
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <InputText
                name="physicalSaleDebit"
                label="Debito %"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleDebit]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleDebit)(
                    e?.target?.value as string,
                  )
                }
                placeholder="0"
              />
              <InputText
                name="physicalSaleCredit"
                label="Crédito %"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleCredit]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleCredit)(
                    e?.target?.value as string,
                  )
                }
                placeholder="0"
              />
              <InputText
                name="physicalSalePix"
                label="PIX"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSalePix]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSalePix)(
                    e?.target?.value as string,
                  )
                }
                placeholder="0"
              />
              <InputText
                name="physicalSaleAdministrateTax"
                label="Taxa administrativa"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleAdministrateTax]}
                onChange={e =>
                  onChangeFormInputComboConfig(
                    FormInputNameComboConfig.physicalSaleAdministrateTax,
                  )(e?.target?.value as string)
                }
                placeholder="0"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <InputText
                name="physicalSaleInstallments"
                label="Qtd parcelas"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleInstallments]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleInstallments)(
                    e?.target?.value as string,
                  )
                }
                placeholder="Ex: 2"
              />
            </FormGroup>
          </Col>
          <Col className="ml-5" md={2}>
            <FormGroup>
              <InputText
                name="physicalSaleFee"
                label="Juros ao mês"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleFee]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleFee)(
                    e?.target?.value as string,
                  )
                }
                placeholder="Ex: 4"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 className="mb-5 mt-5" style={{ fontWeight: '500' }}>
              Venda e-commerce
            </h6>
            <FormGroup>
              <ButtonGroup
                name="websiteSaleAllowCreditCardPayment"
                label="Permitir venda com cartão? "
                value={
                  formDataComboConfig[FormInputNameComboConfig.websiteSaleAllowCreditCardPayment]
                }
                onChange={e =>
                  onChangeFormInputComboConfig(
                    FormInputNameComboConfig.websiteSaleAllowCreditCardPayment,
                  )(e?.target?.value as string)
                }
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <InputText
                name="websiteSaleBankSlip"
                label="Boleto %"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSaleBankSlip]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleBankSlip)(
                    e?.target?.value as string,
                  )
                }
                placeholder="0"
              />
              <InputText
                name="websiteSaleCredit"
                label="Crédito %"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSaleCredit]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleCredit)(
                    e?.target?.value as string,
                  )
                }
                placeholder="0"
              />
              <InputText
                name="websiteSalePix"
                label="PIX"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSalePix]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSalePix)(
                    e?.target?.value as string,
                  )
                }
                placeholder="0"
              />
              <InputText
                name="websiteSaleAdministrateTax"
                label="Taxa administrativa"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSaleAdministrateTax]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleAdministrateTax)(
                    e?.target?.value as string,
                  )
                }
                placeholder="0"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <InputText
                name="physicalSaleInstallments"
                label="Qtd parcelas"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleInstallments]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleInstallments)(
                    e?.target?.value as string,
                  )
                }
                placeholder="Ex: 2"
              />
            </FormGroup>
          </Col>
          <Col className="ml-5" md={2}>
            <FormGroup>
              <InputText
                name="physicalSaleFee"
                label="Juros ao mês"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleFee]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleFee)(
                    e?.target?.value as string,
                  )
                }
                placeholder="Ex: 4"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <div className="mb-4 border-bottom-title w-100">
              <h5 className="mb-2mb-5">Informações complementares</h5>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <InputText
                name="waiter"
                label="Porcentagem do Garçom (%)"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.waiter]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.waiter)(
                    e?.target?.value as string,
                  )
                }
                placeholder="0"
              />
              <ButtonGroup
                name="partialPayment"
                label="Pagamento parcial(rateio)?"
                value={formDataComboConfig[FormInputNameComboConfig.partialPayment]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.partialPayment)(
                    e?.target?.value as string,
                  )
                }
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
              />
              <ButtonGroup
                name="allowDiscountCoupon"
                label="Permitir código de desconto?"
                value={formDataComboConfig[FormInputNameComboConfig.allowDiscountCoupon]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.allowDiscountCoupon)(
                    e?.target?.value as string,
                  )
                }
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              onClick={() => {
                handleAddDiscountCoupon();
              }}
              className="action-icon mb-5 register-buttom"
            >
              + adicionar cupom de desconto
            </div>
          </Col>
        </Row>
      </Form>
      <Card className="card__main-container">
        <Form
          style={{ backgroundColor: '#f1f1f1' }}
          noValidate={true}
          onSubmit={(e): void => {
            e.preventDefault();
          }}
        >
          {discountCoupon.map((item, index) => (
            <>
              <div
                className="p-3 pt-5"
                style={{ backgroundColor: '#fff', borderRadius: '5px' }}
                key={index}
              >
                <Row>
                  <Col md={6}>
                    <FormGroup className="mb-2">
                      <InputText
                        name="name"
                        label="Nome do código"
                        placeholder="Digite o nome do cógio. Ex: Whisky para João"
                        value={item.name}
                        onChange={e => handleChangeDiscountCoupon('name', index, e?.target.value)}
                        error={undefined}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup className="mb-2">
                      <InputText
                        name="code"
                        label="Código do desconto"
                        placeholder="Ex: JAO50"
                        value={item.code}
                        onChange={e => handleChangeDiscountCoupon('code', index, e?.target.value)}
                        error={undefined}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-2 mr-5" md={2} sm={4}>
                    <FormGroup>
                      <InputText
                        name="amount"
                        type="number"
                        label="Quant. código"
                        placeholder="0"
                        value={String(item.amount)}
                        onChange={e => handleChangeDiscountCoupon('amount', index, e?.target.value)}
                        error={undefined}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="ml-4 mr-2" md={3}>
                    <ButtonGroup
                      style={{ width: 'fit-content' }}
                      name=""
                      label="Tipo"
                      value={0}
                      onChange={() => undefined}
                      options={[
                        { value: 0, label: 'R$' },
                        { value: 1, label: '%' },
                      ]}
                    />
                  </Col>
                  <Col md={4} sm={4}>
                    <FormGroup className="mb-2">
                      <InputText
                        name="discount"
                        type="number"
                        label="Valor do desconto"
                        placeholder="R$40,00 ou 50% "
                        value={String(item.discount)}
                        onChange={e =>
                          handleChangeDiscountCoupon('discount', index, e?.target.value)
                        }
                        error={undefined}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center w-100 mr-3 mb-4">
                    <Trash
                      className="svg-icon action-icon"
                      onClick={() => handleRemoveDiscountCoupon(index)}
                    />
                  </Col>
                </Row>
              </div>
              <div className="p-3" />
            </>
          ))}
        </Form>
      </Card>
    </>
  );
};
