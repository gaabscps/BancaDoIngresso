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
import { FormInputName as FormInputNameToSaveGroupProduct } from '@/features/groupSubgroupProduct/components/RegisterGroupContent';
import { FormInputName as FormInputNameToSaveSubGroupProduct } from '@/features/groupSubgroupProduct/components/RegisterSubgroupContent';
import { GroupProductResponse } from '@/features/groupSubgroupProduct/types';
import GroupProduct from '@/model/GroupProductSend';
import SubgroupProduct from '@/model/SubgroupProduct';
import SubGrupSend from '@/model/SubGrupSend';
import { DeleteContent } from '../../components/DeleteContent';

export interface PayloadGroupProduct {
  id?: string;
  name: string;
}

export interface PayloadSubGroupProduct {
  id?: string;
  name: string;
  categoryGroup: {
    id?: string;
  };
}

export const GroupProductScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listGroupProduct, setListGroupProduct] = useState<GroupProduct[]>([]);
  const [groupProduct, setGroupProduct] = useState<GroupProduct>();
  const [subgroupProduct, setSubgroupProduct] = useState<SubGrupSend>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.groupProduct,
  );

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
  });

  const formSubgroup = {
    formData: formDataSubgroupProduct,
    formErrors: formErrorsSubgroupProduct,
    onChangeFormInput: onChangeFormInputSubgroupProduct,
    isFormValid: isFormValidSubgroupProduct,
    resetForm: resetFormSubgroupProduct,
  };

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        resetFormGroupProduct();
        resetFormSubgroupProduct();
        setGroupProduct(undefined);
        setSubgroupProduct(undefined);
      }, 500);
    }
  }, [visible]);

  const handleFetch = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<GroupProductResponse>('/category-group/page/group-sub', {
        sort: 'name',
        order: 'ASC',
      });

      if (data) {
        setListGroupProduct(data?.list ?? []);
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
    subgroupProduct?: SubGrupSend;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    setGroupProduct(groupProductSelected);
    setSubgroupProduct(subgroupProductSelected);
  };

  const handleOnSaveGroupProduct = async (): Promise<void> => {
    try {
      if (isFormValidGroupProduct()) {
        const payload: PayloadGroupProduct = {
          id: groupProduct?.categoryGroupId,
          name: formDataGroupProduct[FormInputNameToSaveGroupProduct.name],
        };

        if (!payload.id) {
          delete payload.id;

          await api.post<GroupProduct>('/category-group', payload);
          toast.success('Grupo de produto cadastrado com sucesso!');
        } else {
          await api.put<GroupProduct>('/category-group', payload);
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
          id: subgroupProduct?.productSubGroupId,
          name: formDataSubgroupProduct[FormInputNameToSaveSubGroupProduct.name],
          categoryGroup: {
            id: groupProduct?.categoryGroupId,
          },
        };
        if (!payload.id) {
          delete payload.id;
          await api.post<SubgroupProduct>('/category-subgroup', payload);
          toast.success('Subgrupo de produto cadastrado com sucesso!');
        } else {
          await api.put<SubgroupProduct>('/category-subgroup', payload);
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
    subgroupProductSelected: GroupProduct,
  ): Promise<void> => {
    try {
      await api.delete(`/category-group/${subgroupProductSelected?.categoryGroupId}`);

      toast.success('Grupo e Subgrupo de produtos excluído com sucesso!');
      handleOnClose();
      handleFetch();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnConfirmDeleteToSubGroupProduct = async (
    subgroupProductSelected: SubGrupSend,
  ): Promise<void> => {
    try {
      await api.delete(`/category-subgroup/${subgroupProductSelected?.productSubGroupId}`);

      toast.success('Subgrupo excluído com sucesso!');
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
          title: 'Sim, quero excluir',
          onClick: (): Promise<void> => handleOnConfirmDeleteToGroupProduct(groupProductSelected),
        },
      ],
    });
  };

  const handleOnShowDeleteSubgroupProduct = (groupProductSelected: SubGrupSend): void => {
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
          onClick: (): Promise<void> =>
            handleOnConfirmDeleteToSubGroupProduct(groupProductSelected),
        },
      ],
    });
  };

  useEffect(() => {
    if (subgroupProduct?.productSubGroupId) {
      onChangeFormInputSubgroupProduct(FormInputNameToSaveSubGroupProduct.name)(
        subgroupProduct.productSubGroupName,
      );
    }
  }, [subgroupProduct]);

  useEffect(() => {
    if (groupProduct?.categoryGroupId) {
      onChangeFormInputGroupProduct(FormInputNameToSaveGroupProduct.name)(
        groupProduct.categoryGroupName,
      );
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
      onShouldShowModal={handleOnShouldShowModal}
      formDataGroupProduct={formDataGroupProduct}
      formErrorsGroupProduct={formErrorsGroupProduct}
      onChangeFormInputGroupProduct={onChangeFormInputGroupProduct}
      onShowDeleteGroupProduct={handleOnShowDeleteGroupProduct}
      onSaveGroupSubgroupProduct={handleOnSaveGroupSubgroupProduct}
      onShowDeleteSubgroupProduct={handleOnShowDeleteSubgroupProduct}
      groupProductState={groupProduct}
      subGroupProductState={subgroupProduct}
      formSubgroup={formSubgroup}
    />
  );
};
