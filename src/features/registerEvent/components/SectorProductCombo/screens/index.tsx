/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import SectorProductGroup from '@/model/SectorProductGroup';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import { AxiosError } from 'axios';
import validators from '@/helpers/validators';
import api from '@/services/api';
import DiscountCoupon from '@/model/DiscountCoupon';
import ProductSubgroup from '@/model/ProductSubgroup';
import { useDialog } from '@/hooks/useDialog';
import {
  FormInputName as FormInputNameCombo,
  SectorProductComboContainer,
} from '@/features/registerEvent/components/SectorProductCombo/screens/ui';
import SectorProductComboProduct from '@/model/SectorProductComboProduct';
import SectorProductCombo from '@/model/SectorProductCombo';
import { TabSectorProductActionsProps } from '@/features/registerEvent/screens/SectorProduct/ui';
import { useParams } from 'react-router-dom';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/components/DeleteContent';
import EventGroupSubgroup from '@/model/EventGroupSubgroup';
import EventProduct from '@/model/EventProduct';
import { convertToBoolean } from '@/helpers/common/convertToBoolean';
import {
  comboActionsProps,
  comboRequestProps,
  comboStatesProps,
  formAppendProductsProps,
  formComboConfigProps,
  formComboProps,
} from '../types';
import { States } from '../../ContractorScreen/screens/ui';
import { FormInputNameComboConfig } from '../components/ComboConfigContent';

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  comboConfig = 'comboConfig',
}

type UrlParams = {
  id: string;
};

