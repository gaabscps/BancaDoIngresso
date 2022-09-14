/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';

import { useDialog } from '@/hooks/useDialog';
import { RegisterContent } from '@/features/pos/components/RegisterContent';
import { DeleteContent } from '@/features/pos/components/DeleteContent';
import Pos from '@/model/Pos';
import api from '@/services/api';
import Page from '@/model/Page';
import { toast } from 'react-toastify';
import { PosContainer } from './ui';
import { FilterContent } from '../../components/FilterContent';

export const PosScreen: React.FC = (): JSX.Element => {
  const dialog = useDialog();
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

      if (list.length > 0) {
        setListPos(list);
        setPagePos({
          order,
          page,
          pageSize,
          sort,
          total,
        });
      } else {
        toast.info('Nenhum registro encontrado');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // ---------- POS ------------

  // Registra POS
  const handleOnRegister = async (values: any): Promise<void> => {
    try {
      await api.post<any>('/pos', values);

      handleRenderListPos(pagePos);
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Edita POS
  const handleOnEditSave = async (values: any): Promise<void> => {
    try {
      await api.put<any>('/pos', values);
      handleRenderListPos(pagePos);
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Deleta POS
  const handleOnDeletePos = async (value: any): Promise<void> => {
    try {
      await api.delete<any>(`/pos/${value}`);
      handleRenderListPos(pagePos);
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Renderiza Modal de Registro de POS
  const handleOnShowRegisterPos = async (): Promise<void> => {
    const { data: dataPdv } = await api.get(`/pdv/find`);
    dialog.show({
      title: 'Cadastrar novo POS',
      children: <RegisterContent dataListPdv={dataPdv} onSubmit={handleOnRegister} />,
      onClose: handleOnClose,
      isCard: true,
    });
  };

  // Renderiza Modal de Edição de POS
  const handleOnShowEditPos = async (value: any): Promise<void> => {
    const { data: dataPdv } = await api.get(`/pdv/find`);
    const { data } = await api.get(`/pos/${value}`);

    dialog.show({
      title: 'Editar POS',
      children: (
        <RegisterContent dataListPdv={dataPdv} dataList={data} onSubmit={handleOnEditSave} />
      ),
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
      size: 'lg',
    });
  };

  // Filtra POS
  const handleOnFilter = async (value: object): Promise<void> => {
    try {
      setPagePos({ ...pagePos, ...value });
      handleRenderListPos({ ...pagePos, ...value });
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Renderiza Modal de Filtro de POS
  const handleOnShowFilterPdv = (): void => {
    dialog.show({
      title: '',
      children: <FilterContent onSubmit={handleOnFilter} />,
      onClose: handleOnClose,
      position: 'right',
    });
  };

  // ----------------------

  return (
    <PosContainer
      handleRenderListPos={handleRenderListPos}
      list={listPos}
      pagination={pagePos}
      onShowFilter={handleOnShowFilterPdv}
      setPagination={setPagePos}
      onShowRegister={handleOnShowRegisterPos}
      onShowEdit={handleOnShowEditPos}
      onShowDelete={handleOnShowDeletePos}
    />
  );
};
