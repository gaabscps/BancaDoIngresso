/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import useForm from '@/hooks/useForm';
import { toast } from 'react-toastify';
import api, { AxiosError } from '@/services/api';
import { useParams } from 'react-router-dom';
import { FormInputNameProduct } from '@/features/registerEvent/components/SectorProductScreen/components/ProductRegisterContent';
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
import { unmask } from '@/helpers/masks/cashNumber';
import { toPercentage } from '@/helpers/common/amount';
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
  controllerEvent,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.configProduct,
  );
  const [nameFiles, setNameFiles] = useState<NameFiles>({});

  const [product, setProduct] = useState<any>();
  const [productList, setProductList] = useState<any>([]);

  const [groupList, setGroupList] = useState<any>([]);

  const [optionProduct, setOptionProduct] = useState<any>([]);

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
      physicalSaleInstallments: [validators.required, validators.between(0, 24)],
      physicalSaleFee: [validators.required],
      websiteSaleAllowCreditCardPayment: [validators.required],
      websiteSaleCredit: [validators.required],
      websiteSalePix: [validators.required],
      websiteSaleAdministrateTax: [validators.required],
      websiteSaleBankSlip: [validators.required],
      websiteSaleInstallments: [validators.required, validators.between(0, 24)],
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
      setState(States.loading);
      await api.delete(`/event/section-product/${params?.id}/product/${productSelected.id}`);
      toast.success('Produto excluído com sucesso!');
      handleGetProductList(params.id);
    } catch (error) {
      const err = error as AxiosError | any;
      throw new Error(err.response?.data.message);
    } finally {
      confirmDelete.hide();
      setState(States.default);
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
      setState(States.loading);
      if (isFormValidProduct()) {
        const payload = {
          id: formDataProduct[FormInputNameProduct.id] ?? '',
          group: {
            id: formDataProduct[FormInputNameProduct.group], // TODO: add group id when is selected
          },
          subgroup: {
            id: formDataProduct[FormInputNameProduct.subgroup], // TODO: add subgroup id when is selected
          },
          unitMeasurement: formDataProduct[FormInputNameProduct.unitMeasurement] ?? '',
          allowSellingWebsite: convertToBoolean(
            formDataProduct[FormInputNameProduct.allowSellingWebsite],
          ),
          name: formDataProduct[FormInputNameProduct.name] ?? '',
          amount: +formDataProduct[FormInputNameProduct.amount] ?? 0,
          unitValue: +formDataProduct[FormInputNameProduct.unitValue] ?? 0,
          totalValue: +formDataProduct[FormInputNameProduct.totalValue] ?? 0,
          imageBase64: formDataProduct[FormInputNameProduct.imageBase64Product] ?? '',
        };
        const reponse = await api.post(`/event/section-product/${params.id}/product`, payload);
        if (reponse) toast.success('Dados salvos com sucesso!');

        handleOnCancelEditProduct();
        handleGetProductList(params.id);
      }
    } catch (error) {
      const err = error as AxiosError | any;
      throw new Error(err.response.data.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnSaveConfigProduct = async (productSelected: any): Promise<void> => {
    try {
      setState(States.loading);
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
            debit:
              +unmask(formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleDebit]) ?? 0,
            credit:
              +unmask(formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleCredit]) ?? 0,
            pix: +unmask(formDataConfigProduct[FormInputNameToConfigProduct.physicalSalePix]) ?? 0,
            administrateTax:
              +unmask(
                formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleAdministrateTax],
              ) ?? 0,
            installments:
              +formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleInstallments] ?? 0,
            fee: +unmask(formDataConfigProduct[FormInputNameToConfigProduct.physicalSaleFee]) ?? 0,
          },
          websiteSale: {
            id: productSelected?.websiteSale?.id,
            allowCreditCardPayment:
              convertToBoolean(
                formDataConfigProduct[
                  FormInputNameToConfigProduct.websiteSaleAllowCreditCardPayment
                ],
              ) ?? true,
            credit:
              +unmask(formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleCredit]) ?? 0,
            bankSlip:
              +unmask(formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleBankSlip]) ?? 0,
            pix: +unmask(formDataConfigProduct[FormInputNameToConfigProduct.websiteSalePix]) ?? 0,
            administrateTax:
              +unmask(
                formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleAdministrateTax],
              ) ?? 0,
            installments:
              +formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleInstallments] ?? 0,
            fee: +unmask(formDataConfigProduct[FormInputNameToConfigProduct.websiteSaleFee]) ?? 0,
          },
          waiter: +unmask(formDataConfigProduct[FormInputNameToConfigProduct.waiter]) ?? 0,
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
    } finally {
      setState(States.default);
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
        setNameFiles({});
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
      onChangeFormInputProduct(FormInputNameProduct.group)(String(product.group?.id));
      onChangeFormInputProduct(FormInputNameProduct.subgroup)(String(product.subgroup?.id));
      onChangeFormInputProduct(FormInputNameProduct.id)(String(product.id));
      onChangeFormInputProduct(FormInputNameProduct.allowSellingWebsite)(
        String(product.allowSellingWebsite),
      );
      onChangeFormInputProduct(FormInputNameProduct.unitMeasurement)(
        String(product.unitMeasurement),
      );
      onChangeFormInputProduct(FormInputNameProduct.amount)(String(product.amount));
      onChangeFormInputProduct(FormInputNameProduct.unitValue)(String(product.unitValue));
      onChangeFormInputProduct(FormInputNameProduct.totalValue)(String(product.totalValue));
      onChangeFormInputProduct(FormInputNameProduct.imageBase64Product)(
        String(product.imageBase64),
      );

      onChangeFormInputConfigProduct(
        FormInputNameToConfigProduct.physicalSaleAllowCreditCardPayment,
      )(String(product.physicalSale?.allowCreditCardPayment));
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleDebit)(
        toPercentage(product.physicalSale?.debit ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleCredit)(
        toPercentage(product.physicalSale?.credit ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSalePix)(
        toPercentage(product.physicalSale?.pix ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleAdministrateTax)(
        toPercentage(product.physicalSale?.administrateTax ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleInstallments)(
        String(product.physicalSale?.installments ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.physicalSaleFee)(
        toPercentage(product.physicalSale?.fee ?? ''),
      );
      onChangeFormInputConfigProduct(
        FormInputNameToConfigProduct.websiteSaleAllowCreditCardPayment,
      )(String(product.websiteSale?.allowCreditCardPayment));
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleCredit)(
        toPercentage(product.websiteSale?.credit ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSalePix)(
        toPercentage(product.websiteSale?.pix ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleAdministrateTax)(
        toPercentage(product.websiteSale?.administrateTax ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleBankSlip)(
        toPercentage(product.websiteSale?.bankSlip ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleInstallments)(
        String(product.websiteSale?.installments ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.websiteSaleFee)(
        toPercentage(product.websiteSale?.fee ?? ''),
      );
      onChangeFormInputConfigProduct(FormInputNameToConfigProduct.waiter)(
        toPercentage(product?.waiter ?? ''),
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
        onChangeFormInputProduct(FormInputNameProduct.id)(product.id as string);
        onChangeFormInputProduct(FormInputNameProduct.name)(product.name as string);
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
      controllerEvent={controllerEvent}
    />
  );
};
