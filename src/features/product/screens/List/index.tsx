/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import Product from '@/model/ProductConfig';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import { ProductResponse, ProductRequestParams, NameFiles } from '@/features/product/types';
import useForm from '@/hooks/useForm';
import { States, ProductContainer, ShouldShowModal } from '@/features/product/screens/List/ui';
import validators from '@/helpers/validators';
import { FormInputName as FormInputNameToSaveProduct } from '@/features/product/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/product/components/FilterContent';
import ProductGroup from '@/model/ProductGroup';
import ProductSubgroup from '@/model/ProductSubgroup';
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadProduct {
  id?: string;
  name: string;
  imageBase64?: string;
  categorySubGroup?: {
    id?: string;
    name?: string;
    imageBase64?: string;
    categoryGroup?: {
      id?: string;
      name?: string;
      imageBase64?: string;
    };
  };
}

export const ProductScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [listProductGroup, setListProductGroup] = useState<ProductGroup[]>([]);
  const [listProductSubGroup, setListProductSubGroup] = useState<ProductSubgroup[]>([]);
  const [product, setProduct] = useState<Product>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.product);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});

  const [currentPage, setCurrentPage] = useState<ProductRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
    resetForm: resetFormProduct,
    setErrors: setErrorsProduct,
  } = useForm({
    initialData: {
      name: '',
      groupProduct: '',
      subGroupProduct: '',
    },
    validators: {
      name: [validators.required],
      groupProduct: [validators.required],
      subGroupProduct: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    resetForm: resetFormFilter,
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

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

  const handleFetch = async (values: ProductRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<ProductResponse>('/product/page', values);

      if (data) {
        setListProduct(data?.list ?? []);

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

  const handleFecthProductGroupList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ProductGroup[]>('/category-group/find');
      setListProductGroup(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFecthProductSubGroupList = async (dataSubgGroup: any): Promise<void> => {
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

  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    product: productSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    product?: Product;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (productSelected?.id && value === ShouldShowModal.product) {
      setProduct(productSelected);
      if (productSelected.id !== product?.id) {
        handleFecthProductSubGroupList(productSelected.categorySubGroup.categoryGroup.id);
      }
    }
  };

  const handleOnSaveProduct = async (): Promise<void> => {
    try {
      if (isFormValidProduct()) {
        const payload: PayloadProduct = {
          id: product?.id,
          name: formDataProduct[FormInputNameToSaveProduct.name],
          imageBase64: formDataProduct[FormInputNameToSaveProduct.imageBase64],
          categorySubGroup: {
            id: formDataProduct[FormInputNameToSaveProduct.subGroupProduct],
            categoryGroup: {
              id: formDataProduct[FormInputNameToSaveProduct.groupProduct],
            },
          },
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<Product>('/product', payload);
          toast.success('Produto cadastrado com sucesso!');
        } else {
          await api.put<Product>('/product', payload);
          toast.success('Produto atualizado com sucesso!');
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

  const handleOnConfirmDeleteToProduct = async (productSelected: Product): Promise<void> => {
    try {
      await api.delete(`/product/${productSelected?.id}`);

      toast.success('Produto excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeleteProduct = (productSelected: Product): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteToProduct(productSelected),
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
        resetFormProduct();
        setProduct(undefined);
        setNameFiles({});
      }, 500);
    }
  }, [visible]);

  useEffect(() => {
    if (product?.id) {
      onChangeFormInputProduct(FormInputNameToSaveProduct.name)(product.name);
      onChangeFormInputProduct(FormInputNameToSaveProduct.groupProduct)(
        product.categorySubGroup?.categoryGroup?.id || '',
      );
      onChangeFormInputProduct(FormInputNameToSaveProduct.subGroupProduct)(
        product.categorySubGroup?.id || '',
      );
      onChangeFormInputProduct(FormInputNameToSaveProduct.imageBase64)(product.imageBase64);
    }
  }, [product]);

  useEffect(() => {
    handleFetch(currentPage);
    handleFecthProductGroupList();
  }, []);

  return (
    <ProductContainer
      state={state}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      shouldShowModal={shouldShowModal}
      onSaveProduct={handleOnSaveProduct}
      listProduct={listProduct}
      currentPage={currentPage}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataProduct={formDataProduct}
      formErrorsProduct={formErrorsProduct}
      onChangeFormInputProduct={onChangeFormInputProduct}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onChangeFileInput={handleOnChangeFileInput}
      onShowDeleteProduct={handleOnShowDeleteProduct}
      onFilter={handleOnFilter}
      productState={product}
      nameFiles={nameFiles}
      listProductGroup={listProductGroup}
      listProductSubGroup={listProductSubGroup}
      handleFecthProductSubGroupList={handleFecthProductSubGroupList}
      clearFilter={clearFilter}
    />
  );
};
