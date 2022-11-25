/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import useForm from '@/hooks/useForm';
// import validators from '@/helpers/validators';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import { useParams } from 'react-router-dom';
// import { convertToBoolean } from '@/helpers/common/convertToBoolean';
// import { FormInputName as FormInputNameToProduct } from '@/features/registerEvent/components/SectorProductScreen/components/ProductRegisterContent';
import { formProductProps, productProps } from '../types';
import {
  SectorProductContainer,
  //  SectorProductContainerProps,
  States,
} from './ui';

type UrlParams = {
  id: string;
};

export const SectorProductScreen: React.FC<
  // Pick<SectorProductContainerProps, 'ticketStates'> &
  // TabSectorProductActionsProps
  any
> = ({
  // ticketStates,
  backTab,
  onFirstTab,
}): JSX.Element => {
  const [state] = useState<States>(States.default);

  const params = useParams<UrlParams>();

  const {
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
    // resetForm: resetFormProduct,
  } = useForm({
    initialData: {
      group: '',
      subgroup: '',
      name: '',
      amount: '',
      unitValue: '',
      totalValue: '',
      imageBase64: '',
    },
    validators: {},
    formatters: {},
  });

  const handleOnSaveProduct = async (): Promise<void> => {
    try {
      if (isFormValidProduct()) {
        const payload = {};
        const reponse = await api.post(`/event/ticket/${params.id}/general-settings`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleNextTab = async (): Promise<void> => {
    await handleOnSaveProduct();
    if (isFormValidProduct()) {
      onFirstTab();
    }
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const controllerFormProduct: formProductProps = {
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
  };

  const controllerProductActions: productProps = {
    onSave: handleOnSaveProduct,
    onFirstTab,
    onReturnTap: handleBackTab,
    onNextTap: handleNextTab,
  };

  // useEffect(() => {
  //   const { ticket } = ticketStates;

  //   onFirstTab();
  //   resetFormProduct();

  //   if (ticket?.product) {
  //     onChangeFormInputProduct(FormInputNameToProduct.sendTicketWhatsApp)(
  //       String(ticket.product.sendTicketWhatsApp),
  //     );
  //     onChangeFormInputProduct(FormInputNameToProduct.codeType)(String(ticket.product.codeType));
  //     onChangeFormInputProduct(FormInputNameToProduct.printType)(String(ticket.product.printType));
  //     onChangeFormInputProduct(FormInputNameToProduct.entranceGate)(
  //       String(ticket.product.entranceGate ?? ''),
  //     );
  //     onChangeFormInputProduct(FormInputNameToProduct.nameBeforePurchase)(
  //       String(ticket.product.nameBeforePurchase),
  //     );
  //     onChangeFormInputProduct(FormInputNameToProduct.printNameTicket)(
  //       String(ticket.product.printNameTicket),
  //     );
  //     onChangeFormInputProduct(FormInputNameToProduct.requestCpf)(
  //       String(ticket.product.requestCpf),
  //     );
  //     onChangeFormInputProduct(FormInputNameToProduct.printCpfTicket)(
  //       String(ticket.product.printCpfTicket),
  //     );
  //     onChangeFormInputProduct(FormInputNameToProduct.validateCpf)(
  //       String(ticket.product.validateCpf),
  //     );
  //     onChangeFormInputProduct(FormInputNameToProduct.purchaseLimitCpf)(
  //       String(ticket.product.purchaseLimitCpf ?? ''),
  //     );
  //   }
  // }, [ticketStates.ticket]);

  return (
    <SectorProductContainer
      state={state}
      formProduct={controllerFormProduct}
      productActions={controllerProductActions}
    />
  );
};
