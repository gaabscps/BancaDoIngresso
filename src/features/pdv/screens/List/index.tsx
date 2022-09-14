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
import { PdvContainer } from './ui';
import { RegisterContentSubPdv } from '../../components/RegisterContentSubPdv';

export const PdvScreen: React.FC = (): JSX.Element => {
  const dialog = useDialog();
  const { pdvState, onChange, onClean } = usePdv();
  const [listPdv, setListPvd] = useState([]);
  const initial_state_pagination: Page<Pdv, Pdv> = {
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  };
  const [pagePdv, setPagePvd] = useState(initial_state_pagination);

  const handleOnClose = (): void => {
    dialog.hide();
  };
  const handleOnCloseSubPdv = (): void => {
    dialog.hide();
    handleOnShowListSubPdv(pdvState.idPdv, pdvState.namePdv);
  };
  const handleRenderListPdv = async (values: any): Promise<void> => {
    try {
      const { data } = await api.post<any>('/pdv/page', values);
      const { list, order, page, pageSize, sort, total } = data;

      setListPvd(list);
      setPagePvd({
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

  const handleOnShowRegisterPdv = (): void => {
    dialog.show({
      title: 'Cadastrar novo PDV',
      children: <RegisterContent onSubmit={handleOnRegister} />,
      onClose: handleOnClose,
      isCard: true,
    });
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

  const handleOnShowDeletePdv = async (value: any): Promise<void> => {
    dialog.show({
      title: '',
      children: <DeleteContent id={value} onSubmit={handleOnDeletePdv} onClose={handleOnClose} />,
      onClose: handleOnClose,
    });
  };

  // ------- Sub Pdv -------

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

  const handleOnShowRegisterSubPdv = (): void => {
    dialog.show({
      title: 'Cadastrar novo Sub-PDV',
      children: <RegisterContentSubPdv onSubmit={handleOnRegisterSubPdv} />,
      onClose: handleOnCloseSubPdv,
      isCard: true,
    });
  };

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

  const handleOnShowEditSubPdv = async (): Promise<void> => {
    // const { data } = await api.get(`/sub-pdv/${value}`);

    dialog.show({
      title: 'Editar Sub PDV',
      children: <RegisterContentSubPdv onSubmit={handleOnEditSaveSubPdv} />,
      onClose: handleOnCloseSubPdv,
      isCard: true,
    });
  };

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

  const handleOnShowDeleteSubPdv = async (value: any): Promise<void> => {
    dialog.show({
      title: '',
      children: (
        <DeleteContent id={value} onSubmit={handleOnDeleteSubPdv} onClose={handleOnCloseSubPdv} />
      ),
      onClose: handleOnCloseSubPdv,
    });
  };

  const handleOnShowListSubPdv = async (id: string, name: string): Promise<void> => {
    // const { data } = await api.get(`/sub-pdv/${value}`);
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
          dataList={listPdv}
          stateContext={pdvState}
          onCleanConstext={onClean}
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
      setPagination={setPagePvd}
      onShowRegister={handleOnShowRegisterPdv}
      onShowEdit={handleOnShowEditPdv}
      // onShowEditSubPdv={handleOnShowEditSubPdv}
      onShowDelete={handleOnShowDeletePdv}
      onShowListSub={handleOnShowListSubPdv}
    />
  );
};
