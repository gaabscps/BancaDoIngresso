/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import {
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  InputText,
  Loading,
  Radio,
  SelectCustom,
} from '@/components';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import TicketIcon from '@/assets/images/svg/Ticket';
import PaymentGateway from '@/model/PaymentGateway';
import { formPaymentSettingsProps } from '../../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorTicketMainSettingsContainerProps {
  state: States;
  formMainSettings: formPaymentSettingsProps;
  paymentGatewayList: PaymentGateway[] | undefined;
  title: string | React.ReactNode;
  visible: boolean;
  onToggle: () => void;
  handleOnSaveSectorTicketPayment: () => Promise<void>;
  onShouldShowModal: ({
    value,
    newTitleModal,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    event?: Event;
  }) => void;
  shouldShowModal: ShouldShowModal;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  posGateway = 'posGateway',
  websiteGateway = 'websiteGateway',
  websiteInstallmentLimit = 'websiteInstallmentLimit',
  posInstallmentLimit = 'posInstallmentLimit',
  allowFractionalPayment = 'allowFractionalPayment',
  allowVariableRate = 'allowVariableRate',
  allowVariableValue = 'allowVariableValue',
  allowPaymentBankSlip = 'allowPaymentBankSlip',
  allowPaymentPIX = 'allowPaymentPIX',
  allowContactlessPayment = 'allowContactlessPayment',
  allowSellingWebsite = 'allowSellingWebsite',
  allowSellingPos = 'allowSellingPos',
  printReceipt = 'printReceipt',
  physicalSaleAllowCreditCardPayment = 'physicalSaleAllowCreditCardPayment',
  physicalSaleDebit = 'physicalSaleDebit',
  physicalSaleCredit = 'physicalSaleCredit',
  physicalSalePix = 'physicalSalePix',
  physicalSaleAdministrateTax = 'physicalSaleAdministrateTax',
  physicalSaleInstallments = 'physicalSaleInstallments',
  physicalSaleFee = 'physicalSaleFee',
  websiteSaleAllowCreditCardPaymen = 'websiteSaleAllowCreditCardPaymen',
  websiteSaleDebit = 'websiteSaleDebit',
  websiteSaleCredit = 'websiteSaleCredit',
  websiteSalePix = 'websiteSalePix',
  websiteSaleAdministrateTax = 'websiteSaleAdministrateTax',
  websiteSaleInstallments = 'websiteSaleInstallments',
  websiteSaleFee = 'websiteSaleFee',
  allowDiscount = 'allowDiscount',
  allowDiscountCoupon = 'allowDiscountCoupon',
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

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  discountCoupons = 'discountCoupons',
}

export const SectorTicketPaymentSettingsContainer: React.FC<
  SectorTicketMainSettingsContainerProps
