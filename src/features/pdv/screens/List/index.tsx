/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';

import { useDialog } from '@/hooks/useDialog';
import { usePdv } from '@/features/pdv/hook/usePdv';
import { RegisterContent } from '@/features/pdv/components/RegisterContent';
import { DeleteContent } from '@/features/pdv/components/DeleteContent';
import { ListContentSub } from '@/features/pdv/components/ListContentSub';
// import { EditContent } from '@/features/pdv/components/EditContent';
import api from '@/services/api';
// import Pdv from '@/model/Pdv';
// import { PdvDataType } from '@/store/ducks/pdv/types';
import Page from '@/model/Page';
import Pdv from '@/model/Pdv';
import { toast } from 'react-toastify';
import { RegisterContentSubPdv } from '@/features/pdv/components/RegisterContentSubPdv';
import { FilterContent } from '@/features/pdv/components/FilterContent';
import { PdvContainer } from './ui';

export const PdvScreen: React.FC = (): JSX.Element => {
  const dialog = useDialog();
  const { pdvState, onChange } = usePdv();
  const [listPdv, setListPdv] = useState([]);
  const initial_state_pagination: Page<Pdv, Pdv> = {
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  };
  const [pagePdv, setPagePdv] = useState(initial_state_pagination);

  const handleOnClose = (): void => {
    dialog.hide();
  };
  const handleRenderListPdv = async (values: any): Promise<void> => {
    try {
      const { data } = await api.post<any>('/pdv/page', values);
      const { list, order, page, pageSize, sort, total } = data;

      if (list.length > 0) {
        setListPdv(list);
        setPagePdv({
          page,
          pageSize,
          sort,
          order,
          total,
        });
      } else {
        toast.info('Nenhum registro encontrado');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // Filtra PDV
  const handleOnFilter = async (value: object): Promise<void> => {
    try {
      setPagePdv({ ...pagePdv, ...value });
      handleRenderListPdv({ ...pagePdv, ...value });
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Renderiza Modal de Registro de PDV
  const handleOnShowFilterPdv = (): void => {
    dialog.show({
      title: '',
      children: <FilterContent onSubmit={handleOnFilter} />,
      onClose: handleOnClose,
      position: 'right',
    });
  };

  // ---------- PDV ------------

  // Registra PDV
  const handleOnRegister = async (values: any): Promise<void> => {
    try {
      const { data } = await api.post<any>('/pdv', values);
      console.log('creact success', data);
      // onChange({ document: values.document });
      handleRenderListPdv(pagePdv);
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Edita PDV
  const handleOnEditSave = async (values: any): Promise<void> => {
    try {
      const { data } = await api.put<any>('/pdv', values);
      console.log('update success', data);
      // onChange({ document: values.document });
      handleRenderListPdv(pagePdv);
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Deleta PDV
  const handleOnDeletePdv = async (value: any): Promise<void> => {
    try {
      const { data } = await api.delete<any>(`/pdv/${value}`);
      console.log('delete success', data);
      // onChange({ document: values.document });
      handleRenderListPdv(pagePdv);
      handleOnClose();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Renderiza Modal de Registro de PDV
  const handleOnShowRegisterPdv = (): void => {
    dialog.show({
      title: 'Cadastrar novo PDV',
      children: <RegisterContent onSubmit={handleOnRegister} />,
      onClose: handleOnClose,
      isCard: true,
    });
  };

  // Renderiza Modal de Edição de PDV
  const handleOnShowEditPdv = async (value: any): Promise<void> => {
    const { data } = await api.get(`/pdv/${value}`);

    dialog.show({
      title: 'Editar PDV',
      children: <RegisterContent dataList={data} onSubmit={handleOnEditSave} />,
      onClose: handleOnClose,
      isCard: true,
    });
  };

  // Renderiza Modal de Deleção de PDV
  const handleOnShowDeletePdv = async (value: any): Promise<void> => {
    dialog.show({
      title: '',
      children: <DeleteContent id={value} onSubmit={handleOnDeletePdv} onClose={handleOnClose} />,
      onClose: handleOnClose,
      size: 'lg',
    });
  };

  // ---------- SUB PDV ------------

  const handleOnCloseSubPdv = (): void => {
    dialog.hide();
    handleOnShowListSubPdv(pdvState.idPdv, pdvState.namePdv);
  };

  // Registra Sub PDV
  const handleOnRegisterSubPdv = async (values: any): Promise<void> => {
    try {
      const { data } = await api.post<any>('/sub-pdv', values);
      console.log('creact success', data);
      // onChange({ document: values.document });
      handleOnCloseSubPdv();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Renderiza Modal de Registro de Sub PDV
  const handleOnShowRegisterSubPdv = (): void => {
    dialog.show({
      title: 'Cadastrar novo Sub-PDV',
      children: <RegisterContentSubPdv onSubmit={handleOnRegisterSubPdv} />,
      onClose: handleOnCloseSubPdv,
      isCard: true,
    });
  };

  // Edita Sub PDV
  const handleOnEditSaveSubPdv = async (values: any): Promise<void> => {
    try {
      const { data } = await api.put<any>('/sub-pdv', values);
      console.log('edit success', data);
      // onChange({ document: values.document });
      handleOnCloseSubPdv();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Renderiza Modal de Edição de Sub PDV
  const handleOnShowEditSubPdv = async (id: string): Promise<void> => {
    const { data } = await api.get(`/sub-pdv/${id}`);
    dialog.show({
      title: 'Editar Sub PDV',
      children: <RegisterContentSubPdv dataList={data} onSubmit={handleOnEditSaveSubPdv} />,
      onClose: handleOnCloseSubPdv,
      isCard: true,
    });
  };

  // Deleta Sub PDV
  const handleOnDeleteSubPdv = async (value: any): Promise<void> => {
    try {
      const { data } = await api.delete<any>(`/sub-pdv/${value}`);
      console.log('delete success', data);
      // onChange({ document: values.document });
      handleRenderListPdv(pagePdv);
      handleOnCloseSubPdv();
    } catch (error) {
      console.log('error', error);
    }
  };

  // Renderiza Modal de Deleção de Sub PDV
  const handleOnShowDeleteSubPdv = async (value: any): Promise<void> => {
    dialog.show({
      title: '',
      children: (
        <DeleteContent id={value} onSubmit={handleOnDeleteSubPdv} onClose={handleOnCloseSubPdv} />
      ),
      onClose: handleOnCloseSubPdv,
    });
  };

  // ----------------------

  const handleOnShowListSubPdv = async (id: string, name: string): Promise<void> => {
    const { data } = await api.get(`/sub-pdv/pdv/${id}`);
    onChange({ idPdv: id, namePdv: name });
    dialog.show({
      // title: name ?? 'Sub PDV',
      title: (
        <div className="subpdv-modal-header-container">
          {name ?? 'Sub PDV'}
          <div className="subpdv-register-buttom">
            <a style={{ cursor: 'pointer' }} onClick={handleOnShowRegisterSubPdv}>
              + cadastrar novo Sub PDV
            </a>
          </div>
        </div>
      ),
      children: (
        <ListContentSub
          dataList={data}
          // stateContext={pdvState}
          // onCleanConstext={onClean}
          onSubmit={handleOnRegisterSubPdv}
          onShowRegisterSubPdv={handleOnShowRegisterSubPdv}
          onShowEditSubPdv={handleOnShowEditSubPdv}
          onShowDeleteSubPdv={handleOnShowDeleteSubPdv}
        />
      ),
      onClose: handleOnClose,
    });
  };

  return (
    <PdvContainer
      handleRenderListPdv={handleRenderListPdv}
      list={listPdv}
      pagination={pagePdv}
      setPagination={setPagePdv}
      onShowFilter={handleOnShowFilterPdv}
      onShowRegister={handleOnShowRegisterPdv}
      onShowEdit={handleOnShowEditPdv}
      // onShowEditSubPdv={handleOnShowEditSubPdv}
      onShowDelete={handleOnShowDeletePdv}
      onShowListSub={handleOnShowListSubPdv}
    />
  );
};
