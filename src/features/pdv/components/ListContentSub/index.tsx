import React from 'react';
import SubPdv from '@/model/SubPdv';
import LoteCollapse from '@/components/sharedComponents/collapse/LoteCollapse';

interface PdvContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onShowEditSubPdv: (value: any) => void;
  onShowDeleteSubPdv: (subPdv: SubPdv) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
