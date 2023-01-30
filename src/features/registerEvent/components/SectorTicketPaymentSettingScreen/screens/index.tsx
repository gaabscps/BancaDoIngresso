/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import api, { AxiosError } from '@/services/api';
import { States } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens/ui';
import PaymentGateway from '@/model/PaymentGateway';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { toast } from 'react-toastify';
import { useDialog } from '@/hooks/useDialog';
import { unmask } from '@/helpers/masks/cashNumber';
import { useParams } from 'react-router-dom';
import DiscountCoupon from '@/model/DiscountCoupon';
import {
  FormInputName as FormInputNameToPaymentSettings,
  SectorTicketPaymentSettingsContainer,
  ShouldShowModal,
} from '@/features/registerEvent/components/SectorTicketPaymentSettingScreen/screens/ui';
import {
  SectorTicketContainerProps,
  TabSectorTicketActionsProps,
} from '@/features/registerEvent/screens/SectorTicket/ui';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import { toPercentage } from '@/helpers/common/amount';
import { formPaymentSettingsProps, PaymentSettingsActionsProps } from '../types';

export default interface PayloadSectorTicketPaymentSettings {
  posGateway: string;
  websiteGateway: string;
  websiteInstallmentLimit: number;
  posInstallmentLimit: number;
  allowFractionalPayment: boolean;
  allowVariableRate: boolean;
  allowVariableValue: boolean;
  allowPaymentBankSlip: boolean;
  allowPaymentPIX: boolean;
  allowContactlessPayment: boolean;
  allowSellingWebsite: boolean;
  allowSellingPos: boolean;
  printReceipt: boolean;
  physicalSale: {
    allowCreditCardPayment: boolean;
    debit: number;
    credit: number;
    pix: number;
    bankSlip: number;
    administrateTax: number;
    installments: number;
    fee: number;
  };
  websiteSale: {
    allowCreditCardPaymen: boolean;
    debit: number;
    credit: number;
    pix: number;
    bankSlip: number;
    administrateTax: number;
    installments: number;
    fee: number;
  };
  allowDiscount: boolean;
  allowDiscountCoupon: boolean;
  discountCoupons: [
    {
      id: string;
    },
  ];
}

type UrlParams = {
  id: string;
};

export const SectorTicketPaymentSettingsScreen: React.FC<
  Pick<SectorTicketContainerProps, 'ticketStates'> &
    Pick<SectorTicketContainerProps, 'ticketStep'> &
    Omit<TabSectorTicketActionsProps, 'reloadTickets'>
