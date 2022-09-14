/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';

import { useDialog } from '@/hooks/useDialog';
// import { usePos } from '@/features/pos/hook/usePos';
import { RegisterContent } from '@/features/pos/components/RegisterContent';
import { DeleteContent } from '@/features/pos/components/DeleteContent';
import Pos from '@/model/Pos';
// import { EditContent } from '@/features/pdv/components/EditContent';
import api from '@/services/api';
// import Pdv from '@/model/Pos';
// import { PosDataType } from '@/store/ducks/pos/types';
import Page from '@/model/Page';
import { PosContainer } from './ui';

export const PosScreen: React.FC = (): JSX.Element => {
  const dialog = useDialog();
  // const { posState, onChange, onClean } = usePos();
  const [listPos, setListPos] = useState([]);
  const initial_state_pagination: Page<Pos, Pos> = {
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  };
  const [pagePos, setPagePos] = useState(initial_state_pagination);

  const handleOnClose = (): void => {
    dialog.hide();
  };
  const handleRenderListPos = async (values: any): Promise<void> => {
    try {
      const { data } = await api.post<any>('/pos/page', values);
      const { list, order, page, pageSize, sort, total } = data;

      setListPos(list);
      setPagePos({
        order,
        page,
        pageSize,
        sort,
        total,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  // ---------- POS ------------

  // Registra POS
  const handleOnRegister = async (values: any): Promise<void> => {
    try {
      const { data } = await api.post<any>('/pos', values);
      console.log('creact success', data);
      // onChange({ document: values.document });
      handleRenderListPos(pagePos);
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Edita POS
  const handleOnEditSave = async (values: any): Promise<void> => {
    try {
      const { data } = await api.put<any>('/pos', values);
      console.log('update success', data);
      // onChange({ document: values.document });
      handleRenderListPos(pagePos);
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Deleta POS
  const handleOnDeletePos = async (value: any): Promise<void> => {
    try {
      const { data } = await api.delete<any>(`/pos/${value}`);
      console.log('delete success', data);
      // onChange({ document: values.document });
      handleRenderListPos(pagePos);
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Renderiza Modal de Registro de POS
  const handleOnShowRegisterPos = (): void => {
    dialog.show({
      title: 'Cadastrar novo POS',
      children: <RegisterContent onSubmit={handleOnRegister} />,
      onClose: handleOnClose,
      isCard: true,
    });
  };

  // Renderiza Modal de Edição de POS
  const handleOnShowEditPos = async (value: any): Promise<void> => {
    const { data } = await api.get(`/pos/${value}`);

    dialog.show({
      title: 'Editar POS',
      children: <RegisterContent dataList={data} onSubmit={handleOnEditSave} />,
      onClose: handleOnClose,
      isCard: true,
    });
  };

  // Renderiza Modal de Deleção de POS
  const handleOnShowDeletePos = async (value: any): Promise<void> => {
    dialog.show({
      title: '',
      children: <DeleteContent id={value} onSubmit={handleOnDeletePos} onClose={handleOnClose} />,
      onClose: handleOnClose,
    });
  };

  // ----------------------

  return (
    <PosContainer
      handleRenderListPos={handleRenderListPos}
      list={listPos}
      pagination={pagePos}
      setPagination={setPagePos}
      onShowRegister={handleOnShowRegisterPos}
      onShowEdit={handleOnShowEditPos}
      // onShowEditSubPos={handleOnShowEditSubPos}
      onShowDelete={handleOnShowDeletePos}
    />
  );
};
