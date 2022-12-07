/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import { useParams } from 'react-router-dom';
import { FormInputName as FormInputNameToProduct } from '@/features/registerEvent/components/SectorProductScreen/components/ProductRegisterContent';
import { useDialog } from '@/hooks/useDialog';
import {
  ShouldShowModal,
  SectorProductContainer,
  States,
} from '@/features/registerEvent/components/SectorProductScreen/screens/ui';
import DiscountCoupon from '@/model/DiscountCoupon';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/components/DeleteContent';
import { TabSectorProductActionsProps } from '@/features/registerEvent/screens/SectorProduct/ui';
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

export const SectorProductScreen: React.FC<TabSectorProductActionsProps> = ({
  backTab,
  nextTab,
  onFirstTab,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );
  const [nameFiles, setNameFiles] = useState<NameFiles>({});

  const [product, setProduct] = useState<any>();
  const [productList, setProductList] = useState<any>([]);

  const [groupList, setGroupList] = useState<any>([]);

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
    resetForm: resetFormProduct,
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
            console.log('TODO: Add function exclude item :>> ', productSelected);
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

  const handleGetProductList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`event/section-product/${id}/product`);
      // filter father event when event type is father
      const { tickets } = data;
      setProductList(tickets ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetGroupList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`event/section-product/${id}/group`);

      setGroupList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
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

        const payload = {
          id: '',
          group: {
            id: '7049c51a-cd2d-413d-8cd3-0368fb916c70', // TODO: add group id when is selected
          },
          subgroup: {
            id: '7049c51a-cd2d-413d-8cd3-0368fb916c70', // TODO: add subgroup id when is selected
          },
          name: formDataProduct[FormInputNameToProduct.name] ?? '',
          amount: formDataProduct[FormInputNameToProduct.amount] ?? 0,
          unitValue: formDataProduct[FormInputNameToProduct.unitValue] ?? 0,
          totalValue: formDataProduct[FormInputNameToProduct.totalValue] ?? 0,
          imageBase64: formDataProduct[FormInputNameToProduct.imageBase64] ?? '',
        };
        const reponse = await api.post(`/event/ticket/${params.id}/general-settings`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnChangeAllowOnline = async (productSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      const activedInput = productSelected.websiteSale.allowCreditCardPayment;

      await api.patch(
        `event/section-product/${params.id}/product/${productSelected.id}${
          activedInput ? ' /disable' : '/enable'
        }`,
      );

      handleGetProductList(params.id);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleNextTab = async (): Promise<void> => {
    if (isFormValidProduct()) {
      nextTab();
    }
  };

  const handleBackTab = (): void => {
    backTab();
  };

  const handleOnGetProduct = async (productSelected: any): Promise<void> => {
    try {
      if (productSelected) {
        setProduct(productSelected);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnCancelEditProduct = (): void => {
    try {
      setProduct(undefined);
      resetFormProduct();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
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
    onGet: handleOnGetProduct,
    onFirstTab,
    onReturnTab: handleBackTab,
    onNextTab: handleNextTab,
    onCancelEdit: handleOnCancelEditProduct,
    onChangeAllowOnline: handleOnChangeAllowOnline,
  };

  const controllerProductStates: productStatesProps = {
    product,
    setProduct,
    productList,
    setProductList,
    groupList,
  };

  useEffect(() => {
    handleGetProductList(params.id);
    handleGetGroupList(params.id);
  }, [product]);

  useEffect(() => {
    resetFormProduct();
    if (product) {
      // TODO: Add states when to get API return

      onChangeFormInputProduct(FormInputNameToProduct.name)(String(product.product));
      onChangeFormInputProduct(FormInputNameToProduct.allowOnline)(String(product.allowOnline));
      onChangeFormInputProduct(FormInputNameToProduct.unitMeasurement)(String(product.amount));
      onChangeFormInputProduct(FormInputNameToProduct.unitValue)(String(product.unitValue));
      onChangeFormInputProduct(FormInputNameToProduct.totalValue)(String(product.totalValue));
    }
  }, [product]);

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