> = ({ ticketStates, ticketStep, nextTab, backTab }): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [paymentGatewayList, setPaymentGatewayList] = useState<PaymentGateway[]>([]);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.discountCoupons,
  );
  const [discountCoupon, setDiscountCoupon] = useState<DiscountCoupon[]>([]);
  const [listDiscountCoupon, setListDiscountCoupon] = useState<DiscountCoupon[]>([]);

  const params = useParams<UrlParams>();
  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const {
    formData: formDataPaymentSettings,
    formErrors: formErrorsPaymentSettings,
    onChangeFormInput: onChangeFormInputPaymentSettings,
    isFormValid: isFormValidtPaymentSettings,
    resetForm: resetFormPaymentSettings,
  } = useForm({
    initialData: {
      posGateway: 'pagseguro',
      websiteGateway: 'pagseguro',
      websiteInstallmentLimit: '10',
      posInstallmentLimit: '10',
      allowFractionalPayment: 'true',
      allowVariableRate: 'true',
      allowVariableValue: 'true',
      allowPaymentBankSlip: '',
      allowPaymentPIX: 'true',
      allowContactlessPayment: 'true',
      allowSellingWebsite: 'true',
      allowSellingPos: 'true',
      printReceipt: 'true',
      physicalSaleAllowCreditCardPayment: 'true',
      physicalSaleDebit: '',
      physicalSaleCredit: '',
      physicalSalePix: '',
      physicalSaleAdministrateTax: '',
      physicalSaleInstallments: '',
      physicalSaleFee: '',
      websiteSaleAllowCreditCardPayment: 'true',
      websiteSaleDebit: '',
      websiteSaleCredit: '',
      websiteSalePix: '',
      websiteSaleAdministrateTax: '',
      websiteSaleInstallments: '',
      websiteSaleFee: '',
      allowDiscount: 'false',
      allowDiscountCoupon: 'false',
    },
    validators: {
      posGateway: [validators.required],
      websiteGateway: [validators.required],
      websiteInstallmentLimit: [validators.required],
      posInstallmentLimit: [validators.required],
      allowFractionalPayment: [validators.required],
      allowVariableRate: [validators.required],
      allowVariableValue: [validators.required],
      allowPaymentPIX: [validators.required],
      allowContactlessPayment: [validators.required],
      allowSellingWebsite: [validators.required],
      allowSellingPos: [validators.required],
      printReceipt: [validators.required],
      physicalSaleAllowCreditCardPayment: [validators.required],
      physicalSaleDebit: [validators.required, validators.between(0.1, 99.99)],
      physicalSaleCredit: [validators.required, validators.between(1, 99.99)],
      physicalSalePix: [validators.required, validators.between(1, 99.999)],
      physicalSaleAdministrateTax: [validators.required, validators.between(1, 99.99)],
      physicalSaleInstallments: [validators.required, validators.between(0, 24)],
      physicalSaleFee: [validators.required, validators.between(1, 99.99)],
      websiteSaleAllowCreditCardPayment: [validators.required],
      websiteSaleBankSlip: [validators.required, validators.between(0.1, 99.99)],
      websiteSaleCredit: [validators.required, validators.between(1, 99.99)],
      websiteSalePix: [validators.required, validators.between(1, 99.99)],
      websiteSaleAdministrateTax: [validators.required, validators.between(1, 99.99)],
      websiteSaleInstallments: [validators.required, validators.between(0, 24)],
      websiteSaleFee: [validators.required, validators.between(1, 99.99)],
      allowDiscount: [validators.required],
      allowDiscountCoupon: [validators.required],
    },
    formatters: {},
  });

  const controllerFormPaymentSettings: formPaymentSettingsProps = {
    formData: formDataPaymentSettings,
    formErrors: formErrorsPaymentSettings,
    onChangeFormInput: onChangeFormInputPaymentSettings,
  };

  const handleAddDiscountCoupon = (): void => {
    setDiscountCoupon([
      ...discountCoupon,
      {
        id: '',
        name: '',
        code: '',
        amount: null,
        discountType: 0,
        discount: null,
      },
    ]);
  };

  const handleChangeDiscountCoupon = (inputName: string, index: number, value: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newFormValues = [...discountCoupon] as any;
    newFormValues[index][inputName] = value;
    setDiscountCoupon(newFormValues);
  };

  const handleRemoveDiscountCoupon = (index: number): void => {
    const values = [...discountCoupon];
    values.splice(index, 1);
    setDiscountCoupon(values);
    setListDiscountCoupon(values);
  };

  const handleFecthGateway = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<PaymentGateway[]>('/payment-gateway/find');
      setPaymentGatewayList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnDiscountCoupon = async (): Promise<void> => {
    try {
      // verify if the bank account not exists values empty
      const discountCouponEmpty = discountCoupon.find(
        item =>
          item.name === '' || item.amount === null || item.code === '' || item.discount === null,
      );
      if (discountCouponEmpty) {
        toast.warn(
          'Preencha todos os campos ou remova o cupom de desconto que contém campos vazios',
        );
        return;
      }

      // sum total amount of discount coupon
      const totalAmountDiscountCoupon = discountCoupon.reduce(
        (acc, cupom) => acc + (cupom.amount as number),
        0,
      );
      // sum total amount of tickets
      const totalAmountTickets = ticketStates.ticket?.batchs.reduce(
        (acc, batch) => acc + batch.amount,
        0,
      ) as number;

      // verify if the total amount of discount coupon is greater than the total amount of the event
      if (totalAmountDiscountCoupon > totalAmountTickets) {
        toast.warn(
          'A quantidade de cupons digitadas é maior do que a quantidade total de ingressos cadastrados',
        );
        return;
      }

      setListDiscountCoupon(discountCoupon);
      onToggle();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnSaveSectorTicketPayment = async ({
    isBntNext,
  }: {
    isBntNext: boolean;
  }): Promise<void> => {
    try {
      if (isFormValidtPaymentSettings()) {
        const payloadDiscountCoupon = listDiscountCoupon.map(item => ({
          id: item.id,
          name: item.name,
          code: item.code,
          amount: item.amount,
          discountType: item.discountType,
          discount: +unmask(String(item.discount || 0)) ?? 0,
        }));

        const payload = {
          id: ticketStep?.ticketState?.payment?.id,
          eventTickets: [
            {
              id: ticketStep.ticketState?.id,
            },
          ],
          posGateway: {
            id: formDataPaymentSettings[FormInputNameToPaymentSettings.posGateway],
          },
          websiteGateway: {
            id: formDataPaymentSettings[FormInputNameToPaymentSettings.websiteGateway],
          },
          websiteInstallmentLimit:
            +formDataPaymentSettings[FormInputNameToPaymentSettings.websiteInstallmentLimit],
          posInstallmentLimit:
            +formDataPaymentSettings[FormInputNameToPaymentSettings.posInstallmentLimit],
          allowFractionalPayment: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowFractionalPayment],
          ),
          allowVariableRate: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowVariableRate],
          ),
          allowVariableValue: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowVariableValue],
          ),
          allowPaymentBankSlip: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowPaymentBankSlip],
          ),
          allowPaymentPIX: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowPaymentPIX],
          ),
          allowContactlessPayment: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowContactlessPayment],
          ),
          allowSellingWebsite: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowSellingWebsite],
          ),
          allowSellingPos: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowSellingPos],
          ),
          printReceipt: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.printReceipt],
          ),
          physicalSale: {
            allowCreditCardPayment: convertToBoolean(
              formDataPaymentSettings[
                FormInputNameToPaymentSettings.physicalSaleAllowCreditCardPayment
              ],
            ),
            debit: +unmask(
              formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleDebit],
            ),
            bankSlip: 0,
            credit: +unmask(
              formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleCredit],
            ),
            pix: +unmask(formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSalePix]),
            administrateTax: +unmask(
              formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleAdministrateTax],
            ),
            installments:
              +formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleInstallments],
            fee: +unmask(formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleFee]),
          },
          websiteSale: {
            allowCreditCardPayment: convertToBoolean(
              formDataPaymentSettings[
                FormInputNameToPaymentSettings.websiteSaleAllowCreditCardPayment
              ],
            ),
            credit: +unmask(
              formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleCredit],
            ),
            bankSlip: +unmask(
              formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleBankSlip],
            ),

            pix: +unmask(formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSalePix]),
            administrateTax: +unmask(
              formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleAdministrateTax],
            ),
            installments: +unmask(
              formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleInstallments],
            ),
            fee: +unmask(formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleFee]),
          },
          allowDiscount: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowDiscount],
          ),
          allowDiscountCoupon: convertToBoolean(
            formDataPaymentSettings[FormInputNameToPaymentSettings.allowDiscountCoupon],
          ),
          discountCoupons: payloadDiscountCoupon,
        };

        if (!payload.id) {
          delete payload.id;
        }
        const response = await api.post(`/event/ticket/${params.id}/payment`, payload);

        if (response && isBntNext) nextTab();
        if (response) toast.success('Dados salvos com sucesso!');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const controllerPaymentSettingsActions: PaymentSettingsActionsProps = {
    onSave: () => handleOnSaveSectorTicketPayment({ isBntNext: false }),
    onReturnTab: handleBackTab,
    onNextTap: () => handleOnSaveSectorTicketPayment({ isBntNext: true }),
  };

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event?: Event | any;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();
  };

  useEffect(() => {
    handleFecthGateway();
  }, []);

  useEffect(() => {
    const { ticket } = ticketStates;

    resetFormPaymentSettings();

    if (ticket?.payment) {
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.posGateway)(
        String(ticket.payment.posGateway.id),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.websiteGateway)(
        String(ticket.payment.websiteGateway.id),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.websiteInstallmentLimit)(
        String(ticket.payment.websiteInstallmentLimit),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.posInstallmentLimit)(
        String(ticket.payment.posInstallmentLimit),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowFractionalPayment)(
        String(ticket.payment.allowFractionalPayment),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowVariableRate)(
        String(ticket.payment.allowVariableRate),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowVariableValue)(
        String(ticket.payment.allowVariableValue),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowPaymentBankSlip)(
        String(ticket.payment.allowPaymentBankSlip),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowPaymentPIX)(
        String(ticket.payment.allowPaymentPIX),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowContactlessPayment)(
        String(ticket.payment.allowContactlessPayment),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowSellingWebsite)(
        String(ticket.payment.allowSellingWebsite),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowSellingPos)(
        String(ticket.payment.allowSellingPos),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.printReceipt)(
        String(ticket.payment.printReceipt),
      );

      onChangeFormInputPaymentSettings(
        FormInputNameToPaymentSettings.physicalSaleAllowCreditCardPayment,
      )(String(ticket.payment.physicalSale.allowCreditCardPayment));
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.physicalSaleDebit)(
        toPercentage(ticket.payment.physicalSale.debit),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.physicalSaleCredit)(
        toPercentage(ticket.payment.physicalSale.credit),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.physicalSalePix)(
        toPercentage(ticket.payment.physicalSale.pix),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.physicalSaleAdministrateTax)(
        toPercentage(ticket.payment.physicalSale.administrateTax),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.physicalSaleInstallments)(
        String(ticket.payment.physicalSale.installments),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.physicalSaleFee)(
        toPercentage(ticket.payment.physicalSale.fee),
      );

      onChangeFormInputPaymentSettings(
        FormInputNameToPaymentSettings.websiteSaleAllowCreditCardPayment,
      )(String(ticket.payment.websiteSale.allowCreditCardPayment));
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.websiteSaleBankSlip)(
        toPercentage(ticket.payment.websiteSale.bankSlip),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.websiteSaleCredit)(
        toPercentage(ticket.payment.websiteSale.credit),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.websiteSalePix)(
        toPercentage(ticket.payment.websiteSale.pix),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.websiteSaleAdministrateTax)(
        toPercentage(ticket.payment.websiteSale.administrateTax),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.websiteSaleInstallments)(
        String(ticket.payment.websiteSale.installments),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.websiteSaleFee)(
        toPercentage(ticket.payment.websiteSale.fee),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowDiscount)(
        String(ticket.payment.allowDiscount),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowDiscountCoupon)(
        String(ticket.payment.allowDiscountCoupon),
      );
      setDiscountCoupon(ticket.payment?.discountCoupons || []);
      setListDiscountCoupon(ticket.payment?.discountCoupons || []);
    }
  }, [ticketStates.ticket]);

  return (
    <SectorTicketPaymentSettingsContainer
      state={state}
      controllerFormPaymentSettings={controllerFormPaymentSettings}
      paymentGatewayList={paymentGatewayList}
      onShouldShowModal={handleOnShouldShowModal}
      title={title}
      shouldShowModal={shouldShowModal}
      visible={visible}
      onToggle={onToggle}
      handleAddDiscountCoupon={handleAddDiscountCoupon}
      discountCoupon={discountCoupon}
      handleChangeDiscountCoupon={handleChangeDiscountCoupon}
      handleRemoveDiscountCoupon={handleRemoveDiscountCoupon}
      listDiscountCoupon={listDiscountCoupon}
      handleOnDiscountCoupon={handleOnDiscountCoupon}
      ticketStates={ticketStates}
      backTab={backTab}
      nextTab={nextTab}
      paymentSettingsActions={controllerPaymentSettingsActions}
    />
  );
};