> = ({
  state,
  formMainSettings,
  paymentGatewayList,
  shouldShowModal,
  title,
  visible,
  onToggle,
  onShouldShowModal,
  handleOnSaveSectorTicketPayment,
}) => {
  const { formData, formErrors, onChangeFormInput } = formMainSettings;

  const paymentGatewayOptions = paymentGatewayList?.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const optionCount = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
  ];

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        actions={[
          {
            [ShouldShowModal.discountCoupons]: {
              title: 'Aplicar',
              onClick: () => undefined,
            },
            [ShouldShowModal.discountCoupons]: {},
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.discountCoupons]: ' ola',
          }[shouldShowModal]
        }
      </Dialog>
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
                    name="posGateway"
                    label="Gateway de pagamento POS"
                    placeholder="Gateway de pagamento POS"
                    value={formData[FormInputName.posGateway]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.posGateway)(e?.target?.value as string)
                    }
                    error={formErrors.posGateway && formErrors.posGateway[0]}
                    options={paymentGatewayOptions}
                  />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup className="mb-2">
                  <label className="input-label mb-4">Gateway de pagamento SITE</label>
                  {paymentGatewayList?.map(item => (
                    // eslint-disable-next-line react/jsx-key
                    <Checkbox
                      name={item.name}
                      label={item.name}
                      onChange={e => {
                        if (e.target.value === item.id) {
                          e.target.checked = true;
                          onChangeFormInput(item.name)(e.target.value);
                        } else {
                          onChangeFormInput(item.name)('');
                        }
                      }}
                    />
                  ))}
                </FormGroup>
              </Row>
            </Col>
            <label htmlFor="websiteInstallmentLimit" className="ml-3 input-label">
              Limite de parcelamento online
            </label>
            <Col md={4}>
              <Row>
                <FormGroup>
                  <SelectCustom
                    name="websiteInstallmentLimit"
                    label=""
                    placeholder="0"
                    value={formData[FormInputName.websiteInstallmentLimit]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.websiteInstallmentLimit)(
                        e?.target?.value as string,
                      )
                    }
                    error={
                      formErrors.websiteInstallmentLimit && formErrors.websiteInstallmentLimit[0]
                    }
                    options={optionCount}
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
                    name="posInstallmentLimit"
                    label=""
                    placeholder="0"
                    value={formData[FormInputName.posInstallmentLimit]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.posInstallmentLimit)(
                        e?.target?.value as string,
                      )
                    }
                    error={formErrors.posInstallmentLimit && formErrors.posInstallmentLimit[0]}
                    options={optionCount}
                  />
                </FormGroup>
              </Row>
            </Col>
            <Col>
              <Row>
                <FormGroup className="mb-2">
                  <ButtonGroup
                    label="Permitir pagamento fracionado?"
                    name="allowFractionalPayment"
                    value={formData[FormInputName.allowFractionalPayment]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.allowFractionalPayment)(e.target.value)
                    }
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={
                      formErrors.allowFractionalPayment && formErrors.allowFractionalPayment[0]
                    }
                  />
                  <ButtonGroup
                    label="Permitir taxa variavel?"
                    name="allowVariableRate"
                    value={formData[FormInputName.allowVariableRate]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.allowVariableRate)(e.target.value)
                    }
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.allowVariableRate && formErrors.allowVariableRate[0]}
                  />
                  <ButtonGroup
                    label="Permitir valor variavel?"
                    name="allowVariableValue"
                    value={formData[FormInputName.allowVariableValue]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.allowVariableValue)(e.target.value)
                    }
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.allowVariableValue && formErrors.allowVariableValue[0]}
                  />
                  <ButtonGroup
                    label="Permitir pagamento com PIX?"
                    name="allowPaymentPIX"
                    value={formData[FormInputName.allowPaymentPIX]}
                    onChange={e => onChangeFormInput(FormInputName.allowPaymentPIX)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.allowPaymentPIX && formErrors.allowPaymentPIX[0]}
                  />
                  <ButtonGroup
                    label="Permitir pagamento por aproximação?"
                    name="allowContactlessPayment"
                    value={formData[FormInputName.allowContactlessPayment]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.allowContactlessPayment)(e.target.value)
                    }
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={
                      formErrors.allowContactlessPayment && formErrors.allowContactlessPayment[0]
                    }
                  />
                  <ButtonGroup
                    label="Permitir vender online?"
                    name="allowSellingWebsite"
                    value={formData[FormInputName.allowSellingWebsite]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.allowSellingWebsite)(e.target.value)
                    }
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.allowSellingWebsite && formErrors.allowSellingWebsite[0]}
                  />
                  <ButtonGroup
                    label="Permitir vender na POS?"
                    name="allowSellingPos"
                    value={formData[FormInputName.allowSellingPos]}
                    onChange={e => onChangeFormInput(FormInputName.allowSellingPos)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.allowSellingPos && formErrors.allowSellingPos[0]}
                  />
                  <ButtonGroup
                    label="Imprimir recibo (POS)?"
                    name="printReceipt"
                    value={formData[FormInputName.printReceipt]}
                    onChange={e => onChangeFormInput(FormInputName.printReceipt)(e.target.value)}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                    error={formErrors.printReceipt && formErrors.printReceipt[0]}
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
          </Row>
        </Col>
        <Col md={1}>
          <Row>
            <FormGroup>
              <InputText
                name="physicalSaleDebit"
                label="Débito"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.physicalSaleDebit)(e.target.value)}
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
              <InputText
                name="physicalSaleCredit"
                label="Crédito"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.physicalSaleCredit)(e.target.value)}
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
              <InputText
                name="physicalSalePix"
                label="PIX"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.physicalSalePix)(e.target.value)}
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
              <InputText
                name="physicalSaleAdministrateTax"
                label="Taxa administrativa"
                value={''}
                placeholder="0"
                onChange={e =>
                  onChangeFormInput(FormInputName.physicalSaleAdministrateTax)(e.target.value)
                }
                disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
              />
            </FormGroup>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <SelectCustom
              name="physicalSaleInstallments"
              label="Qtd parcelas"
              placeholder="Ex: 2"
              value={formData[FormInputName.physicalSaleInstallments]}
              onChange={e =>
                onChangeFormInput(FormInputName.physicalSaleInstallments)(
                  e?.target?.value as string,
                )
              }
              error={formErrors.physicalSaleInstallments && formErrors.physicalSaleInstallments[0]}
              options={optionCount}
              disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
            />
            <span className="mt-5 mr-3 ml-3 input-label"> + </span>
            <SelectCustom
              name="physicalSaleFee"
              label="Juros ao mês"
              placeholder="Ex: 4"
              value={formData[FormInputName.physicalSaleFee]}
              onChange={e =>
                onChangeFormInput(FormInputName.physicalSaleFee)(e?.target?.value as string)
              }
              error={formErrors.physicalSaleFee && formErrors.physicalSaleFee[0]}
              options={optionCount}
              disabled={formData[FormInputName.physicalSaleAllowCreditCardPayment] !== 'true'}
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
                name="websiteSaleAllowCreditCardPaymen"
                value={formData[FormInputName.websiteSaleAllowCreditCardPaymen]}
                onChange={e =>
                  onChangeFormInput(FormInputName.websiteSaleAllowCreditCardPaymen)(e.target.value)
                }
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
                error={
                  formErrors.websiteSaleAllowCreditCardPaymen &&
                  formErrors.websiteSaleAllowCreditCardPaymen[0]
                }
              />
            </FormGroup>
          </Row>
        </Col>
        <Col md={1}>
          <Row>
            <FormGroup>
              <InputText
                name="websiteSaleDebit"
                label="Débito"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.websiteSaleDebit)(e.target.value)}
                disabled={formData[FormInputName.websiteSaleAllowCreditCardPaymen] !== 'true'}
              />
              <InputText
                name="websiteSaleCredit"
                label="Crédito"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.websiteSaleCredit)(e.target.value)}
                disabled={formData[FormInputName.websiteSaleAllowCreditCardPaymen] !== 'true'}
              />
              <InputText
                name="websiteSalePix"
                label="PIX"
                value={''}
                placeholder="0"
                onChange={e => onChangeFormInput(FormInputName.websiteSalePix)(e.target.value)}
                disabled={formData[FormInputName.websiteSaleAllowCreditCardPaymen] !== 'true'}
              />
              <InputText
                name="websiteSaleAdministrateTax"
                label="Taxa administrativa"
                value={''}
                placeholder="0"
                onChange={e =>
                  onChangeFormInput(FormInputName.websiteSaleAdministrateTax)(e.target.value)
                }
                disabled={formData[FormInputName.websiteSaleAllowCreditCardPaymen] !== 'true'}
              />
            </FormGroup>
          </Row>
        </Col>
        <Col md={6}>
          <Row>
            <SelectCustom
              name="websiteSaleInstallments"
              label="Qtd parcelas"
              placeholder="Ex: 2"
              value={formData[FormInputName.websiteSaleInstallments]}
              onChange={e =>
                onChangeFormInput(FormInputName.websiteSaleInstallments)(e?.target?.value as string)
              }
              error={formErrors.websiteSaleInstallments && formErrors.websiteSaleInstallments[0]}
              options={optionCount}
              disabled={formData[FormInputName.websiteSaleAllowCreditCardPaymen] !== 'true'}
            />
            <span className="mt-5 mr-3 ml-3 input-label"> + </span>
            <SelectCustom
              name="websiteSaleFee"
              label="Juros ao mês"
              placeholder="Ex: 4"
              value={formData[FormInputName.websiteSaleFee]}
              onChange={e =>
                onChangeFormInput(FormInputName.websiteSaleFee)(e?.target?.value as string)
              }
              error={formErrors.websiteSaleFee && formErrors.websiteSaleFee[0]}
              options={optionCount}
              disabled={formData[FormInputName.websiteSaleAllowCreditCardPaymen] !== 'true'}
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
                name="allowDiscount"
                value={formData[FormInputName.allowDiscount]}
                onChange={e => onChangeFormInput(FormInputName.allowDiscount)(e.target.value)}
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
                error={formErrors.allowDiscount && formErrors.allowDiscount[0]}
              />
              <ButtonGroup
                label="Permitir cupom de desconto??"
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
          </Row>
        </Col>
        <Col md={12}>
          <SuperCollapse
            title="Cupons de desconto adicionados (0)"
            content="Nenhum cupom de desconto foi adicionado. Aqui será exibida uma lista dos seus cupons de desconto adicionados"
            leftIcon={TicketIcon}
          />
        </Col>
        <div
          onClick={() =>
            onShouldShowModal({
              newTitleModal: 'Cadastrar voucher de desconto',
              value: ShouldShowModal.discountCoupons,
            })
          }
        >
          + cadastrar
        </div>
        <Button title="teste" onClick={() => handleOnSaveSectorTicketPayment()} />
      </Container>
    </Fragment>
  );
};
