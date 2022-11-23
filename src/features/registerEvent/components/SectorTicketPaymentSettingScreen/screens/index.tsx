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
import { formPaymentSettingsProps } from '../types';
import { SectorTicketPaymentSettingsContainer, ShouldShowModal } from './ui';

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

export const SectorTicketPaymentSettingsScreen: React.FC = (): JSX.Element => {
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
    // isFormValid: isFormValidMainSettings,
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
      allowDiscount: 'false',
      allowDiscountCoupon: 'false',
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
      const bankAccountEmpty = discountCoupon.find(
        item =>
          item.name === '' || item.amount === null || item.code === '' || item.discount === null,
      );
      if (bankAccountEmpty) {
        toast.warn('Preencha todos os campos ou remova a conta bancária que contém campos vazios');
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
      // if (isFormValidMainSettings()) {
      const payload: PayloadSectorTicketPaymentSettings = {
        posGateway: 'ebca4cf5-c5fc-4a34-bdca-3c6654270bf8',
        websiteGateway: 'ebca4cf5-c5fc-4a34-bdca-3c6654270bf8',
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
          bankSlip: 0,
          administrateTax: 0,
          installments: 0,
          fee: 0,
        },
        websiteSale: {
          allowCreditCardPaymen: true,
          debit: 0,
          credit: 0,
          bankSlip: 0,
          pix: 0,
          administrateTax: 0,
          installments: 0,
          fee: 0,
        },
        allowDiscount: true,
        allowDiscountCoupon: false,
        discountCoupons: [
          {
            id: '',
          },
        ],
      };

      await api.post<PayloadSectorTicketPaymentSettings>(
        `/event/ticket/${params.id}/payment`,
        payload,
      );
      toast.success('POS atualizado com sucesso!');
      // }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
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
    />
  );
};
