import React, { useState } from 'react';

import { useDialog } from '@/hooks/useDialog';
import { usePdv } from '@/features/pdv/hook/usePdv';
import { RegisterContent } from '@/features/pdv/components/RegisterContent';
// import { EditContent } from '@/features/pdv/components/EditContent';
import api from '@/services/api';
// import Pdv from '@/model/Pdv';
// import { PdvDataType } from '@/store/ducks/pdv/types';
import { PdvContainer } from './ui';

export const PdvScreen: React.FC = (): JSX.Element => {
  const dialog = useDialog();
  const { pdvState, onChange } = usePdv();
  const [listPdv, setListPvd] = useState([]);

  // const [pvd, setPvd] = React.useState(null);

  const handleOnClose = (): void => dialog.hide();

  const handleOnRegister = async (values: any): Promise<void> => {
    try {
      const { data } = await api.post<any>('/pdv', values);
      console.log('creact success', data);
      onChange({ document: values.document });
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnEditSave = async (values: any): Promise<void> => {
    try {
      const { data } = await api.put<any>('/pdv', values);
      console.log('edit success', data);
      // onChange({ document: values.document });
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnShowRegisterPdv = (): void => {
    dialog.show({
      title: 'Cadastrar novo PDV',
      children: <RegisterContent onSubmit={handleOnRegister} />,
      onClose: handleOnClose,
      isCard: true,
    });
  };

  const handleRenderListPdv = async (page: any): Promise<void> => {
    try {
      const { data } = await api.post<any>('/pdv/page', page);
      const { list } = data;

      setListPvd(list);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnShowEditPdv = async (value: any): Promise<void> => {
    const { data } = await api.get(`/pdv/${value}`);

    dialog.show({
      title: 'Editar PDV',
      children: <RegisterContent dataList={data} onSubmit={handleOnEditSave} />,
      onClose: handleOnClose,
      isCard: true,
    });
  };

  // const handleOnShowDeletePdv = async (value: any): Promise<void> => {
  //   const { data } = await api.delete(`/pdv/${value}`);
  // };

  return (
    <PdvContainer
      document={pdvState.document}
      handleRenderListPdv={handleRenderListPdv}
      list={listPdv}
      onShowRegister={handleOnShowRegisterPdv}
      onShowEdit={handleOnShowEditPdv}
      // onShowDelete={handleOnShowDeletePdv}
    />
  );
};
