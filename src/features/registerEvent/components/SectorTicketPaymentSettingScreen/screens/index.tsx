/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import api, { AxiosError } from '@/services/api';
import { States } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens/ui';
import PaymentGateway from '@/model/PaymentGateway';
import useForm from '@/hooks/useForm';
import Event from '@/model/Event';
import validators from '@/helpers/validators';
import { toast } from 'react-toastify';
import { formPaymentSettingsProps } from '../types';
import { SectorTicketPaymentSettingsContainer } from './ui';

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
    administrateTax: number;
    installments: number;
    fee: number;
  };
  websiteSale: {
    allowCreditCardPaymen: boolean;
    debit: number;
    credit: number;
    pix: number;
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
export const SectorTicketPaymentSettingsScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [paymentGatewayList, setPaymentGatewayList] = useState<PaymentGateway[]>([]);

  const {
    formData: formDataMainSettings,
    formErrors: formErrorsMainSettings,
    onChangeFormInput: onChangeFormInputMainSettings,
    isFormValid: isFormValidMainSettings,
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
      websiteSaleAllowCreditCardPaymen: 'true',
      websiteSaleDebit: '',
      websiteSaleCredit: '',
      websiteSalePix: '',
      websiteSaleAdministrateTax: '',
      websiteSaleInstallments: '',
      websiteSaleFee: '',
      allowDiscount: 'true',
      allowDiscountCoupon: 'true',
    },
    validators: {
      name: [validators.required],
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
      physicalSaleDebit: [validators.required],
      physicalSaleCredit: [validators.required],
      physicalSalePix: [validators.required],
      physicalSaleAdministrateTax: [validators.required],
      physicalSaleInstallments: [validators.required],
      physicalSaleFee: [validators.required],
      websiteSaleAllowCreditCardPaymen: [validators.required],
      websiteSaleDebit: [validators.required],
      websiteSaleCredit: [validators.required],
      websiteSalePix: [validators.required],
      websiteSaleAdministrateTax: [validators.required],
      websiteSaleInstallments: [validators.required],
      websiteSaleFee: [validators.required],
      allowDiscount: [validators.required],
      allowDiscountCoupon: [validators.required],
    },
    formatters: {},
  });

  const controllerFormMainSettings: formPaymentSettingsProps = {
    formData: formDataMainSettings,
    formErrors: formErrorsMainSettings,
    onChangeFormInput: onChangeFormInputMainSettings,
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

  const handleOnSaveSectorTicketPayment = async (eventSelected: Event): Promise<void> => {
    try {
      if (isFormValidMainSettings()) {
        const payload: PayloadSectorTicketPaymentSettings = {
          posGateway: '',
          websiteGateway: '',
          websiteInstallmentLimit: 0,
          posInstallmentLimit: 0,
          allowFractionalPayment: true,
          allowVariableRate: true,
          allowVariableValue: true,
          allowPaymentBankSlip: true,
          allowPaymentPIX: true,
          allowContactlessPayment: true,
          allowSellingWebsite: true,
          allowSellingPos: true,
          printReceipt: true,
          physicalSale: {
            allowCreditCardPayment: true,
            debit: 0,
            credit: 0,
            pix: 0,
            administrateTax: 0,
            installments: 0,
            fee: 0,
          },
          websiteSale: {
            allowCreditCardPaymen: true,
            debit: 0,
            credit: 0,
            pix: 0,
            administrateTax: 0,
            installments: 0,
            fee: 0,
          },
          allowDiscount: true,
          allowDiscountCoupon: true,
          discountCoupons: [
            {
              id: '',
            },
          ],
        };

        await api.put<PayloadSectorTicketPaymentSettings>(
          `/event/ticket/${eventSelected.id}/payment`,
          payload,
        );
        toast.success('POS atualizado com sucesso!');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    handleFecthGateway();
  }, []);

  return (
    <SectorTicketPaymentSettingsContainer
      state={state}
      formMainSettings={controllerFormMainSettings}
      paymentGatewayList={paymentGatewayList}
      handleOnSaveSectorTicketPayment={handleOnSaveSectorTicketPayment}
    />
  );
};