export const SectorProductComboScreen: React.FC<TabSectorProductActionsProps> = ({
  backTab,
  nextTab,
  onFirstTab,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [discountCoupon, setDiscountCoupon] = useState<DiscountCoupon[]>([]);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.comboConfig,
  );
  const [comboState, setComboState] = useState<any>();
  const [comboList, setComboList] = useState<SectorProductCombo[]>([]);

  const [product, setProduct] = useState<SectorProductComboProduct[]>([
    { id: '', name: '', amount: 0 },
  ]);
  // const [productList, setProductList] = useState<SectorProductComboProduct[]>([]);
  const [productGet, setProductGet] = useState<EventProduct[]>([]);
  const [listProductGroup, setListProductGroup] = useState<EventGroupSubgroup[]>([]);
  const [listProductSubGroup, setListProductSubGroup] = useState<ProductSubgroup[]>([]);
  const [listProduct, setListProduct] = useState<EventProduct[]>([]);

  const confirmDelete = useConfirmDelete();

  const params = useParams<UrlParams>();

  const {
    formData: formDataCombo,
    formErrors: formErrorsCombo,
    onChangeFormInput: onChangeFormInputCombo,
    isFormValid: isFormValidCombo,
  } = useForm({
    initialData: {
      allowCombo: 'true',
      id: '',
      name: '',
      amount: '',
      totalValue: '',
      imageBase64: '',
      groupId: '',
      group: '',
      groupImageBase64: '',
      subgroup: '',
      subgroupImageBase64: '',
      product: '',
      productAmount: '',
    },
    validators: {
      group: [validators.required],
      subgroup: [validators.required],
      name: [validators.required],
      amount: [validators.required],
      totalValue: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataComboConfig,
    formErrors: formErrorsComboConfig,
    onChangeFormInput: onChangeFormInputComboConfig,
    // isFormValid: isFormValidCombo,
    resetForm,
  } = useForm({
    initialData: {
      id: '',
      formPrinting: '',
      hasCourtesy: '',
      physicalSaleAllowCreditCardPayment: '',
      physicalSaleDebit: '',
      physicalSaleCredit: '',
      physicalSaleBankSlip: '',
      physicalSalePix: '',
      physicalSaleAdministrateTax: '',
      physicalSaleInstallments: '',
      physicalSaleFee: '',
      websiteSaleAllowCreditCardPayment: '',
      websiteSaleDebit: '',
      websiteSaleCredit: '',
      websiteSaleBankSlip: '',
      websiteSalePix: '',
      websiteSaleAdministrateTax: '',
      websiteSaleInstallments: '',
      websiteSaleFee: '',
      waiter: '',
      partialPayment: '',
      allowDiscountCoupon: '',
      discountsId: '',
      name: '',
      code: '',
      amount: '',
      discount: '',
    },
    validators: {
      name: [validators.required],
      formPrinting: [validators.required],
      hasCourtesy: [validators.required],
      physicalSaleAllowCreditCardPayment: [validators.required],
      physicalSaleDebit: [validators.required, validators.between(0, 10)],
      physicalSaleCredit: [validators.required, validators.between(0, 10)],
      physicalSaleBankSlip: [validators.required, validators.between(0, 10)],
      physicalSalePix: [validators.required, validators.between(0, 10)],
      physicalSaleAdministrateTax: [validators.required, validators.between(0, 10)],
      physicalSaleInstallments: [validators.required],
      physicalSaleFee: [validators.required, validators.between(0, 10)],
      websiteSaleAllowCreditCardPayment: [validators.required],
      websiteSaleDebit: [validators.required, validators.between(0, 10)],
      websiteSaleCredit: [validators.required, validators.between(0, 10)],
      websiteSalePix: [validators.required, validators.between(0, 10)],
      websiteSaleAdministrateTax: [validators.required, validators.between(0, 10)],
      websiteSaleBankSlip: [validators.required, validators.between(0, 10)],
      websiteSaleInstallments: [validators.required],
      websiteSaleFee: [validators.required, validators.between(0, 10)],
      waiter: [validators.required, validators.between(0, 10)],
      partialPayment: [validators.required],
      allowDiscountCoupon: [validators.required],
      discountsId: [validators.required],
      discountsName: [validators.required],
      discountsCode: [validators.required],
      discountsAmount: [validators.required],
      discountsDiscount: [validators.required],
    },
    formatters: {},
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();

  const handleNextTab = async (): Promise<void> => {
    // if (isFormValidProduct()) {
    // }
    nextTab();
  };

  const handleBackTab = (): void => {
    backTab();
  };

  // Começo DiscountCoupon form control

  // Adiciona um novo campo de cupom no formulário
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

  // onChange do valor do campo de cupom no formulário
  const handleChangeDiscountCoupon = (inputName: string, index: number, value: string): void => {
    const newFormValues = [...discountCoupon] as any;
    newFormValues[index][inputName] = value;
    setDiscountCoupon(newFormValues);
  };

  // Remove um campo de cupom do formulário
  const handleRemoveDiscountCoupon = (index: number): void => {
    const values = [...discountCoupon];
    values.splice(index, 1);
    setDiscountCoupon(values);
  };

  // Fim DiscountCoupon form control

  // Começo Product form control

  // onChange do valor do campo de produto no formulário
  const handleChangeProduct = (
    inputName: string,
    index: number,
    value: string | undefined,
  ): void => {
    const newFormValues = [...product] as any;
    newFormValues[index][inputName] = value;
    setProduct(newFormValues);
  };

  // Adiciona um novo campo de produto no formulário
  const addProduct = (index: string): void => {
    setProduct([...product, { id: index, name: '', amount: 0 }]);
  };

  // Remove um campo de produto do formulário
  const removeProduct = (index: number): void => {
    const values = [...product];
    values.splice(index, 1);
    setProduct(values);
  };

  // Fim Product form control

  // Payload para adicionar um novo combo
  const handleSaveCombo = async (): Promise<void> => {
    try {
      if (isFormValidCombo()) {
        const productData = product.map(prod => ({
          id: prod?.id,
          name: prod.name,
          amount: Number(prod.amount),
        }));
        if (productData) {
          const payload = {
            id: formDataCombo[FormInputNameCombo.id] || undefined,
            group: {
              id: formDataCombo[FormInputNameCombo.group],
            },
            subgroup: {
              id: formDataCombo[FormInputNameCombo.subGroup],
            },
            name: formDataCombo[FormInputNameCombo.name],
            allowSellingWebsite: convertToBoolean(
              formDataCombo[FormInputNameCombo.allowSellingWebsite],
            ),
            amount: +formDataCombo[FormInputNameCombo.amount],
            totalValue: +formDataCombo[FormInputNameCombo.totalValue],
            imageBase64: formDataCombo[FormInputNameCombo.imageBase64],
            products: productData,
          };

          // cenário de criação
          if (payload.id === '') {
            delete payload.id;
          }

          // condição para remover o produto caso o campo esteja vazio
          payload.products = payload.products.filter(prod => prod.name !== '');

          // Condição para remover o id do produto caso seja um novo produto
          payload.products.forEach(productObject => {
            if (productObject.id === '') {
              // eslint-disable-next-line no-param-reassign
              delete productObject.id;
            }
          });
          const reponse = await api.post(`/event/section-product/${params.id}/combo`, payload);
          if (reponse) toast.success('Dados salvos com sucesso!');

          resetForm();
        } else {
          toast.error('É necessário adicionar ao menos um produto!');
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnSaveComboConfig = async (): Promise<void> => {
    try {
      const discountData = discountCoupon.map(disc => ({
        name: disc.name,
        code: disc.code,
        amount: Number(disc.amount),
        discountType: disc.discountType,
        discount: Number(disc.discount),
      }));

      const payloadComboConfig = {
        formPrinting: +formDataComboConfig[FormInputNameComboConfig.formPrinting],
        hasCourtesy: convertToBoolean(formDataComboConfig[FormInputNameComboConfig.hasCourtesy]),
        physicalSale: {
          allowCreditCardPayment: convertToBoolean(
            formDataComboConfig[FormInputNameComboConfig.physicalSaleAllowCreditCardPayment],
          ),
          debit: +formDataComboConfig[FormInputNameComboConfig.physicalSaleDebit],
          credit: +formDataComboConfig[FormInputNameComboConfig.physicalSaleCredit],
          pix: +formDataComboConfig[FormInputNameComboConfig.physicalSalePix],
          administrateTax:
            +formDataComboConfig[FormInputNameComboConfig.physicalSaleAdministrateTax],
          installments: +formDataComboConfig[FormInputNameComboConfig.physicalSaleInstallments],
          fee: +formDataComboConfig[FormInputNameComboConfig.physicalSaleFee],
        },
        websiteSale: {
          allowCreditCardPayment: convertToBoolean(
            formDataComboConfig[FormInputNameComboConfig.websiteSaleAllowCreditCardPayment],
          ),
          credit: +formDataComboConfig[FormInputNameComboConfig.websiteSaleCredit],
          pix: +formDataComboConfig[FormInputNameComboConfig.websiteSalePix],
          administrateTax:
            +formDataComboConfig[FormInputNameComboConfig.websiteSaleAdministrateTax],
          bankSlip: +formDataComboConfig[FormInputNameComboConfig.websiteSaleBankSlip],
          installments: +formDataComboConfig[FormInputNameComboConfig.websiteSaleInstallments],
          fee: +formDataComboConfig[FormInputNameComboConfig.websiteSaleFee],
        },
        waiter: +formDataComboConfig[FormInputNameComboConfig.waiter],
        partialPayment: convertToBoolean(
          formDataComboConfig[FormInputNameComboConfig.partialPayment],
        ),
        allowDiscountCoupon: convertToBoolean(
          formDataComboConfig[FormInputNameComboConfig.allowDiscountCoupon],
        ),
        discounts: discountData,
      };

      // Ainda não temos este endpoint
      const reponse = await api.post(
        `/event/section-product/${params.id}/combo/config`,
        payloadComboConfig,
      );
      if (reponse) toast.success('Dados salvos com sucesso!');

      resetForm();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  // Get para montar o select de grupo de produto
  const handleFecthProductGroupList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<EventGroupSubgroup[]>(`event/section-product/${id}/group`);
      setListProductGroup(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFecthProductList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<EventProduct[]>(`event/section-product/${id}/product`);
      setProductGet(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  // Get para montar o select de subgrupo de produto
  const handleGetProductSubGroupList = async (dataSubgGroup: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ProductSubgroup[]>(
        `/category-subgroup/find/group/${dataSubgGroup}`,
      );
      setListProductSubGroup(data ?? []);
    } finally {
      setState(States.default);
    }
  };

  // Get para montar o select de produtos
  const handleGetProductList = async (group: any, subGroupId: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<EventProduct[]>(
        `event/section-product/${params.id}/group/${group}/sub-group/${subGroupId}/product`,
      );
      setListProduct(data ?? []);
    } finally {
      setState(States.default);
    }
  };

  const onClearSelectSubGroup = (ref: any) => {
    if (ref) {
      ref?.current.clearValue();
    }
  };
  // Get para montar a tabela de combos já cadastrados
  const handleGetComboList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`event/section-product/${id}/combo`);

      setComboList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  // GET para montar cenário de edição apos setar combo selecionado
  const handleOnGetCombo = async (comboSelected: any): Promise<void> => {
    try {
      if (comboSelected) {
        setComboState(comboSelected);
        setProduct(
          comboSelected.products.map((prod: any) => ({
            id: prod.id,
            name: prod.name,
            amount: prod.amount,
          })),
        );
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  // Limpa estados e cancela edição
  const handleOnCancelEditCombo = (): void => {
    try {
      setComboState(undefined);
      resetForm();
      // setNameFiles({});
      setProduct([{ id: '', name: '', amount: 0 }]);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  // Patch para ativar ou desativar venda online
  const handleOnChangeAllowOnlineSwitch = async (comboSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      const activedInput = comboSelected.allowSellingWebsite;

      await api.patch(
        `event/section-product/${params.id}/combo/${comboSelected.id}${
          activedInput ? ' /disable-online' : '/enable-online'
        }`,
      );

      handleGetComboList(params.id);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  // Patch para ativar ou desativar combo
  const handleOnChangeComboSwitch = async (comboSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      const activedInput = comboSelected.status;

      await api.patch(
        `event/section-product/${params.id}/combo/${comboSelected.id}${
          activedInput ? ' /disable' : '/enable'
        }`,
      );

      handleGetComboList(params.id);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  // Delete para excluir um combo
  const handleOnConfirmDeleteCombo = async (comboSelected: any): Promise<void> => {
    try {
      await api.delete(`/event/section-product/${params?.id}/combo/${comboSelected.id}`);
      toast.success('Combo excluído com sucesso!');
      handleGetComboList(params.id);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      confirmDelete.hide();
    }
  };

  // Função para abrir o modal de confirmação de exclusão
  const handleOnShowDeleteCombo = (comboSelected: any): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteCombo(comboSelected),
        },
      ],
    });
  };

  // Função para abrir o modal de configuração de combo
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
  }: // comboConfig: comboSelected,
  {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    comboConfig?: SectorProductGroup;
    comboSelected?: SectorProductGroup;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
  };

  const controllerComboStates: comboStatesProps = {
    state,
    listProductSubGroup,
    listProductGroup,
    listProduct,
    product,
    comboState,
    comboList,
    productGet,
  };

  const controllerFormCombo: formComboProps = {
    onChangeFormInputCombo,
    formDataCombo,
    formErrorsCombo,
    onClearSelectSubGroup,
  };

  const controllerFormAppendProducts: formAppendProductsProps = {
    onChangeProduct: handleChangeProduct,
    addProduct,
    removeProduct,
  };

  const controllerFormComboConfig: formComboConfigProps = {
    formDataComboConfig,
    formErrorsComboConfig,
    onChangeFormInputComboConfig,
  };

  const controllerProductActions: comboActionsProps = {
    onFirstTab,
    onReturnTab: handleBackTab,
    onNextTab: handleNextTab,
  };

  const controllerComboRequests: comboRequestProps = {
    saveCombo: handleSaveCombo,
    saveComboConfig: handleOnSaveComboConfig,
    getProductSubGroupList: handleGetProductSubGroupList,
    onChangeAllowOnlineSwitch: handleOnChangeAllowOnlineSwitch,
    onChangeComboSwitch: handleOnChangeComboSwitch,
    getComboSelected: handleOnGetCombo,
    onCancelEdit: handleOnCancelEditCombo,
    getProductList: handleGetProductList,
  };

  useEffect(() => {
    handleGetComboList(params.id);
    handleFecthProductGroupList(params.id);
    handleFecthProductList(params.id);
  }, []);

  useEffect(() => {
    if (comboState) {
      const comboEdit = listProductGroup.find((item: any) => item.id === comboState.group);
      if (comboEdit) {
        onChangeFormInputCombo(FormInputNameCombo.id)(comboState.id);
        onChangeFormInputCombo(FormInputNameCombo.group)(comboState.group);
        onChangeFormInputCombo(FormInputNameCombo.subGroup)(comboState.subGroup);
        onChangeFormInputCombo(FormInputNameCombo.name)(comboState.name);
        onChangeFormInputCombo(FormInputNameCombo.allowSellingWebsite)(
          comboState.allowSellingWebsite,
        );
        onChangeFormInputCombo(FormInputNameCombo.amount)(comboState.amount);
        onChangeFormInputCombo(FormInputNameCombo.totalValue)(comboState.totalValue);
        onChangeFormInputCombo(FormInputNameCombo.imageBase64)(comboState.imageBase64);
      }
    }
  }, [comboState]);

  return (
    <SectorProductComboContainer
      title={title}
      visible={visible}
      comboStates={controllerComboStates}
      formAppendProducts={controllerFormAppendProducts}
      controllerProductActions={controllerProductActions}
      controllerFormCombo={controllerFormCombo}
      controllerFormComboConfig={controllerFormComboConfig}
      comboRequests={controllerComboRequests}
      onToggle={onToggle}
      shouldShowModal={shouldShowModal}
      onShouldShowModal={handleOnShouldShowModal}
      handleAddDiscountCoupon={handleAddDiscountCoupon}
      discountCoupon={discountCoupon}
      handleChangeDiscountCoupon={handleChangeDiscountCoupon}
      handleRemoveDiscountCoupon={handleRemoveDiscountCoupon}
      onShowDeleteCombo={handleOnShowDeleteCombo}
    />
  );
};
