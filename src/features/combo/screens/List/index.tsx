/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';
import Combo from '@/model/Combo';
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
import ComboGroup from '@/model/ComboGroup';
import ComboSubGroup from '@/model/ComboSubgroup';
import Product from '@/model/Product';

export default interface PayloadCombo {
  id?: string;
  name: string;
  products: ProductQuantity[];
}

export const ComboScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listCombo, setListCombo] = useState<Combo[]>([]);
  const [listComboGroup, setListComboGroup] = useState<ComboGroup[]>([]);
  const [listComboSubGroup, setListComboSubGroup] = useState<ComboSubGroup[]>([]);
  const [combo, setCombo] = useState<Combo>();
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [shouldShowModal, setShouldShowModal] = useState<ShouldShowModal>(ShouldShowModal.combo);
  const [nameFiles, setNameFiles] = useState<NameFiles>({});
  const [productQuantity, setProductQuantity] = useState<ProductQuantity[]>([
    { product: '', quantity: '' },
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
      subProupCombo: '',
      name: '',
      imageBase64: '',
      product: '',
      quantity: '',
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

  const controllerInputAppendProduct = {
    listProduct,
    productQuantity,
    setProductQuantity,
    handleAddProduct(): void {
      setProductQuantity([...productQuantity, { product: '', quantity: '' }]);
    },
    handleChangeProduct(inputName: string, index: number, value: string): void {
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
      const { data } = await api.get<ComboGroup[]>('/combo-group/find');
      setListComboGroup(data ?? []);
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    } finally {
      setState(States.default);
    }
  };

  const handleFecthComboSubGroupList = async (): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.get<ComboGroup[]>('/combo-subgroup/find');
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

    if (
      (comboSelected?.id && value !== ShouldShowModal.filter) ||
      (!comboSelected?.id && value !== ShouldShowModal.filter)
    ) {
      setCombo(comboSelected);
      handleFecthComboSubGroupList();
      handleFecthComboGroupList();
      if (comboSelected?.id !== combo?.id) {
        resetFormCombo();
      }
    } else {
      resetFormCombo();
      setCombo(undefined);
    }
    if (
      (!comboSelected?.id && value !== ShouldShowModal.filter) ||
      (!comboSelected?.id && value !== ShouldShowModal.combo)
    ) {
      resetFormCombo();
    }
    // if (comboSelected?.id && value === ShouldShowModal.combo) {
    //   setCombo(comboSelected);
    //   if (comboSelected.id !== combo?.id) {
    //     handleFecthComboGroupList();
    //     handleFecthComboSubGroupList();
    //     resetFormCombo();
    //   }
    // } else {
    //   resetFormCombo();
    //   setCombo(undefined);
    //   handleFecthComboGroupList();
    //   handleFecthComboSubGroupList();
    // }
  };

  const handleOnSaveCombo = async (): Promise<void> => {
    try {
      if (isFormValidCombo()) {
        const payload: PayloadCombo = {
          id: combo?.id,
          name: formDataCombo[FormInputNameToSaveCombo.name],
          products: productQuantity,
        };
        if (!payload.id) {
          delete payload.id;

          await api.post<Combo>('/combo', payload);
          toast.success('Combo cadastrado com sucesso!');
        } else {
          await api.put<Combo>('/combo', payload);
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
    if (combo?.id) {
      onChangeFormInputCombo(FormInputNameToSaveCombo.name)(combo.name);
    }
  }, [combo]);

  useEffect(() => {
    handleFetch(currentPage);
    handleFecthProductList();
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
    />
  );
};
