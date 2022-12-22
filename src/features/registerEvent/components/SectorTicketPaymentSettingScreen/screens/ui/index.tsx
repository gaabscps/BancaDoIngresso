/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, ButtonGroup, Dialog, InputText, Loading, Radio, SelectCustom } from '@/components';
import { Container, Form, FormGroup } from 'reactstrap';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import TicketIcon from '@/assets/images/svg/Ticket';
import PaymentGateway from '@/model/PaymentGateway';
import DiscountCoupon from '@/model/DiscountCoupon';
import { ActionProps } from '@/components/Dialog';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { CustomTable } from '@/components/Table';
import { X } from 'react-feather';
import BackOnTop from '@/components/sharedComponents/BackOnTop';
import { formPaymentSettingsProps, PaymentSettingsActionsProps } from '../../types';
import { RegisterDiscountCoupon } from '../../components/RegisterDiscountCoupon';
import { columnsDiscountCoupon } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface DataRowDiscountCoupon {
  id: string;
  name: string;
  code: string;
  amount: string;
  discount: string;
  actions: string;
}

interface SectorTicketMainSettingsContainerProps {
  state: States;
  controllerFormPaymentSettings: formPaymentSettingsProps;
  paymentGatewayList: PaymentGateway[] | undefined;
  title: string | React.ReactNode;
  visible: boolean;
  discountCoupon: DiscountCoupon[];
  listDiscountCoupon: DiscountCoupon[];
  handleOnDiscountCoupon: () => Promise<void>;
  handleChangeDiscountCoupon: (name: string, index: number, value: string) => void;
  handleAddDiscountCoupon: () => void;
  onToggle: () => void;
  handleRemoveDiscountCoupon: (index: number) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    event?: Event;
  }) => void;
  shouldShowModal: ShouldShowModal;
  backTab: () => void;
  nextTab: () => void;
  paymentSettingsActions: PaymentSettingsActionsProps;
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
  websiteSaleAllowCreditCardPayment = 'websiteSaleAllowCreditCardPayment',
  websiteSaleBankSlip = 'websiteSaleBankSlip',
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
  controllerFormPaymentSettings,
  paymentGatewayList,
  shouldShowModal,
  title,
  visible,
  discountCoupon,
  listDiscountCoupon,
  handleOnDiscountCoupon,
  handleRemoveDiscountCoupon,
  handleChangeDiscountCoupon,
  handleAddDiscountCoupon,
  onToggle,
  onShouldShowModal,
  paymentSettingsActions,
}) => {
  const { formData, formErrors, onChangeFormInput } = controllerFormPaymentSettings;

  const paymentGatewayOptions = paymentGatewayList?.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const renderActionDialogToCancelDiscountCoupon: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

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
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        actions={[
          {
            [ShouldShowModal.discountCoupons]: renderActionDialogToCancelDiscountCoupon,
          }[shouldShowModal],
          {
            [ShouldShowModal.discountCoupons]: {
              title: 'Adicionar cupons',
              onClick: () => {
                handleOnDiscountCoupon();
              },
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.discountCoupons]: (
              <RegisterDiscountCoupon
                handleRemoveDiscountCoupon={handleRemoveDiscountCoupon}
                handleAddDiscountCoupon={handleAddDiscountCoupon}
                discountCoupon={discountCoupon}
                handleChangeDiscountCoupon={handleChangeDiscountCoupon}
              />
            ),
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

            <FormGroup className="mb-2">
              <Radio
                name="websiteGateway"
                label="Gateway de pagamento SITE"
                placeholder="Gateway de pagamento SITE"
                value={formData[FormInputName.websiteGateway]}
                onChange={e =>
                  onChangeFormInput(FormInputName.websiteGateway)(e?.target?.value as string)
                }
                error={formErrors.websiteGateway && formErrors.websiteGateway[0]}
                options={paymentGatewayOptions}
              />
            </FormGroup>

            <label htmlFor="websiteInstallmentLimit" className="input-label">
              Limite de parcelamento online
            </label>

            <FormGroup>
              <SelectCustom
                name="websiteInstallmentLimit"
                label=""
                placeholder="0"
                className="w-input-sm"
                value={formData[FormInputName.websiteInstallmentLimit]}
                onChange={e =>
                  onChangeFormInput(FormInputName.websiteInstallmentLimit)(e?.value as string)
                }
                error={formErrors.websiteInstallmentLimit && formErrors.websiteInstallmentLimit[0]}
                options={optionLimiteCount}
              />
            </FormGroup>

            <label htmlFor="" className="input-label">
              Limite de parcelamento POS
            </label>

            <FormGroup>
              <SelectCustom
                name="posInstallmentLimit"
                label=""
                placeholder="0"
                className="w-input-sm"
                value={formData[FormInputName.posInstallmentLimit]}
                onChange={e =>
                  onChangeFormInput(FormInputName.posInstallmentLimit)(e?.value as string)
                }
                error={formErrors.posInstallmentLimit && formErrors.posInstallmentLimit[0]}
                options={optionLimiteCount}
              />
            </FormGroup>

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
                error={formErrors.allowFractionalPayment && formErrors.allowFractionalPayment[0]}
              />
              <ButtonGroup
                label="Permitir taxa variável?"
                name="allowVariableRate"
                value={formData[FormInputName.allowVariableRate]}
                onChange={e => onChangeFormInput(FormInputName.allowVariableRate)(e.target.value)}
                options={[
                  { value: true, label: 'Sim' },
                  { value: false, label: 'Não' },
                ]}
                error={formErrors.allowVariableRate && formErrors.allowVariableRate[0]}
              />
              <ButtonGroup
                label="Permitir valor variável?"
                name="allowVariableValue"
                value={formData[FormInputName.allowVariableValue]}
                onChange={e => onChangeFormInput(FormInputName.allowVariableValue)(e.target.value)}
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
                error={formErrors.allowContactlessPayment && formErrors.allowContactlessPayment[0]}
              />
              <ButtonGroup
                label="Permitir vender online?"
                name="allowSellingWebsite"
                value={formData[FormInputName.allowSellingWebsite]}
                onChange={e => onChangeFormInput(FormInputName.allowSellingWebsite)(e.target.value)}
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
          </Form>
        </div>

        <div className="container-event mb-4">
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
            <SelectCustom
              name="physicalSaleFee"
              label="Juros ao mês"
              className="w-input-sm"
              placeholder="Ex: 4"
              value={formData[FormInputName.physicalSaleFee]}
              onChange={e => onChangeFormInput(FormInputName.physicalSaleFee)(e?.value as string)}
              error={formErrors.physicalSaleFee && formErrors.physicalSaleFee[0]}
              options={optionLimiteCount}
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
            <SelectCustom
              name="websiteSaleFee"
              label="Juros ao mês"
              className="w-input-sm"
              placeholder="Ex: 4"
              value={formData[FormInputName.websiteSaleFee]}
              onChange={e => onChangeFormInput(FormInputName.websiteSaleFee)(e?.value as string)}
              error={formErrors.websiteSaleFee && formErrors.websiteSaleFee[0]}
              options={optionLimiteCount}
            />
          </div>
          <div className="container-event mb-4">
            <h5 className="mb-2 border-bottom-title mb-5">Cupons e descontos</h5>
          </div>

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
              label="Permitir cupom de desconto?"
              name="allowDiscountCoupon"
              value={formData[FormInputName.allowDiscountCoupon]}
              onChange={e => onChangeFormInput(FormInputName.allowDiscountCoupon)(e.target.value)}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={formErrors.allowDiscountCoupon && formErrors.allowDiscountCoupon[0]}
              disabled={formData[FormInputName.allowDiscount] !== 'true'}
            />
          </FormGroup>
        </div>

        {formData[FormInputName.allowDiscountCoupon] === 'true' &&
        formData[FormInputName.allowDiscount] === 'true' ? (
          <div
            onClick={() =>
              onShouldShowModal({
                newTitleModal: 'Adicionar cupom de desconto',
                value: ShouldShowModal.discountCoupons,
              })
            }
            className="action-icon mb-5 register-buttom"
          >
            + adicionar cupom de desconto
          </div>
        ) : null}

        <SuperCollapse
          disabled={formData[FormInputName.allowDiscount] !== 'true'}
          title={`Cupons de desconto adicionados`}
          content={
            listDiscountCoupon.length > 0 ? (
              listDiscountCoupon.map((item, index) => (
                <>
                  <span className="secondary-table-title">Cupom #{index + 1}</span>
                  <span className="secondary-table-title name">
                    <b> ·</b> {item.name}
                  </span>
                  <CustomTable
                    numberRowsPerPage={0}
                    progressPending={false}
                    columns={columnsDiscountCoupon}
                    data={[
                      {
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        amount: item.amount,
                        discount: item.discount,
                        actions: (
                          <React.Fragment>
                            <Pen
                              className="mr-4 svg-icon action-icon"
                              onClick={(): void =>
                                onShouldShowModal({
                                  value: ShouldShowModal.discountCoupons,
                                  newTitleModal: (
                                    <div className="d-flex">
                                      <div
                                        className="m-auto"
                                        onClick={() => {
                                          onShouldShowModal({
                                            value: ShouldShowModal.discountCoupons,
                                            newTitleModal: discountCoupon?.length
                                              ? item.name
                                              : 'Cadastrar nova empresa (contratante)',
                                          });
                                        }}
                                      ></div>
                                      <h5 className="header-title-text modal__title ml-3 mb-0">
                                        Adicionar conta bancária
                                      </h5>
                                    </div>
                                  ),
                                })
                              }
                            />
                            <X
                              className="svg-icon action-icon pt-1"
                              onClick={() => {
                                handleRemoveDiscountCoupon(index);
                              }}
                            />
                          </React.Fragment>
                        ),
                      },
                    ]}
                    theme="secondary"
                  />
                </>
              ))
            ) : (
              <span>Nenhum cupom de desconto adicionado</span>
            )
          }
          count={listDiscountCoupon.length}
          leftIcon={TicketIcon}
        />

        <div className="d-flex justify-content-between">
          <div>
            <Button
              title="Salvar"
              theme="noneBorder"
              onClick={async () => {
                await paymentSettingsActions.onSave();
              }}
            />
          </div>
          <div className="d-flex">
            <div className="m-2 mr-5">
              <BackOnTop />
            </div>
            <Button
              title="Voltar etapa"
              theme="noneBorder"
              onClick={() => {
                paymentSettingsActions.onReturnTab();
              }}
            />
            <Button
              title="Próxima etapa"
              theme="outlineDark"
              className="ml-3"
              onClick={async () => {
                console.log('TODO: Realizar integração da fase de pagamento ');
                await paymentSettingsActions.onNextTap();
              }}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};
