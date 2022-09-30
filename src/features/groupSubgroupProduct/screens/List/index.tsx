/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import Pdv from '@/model/Pdv';
import {
  States,
  GroupProductContainer,
  ShouldShowModal,
} from '@/features/groupSubgroupProduct/screens/List/ui';
import { FormInputName as FormInputNameToFilter } from '@/features/groupSubgroupProduct/components/FilterContent';
import { FormInputName as FormInputNameToSaveGroupProduct } from '@/features/groupSubgroupProduct/components/RegisterGroupContent';

import GroupProduct from '@/model/GroupProduct';
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadGroupProduct {
  id?: string;
  name: string;
}

export const GroupProductScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listGroupProduct, setListGroupProduct] = useState<GroupProduct[]>([]);
  const [listPdv, setListPdv] = useState<Pdv[]>([]);
  const [groupProduct, setGroupProduct] = useState<GroupProduct>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(
    ShouldShowModal.groupProduct,
  );

  const [currentPage, setCurrentPage] = useState<GroupProductRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

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

  const handleFetch = async (values: GroupProductRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<GroupProductResponse>('/groupProduct/page', values);

      if (data) {
        setListGroupProduct(data?.list ?? []);

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
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    groupProduct: groupProductSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    groupProduct?: GroupProduct;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (groupProductSelected?.id && value === ShouldShowModal.groupProduct) {
      setGroupProduct(groupProductSelected);
      handleFecthPdvList();
      if (groupProductSelected.id !== groupProduct?.id) {
        resetFormGroupProduct();
      }
    } else {
      resetFormGroupProduct();
      setGroupProduct(undefined);
      handleFecthPdvList();
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

          await api.post<GroupProduct>('/groupProduct', payload);
          toast.success('Grupo e subgrupo de produto cadastrado com sucesso!');
        } else {
          await api.put<GroupProduct>('/groupProduct', payload);
          toast.success('Grupo e subgrupo de produto atualizado com sucesso!');
        }

        onToggle();
        handleFetch(currentPage);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleFecthPdvList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<Pdv[]>('/pdv/find');
      setListPdv(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleOnClose = (): void => confirmDelete.hide();

  const handleOnConfirmDeleteToGroupProduct = async (
    groupProductSelected: GroupProduct,
  ): Promise<void> => {
    try {
      await api.delete(`/groupProduct/${groupProductSelected?.id}`);

      toast.success('Grupo e subgrupo de produtos excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
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
            serialNumber: {
              entity: {
                serialNumber: formDataFilter[FormInputNameToFilter.inputSearch],
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

  useEffect(() => {
    if (groupProduct?.id) {
      onChangeFormInputGroupProduct(FormInputNameToSaveGroupProduct.name)(groupProduct.name);
    }
  }, [groupProduct]);

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <GroupProductContainer
      state={state}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      shouldShowModal={shouldShowModal}
      onSaveGroupProduct={handleOnSaveGroupProduct}
      listGroupProduct={listGroupProduct}
      currentPage={currentPage}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataGroupProduct={formDataGroupProduct}
      formErrorsGroupProduct={formErrorsGroupProduct}
      onChangeFormInputGroupProduct={onChangeFormInputGroupProduct}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onShowDeleteGroupProduct={handleOnShowDeleteGroupProduct}
      onFilter={handleOnFilter}
      listPdv={listPdv}
      groupProductState={groupProduct}
    />
  );
};
