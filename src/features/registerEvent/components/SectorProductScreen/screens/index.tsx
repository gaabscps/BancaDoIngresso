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
import { useDialog } from '@/hooks/useDialog';
import {
  ShouldShowModal,
  SectorProductContainer,
  //  SectorProductContainerProps,
  States,
} from '@/features/registerEvent/components/SectorProductScreen/screens/ui';
import DiscountCoupon from '@/model/DiscountCoupon';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/components/DeleteContent';
import {
  formConfigProductProps,
  formProductProps,
  modalConfigTicketMainSettingsProps,
  onShouldShowModalSectorProductProps,
  productActionsProps,
  productStatesProps,
} from '../types';

type UrlParams = {
  id: string;
};

export interface NameFiles {
  [key: string]: string;
}

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
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );
  const [nameFiles, setNameFiles] = useState<NameFiles>({});

  const [product, setProduct] = useState();

  const [discountCoupon, setDiscountCoupon] = useState<DiscountCoupon[]>([]);
  const [listDiscountCoupon, setListDiscountCoupon] = useState<DiscountCoupon[]>([]);

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const params = useParams<UrlParams>();

  const {
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
    setErrors: setErrorsProduct,
    // resetForm: resetFormProduct,
  } = useForm({
    initialData: {
      group: '',
      subgroup: '',
      name: '',
      allowOnline: '',
      unitMeasurement: '',
      amount: '',
      unitValue: '',
      totalValue: '',
      imageBase64: '',
    },
    validators: {},
    formatters: {},
  });

  const {
    formData: formDataConfigProduct,
    formErrors: formErrorsConfigProduct,
    onChangeFormInput: onChangeFormInputConfigProduct,
    isFormValid: isFormValidConfigProduct,
    // resetForm: resetFormConfigProduct,
  } = useForm({
    initialData: {
      physicalSaleAllowCreditCardPayment: '',
      physicalSaleDebit: '',
      physicalSaleCredit: '',
      physicalSalePix: '',
      physicalSaleAdministrateTax: '',
      physicalSaleInstallments: '',
      physicalSaleFee: '',
      websiteSaleAllowCreditCardPayment: '',
      websiteSaleDebit: '',
      websiteSaleCredit: '',
      websiteSalePix: '',
      websiteSaleAdministrateTax: '',
      websiteSaleInstallments: '',
      websiteSaleFee: '',
      allowDiscount: '',
      allowDiscountCoupon: '',
    },
    validators: {},
    formatters: {},
  });

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    product: productSelected,
  }: onShouldShowModalSectorProductProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (productSelected?.id && value === ShouldShowModal.configProduct) {
      setProduct(productSelected);
    }
  };

  const handleOnShowDeleteProduct = (productSelected: any): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => confirmDelete.hide(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): void => {
            console.log('TODO: Add function exclud item :>> ', productSelected);
            // handleOnConfirmDeleteToProduct(productSelected);
          },
        },
      ],
    });
  };

  const controllerModalConfig: modalConfigTicketMainSettingsProps = {
    title,
    visible,
    onChangeTitle,
    onToggle,
    onShouldShowModal: handleOnShouldShowModal,
    shouldShowModal,
    onShowModalDelete: handleOnShowDeleteProduct,
  };
  // modal config ------------------------------------------------------------

  const controllerFormDiscountCoupon = {
    discountCoupon,
    handleChangeDiscountCoupon(inputName: string, index: number, value: string): void {
      const newFormValues = [...discountCoupon] as any;
      newFormValues[index][inputName] = value;
      setDiscountCoupon(newFormValues);
    },
    handleAddDiscountCoupon(): void {
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
    },
    handleRemoveDiscountCoupon(index: number): void {
      const values = [...discountCoupon];
      values.splice(index, 1);
      setDiscountCoupon(values);
      setListDiscountCoupon(values);
    },
    async handleOnDiscountCoupon(): Promise<void> {
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
    },
  };

  const handleOnChangeFileInput =
    (inputName: string) =>
    (file: File | undefined): void => {
      // validate if file is image and format .jpg, .jpeg ou .png
      if (file && file.type.match(/image\/(jpg|jpeg|png)/)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result?.toString();
          if (base64) {
            setNameFiles({ ...nameFiles, [inputName]: file.name });
            onChangeFormInputProduct(inputName)('');
            onChangeFormInputProduct(inputName)(base64);
          }
        };
      } else {
        setErrorsProduct({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };

  const handleOnSaveProduct = async (): Promise<void> => {
    try {
      if (isFormValidProduct()) {
        const payloadDiscountCoupon = listDiscountCoupon.map(item => ({
          id: item.id,
          name: item.name,
          code: item.code,
          amount: item.amount,
          discountType: item.discountType,
          discount: item.discount ?? 0,
        }));

        console.log('Payload Cupons de desconto :>> ', payloadDiscountCoupon);

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
    onChangeFormFileInput: handleOnChangeFileInput,
    formNameFiles: nameFiles,
  };

  const controllerFormConfigProduct: formConfigProductProps = {
    formData: formDataConfigProduct,
    formErrors: formErrorsConfigProduct,
    onChangeFormInput: onChangeFormInputConfigProduct,
    isFormValid: isFormValidConfigProduct,
  };

  const controllerProductActions: productActionsProps = {
    onSave: handleOnSaveProduct,
    onFirstTab,
    onReturnTap: handleBackTab,
    onNextTap: handleNextTab,
  };

  const controllerProductStates: productStatesProps = {
    product,
    setProduct,
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
      formConfigProduct={controllerFormConfigProduct}
      productActions={controllerProductActions}
      modalConfig={controllerModalConfig}
      productStates={controllerProductStates}
      formDiscountCoupon={controllerFormDiscountCoupon}
    />
  );
};
