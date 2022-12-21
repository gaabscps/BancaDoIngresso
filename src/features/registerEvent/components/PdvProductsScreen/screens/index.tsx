import React from 'react';
import useForm from '@/hooks/useForm';
import validators from '@/helpers/validators';
import { DeleteContent } from '@/components/DeleteContent';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import api, { AxiosError } from '@/services/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { formPdvProductProps } from '../types';
import { PdvProductContainer } from './ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

type UrlParams = {
  id: string;
};

interface SectorProductPosContainerProps {
  // state: States;
  nextTab: () => void;
  backTab: () => void;
}
interface PdvProductScreenProps extends SectorProductPosContainerProps {
  pdvId?: string;
}

export const PdvProductScreen: React.FC<PdvProductScreenProps> = ({
  // state,
  nextTab,
  backTab,
}) => {
  const {
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
    // resetForm: resetFormProduct,
  } = useForm({
    initialData: {
      allowProduct: 'true',
      sector: '',
      product: '',
    },
    validators: {
      allowProduct: [validators.required],
      sector: [validators.required],
      product: [validators.required],
    },
    formatters: {},
  });

  const controllerFormPos: formPdvProductProps = {
    formData: formDataProduct,
    formErrors: formErrorsProduct,
    onChangeFormInput: onChangeFormInputProduct,
    isFormValid: isFormValidProduct,
  };
  const confirmDelete = useConfirmDelete();
  const params = useParams<UrlParams>();

  const handleOnConfirmDelete = async (productSelected: any): Promise<void> => {
    try {
      await api.delete(`/event/pdv/${params.id}/${productSelected.id}`);
      toast.success('Setor e produtos excluídos com sucesso!');
      confirmDelete.hide();
    } catch (error) {
      const err = error as AxiosError;
      toast.error(err.message);
    }
  };

  const handleOnShowDeleteProduct = (productSelected: any): void => {
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
          onClick: (): void => {
            handleOnConfirmDelete(productSelected);
          },
        },
      ],
    });
  };

  return (
    <>
      <PdvProductContainer
        controllerFormPos={controllerFormPos}
        nextTab={nextTab}
        backTab={backTab}
        handleOnShowDeleteProduct={handleOnShowDeleteProduct}
        // state={state}
      />
    </>
  );
};
