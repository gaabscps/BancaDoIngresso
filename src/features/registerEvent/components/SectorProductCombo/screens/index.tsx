/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
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
  FormInputNameCombo,
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
import { unmask } from '@/helpers/masks/cashNumber';
import { toPercentage } from '@/helpers/common/amount';
import {
  comboActionsProps,
  comboRequestProps,
  comboStatesProps,
  formAppendProductsProps,
  formComboConfigProps,
  formComboProps,
  formDiscountCouponProps,
} from '../types';
import { States } from '../../ContractorScreen/screens/ui';
import {
  FormInputNameComboConfig,
  FormInputNameDiscountCoupon,
} from '../components/ComboConfigContent';

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  comboConfig = 'comboConfig',
}

type UrlParams = {
  id: string;
};

export interface NameFiles {
  [key: string]: string;
}

export const SectorProductComboScreen: React.FC<TabSectorProductActionsProps> = ({
  backTab,
  nextTab,
  onFirstTab,
  controllerEvent,
  phaseCompletion,
  handleGetEventPhaseCompletion,
}): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [nameFiles, setNameFiles] = useState<NameFiles | undefined>({});
  const [discountCouponList, setDiscountCouponList] = useState<DiscountCoupon[]>([]);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.comboConfig,
  );
  const [comboState, setComboState] = useState<any>();
  const [combo, setCombo] = useState<any>();
  const [comboConfig, setComboConfig] = useState<any>();
  const [comboList, setComboList] = useState<SectorProductCombo[]>([]);
  const [hasCombo, setHasCombo] = useState<boolean>(!!phaseCompletion?.sectionProduct.combo);
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
    isFormValid: isFormValidCombo,
    formErrors: formErrorsCombo,
    onChangeFormInput: onChangeFormInputCombo,
    resetForm: resetFormCombo,
    setFormErrors: setErrorsCombo,
  } = useForm({
    initialData: {
      allowCombo: String(hasCombo),
      id: '',
      name: '',
      allowSellingWebsite: `true`,
      amount: '',
      totalValue: '',
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
    isFormValid: isFormValidComboConfig,
    resetForm: resetFormComboConfig,
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
      physicalSaleAllowCreditCardPayment: [validators.required],
      physicalSaleDebit: [validators.required, validators.between(0, 99)],
      physicalSaleCredit: [validators.required, validators.between(0, 99)],
      physicalSalePix: [validators.required, validators.between(0, 99)],
      physicalSaleAdministrateTax: [validators.required, validators.between(0, 99)],
      physicalSaleInstallments: [validators.required, validators.between(0, 24)],
      physicalSaleFee: [validators.required, validators.between(0, 99)],
      websiteSaleAllowCreditCardPayment: [validators.required],
      websiteSaleBankSlip: [validators.required, validators.between(0, 99)],
      websiteSaleCredit: [validators.required, validators.between(0, 99)],
      websiteSalePix: [validators.required, validators.between(0, 99)],
      websiteSaleAdministrateTax: [validators.required, validators.between(0, 99)],
      websiteSaleInstallments: [validators.required, validators.between(0, 24)],
      websiteSaleFee: [validators.required, validators.between(0, 99)],
      waiter: [validators.required, validators.between(0, 99)],
      partialPayment: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataDiscount,
    formErrors: formErrorsDiscount,
    onChangeFormInput: onChangeFormInputDiscount,
    isFormValid: isFormValidDiscount,
    resetForm: resetFormDiscount,
  } = useForm({
    initialData: {
      id: '',
      discountsName: '',
      discountsCode: '',
      discountsAmount: '',
      discountsDiscount: '',
      discountType: '',
    },
    validators: {
      discountsName: [validators.required],
      discountsCode: [validators.required],
      discountsAmount: [validators.required, validators.between(0, 9999)],
      discountsDiscount: [validators.required],
      discountType: [validators.required],
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

  const handleOnToggle = (): void => {
    onToggle();
    setComboState(undefined);
    resetFormCombo();
    resetFormComboConfig();
    resetFormDiscount();
  };

  // Começo DiscountCoupon form control

  // Payload envio cupom de desconto para o backend
  const handleSaveDiscountCoupon = async (comboSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      if (isFormValidDiscount()) {
        const payloadDiscountCoupon = {
          name: formDataDiscount[FormInputNameDiscountCoupon.discountsName],
          code: formDataDiscount[FormInputNameDiscountCoupon.discountsCode],
          amount: +formDataDiscount[FormInputNameDiscountCoupon.discountsAmount],
          discount: +unmask(formDataDiscount[FormInputNameDiscountCoupon.discountsDiscount]),
          discountType: +formDataDiscount[FormInputNameDiscountCoupon.discountType],
        };

        const reponse = await api.post(
          `/event/section-product/${params.id}/combo/${comboSelected.id}/discount`,
          payloadDiscountCoupon,
        );
        if (reponse) toast.success('Dados salvos com sucesso!');

        resetFormDiscount();
        handleGetDiscount(comboSelected);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleRemoveDiscountCoupon = async (
    comboSelected: any,
    discountCouponSelected: any,
  ): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(
        `/event/section-product/${params?.id}/combo/${comboSelected.id}/discount/${discountCouponSelected.id}`,
      );
      toast.success('Cupom de desconto excluído com sucesso!');
      handleGetDiscount(comboSelected);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      confirmDelete.hide();
      setState(States.default);
    }
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

  // OncChange do input de imagem do Combo
  const handleOnChangeFileInput =
    (inputName: string) =>
    (file: File | undefined): void => {
      // validate if file is image
      if (file && file.type.match(/image\/(jpg|jpeg|png)/)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result?.toString();
          if (base64) {
            setNameFiles({ ...nameFiles, [inputName]: file.name });
            onChangeFormInputCombo(inputName)('');
            onChangeFormInputCombo(inputName)(base64);
          }
        };
      } else {
        setErrorsCombo({
          [inputName]: ['O formato deve ser .jpg, .jpeg ou .png'],
        });
      }
    };

  // Payload para adicionar um novo combo
  const handleSaveCombo = async (): Promise<void> => {
    try {
      setState(States.loading);
      if (isFormValidCombo()) {
        const productData = product.map(prod => ({
          id: prod?.id,
          name: prod.name || undefined,
          amount: Number(prod.amount),
        }));
        if (productData.find(e => e.name !== undefined)) {
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
            imageBase64: formDataCombo[FormInputNameCombo.imageBase64Combo],
            products: productData.length > 0 ? productData : undefined,
          };

          // cenário de criação
          if (payload.id === '') {
            delete payload.id;
          }

          // condição para remover o produto caso o campo esteja vazio
          payload.products = payload?.products?.filter(prod => prod.name !== '');

          // Condição para remover o id do produto caso seja um novo produto
          payload?.products?.forEach(productObject => {
            if (productObject.id === '') {
              // eslint-disable-next-line no-param-reassign
              delete productObject.id;
            }
          });
          const reponse = await api.post(`/event/section-product/${params.id}/combo`, payload);
          if (reponse) toast.success('Dados salvos com sucesso!');
          handleOnCancelEditCombo();
          setCombo(payload);
        } else {
          toast.error('É necessário adicionar ao menos um produto!');
        }
      }
    } catch (error) {
      const err = error as AxiosError | any;
      toast.error(
        `${err.response?.data.message} o item ${err.response?.data.details} está vinculado ao evento`,
      );
    } finally {
      setState(States.default);
    }
  };

  const handleOnSaveComboConfig = async (comboSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      if (isFormValidComboConfig()) {
        const payloadComboConfig = {
          formPrinting: +formDataComboConfig[FormInputNameComboConfig.formPrinting],
          hasCourtesy: convertToBoolean(formDataComboConfig[FormInputNameComboConfig.hasCourtesy]),
          physicalSale: {
            allowCreditCardPayment: convertToBoolean(
              formDataComboConfig[FormInputNameComboConfig.physicalSaleAllowCreditCardPayment],
            ),
            debit: +unmask(formDataComboConfig[FormInputNameComboConfig.physicalSaleDebit]),
            credit: +unmask(formDataComboConfig[FormInputNameComboConfig.physicalSaleCredit]),
            pix: +unmask(formDataComboConfig[FormInputNameComboConfig.physicalSalePix]),
            administrateTax: +unmask(
              formDataComboConfig[FormInputNameComboConfig.physicalSaleAdministrateTax],
            ),
            installments: +formDataComboConfig[FormInputNameComboConfig.physicalSaleInstallments],
            fee: +unmask(formDataComboConfig[FormInputNameComboConfig.physicalSaleFee]),
          },
          websiteSale: {
            allowCreditCardPayment: convertToBoolean(
              formDataComboConfig[FormInputNameComboConfig.websiteSaleAllowCreditCardPayment],
            ),
            credit: +unmask(formDataComboConfig[FormInputNameComboConfig.websiteSaleCredit]),
            pix: +unmask(formDataComboConfig[FormInputNameComboConfig.websiteSalePix]),
            administrateTax: +unmask(
              formDataComboConfig[FormInputNameComboConfig.websiteSaleAdministrateTax],
            ),
            bankSlip: +unmask(formDataComboConfig[FormInputNameComboConfig.websiteSaleBankSlip]),
            installments: +formDataComboConfig[FormInputNameComboConfig.websiteSaleInstallments],
            fee: +unmask(formDataComboConfig[FormInputNameComboConfig.websiteSaleFee]),
          },
          waiter: +unmask(formDataComboConfig[FormInputNameComboConfig.waiter]),
          partialPayment: convertToBoolean(
            formDataComboConfig[FormInputNameComboConfig.partialPayment],
          ),
          allowDiscountCoupon: convertToBoolean(
            formDataComboConfig[FormInputNameComboConfig.allowDiscountCoupon],
          ),
        };
        // discounts: discountData,
        const reponse = await api.post(
          `/event/section-product/${params.id}/combo/${comboSelected.id}/config`,
          payloadComboConfig,
        );
        if (reponse) toast.success('Dados salvos com sucesso!');

        resetFormComboConfig();
        handleOnToggle();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
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
  const handleGetComboList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(`event/section-product/${params.id}/combo`);

      setComboList(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };
  const handleGetComboConfig = async (comboSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(
        `event/section-product/${params.id}/combo/${comboSelected.id}/config`,
      );
      setComboConfig(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleGetDiscount = async (comboSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get(
        `event/section-product/${params.id}/combo/${comboSelected.id}/discount`,
      );
      setDiscountCouponList(data ?? []);
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
      setState(States.loading);
      if (comboSelected) {
        resetFormCombo();
        handleOnChangeFileInput(comboSelected.image)(undefined);
        setNameFiles(undefined);
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
    } finally {
      setState(States.default);
    }
  };

  // Limpa estados e cancela edição
  const handleOnCancelEditCombo = (): void => {
    try {
      setComboState(undefined);
      setComboConfig(undefined);
      resetFormCombo();
      resetFormComboConfig();
      setProduct([{ id: '', name: '', amount: 0 }]);
      setNameFiles(undefined);
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
          activedInput ? '/disable-online' : '/enable-online'
        }`,
      );

      handleGetComboList();
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
          activedInput === 0 ? '/disable' : '/enable'
        }`,
      );

      handleGetComboList();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleHasCombo = async (b: string): Promise<void> => {
    try {
      handleGetEventPhaseCompletion();
      setState(States.loading);
      await api.patch(`/event/combos/${params.id}/has/${b}`);
      setHasCombo(!hasCombo);
    } finally {
      setState(States.default);
    }
  };

  // Delete para excluir um combo
  const handleOnConfirmDeleteCombo = async (comboSelected: any): Promise<void> => {
    try {
      setState(States.loading);
      await api.delete(`/event/section-product/${params?.id}/combo/${comboSelected.id}`);
      toast.success('Combo excluído com sucesso!');
      handleGetComboList();
    } catch (error) {
      const err = error as AxiosError | any;
      throw new Error(err.response?.data.message);
    } finally {
      confirmDelete.hide();
      setState(States.default);
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
    comboSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    comboConfig?: SectorProductGroup;
    comboSelected?: any;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    setComboState(comboSelected);
  };

  const controllerComboStates: comboStatesProps = {
    state,
    listProductSubGroup,
    listProductGroup,
    listProduct,
    product,
    comboState,
    comboConfig,
    comboList,
    productGet,
  };

  const controllerFormCombo: formComboProps = {
    onChangeFormInputCombo,
    formDataCombo,
    formErrorsCombo,
    onClearSelectSubGroup,
    onChangeFileInput: handleOnChangeFileInput,
    nameFiles,
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

  const controllerFormDiscountCoupon: formDiscountCouponProps = {
    onChangeFormInputDiscount,
    formDataDiscount,
    formErrorsDiscount,
  };

  const controllerProductActions: comboActionsProps = {
    onFirstTab,
    onReturnTab: handleBackTab,
    onNextTab: handleNextTab,
  };

  const controllerComboRequests: comboRequestProps = {
    saveCombo: handleSaveCombo,
    saveComboConfig: handleOnSaveComboConfig,
    saveDiscountCoupon: handleSaveDiscountCoupon,
    onChangeAllowOnlineSwitch: handleOnChangeAllowOnlineSwitch,
    onChangeComboSwitch: handleOnChangeComboSwitch,
    getComboSelected: handleOnGetCombo,
    onCancelEdit: handleOnCancelEditCombo,
    getProductList: handleGetProductList,
    getComboConfig: handleGetComboConfig,
    getDiscount: handleGetDiscount,
    removeDiscountCoupon: handleRemoveDiscountCoupon,
    getComboList: handleGetComboList,
    onHandleHasCombo: handleHasCombo,
  };

  useEffect(() => {
    if (!visible) {
      handleOnCancelEditCombo();
    }
  }, [visible]);

  useEffect(() => {
    handleGetComboList();
    handleFecthProductGroupList(params.id);
    handleGetProductSubGroupList(params.id);
    handleFecthProductList(params.id);
  }, [combo || comboConfig]);

  useEffect(() => {
    if (comboState) {
      handleGetProductList(comboState.group.id, comboState.subgroup.id);
      const comboEdit = listProductGroup.find((item: any) => item.id === comboState.group.id);
      if (comboEdit) {
        onChangeFormInputCombo(FormInputNameCombo.id)(comboState.id);
        onChangeFormInputCombo(FormInputNameCombo.group)(String(comboState.group.id));
        onChangeFormInputCombo(FormInputNameCombo.subGroup)(String(comboState.subgroup.id));
        onChangeFormInputCombo(FormInputNameCombo.name)(String(comboState.name));
        onChangeFormInputCombo(FormInputNameCombo.allowSellingWebsite)(
          String(comboState.allowSellingWebsite),
        );
        onChangeFormInputCombo(FormInputNameCombo.amount)(String(comboState.amount));
        onChangeFormInputCombo(FormInputNameCombo.totalValue)(String(comboState.totalValue));
        onChangeFormInputCombo(FormInputNameCombo.imageBase64Combo)(comboState.imageBase64);
        setNameFiles(filesValues => ({
          ...filesValues,
          [FormInputNameCombo.imageBase64Combo]: comboState?.imageBase64?.split('/').pop(),
        }));
      }
    }
  }, [comboState]);

  useEffect(() => {
    if (comboConfig) {
      onChangeFormInputComboConfig(FormInputNameComboConfig.formPrinting)(
        String(comboConfig?.formPrinting),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.hasCourtesy)(
        String(comboConfig?.hasCourtesy),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.allowDiscountCoupon)(
        String(comboConfig?.allowDiscountCoupon || 'false'),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleAllowCreditCardPayment)(
        String(comboConfig?.physicalSale?.allowCreditCardPayment || 'false'),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleDebit)(
        String(
          (comboConfig?.physicalSale?.debit && toPercentage(comboConfig?.physicalSale?.debit)) ||
            '0,00',
        ),
      );

      onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleCredit)(
        String(
          (comboConfig?.physicalSale?.credit && toPercentage(comboConfig?.physicalSale?.credit)) ||
            '0,00',
        ),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSalePix)(
        String(toPercentage(comboConfig?.physicalSale?.pix || '')),
      );

      onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleAdministrateTax)(
        String(toPercentage(comboConfig?.physicalSale?.administrateTax || '')),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleInstallments)(
        comboConfig?.physicalSale?.installments
          ? String(comboConfig?.physicalSale?.installments)
          : '',
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.physicalSaleFee)(
        String(toPercentage(comboConfig?.physicalSale?.fee || '')),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleAllowCreditCardPayment)(
        toPercentage(comboConfig?.websiteSale?.allowCreditCardPayment || 'true'),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleCredit)(
        toPercentage(comboConfig?.websiteSale?.credit || ''),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleBankSlip)(
        toPercentage(comboConfig?.websiteSale?.bankSlip || ''),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSalePix)(
        toPercentage(comboConfig?.websiteSale?.pix || ''),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleAdministrateTax)(
        toPercentage(comboConfig?.websiteSale?.administrateTax || ''),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleInstallments)(
        String(comboConfig?.websiteSale?.installments || ''),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.websiteSaleFee)(
        toPercentage(comboConfig?.websiteSale?.fee || ''),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.waiter)(
        toPercentage(comboConfig?.waiter || ''),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.partialPayment)(
        String(comboConfig?.partialPayment || 'true'),
      );
      onChangeFormInputComboConfig(FormInputNameComboConfig.allowDiscountCoupon)(
        String(comboConfig?.allowDiscountCoupon || 'true'),
      );
    }
  }, [comboConfig]);

  return (
    <SectorProductComboContainer
      title={title}
      visible={visible}
      handleOnToggle={handleOnToggle}
      comboStates={controllerComboStates}
      formAppendProducts={controllerFormAppendProducts}
      controllerProductActions={controllerProductActions}
      controllerFormCombo={controllerFormCombo}
      controllerFormComboConfig={controllerFormComboConfig}
      controllerFormDiscountCoupon={controllerFormDiscountCoupon}
      controllerEvent={controllerEvent}
      comboRequests={controllerComboRequests}
      onToggle={onToggle}
      shouldShowModal={shouldShowModal}
      onShouldShowModal={handleOnShouldShowModal}
      discountCouponList={discountCouponList}
      onShowDeleteCombo={handleOnShowDeleteCombo}
    />
  );
};
