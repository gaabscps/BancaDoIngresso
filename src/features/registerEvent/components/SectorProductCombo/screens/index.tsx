import React, { useEffect, useState } from 'react';
import SectorProductGroup from '@/model/SectorProductGroup';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import { AxiosError } from 'axios';
import validators from '@/helpers/validators';
import api from '@/services/api';
import DiscountCoupon from '@/model/DiscountCoupon';
import ProductSubgroup from '@/model/ProductSubgroup';
import ProductGroup from '@/model/ProductGroup';
import { useDialog } from '@/hooks/useDialog';
import { SectorProductComboContainer } from '@/features/registerEvent/components/SectorProductCombo/screens/ui';
import SectorProductComboProduct from '@/model/SectorProductComboProduct';
import SectorProductCombo from '@/model/SectorProductCombo';
import { TabSectorProductActionsProps } from '@/features/registerEvent/screens/SectorProduct/ui';
import { useParams } from 'react-router-dom';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { DeleteContent } from '@/components/DeleteContent';
import {
  comboActionsProps,
  comboRequestProps,
  comboStatesProps,
  formAppendProductsProps,
  formComboConfigProps,
  formComboProps,
} from '../types';
import { States } from '../../ContractorScreen/screens/ui';

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
  const [combo, setCombo] = useState<SectorProductCombo[]>([]);
  const [comboList, setComboList] = useState<SectorProductCombo[]>([]);

  const [product, setProduct] = useState<SectorProductComboProduct[]>([
    { id: '', name: '', amount: 0 },
  ]);
  const [productList, setProductList] = useState<SectorProductComboProduct[]>([]);
  const [listProductGroup, setListProductGroup] = useState<ProductGroup[]>([]);
  const [listProductSubGroup, setListProductSubGroup] = useState<ProductSubgroup[]>([]);

  const confirmDelete = useConfirmDelete();

  const params = useParams<UrlParams>();

  const {
    formData: formDataCombo,
    formErrors: formErrorsCombo,
    onChangeFormInput: onChangeFormInputCombo,
    // isFormValid: isFormValidCombo,
  } = useForm({
    initialData: {
      allowCombo: 'true',
      id: '',
      name: '',
      amount: '',
      totalValue: '',
      imageBase64: '',
      groupId: '',
      groupName: '',
      groupImageBase64: '',
      subgroupName: '',
      subgroupImageBase64: '',
      product: '',
      productAmount: '',
    },
    validators: {
      name: [validators.required],
      amount: [validators.required],
      totalValue: [validators.required],
      imageBase64: [validators.required],
      groupId: [validators.required],
      groupName: [validators.required],
      groupImageBase64: [validators.required],
      subgroupName: [validators.required],
      subgroupImageBase64: [validators.required],
      product: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataComboConfig,
    formErrors: formErrorsComboConfig,
    onChangeFormInput: onChangeFormInputComboConfig,
    // isFormValid: isFormValidCombo,
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
      discountsName: '',
      discountsCode: '',
      discountsAmount: '',
      discountsDiscount: '',
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
      // Aqui será feito a integração com o backend
      // chamar a api para adicionar um novo combo
      setProductList([...productList, ...product]);

      setCombo([
        {
          name: formDataCombo.name,
          amount: +formDataCombo.amount,
          totalValue: +formDataCombo.totalValue,
          imageBase64: formDataCombo.imageBase64,
          group: {
            name: formDataCombo.group,
          },
          subgroup: {
            name: formDataCombo.subgroup,
          },
          products: [...productList, ...product],
          status: 0,
          allowSellingWebsite: true,
        },
      ]);

      // resetForm();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  // Get para montar o select de grupo de produto
  const handleFecthProductGroupList = async (id: string): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ProductGroup[]>(`event/section-product/${id}/group`);
      setListProductGroup(data ?? []);
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
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
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

  // Patch para ativar ou desativar venda online
  const handleOnChangeAllowOnlineSwitch = async (comboSelected: any): Promise<void> => {
    console.log('object 1');
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
    console.log('object 1');
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
    product,
    productList,
    combo,
    comboList,
  };

  const controllerFormCombo: formComboProps = {
    onChangeFormInputCombo,
    formDataCombo,
    formErrorsCombo,
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
    getProductSubGroupList: handleGetProductSubGroupList,
    onChangeAllowOnlineSwitch: handleOnChangeAllowOnlineSwitch,
    onChangeComboSwitch: handleOnChangeComboSwitch,
  };

  useEffect(() => {
    handleGetComboList(params.id);
    handleFecthProductGroupList(params.id);
  }, []);

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
