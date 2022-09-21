/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';

// import { useDialog } from '@/hooks/useDialog';
// import { RegisterContent } from '@/features/pos/components/RegisterContent';
// import { DeleteContent } from '@/features/pos/components/DeleteContent';
import Pos from '@/model/Pos';
import api, { AxiosError } from '@/services/api';
// import Page from '@/model/Page';
import { toast } from 'react-toastify';
import { PosResponse, PosRequestParams } from '@/features/pos/types';
// import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { States, PosContainer } from '@/features/pos/screens/List/ui';

export const PosScreen: React.FC = (): JSX.Element => {
  const [state, setState] = useState<States>(States.default);
  const [listPos, setListPos] = useState<Pos[]>([]);
  const [currentPage, setCurrentPage] = useState<PosRequestParams>({
    page: 1,
    pageSize: 10,
    sort: 'name',
    order: 'DESC',
    total: 1,
  });

  // const { title, visible, onChangeTitle, onToggle } = useDialog();
  // const confirmDelete = useConfirmDelete();

  const handleFetch = async (values: PosRequestParams): Promise<void> => {
    try {
      setState(States.loading);
      const { data } = await api.post<PosResponse>('/pos/page', values);

      if (data) {
        setListPos(data?.list ?? []);

        setCurrentPage((currentPageState: PosRequestParams) => ({
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

  const handleOnPaginationChange = async (page: number): Promise<void> => {
    handleFetch({
      ...currentPage,
      page,
    });
  };

  useEffect(() => {
    handleFetch(currentPage);
  }, []);

  return (
    <PosContainer
      state={state}
      onPaginationChange={handleOnPaginationChange}
      // handleRenderListPos={handleRenderListPos}
      listPos={listPos}
      currentPage={currentPage}
      // pagination={pagePos}
      // onShowFilter={handleOnShowFilterPdv}
      // setPagination={setPagePos}
      // onShowRegister={handleOnShowRegisterPos}
      // onShowEdit={handleOnShowEditPos}
      // onShowDelete={handleOnShowDeletePos}
    />
  );
};
