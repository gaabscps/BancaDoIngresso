/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import {
  States,
  GroupProductContainer,
  ShouldShowModal,
} from '@/features/groupSubgroupProduct/screens/List/ui';
// import { FormInputName as FormInputNameToFilter } from '@/features/groupSubgroupProduct/components/FilterContent';
import { FormInputName as FormInputNameToSaveGroupProduct } from '@/features/groupSubgroupProduct/components/RegisterGroupContent';
import { FormInputName as FormInputNameToSaveSubGroupProduct } from '@/features/groupSubgroupProduct/components/RegisterSubgroupContent';
import {
  GroupProductResponse,
  // GroupProductRequestParams,
  // SubGroupProductResponse,
  // GroupProductResponse,
} from '@/features/groupSubgroupProduct/types';
import GroupProduct from '@/model/GroupProduct';
import SubgroupProduct from '@/model/SubgroupProduct';
import { DeleteContent } from '../../components/DeleteContent';

export interface PayloadGroupProduct {
  id?: string;
  name: string;
}

export interface PayloadSubGroupProduct {
  id?: string;
  name: string;
  imageBase64?: string;
  productGroup?: {
    id: string;
    name: string;
    imageBase64?: string;
  };
}

export const GroupProductScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listGroupProduct, setListGroupProduct] = useState<SubgroupProduct[]>([]);
  const [groupProduct, setGroupProduct] = useState<GroupProduct>();
  const [subgroupProduct, setSubgroupProduct] = useState<SubgroupProduct>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.groupProduct,
  );

  // const [currentPage] = useState<GroupProductRequestParams>({
  //   page: 1,
  //   pageSize: 10,
  //   sort: 'name',
  //   order: 'DESC',
  //   total: 1,
  // });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataGroupProduct,
    formErrors: formErrorsGroupProduct,
    onChangeFormInput: onChangeFormInputGroupProduct,
    isFormValid: isFormValidGroupProduct,
    resetForm: resetFormGroupProduct,
  } = useForm({
    initialData: {
      name: '',
    },
    validators: {
      name: [validators.required],
    },
    formatters: {},
  });

  const {
    formData: formDataSubgroupProduct,
    formErrors: formErrorsSubgroupProduct,
    onChangeFormInput: onChangeFormInputSubgroupProduct,
    isFormValid: isFormValidSubgroupProduct,
    resetForm: resetFormSubgroupProduct,
  } = useForm({
    initialData: {
      name: '',
    },
    validators: {
      name: [validators.required],
    },
    formatters: {},
  });

  const formSubgroup = {
    formData: formDataSubgroupProduct,
    formErrors: formErrorsSubgroupProduct,
    onChangeFormInput: onChangeFormInputSubgroupProduct,
    isFormValid: isFormValidSubgroupProduct,
    resetForm: resetFormSubgroupProduct,
  };

  const {
    formData: formDataFilter,
    formErrors: formErrorsFilter,
    onChangeFormInput: onChangeFormInputFilter,
    isFormValid: isFormValidFilter,
  } = useForm({
    initialData: {
      filterSearch: '',
      inputSearch: '',
    },
  });

  const handleFetch = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<GroupProductResponse>('/product-subgroup/find');

      if (data) {
        setListGroupProduct(data);
      }
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
    groupProduct: groupProductSelected,
    subgroupProduct: subgroupProductSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    groupProduct?: GroupProduct;
    subgroupProduct?: SubgroupProduct;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (groupProductSelected?.id && value === ShouldShowModal.groupProduct) {
      setGroupProduct(groupProductSelected);
      if (groupProductSelected.id !== groupProduct?.id) {
        resetFormGroupProduct();
      }
    } else {
      resetFormGroupProduct();
      setGroupProduct(undefined);
    }

    if (subgroupProductSelected?.id && value === ShouldShowModal.subgroupProduct) {
      setSubgroupProduct(subgroupProductSelected);
      if (subgroupProductSelected.id !== subgroupProduct?.id) {
        resetFormSubgroupProduct();
      }
    } else {
      resetFormSubgroupProduct();
      setSubgroupProduct(undefined);
    }
  };

  const handleOnSaveGroupProduct = async (): Promise<void> => {
    try {
      if (isFormValidGroupProduct()) {
        const payload: PayloadGroupProduct = {
          id: groupProduct?.id,
          name: formDataGroupProduct[FormInputNameToSaveGroupProduct.name],
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<GroupProduct>('/product-group', payload);
          toast.success('Grupo de produto cadastrado com sucesso!');
        } else {
          await api.put<GroupProduct>('/product-group', payload);
          toast.success('Grupo de produto atualizado com sucesso!');
        }

        onToggle();
        handleFetch();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };
  const handleOnSaveGroupSubgroupProduct = async (): Promise<void> => {
    try {
      if (isFormValidSubgroupProduct()) {
        const payload: PayloadSubGroupProduct = {
          id: subgroupProduct?.productGroup?.id,
          name: formDataSubgroupProduct[FormInputNameToSaveGroupProduct.name],
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<SubgroupProduct>('/product-subgroup', payload);
          toast.success('Subgrupo de produto cadastrado com sucesso!');
        } else {
          await api.put<SubgroupProduct>('/product-subgroup', payload);
          toast.success('Subgrupo de produto atualizado com sucesso!');
        }

        onToggle();
        handleFetch();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToGroupProduct = async (
    groupProductSelected: GroupProduct,
  ): Promise<void> => {
    try {
      await api.delete(`/product-group/${groupProductSelected?.id}`);

      toast.success('Grupo e subgrupo de produtos excluído com sucesso!');
      handleOnClose();
      handleFetch();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeleteGroupProduct = (groupProductSelected: GroupProduct): void => {
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
          title: 'Sim, quero remover',
          onClick: (): Promise<void> => handleOnConfirmDeleteToGroupProduct(groupProductSelected),
        },
      ],
    });
  };

  const handleOnShowDeleteSubgroupProduct = (groupProductSelected: GroupProduct): void => {
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
          title: 'Sim, quero remover',
          onClick: (): Promise<void> => handleOnConfirmDeleteToGroupProduct(groupProductSelected),
        },
      ],
    });
  };

  const handleOnFilter = async (): Promise<void> => {
    try {
      if (isFormValidFilter()) {
        // const payload =
        //   {
        //     name: {
        //       entity: {
        //         name: formDataFilter[FormInputNameToFilter.inputSearch],
        //       },
        //     },
        //     serialNumber: {
        //       entity: {
        //         serialNumber: formDataFilter[FormInputNameToFilter.inputSearch],
        //       },
        //     },
        //   }[formDataFilter[FormInputNameToFilter.filterSearch]] || {};

        onToggle();
        await handleFetch();
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (subgroupProduct?.id) {
      onChangeFormInputSubgroupProduct(FormInputNameToSaveSubGroupProduct.name)(
        subgroupProduct.name,
      );
    }
  }, [subgroupProduct]);

  useEffect(() => {
    if (groupProduct?.id) {
      onChangeFormInputGroupProduct(FormInputNameToSaveGroupProduct.name)(groupProduct.name);
    }
  }, [groupProduct]);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <GroupProductContainer
      state={state}
      title={title}
      visible={visible}
      onToggle={onToggle}
      shouldShowModal={shouldShowModal}
      onSaveGroupProduct={handleOnSaveGroupProduct}
      listGroupProduct={listGroupProduct}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataGroupProduct={formDataGroupProduct}
      formErrorsGroupProduct={formErrorsGroupProduct}
      onChangeFormInputGroupProduct={onChangeFormInputGroupProduct}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onShowDeleteGroupProduct={handleOnShowDeleteGroupProduct}
      onSaveGroupSubgroupProduct={handleOnSaveGroupSubgroupProduct}
      onShowDeleteSubgroupProduct={handleOnShowDeleteSubgroupProduct}
      onFilter={handleOnFilter}
      groupProductState={groupProduct}
      subGroupProductState={subgroupProduct}
      formSubgroup={formSubgroup}
    />
  );
};
