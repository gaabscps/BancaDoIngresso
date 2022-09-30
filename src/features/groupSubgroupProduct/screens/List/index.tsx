/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import GroupSubgroupProduct from '@/model/GroupSubgroupProduct';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import { GroupSubgroupProductResponse, GroupSubgroupProductRequestParams } from '@/features/groupSubgroupProduct/types';
import useForm from '@/hooks/useForm';
import { States, GroupSubgroupProductContainer, ShouldShowModal } from '@/features/groupSubgroupProduct/screens/List/ui';
import GroupSubgroupProductStatus from '@/model/GroupSubgroupProductStatus';
import validators from '@/helpers/validators';
import { FormInputName as FormInputNameToSaveGroupSubgroupProduct } from '@/features/groupSubgroupProduct/components/RegisterContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { FormInputName as FormInputNameToFilter } from '@/features/groupSubgroupProduct/components/FilterContent';
import Pdv from '@/model/Pdv';
import dayjs from 'dayjs';
import { colors } from '@/styles/colors';
import { DeleteContent } from '../../components/DeleteContent';

export default interface PayloadGroupSubgroupProduct {
  id?: string;
  name: string;
  serialNumber: string;
  status: GroupSubgroupProductStatus;
  pdv: {
    id: string;
  };
  model: string;
  telephoneOperator: string;
  cardOperator: string;
  expirationDate: string;
}

