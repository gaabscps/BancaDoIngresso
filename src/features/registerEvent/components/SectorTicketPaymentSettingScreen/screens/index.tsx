/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { States } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens/ui';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { formPaymentSettingsProps } from '../types';
import { SectorTicketPaymentSettingsContainer } from './ui';

export const SectorTicketPaymentSettingsScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  const {
    formData: formDataMainSettings,
    formErrors: formErrorsMainSettings,
    onChangeFormInput: onChangeFormInputMainSettings,
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

  return (
    <SectorTicketPaymentSettingsContainer
      state={state}
      formMainSettings={controllerFormMainSettings}
    />
  );
};
