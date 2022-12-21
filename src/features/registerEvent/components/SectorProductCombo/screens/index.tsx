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
import { FormInputNameComboConfig } from '../components/RegisterContentComboConfig';

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
  const [productGet, setProductGet] = useState<EventProduct[]>([]);
  const [listProductGroup, setListProductGroup] = useState<EventGroupSubgroup[]>([]);
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
      group: '',
      groupImageBase64: '',
      subgroup: '',
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
      group: [validators.required],
      groupImageBase64: [validators.required],
      subgroup: [validators.required],
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
      const productData = product.map(prod => ({
        id: prod.id,
        name: prod.name,
        amount: Number(prod.amount),
      }));

      const discountData = discountCoupon.map(disc => ({
        name: disc.name,
        code: disc.code,
        amount: Number(disc.amount),
        discountType: disc.discountType,
        discount: Number(disc.discount),
      }));

      const payload = {
        id: formDataCombo[FormInputNameCombo.id] || undefined,
        group: {
          id: formDataCombo[FormInputNameCombo.group],
        },
        subgroup: {
          id: formDataCombo[FormInputNameCombo.subGroup],
        },
        name: formDataCombo[FormInputNameCombo.name],
        amount: +formDataCombo[FormInputNameCombo.amount],
        totalValue: +formDataCombo[FormInputNameCombo.totalValue],
        imageBase64: formDataCombo[FormInputNameCombo.imageBase64],
        products: productData,
        formPrinting: formDataComboConfig[FormInputNameComboConfig.formPrinting],
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
          bankSlip: 0,
          installments: +formDataComboConfig[FormInputNameComboConfig.physicalSaleInstallments],
          fee: +formDataComboConfig[FormInputNameComboConfig.physicalSaleFee],
        },
        allowSellingWebsite: convertToBoolean(
          formDataCombo[FormInputNameCombo.allowSellingWebsite],
        ),
        websiteSale: {
          allowCreditCardPayment: convertToBoolean(
            formDataComboConfig[FormInputNameComboConfig.websiteSaleAllowCreditCardPayment],
          ),
          debit: 1,
          credit: +formDataComboConfig[FormInputNameComboConfig.websiteSaleCredit],
          pix: +formDataComboConfig[FormInputNameComboConfig.websiteSalePix],
          administrateTax:
            +formDataComboConfig[FormInputNameComboConfig.websiteSaleAdministrateTax],
          bankSlip: +formDataComboConfig[FormInputNameComboConfig.websiteSaleBankSlip],
          installments: +formDataComboConfig[FormInputNameComboConfig.websiteSaleInstallments],
          fee: +formDataComboConfig[FormInputNameComboConfig.websiteSaleFee],
        },
        waiter: +formDataComboConfig[FormInputNameComboConfig.waiter],
        partialPayment: formDataComboConfig[FormInputNameComboConfig.partialPayment],
        allowDiscountCoupon: convertToBoolean(
          formDataComboConfig[FormInputNameComboConfig.allowDiscountCoupon],
        ),
        discounts: discountData,
      };

      // cenário de criação
      if (payload.id === '') {
        delete payload.id;
      }

      payload.products = payload.products.filter(prod => prod.name !== '');

      // Condição para remover o id do produto caso seja um novo subgrupo
      payload.products.forEach(productObject => {
        if (productObject.id === '') {
          // eslint-disable-next-line no-param-reassign
          delete productObject.id;
        }
      });

      const reponse = await api.post(`/event/section-product/${params.id}/combo`, payload);
      if (reponse) toast.success('Dados salvos com sucesso!');

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
          formPrinting: +formDataComboConfig.formPrinting,
          hasCourtesy: convertToBoolean(formDataComboConfig.hasCourtesy),
          physicalSale: {
            allowCreditCardPayment: convertToBoolean(formDataComboConfig.allowCreditCardPayment),
            debit: +formDataComboConfig.debit,
            credit: +formDataComboConfig.credit,
            bankSlip: +formDataComboConfig.bankSlip,
            pix: +formDataComboConfig.pix,
            administrateTax: +formDataComboConfig.administrateTax,
            installments: +formDataComboConfig.installments,
            fee: +formDataComboConfig.fee,
          },
          allowSellingWebsite: convertToBoolean(formDataCombo.allowSellingWebsite),
          websiteSale: {
            allowCreditCardPayment: convertToBoolean(formDataComboConfig.allowCreditCardPayment),
            debit: +formDataComboConfig.debit,
            credit: +formDataComboConfig.credit,
            bankSlip: +formDataComboConfig.bankSlip,
            pix: +formDataComboConfig.pix,
            administrateTax: +formDataComboConfig.administrateTax,
            installments: +formDataComboConfig.installments,
            fee: +formDataComboConfig.fee,
          },
          waiter: 0,
          partialPayment: true,
          allowDiscountCoupon: true,
          discounts: [
            {
              name: formDataComboConfig.name,
              code: formDataComboConfig.code,
              amount: +formDataComboConfig.amount,
              discountType: +formDataComboConfig.discountType,
              discount: +formDataComboConfig.discount,
            },
          ],
          status: 0,
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
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
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
    product,
    productList,
    combo,
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
    getProductSubGroupList: handleGetProductSubGroupList,
    onChangeAllowOnlineSwitch: handleOnChangeAllowOnlineSwitch,
    onChangeComboSwitch: handleOnChangeComboSwitch,
  };

  useEffect(() => {
    handleGetComboList(params.id);
    handleFecthProductGroupList(params.id);
    handleFecthProductList(params.id);
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
