/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import Combo from '@/model/ComboConfig';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import { ComboResponse, ComboRequestParams, NameFiles } from '@/features/combo/types';
import useForm from '@/hooks/useForm';
import { States, ComboContainer, ShouldShowModal } from '@/features/combo/screens/List/ui';
import validators from '@/helpers/validators';
import {
  FormInputName as FormInputNameToSaveCombo,
  ProductQuantity,
} from '@/features/combo/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/combo/components/FilterContent';
import { DeleteContent } from '@/features/combo/components/DeleteContent';
import ProductSubgroup from '@/model/ProductSubgroup';
import ProductGroup from '@/model/ProductGroup';
import Product from '@/model/Product';

export default interface PayloadCombo {
  id?: string;
  name: string;
  imageBase64: string;
  categorySubGroup: {
    id: string;
    categoryGroup?: {
      id: string;
    };
  };
  products: { id: string; name: string; amount: number }[];
}

export const ComboScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listCombo, setListCombo] = useState<Combo[]>([]);
  const [listComboGroup, setListComboGroup] = useState<ProductGroup[]>([]);
  const [listComboSubGroup, setListComboSubGroup] = useState<ProductSubgroup[]>([]);
  const [combo, setCombo] = useState<Combo>();
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.combo);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});
  const [productQuantity, setProductQuantity] = useState<ProductQuantity[]>([
    { productId: '', productName: '', quantity: '' },
  ]);

  const [currentPage, setCurrentPage] = useState<ComboRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataCombo,
    formErrors: formErrorsCombo,
    onChangeFormInput: onChangeFormInputCombo,
    isFormValid: isFormValidCombo,
    resetForm: resetFormCombo,
    setErrors: setErrorsCombo,
  } = useForm({
    initialData: {
      groupCombo: '',
      subGroupCombo: '',
      name: '',
      imageBase64: '',
      product: '',
      quantity: '',
    },
    validators: {
      name: [validators.required],
      groupCombo: [validators.required],
      subGroupCombo: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
    resetForm: resetFormFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

  const controllerInputAppendProduct = {
    listProduct,
    productQuantity,
    setProductQuantity,
    handleAddProduct(): void {
      setProductQuantity([...productQuantity, { productId: '', productName: '', quantity: '' }]);
    },
    handleChangeProduct(inputName: string, index: number, value: string): void {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newFormValues = [...productQuantity] as any;
      newFormValues[index][inputName] = value;
      setProductQuantity(newFormValues);
    },
    handleRemoveProduct(index: number): void {
      const values = [...productQuantity];
      values.splice(index, 1);
      setProductQuantity(values);
    },
  };

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

  const handleFetch = async (values: ComboRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<ComboResponse>('/combo/page', values);

      if (data) {
        setListCombo(data?.list ?? []);

        setCurrentPage(currentPageState => ({
          ...currentPageState,
          ...data,
        }));
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFecthProductList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Product[]>('/product/find');
      setListProduct(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFecthComboGroupList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ProductGroup[]>('/category-group/find');
      setListComboGroup(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthComboSubGroupList = async (dataSubgGroup: any): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ProductSubgroup[]>(
        `/category-subgroup/find/group/${dataSubgGroup}`,
      );
      setListComboSubGroup(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    combo: comboSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    combo?: Combo;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (comboSelected?.id && value === ShouldShowModal.combo) {
      setCombo(comboSelected);
      if (comboSelected.id !== combo?.id) {
        handleFecthComboGroupList();
        handleFecthComboSubGroupList(comboSelected.categorySubGroup.categoryGroup.id);
      }
    }
    if (!comboSelected?.id && value === ShouldShowModal.combo) {
      handleFecthComboGroupList();
    }
  };

  const handleOnSaveCombo = async (): Promise<void> => {
    try {
      if (isFormValidCombo()) {
        const newProduct = productQuantity.map(item => ({
          id: item.productId,
          name: item.productName,
          amount: +item.quantity,
        }));
        const validateProducts = newProduct.filter(item => item.id !== '');

        const payload: PayloadCombo = {
          id: combo?.id,
          name: formDataCombo[FormInputNameToSaveCombo.name],
          imageBase64: formDataCombo[FormInputNameToSaveCombo.imageBase64],
          categorySubGroup: {
            id: formDataCombo[FormInputNameToSaveCombo.subGroupCombo],
            categoryGroup: {
              id: formDataCombo[FormInputNameToSaveCombo.groupCombo],
            },
          },

          products: validateProducts,
        };
        if (!payload.id) {
          delete payload.id;

          const { data: dataCombo } = await api.post<Combo>('/combo', payload);
          await api.post('/combo/product', {
            comboId: dataCombo.id,
            products: validateProducts,
          });
          toast.success('Combo cadastrado com sucesso!');
        } else {
          await api.put<Combo>('/combo', payload);
          await api.post('/combo/product', {
            comboId: combo?.id,
            products: validateProducts,
          });
          toast.success('Combo atualizado com sucesso!');
        }

        onToggle();
        handleFetch(currentPage);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToCombo = async (comboSelected: Combo): Promise<void> => {
    try {
      await api.delete(`/combo/${comboSelected?.id}`);

      toast.success('Combo excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeleteCombo = (comboSelected: Combo): void => {
    confirmDelete.show({
      title: '',
      children: <DeleteContent />,
      actions: [
        {
          title: 'Não, quero manter',
          theme: 'noneBorder',
          onClick: (): void => handleOnClose(),
        },
        {
          title: 'Sim, quero excluir',
          onClick: (): Promise<void> => handleOnConfirmDeleteToCombo(comboSelected),
        },
      ],
    });
  };

  const handleOnFilter = async (): Promise<void> => {
    try {
      if (isFormValidFilter()) {
        const payload =
          {
            name: {
              entity: {
                name: formDataFilter[FormInputNameToFilter.inputSearch],
              },
            },
          }[formDataFilter[FormInputNameToFilter.filterSearch]] || {};

        onToggle();
        await handleFetch({
          ...currentPage,
          ...payload,
        });
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnPaginationChange = async (page: number): Promise<void> => {
    handleFetch({
      ...currentPage,
      page,
    });
  };

  const clearFilter = async (): Promise<void> => {
    resetFormFilter();
    await handleFetch({
      ...currentPage,
      entity: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    onToggle();
  };

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormCombo();
        setCombo(undefined);
        setNameFiles({});
      }, 500);
    }
  }, [visible]);

  useEffect(() => {
    if (combo?.id) {
      onChangeFormInputCombo(FormInputNameToSaveCombo.name)(combo.name);
      onChangeFormInputCombo(FormInputNameToSaveCombo.groupCombo)(
        combo.categorySubGroup?.categoryGroup?.id || '',
      );
      onChangeFormInputCombo(FormInputNameToSaveCombo.subGroupCombo)(
        combo.categorySubGroup?.id || '',
      );
      onChangeFormInputCombo(FormInputNameToSaveCombo.imageBase64)(combo.imageBase64);
      setProductQuantity((): ProductQuantity[] => {
        if (combo.products.length !== 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return combo.products.map((item): any => ({
            productId: item.id,
            productName: item.name,
            quantity: item.amount,
          }));
        }
        return [{ productId: '', productName: '', quantity: '' }];
      });
    }
  }, [combo]);

  useEffect(() => {
    handleFetch(currentPage);
    handleFecthProductList();
    handleFecthComboGroupList();
  }, []);

  return (
    <ComboContainer
      state={state}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      shouldShowModal={shouldShowModal}
      onSaveCombo={handleOnSaveCombo}
      listCombo={listCombo}
      currentPage={currentPage}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataCombo={formDataCombo}
      formErrorsCombo={formErrorsCombo}
      onChangeFormInputCombo={onChangeFormInputCombo}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onChangeFileInput={handleOnChangeFileInput}
      onShowDeleteCombo={handleOnShowDeleteCombo}
      onFilter={handleOnFilter}
      comboState={combo}
      nameFiles={nameFiles}
      listComboGroup={listComboGroup}
      listComboSubGroup={listComboSubGroup}
      controllerInputAppendProduct={controllerInputAppendProduct}
      handleFecthComboSubGroupList={handleFecthComboSubGroupList}
      clearFilter={clearFilter}
    />
  );
};
