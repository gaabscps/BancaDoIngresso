import React, { useEffect } from 'react';
import LoteCollapse from '@/components/sharedComponents/collapse/LoteCollapse';

interface PdvContainerProps {
  onSubmit: (value: any) => Promise<void>;
  onShowRegisterSubPdv: () => void;
  onShowEditSubPdv: (value: any) => Promise<void>;
  onShowDeleteSubPdv: (value: any) => Promise<void>;
  stateContext?: any;
  onCleanConstext?: () => void;
  dataList?: any;
}

export const ListContentSub: React.FC<PdvContainerProps> = ({
  // stateContext,
  onShowEditSubPdv,
  onShowDeleteSubPdv,
  dataList,
}) => (
  <div className="card">
    <LoteCollapse
      title={`Sub PDV’s cadastrados (${dataList.length})`}
      onShowEditSubPdv={onShowEditSubPdv}
      onShowDeleteSubPdv={onShowDeleteSubPdv}
      dataList={dataList}
      // idPdv={stateContext.idPdv}
      content={''}
    />
  </div>
);
