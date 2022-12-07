import React from 'react';

interface DataListProps {
  data: any;
}
export const DataList: React.FC<DataListProps> = ({ data }) =>
  data.map((item: any, index: any) => (
    <div key={index} className="mb-4">
      <div className="dataListTitle">{item.title}</div>
      <div className="dataListContent">{item.content}</div>
    </div>
  ));
