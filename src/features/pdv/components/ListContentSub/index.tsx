import React from 'react';
import SubPdv from '@/model/SubPdv';
import LoteCollapse from '@/components/sharedComponents/collapse/LoteCollapse';

interface PdvContainerProps {
  onShowRegisterSubPdv: () => void;
  onShowEditSubPdv: (value: any) => void;
  onShowDeleteSubPdv: (subPdv: SubPdv) => void;
  dataList?: any;
}

export const ListContentSub: React.FC<PdvContainerProps> = ({
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
    />
  </div>
);
