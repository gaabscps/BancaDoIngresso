import React from 'react';
import LoteCollapse from '@/components/sharedComponents/collapse/LoteCollapse';

interface PdvContainerProps {
  onSubmit: (value: any) => Promise<void>;
  onShowRegisterSubPdv: () => void;
}

export const ListContentSub: React.FC<PdvContainerProps> = () => (
  <div className="card">
    <LoteCollapse title={'Sub PDV’s cadastrados (3)'} content={''} />
  </div>
);
