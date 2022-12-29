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
import { FormInputName as FormInputNameToConfigProduct } from '@/features/registerEvent/components/SectorProductScreen/components/ProductConfigContent';
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
import validators from '@/helpers/validators';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import Product from '@/model/Product';
import GroupProduct from '@/model/SubgruopProduct';
import EventProduct from '@/model/EventProduct';
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

  const [product, setProduct] = useState<EventProduct>();
  const [productList, setProductList] = useState<EventProduct[]>([]);

  const [groupList, setGroupList] = useState<GroupProduct[]>([]);

  const [optionProduct, setOptionProduct] = useState<Product[]>([]);

  const [discountCoupon, setDiscountCoupon] = useState<DiscountCoupon[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      imageBase64Product: '',
    },
    validators: {
      group: [validators.required],
      subgroup: [validators.required],
      name: [validators.required],
      allowOnline: [validators.required],
      unitMeasurement: [validators.required],
      amount: [validators.required],
      unitValue: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataConfigProduct,
    formErrors: formErrorsConfigProduct,
    onChangeFormInput: onChangeFormInputConfigProduct,
    isFormValid: isFormValidConfigProduct,
    resetForm: resetFormConfigProduct,
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
      websiteSaleCredit: '',
      websiteSalePix: '',
      websiteSaleAdministrateTax: '',
      websiteSaleBankSlip: '',
      websiteSaleInstallments: '',
      websiteSaleFee: '',
      allowDiscountCoupon: '',
      waiter: '',
      partialPayment: '',
    },
    validators: {
      physicalSaleAllowCreditCardPayment: [validators.required],
      physicalSaleDebit: [validators.required],
      physicalSaleCredit: [validators.required],
      physicalSalePix: [validators.required],
      physicalSaleAdministrateTax: [validators.required],
      physicalSaleInstallments: [validators.required],
      physicalSaleFee: [validators.required],
      websiteSaleAllowCreditCardPayment: [validators.required],
      websiteSaleCredit: [validators.required],
      websiteSalePix: [validators.required],
      websiteSaleAdministrateTax: [validators.required],
      websiteSaleBankSlip: [validators.required],
      websiteSaleInstallments: [validators.required],
      websiteSaleFee: [validators.required],
      allowDiscountCoupon: [validators.required],
      waiter: [validators.required],
      partialPayment: [validators.required],
    },
    formatters: {},
  });

  const handleOnTougleModal = (): void => {
    onToggle();
    setProduct(undefined);
  };

  // validate if all filds of array object contains key object physicalSale and websiteSale
  const handleValidateAllFields = (data: any[]): boolean => {
    const physicalSale = data.filter(item => item?.physicalSale === true);
    const websiteSale = data.filter(item => item?.websiteSale === true);

    if (!physicalSale && !websiteSale) {
      toast.error('É necessário configurar as taxas de todos os produtos');
      return false;
    }

    return true;
  };

  // modal config ------------------------------------------------------------
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    product: productSelected,
  }: onShouldShowModalSectorProductProps): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    handleOnTougleModal();

    if (productSelected?.id && value === ShouldShowModal.configProduct) {
      setProduct(productSelected);
    }
  };

  const handleOnConfirmDeleteTopProduct = async (productSelected: any): Promise<void> => {
    try {
      await api.delete(`/event/section-product/${params?.id}/product/${productSelected.id}`);
      toast.success('Produto excluído com sucesso!');
      handleGetProductList(params.id);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      confirmDelete.hide();
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
          onClick: (): Promise<void> => handleOnConfirmDeleteTopProduct(productSelected),
        },
      ],
    });
  };

  const controllerModalConfig: modalConfigTicketMainSettingsProps = {
    title,
    visible,
    onChangeTitle,
    handleOnTougleModal,
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
        handleOnTougleModal();
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
      const { data } = await api.get(`/event/section-product/${id}/product/section`);

      setProductList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetOptionProductByCategory = async (
    groupId: string,
    subgroupId: string,
  ): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(
        `event/section-product/${params.id}/group/${groupId}/sub-group/${subgroupId}/product`,
      );

      setOptionProduct(data ?? []);
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
        const payload = {
          id: formDataProduct[FormInputNameToProduct.id] ?? '',
          group: {
            id: formDataProduct[FormInputNameToProduct.group], // TODO: add group id when is selected
          },
          subgroup: {
            id: formDataProduct[FormInputNameToProduct.subgroup], // TODO: add subgroup id when is selected
          },
          unitMeasurement: formDataProduct[FormInputNameToProduct.unitMeasurement] ?? '',
          allowSellingWebsite: formDataProduct[FormInputNameToProduct.allowOnline] ?? true,
          name: formDataProduct[FormInputNameToProduct.name] ?? '',
          amount: +formDataProduct[FormInputNameToProduct.amount] ?? 0,
          unitValue: +formDataProduct[FormInputNameToProduct.unitValue] ?? 0,
          totalValue: +formDataProduct[FormInputNameToProduct.totalValue] ?? 0,
          imageBase64: formDataProduct[FormInputNameToProduct.imageBase64Product] ?? '',
        };
        const reponse = await api.post(`/event/section-product/${params.id}/product`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');

        handleOnCancelEditProduct();
        handleGetProductList(params.id);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnSaveConfigProduct = async (productSelected: any): Promise<void> => {
    try {
      if (isFormValidConfigProduct()) {
        const payloadDiscountCoupon = discountCoupon.map(item => ({
          id: item.id,
          name: item.name,
          code: item.code,
          amount: item.amount && +item.amount,
          discountType: item.discountType && +item.discountType,
          discount: item.discount && +item.discount,
        }));

        const payload = {
          id: productSelected?.id,
          physicalSale: {
            id: productSelected?.physicalSale?.id,
            allowCreditCardPayment:
              convertToBoolean(
                formDataConfigProduct[
                  FormInputNameToConfigProduct.physicalSaleAllowCreditCardPayment
                ],
              ) ?? true,
            debit: +formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleDebit] ?? 0,
            credit: +formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleCredit] ?? 0,
            pix: +formDataConfigProduct[FormInputNameToConfigProduct.physicalSalePix] ?? 0,
            administrateTax:
              +formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleAdministrateTax] ?? 0,
            installments:
              +formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleInstallments] ?? 0,
            fee: +formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleFee] ?? 0,
          },
          websiteSale: {
            id: productSelected?.websiteSale?.id,
            allowCreditCardPayment:
              convertToBoolean(
                formDataConfigProduct[
                  FormInputNameToConfigProduct.websiteSaleAllowCreditCardPayment
                ],
              ) ?? true,
            credit: +formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleCredit] ?? 0,
            bankSlip: +formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleBankSlip] ?? 0,
            pix: +formDataConfigProduct[FormInputNameToConfigProduct.websiteSalePix] ?? 0,
            administrateTax:
              +formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleAdministrateTax] ?? 0,
            installments:
              +formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleInstallments] ?? 0,
            fee: +formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleFee] ?? 0,
          },
          waiter: +formDataConfigProduct[FormInputNameToConfigProduct.waiter] ?? 0,
          partialPayment:
            convertToBoolean(formDataConfigProduct[FormInputNameToConfigProduct.partialPayment]) ??
            true,
          allowDiscountCoupon:
            convertToBoolean(
              formDataConfigProduct[FormInputNameToConfigProduct.allowDiscountCoupon],
            ) ?? true,
          discountCoupons: payloadDiscountCoupon,
        };
        const reponse = await api.post(
          `/event/section-product/${params.id}/product/config`,
          payload,
        );
        if (reponse) toast.success('Dados salvos com sucesso!');

        handleOnTougleModal();
        handleOnCancelEditProduct();
        handleGetProductList(params.id);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnChangeAllowOnline = async (productSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      const activedInput = productSelected.allowSellingWebsite;

      await api.patch(
        `event/section-product/${params.id}/product/${String(productSelected.id).trim()}${
          activedInput ? '/disable-online' : '/enable-online'
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
    // if (isFormValidProduct()) {
    if (handleValidateAllFields(productList)) {
      nextTab();
    }
    // }
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
      setTimeout(() => {
        setProduct(undefined);
        resetFormProduct();
        resetFormConfigProduct();
      }, 500);
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
    onSaveConfig: handleOnSaveConfigProduct,
    onGet: handleOnGetProduct,
    onFirstTab,
    onReturnTab: handleBackTab,
    onNextTab: handleNextTab,
    onCancelEdit: handleOnCancelEditProduct,
    onChangeAllowOnline: handleOnChangeAllowOnline,
    onProductByCategory: handleGetOptionProductByCategory,
  };

  const controllerProductStates: productStatesProps = {
    product,
    setProduct,
    productList,
    setProductList,
    groupList,
    optionProduct,
  };

  useEffect(() => {
    handleGetProductList(params.id);
    handleGetGroupList(params.id);
  }, []);

  useEffect(() => {
    resetFormProduct();
    resetFormConfigProduct();

    if (product) {
      onChangeFormInputProduct(FormInputNameToProduct.group)(String(product.group?.id));
      onChangeFormInputProduct(FormInputNameToProduct.subgroup)(String(product.subgroup?.id));
      onChangeFormInputProduct(FormInputNameToProduct.id)(String(product.id));
      onChangeFormInputProduct(FormInputNameToProduct.allowOnline)(
        String(product.allowSellingWebsite),
      );
      onChangeFormInputProduct(FormInputNameToProduct.unitMeasurement)(
        String(product.unitMeasurement),
      );
      onChangeFormInputProduct(FormInputNameToProduct.amount)(String(product.amount));
      onChangeFormInputProduct(FormInputNameToProduct.unitValue)(String(product.unitValue));
      onChangeFormInputProduct(FormInputNameToProduct.totalValue)(String(product.totalValue));
      onChangeFormInputProduct(FormInputNameToProduct.imageBase64Product)(
        String(product.imageBase64),
      );

      onChangeFormInputConfigProduct(
        FormInputNameToConfigProduct.physicalSaleAllowCreditCardPayment,
      )(String(product.physicalSale?.allowCreditCardPayment));
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleDebit)(
        String(product.physicalSale?.debit ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleCredit)(
        String(product.physicalSale?.credit ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSalePix)(
        String(product.physicalSale?.pix ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleAdministrateTax)(
        String(product.physicalSale?.administrateTax ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleInstallments)(
        String(product.physicalSale?.installments ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleFee)(
        String(product.physicalSale?.fee ?? ''),
      );
      onChangeFormInputConfigProduct(
        FormInputNameToConfigProduct.websiteSaleAllowCreditCardPayment,
      )(String(product.websiteSale?.allowCreditCardPayment));
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleCredit)(
        String(product.websiteSale?.credit ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSalePix)(
        String(product.websiteSale?.pix ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleAdministrateTax)(
        String(product.websiteSale?.administrateTax ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleBankSlip)(
        String(product.websiteSale?.bankSlip ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleInstallments)(
        String(product.websiteSale?.installments ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleFee)(
        String(product.websiteSale?.fee ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.waiter)(
        String(product?.waiter ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.partialPayment)(
        String(product?.partialPayment ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.allowDiscountCoupon)(
        String(product?.allowDiscountCoupon ?? ''),
      );

      setDiscountCoupon(product.discountCoupons ?? []);

      const productEdit = optionProduct.find((item: any) => item.id === product.id);
      if (productEdit) {
        onChangeFormInputProduct(FormInputNameToProduct.id)(product.id as string);
        onChangeFormInputProduct(FormInputNameToProduct.name)(product.name as string);
      }
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
