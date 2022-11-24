/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import api, { AxiosError } from '@/services/api';
import { States } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens/ui';
import PaymentGateway from '@/model/PaymentGateway';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { toast } from 'react-toastify';
import { useDialog } from '@/hooks/useDialog';
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
  Pick<SectorTicketContainerProps, 'ticketStates'> & TabSectorTicketActionsProps
> = ({ ticketStates, nextTab, backTab, onFirstTab }): JSX.Element => {
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
      physicalSaleDebit: [validators.required, validators.between(0, 10)],
      physicalSaleCredit: [validators.required, validators.between(0, 10)],
      physicalSalePix: [validators.required, validators.between(0, 10)],
      physicalSaleAdministrateTax: [validators.required, validators.between(0, 10)],
      physicalSaleInstallments: [validators.required],
      physicalSaleFee: [validators.required, validators.between(0, 10)],
      websiteSaleAllowCreditCardPayment: [validators.required],
      websiteSaleDebit: [validators.required, validators.between(0, 10)],
      websiteSaleCredit: [validators.required, validators.between(0, 10)],
      websiteSalePix: [validators.required, validators.between(0, 10)],
      websiteSaleAdministrateTax: [validators.required, validators.between(0, 10)],
      websiteSaleInstallments: [validators.required],
      websiteSaleFee: [validators.required, validators.between(0, 10)],
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
      const { data } = await api.get<PaymentGateway[]>('/charge-setup/find');
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
      setListDiscountCoupon(discountCoupon);
      onToggle();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnSaveSectorTicketPayment = async (): Promise<void> => {
    try {
      if (isFormValidtPaymentSettings()) {
        const payloadDiscountCoupon = listDiscountCoupon.map(item => ({
          id: item.id,
          name: item.name,
          code: item.code,
          amount: item.amount,
          discountType: item.discountType,
          discount: item.discount ?? 0,
        }));

        const payload = {
          id: ticketStates.ticket?.payment?.id,
          eventTickets: [
            {
              // id: ticketStates.ticket?.id,
              id: '3ac4a6a2-0703-4dc3-a747-336b3afb8c02',
            },
          ],
          posGateway: {
            id: 'ebca4cf5-c5fc-4a34-bdca-3c6654270bf8',
          },
          websiteGateway: {
            id: 'ebca4cf5-c5fc-4a34-bdca-3c6654270bf8',
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
            debit: +formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleDebit],
            credit: +formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleCredit],
            // bankSlip: +formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleBankSlip],
            bankSlip: 0,
            pix: +formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSalePix],
            administrateTax:
              +formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleAdministrateTax],
            installments:
              +formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleInstallments],
            fee: +formDataPaymentSettings[FormInputNameToPaymentSettings.physicalSaleFee],
          },
          websiteSale: {
            allowCreditCardPayment: convertToBoolean(
              formDataPaymentSettings[
                FormInputNameToPaymentSettings.websiteSaleAllowCreditCardPayment
              ],
            ),
            debit: +formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleDebit],
            credit: +formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleCredit],
            // bankSlip: +formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleBankSlip],
            bankSlip: 0,
            pix: +formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSalePix],
            administrateTax:
              +formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleAdministrateTax],
            installments:
              +formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleInstallments],
            fee: +formDataPaymentSettings[FormInputNameToPaymentSettings.websiteSaleFee],
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
        const reponse = await api.post(`/event/ticket/${params.id}/payment`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleNextTab = async (): Promise<void> => {
    await handleOnSaveSectorTicketPayment();
    // if (isFormValidtPaymentSettings()) {
    nextTab();
    // }
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const controllerPaymentSettingsActions: PaymentSettingsActionsProps = {
    onSave: handleOnSaveSectorTicketPayment,
    onFirstTab,
    onReturnTab: handleBackTab,
    onNextTap: handleNextTab,
  };

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
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

    onFirstTab();
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
      // onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.physicalSale)(
      //   String(ticket.payment.physicalSale.id ?? ''),
      // );
      // onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.websiteSale)(
      //   String(ticket.payment.websiteSale.id ?? ''),
      // );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowDiscount)(
        String(ticket.payment.allowDiscount),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowDiscount)(
        String(ticket.payment.allowDiscount),
      );
      onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.allowDiscountCoupon)(
        String(ticket.payment.allowDiscountCoupon),
      );
      // onChangeFormInputPaymentSettings(FormInputNameToPaymentSettings.discountCoupons)(
      //   String(ticket.payment.discountCoupons ?? ''),
      // );
    }
  }, [ticketStates.ticket]);

  return (
    <SectorTicketPaymentSettingsContainer
      state={state}
      controllerFormPaymentSettings={controllerFormPaymentSettings}
      paymentGatewayList={paymentGatewayList}
      handleOnSaveSectorTicketPayment={handleOnSaveSectorTicketPayment}
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
      backTab={backTab}
      nextTab={nextTab}
      paymentSettingsActions={controllerPaymentSettingsActions}
    />
  );
};