export const GroupSubgroupProductScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listGroupSubgroupProduct, setListGroupSubgroupProduct] = useState<GroupSubgroupProduct[]>([]);
  const [listPdv, setListPdv] = useState<Pdv[]>([]);
  const [groupSubgroupProduct, setGroupSubgroupProduct] = useState<GroupSubgroupProduct>();
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.groupSubgroupProduct);

  const [currentPage, setCurrentPage] = useState<GroupSubgroupProductRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  const { title, visible, onChangeTitle, onToggle } = useDialog();
  const confirmDelete = useConfirmDelete();

  const {
    formData: formDataGroupSubgroupProduct,
    formErrors: formErrorsGroupSubgroupProduct,
    onChangeFormInput: onChangeFormInputGroupSubgroupProduct,
    isFormValid: isFormValidGroupSubgroupProduct,
    resetForm: resetFormGroupSubgroupProduct,
  } = useForm({
    initialData: {
      name: '',
      serialNumber: '',
      status: '',
      pdv: '',
      model: '',
      telephoneOperator: '',
      cardOperator: '',
      expirationDate: '',
    },
    validators: {
      name: [validators.required],
      serialNumber: [validators.required],
      status: [validators.required],
      expirationDate: [validators.isDateLessThanCurrentDate],
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

  const handleFetch = async (values: GroupSubgroupProductRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.groupSubgroupProductt<GroupSubgroupProductResponse>('/groupSubgroupProduct/page', values);

      if (data) {
        setListGroupSubgroupProduct(data?.list ?? []);

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
  const handleOnChangeColorColumn = (status: GroupSubgroupProductStatus): string =>
    ({
      0: colors.lightBlue,
      1: colors.green,
      2: colors.yellow,
      3: colors.red,
    }[status] || colors.grey);
  const handleOnShouldShowModal = ({
    value,
    newTitleModal,
    groupSubgroupProduct: groupSubgroupProductSelected,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    groupSubgroupProduct?: GroupSubgroupProduct;
  }): void => {
    setShouldShowModal(value);
    onChangeTitle(newTitleModal);
    onToggle();

    if (groupSubgroupProductSelected?.id && value === ShouldShowModal.groupSubgroupProduct) {
      setGroupSubgroupProduct(groupSubgroupProductSelected);
      handleFecthPdvList();
      if (groupSubgroupProductSelected.id !== groupSubgroupProduct?.id) {
        resetFormGroupSubgroupProduct();
      }
    } else {
      resetFormGroupSubgroupProduct();
      setGroupSubgroupProduct(undefined);
      handleFecthPdvList();
    }
  };

  const handleOnSaveGroupSubgroupProduct = async (): Promise<void> => {
    try {
      if (isFormValidGroupSubgroupProduct()) {
        const payload: PayloadGroupSubgroupProduct = {
          id: groupSubgroupProduct?.id,
          name: formDataGroupSubgroupProduct[FormInputNameToSaveGroupSubgroupProduct.name],
          serialNumber: formDataGroupSubgroupProduct[FormInputNameToSaveGroupSubgroupProduct.serialNumber],
          status: +formDataGroupSubgroupProduct[FormInputNameToSaveGroupSubgroupProduct.status],
          pdv: {
            id: formDataGroupSubgroupProduct[FormInputNameToSaveGroupSubgroupProduct.pdv],
          },
          model: formDataGroupSubgroupProduct[FormInputNameToSaveGroupSubgroupProduct.model],
          telephoneOperator: formDataGroupSubgroupProduct[FormInputNameToSaveGroupSubgroupProduct.telephoneOperator],
          cardOperator: formDataGroupSubgroupProduct[FormInputNameToSaveGroupSubgroupProduct.cardOperator],
          expirationDate: formDataGroupSubgroupProduct[FormInputNameToSaveGroupSubgroupProduct.expirationDate],
        };

        if (!payload.id) {
          delete payload.id;

          await api.groupSubgroupProductt<GroupSubgroupProduct>('/groupSubgroupProduct', payload);
          toast.success('Grupo e subgrupo de produto cadastrado com sucesso!');
        } else {
          await api.put<GroupSubgroupProduct>('/groupSubgroupProduct', payload);
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

  const handleOnConfirmDeleteToGroupSubgroupProduct = async (groupSubgroupProductSelected: GroupSubgroupProduct): Promise<void> => {
    try {
      await api.delete(`/groupSubgroupProduct/${groupSubgroupProductSelected?.id}`);

      toast.success('Grupo e subgrupo de produtos excluído com sucesso!');
      handleOnClose();
      handleFetch(currentPage);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeleteGroupSubgroupProduct = (groupSubgroupProductSelected: GroupSubgroupProduct): void => {
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
          onClick: (): Promise<void> => handleOnConfirmDeleteToGroupSubgroupProduct(groupSubgroupProductSelected),
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
    if (groupSubgroupProduct?.id) {
      onChangeFormInputGroupSubgroupProduct(FormInputNameToSaveGroupSubgroupProduct.name)(groupSubgroupProduct.name);
      onChangeFormInputGroupSubgroupProduct(FormInputNameToSaveGroupSubgroupProduct.serialNumber)(groupSubgroupProduct.serialNumber);
      onChangeFormInputGroupSubgroupProduct(FormInputNameToSaveGroupSubgroupProduct.status)(String(groupSubgroupProduct.status));
      onChangeFormInputGroupSubgroupProduct(FormInputNameToSaveGroupSubgroupProduct.model)(groupSubgroupProduct.model);
      onChangeFormInputGroupSubgroupProduct(FormInputNameToSaveGroupSubgroupProduct.pdv)(String(groupSubgroupProduct.pdv.id));
      onChangeFormInputGroupSubgroupProduct(FormInputNameToSaveGroupSubgroupProduct.telephoneOperator)(groupSubgroupProduct.telephoneOperator);
      onChangeFormInputGroupSubgroupProduct(FormInputNameToSaveGroupSubgroupProduct.cardOperator)(groupSubgroupProduct.cardOperator);
      onChangeFormInputGroupSubgroupProduct(FormInputNameToSaveGroupSubgroupProduct.expirationDate)(
        String(dayjs(groupSubgroupProduct.expirationDate, 'YYYY-DD-MM hh:mm:ss').format('YYYY-MM-DD')),
      );
    }
  }, [groupSubgroupProduct]);

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <GroupSubgroupProductContainer
      state={state}
      title={title}
      visible={visible}
      onToggle={onToggle}
      onPaginationChange={handleOnPaginationChange}
      shouldShowModal={shouldShowModal}
      onSaveGroupSubgroupProduct={handleOnSaveGroupSubgroupProduct}
      listGroupSubgroupProduct={listGroupSubgroupProduct}
      currentPage={currentPage}
      changeColorColumn={handleOnChangeColorColumn}
      onChangeFormInputFilter={onChangeFormInputFilter}
      onShouldShowModal={handleOnShouldShowModal}
      formDataGroupSubgroupProduct={formDataGroupSubgroupProduct}
      formErrorsGroupSubgroupProduct={formErrorsGroupSubgroupProduct}
      onChangeFormInputGroupSubgroupProduct={onChangeFormInputGroupSubgroupProduct}
      formDataFilter={formDataFilter}
      formErrorsFilter={formErrorsFilter}
      onShowDeleteGroupSubgroupProduct={handleOnShowDeleteGroupSubgroupProduct}
      onFilter={handleOnFilter}
      listPdv={listPdv}
      groupSubgroupProductState={groupSubgroupProduct}
    />
  );
};
