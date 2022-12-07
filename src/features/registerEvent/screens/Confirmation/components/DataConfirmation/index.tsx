import React from 'react';
import { DataList } from '@/components/DataList';

interface DataConfirmationProps {
  data: any;
}

export const DataConfirmation: React.FC<DataConfirmationProps> = ({ data }) => (
  <>
    <div className="container-event">
      <h5 className="mb-2 border-bottom-title mb-5">Confirmação de dados</h5>
    </div>
    <DataList data={data} />
  </>
);
