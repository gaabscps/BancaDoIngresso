import React from 'react';
import LoteCollapse from '@/components/sharedComponents/collapse/LoteCollapse';

interface PdvContainerProps {
  onShowRegisterSubPdv: (id: string) => Promise<void>;
}

export const ListContentSub: React.FC<PdvContainerProps> = ({ onShowEditSubPdv }) => (
  <div className="card">
    <LoteCollapse title={'Sub PDV’s cadastrados (3)'} content={''} />
  </div>
);
