/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-body-style */
import React from 'react';
import { ButtonGroup, InputText } from '@/components';
import DiscountCoupon from '@/model/DiscountCoupon';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Card, Col, Form, FormGroup, Row } from 'reactstrap';
import { CustomTable } from '@/components/Table';
import { X } from 'react-feather';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import ProductIcon from '@/assets/images/svg/Product';
import { comboRequestProps, formComboConfigProps, formDiscountCouponProps } from '../../types';

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
}

// eslint-disable-next-line no-shadow
export enum FormInputNameDiscountCoupon {
  discountType = 'discountType',
  discountsName = 'discountsName',
  discountsCode = 'discountsCode',
  discountsAmount = 'discountsAmount',
  discountsDiscount = 'discountsDiscount',
}

interface RegisterContentProps {
  discountCouponList: DiscountCoupon[];
  controllerFormComboConfig: formComboConfigProps;
  controllerFormDiscountCoupon: formDiscountCouponProps;
  comboRequests: comboRequestProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comboStates: any;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  description = 'description',
  value = 'value',
}

export const RegisterContentComboConfig: React.FC<RegisterContentProps> = ({
  controllerFormDiscountCoupon: { onChangeFormInputDiscount, formDataDiscount, formErrorsDiscount },
  controllerFormComboConfig: {
    onChangeFormInputComboConfig,
    formDataComboConfig,
    formErrorsComboConfig,
  },
  comboRequests: { saveDiscountCoupon, removeDiscountCoupon },

  comboStates,
  discountCouponList,
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
                error={formErrorsComboConfig.formPrinting && formErrorsComboConfig.formPrinting[0]}
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
                error={formErrorsComboConfig.hasCourtesy && formErrorsComboConfig.hasCourtesy[0]}
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
                error={
                  formErrorsComboConfig.physicalSaleAllowCreditCardPayment &&
                  formErrorsComboConfig.physicalSaleAllowCreditCardPayment[0]
                }
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
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleDebit]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleDebit)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="0"
                error={
                  formErrorsComboConfig.physicalSaleDebit &&
                  formErrorsComboConfig.physicalSaleDebit[0]
                }
              />
              <InputText
                name="physicalSaleCredit"
                label="Crédito %"
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleCredit]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleCredit)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="0"
                error={
                  formErrorsComboConfig.physicalSaleCredit &&
                  formErrorsComboConfig.physicalSaleCredit[0]
                }
              />
              <InputText
                name="physicalSalePix"
                label="PIX"
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSalePix]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSalePix)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="0"
                error={
                  formErrorsComboConfig.physicalSalePix && formErrorsComboConfig.physicalSalePix[0]
                }
              />
              <InputText
                name="physicalSaleAdministrateTax"
                label="Taxa administrativa"
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleAdministrateTax]}
                onChange={e =>
                  onChangeFormInputComboConfig(
                    FormInputNameComboConfig.physicalSaleAdministrateTax,
                  )(e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string)
                }
                placeholder="0"
                error={
                  formErrorsComboConfig.physicalSaleAdministrateTax &&
                  formErrorsComboConfig.physicalSaleAdministrateTax[0]
                }
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
                error={
                  formErrorsComboConfig.physicalSaleInstallments &&
                  formErrorsComboConfig.physicalSaleInstallments[0]
                }
              />
            </FormGroup>
          </Col>
          <Col className="ml-5" md={2}>
            <FormGroup>
              <InputText
                name="physicalSaleFee"
                label="Juros ao mês"
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.physicalSaleFee]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleFee)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="Ex: 4"
                error={
                  formErrorsComboConfig.physicalSaleFee && formErrorsComboConfig.physicalSaleFee[0]
                }
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
                error={
                  formErrorsComboConfig.websiteSaleAllowCreditCardPayment &&
                  formErrorsComboConfig.websiteSaleAllowCreditCardPayment[0]
                }
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
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSaleBankSlip]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleBankSlip)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="0"
                error={
                  formErrorsComboConfig.websiteSaleBankSlip &&
                  formErrorsComboConfig.websiteSaleBankSlip[0]
                }
              />
              <InputText
                name="websiteSaleCredit"
                label="Crédito %"
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSaleCredit]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleCredit)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="0"
                error={
                  formErrorsComboConfig.websiteSaleCredit &&
                  formErrorsComboConfig.websiteSaleCredit[0]
                }
              />
              <InputText
                name="websiteSalePix"
                label="PIX"
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSalePix]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSalePix)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="0"
                error={
                  formErrorsComboConfig.websiteSalePix && formErrorsComboConfig.websiteSalePix[0]
                }
              />
              <InputText
                name="websiteSaleAdministrateTax"
                label="Taxa administrativa"
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSaleAdministrateTax]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleAdministrateTax)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="0"
                error={
                  formErrorsComboConfig.websiteSaleAdministrateTax &&
                  formErrorsComboConfig.websiteSaleAdministrateTax[0]
                }
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <InputText
                name="websiteSaleInstallments"
                label="Qtd parcelas"
                maxLength={2}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSaleInstallments]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleInstallments)(
                    e?.target?.value as string,
                  )
                }
                placeholder="Ex: 2"
                error={
                  formErrorsComboConfig.websiteSaleInstallments &&
                  formErrorsComboConfig.websiteSaleInstallments[0]
                }
              />
            </FormGroup>
          </Col>
          <Col className="ml-5" md={2}>
            <FormGroup>
              <InputText
                name="websiteSaleFee"
                label="Juros ao mês"
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.websiteSaleFee]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleFee)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="Ex: 4"
                error={
                  formErrorsComboConfig.websiteSaleFee && formErrorsComboConfig.websiteSaleFee[0]
                }
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
                addon="%"
                maxLength={5}
                value={formDataComboConfig[FormInputNameComboConfig.waiter]}
                onChange={e =>
                  onChangeFormInputComboConfig(FormInputNameComboConfig.waiter)(
                    e?.target?.value.replace(/\D/g, '').replace(/(\d{2})$/, '.$1') as string,
                  )
                }
                placeholder="0"
                error={formErrorsComboConfig.waiter && formErrorsComboConfig.waiter[0]}
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
                error={
                  formErrorsComboConfig.partialPayment && formErrorsComboConfig.partialPayment[0]
                }
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
                error={
                  formErrorsComboConfig.allowDiscountCoupon &&
                  formErrorsComboConfig.allowDiscountCoupon[0]
                }
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
      {formDataComboConfig.allowDiscountCoupon === 'true' || discountCouponList.length > 0 ? (
        <>
          <Card className="card__main-container">
            <Form
              style={{ backgroundColor: '#f1f1f1' }}
              noValidate={true}
              onSubmit={(e): void => {
                e.preventDefault();
              }}
            >
              <>
                <div className="p-3 pt-5" style={{ backgroundColor: '#fff', borderRadius: '5px' }}>
                  <Row>
                    <Col md={6}>
                      <FormGroup className="mb-2">
                        <InputText
                          name="name"
                          label="Nome do código"
                          placeholder="Digite o nome do cógio. Ex: Whisky para João"
                          value={formDataDiscount[FormInputNameDiscountCoupon.discountsName]}
                          onChange={e =>
                            onChangeFormInputDiscount(FormInputNameDiscountCoupon.discountsName)(
                              e?.target?.value as string,
                            )
                          }
                          error={
                            formErrorsDiscount.discountsName && formErrorsDiscount.discountsName[0]
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="mb-2">
                        <InputText
                          name="code"
                          label="Código do desconto"
                          placeholder="Ex: JAO50"
                          value={formDataDiscount[FormInputNameDiscountCoupon.discountsCode]}
                          onChange={e =>
                            onChangeFormInputDiscount(FormInputNameDiscountCoupon.discountsCode)(
                              e?.target?.value as string,
                            )
                          }
                          error={
                            formErrorsDiscount.discountsCode && formErrorsDiscount.discountsCode[0]
                          }
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
                          value={formDataDiscount[FormInputNameDiscountCoupon.discountsAmount]}
                          onChange={e =>
                            onChangeFormInputDiscount(FormInputNameDiscountCoupon.discountsAmount)(
                              e?.target?.value as string,
                            )
                          }
                          error={
                            formErrorsDiscount.discountsAmount &&
                            formErrorsDiscount.discountsAmount[0]
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col className="ml-4 mr-2" md={3}>
                      <ButtonGroup
                        style={{ width: 'fit-content' }}
                        name="discountType"
                        label="Tipo"
                        value={formDataDiscount[FormInputNameDiscountCoupon.discountType]}
                        onChange={e =>
                          onChangeFormInputDiscount(FormInputNameDiscountCoupon.discountType)(
                            e?.target?.value as string,
                          )
                        }
                        error={
                          formErrorsDiscount.discountType && formErrorsDiscount.discountType[0]
                        }
                        options={[
                          { value: 0, label: 'R$' },
                          { value: 1, label: '%' },
                        ]}
                      />
                    </Col>
                    <Col md={4} sm={4}>
                      <FormGroup className="mb-2">
                        <InputText
                          className={
                            !formDataDiscount[FormInputNameDiscountCoupon.discountType]
                              ? 'input__disabled'
                              : ''
                          }
                          name="discount"
                          type="number"
                          label="Valor do desconto"
                          placeholder="R$40,00 ou 50% "
                          value={formDataDiscount[FormInputNameDiscountCoupon.discountsDiscount]}
                          onChange={e =>
                            onChangeFormInputDiscount(
                              FormInputNameDiscountCoupon.discountsDiscount,
                            )(
                              e?.target?.value
                                .replace(/\D/g, '')
                                .replace(/(\d{2})$/, '.$1') as string,
                            )
                          }
                          error={
                            formErrorsDiscount.discountsDiscount &&
                            formErrorsDiscount.discountsDiscount[0]
                          }
                          disabled={!formDataDiscount[FormInputNameDiscountCoupon.discountType]}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center w-100 mr-3 mb-4">
                      <Trash className="svg-icon action-icon" />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div
                        onClick={() => {
                          saveDiscountCoupon(comboStates.comboState);
                        }}
                        className="action-icon mb-3 register-buttom d-flex justify-content-end align-items-center"
                      >
                        + adicionar cupom de desconto
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="p-3" />
              </>
            </Form>
          </Card>
          <SuperCollapse
            title={`Códigos de desconto adicionados`}
            count={discountCouponList.length}
            leftIcon={ProductIcon}
            content={
              discountCouponList.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                discountCouponList.map((discount: any, index) => (
                  <>
                    {index > 0 ? <hr style={{ margin: '25px -30px 30px -50px' }} /> : null}
                    <div className="mb-4">
                      <span className="secondary-table-title" style={{ fontWeight: '300' }}>
                        Código de desconto #{index + 1}
                      </span>
                      <span className="secondary-table-title" style={{ fontWeight: '500' }}>
                        <b> • </b> {discount.code}
                      </span>
                    </div>
                    <CustomTable
                      numberRowsPerPage={0}
                      progressPending={false}
                      theme="secondaryWithoutBorder"
                      columns={[
                        {
                          name: 'Código do desconto',
                          selector: row => row.code,
                        },
                        {
                          name: 'Quant. código',
                          selector: row => row.amount,
                        },
                        {
                          name: 'Valor do desconto',
                          selector: row => row.discount,
                        },
                        {
                          name: (
                            <div className="d-flex justify-content-center align-items-center">
                              <X
                                onClick={() => {
                                  removeDiscountCoupon(comboStates.comboState, discount);
                                }}
                                size={20}
                                className="svg-icon action-icon"
                              />
                            </div>
                          ),
                          selector: row => row.actions,
                          right: true,
                        },
                      ]}
                      data={
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        discountCouponList.map((item: any) => {
                          return {
                            code: item.code,
                            amount: item.amount,
                            discount: item.discount,
                          };
                        }) || []
                      }
                    />
                  </>
                ))
              ) : (
                <div>
                  Nenhum cupom de desconto cadastrado. Aqui será exibida uma lista dos cupons de
                  desconto cadastrados
                </div>
              )
            }
          />
        </>
      ) : null}
    </>
  );
};
