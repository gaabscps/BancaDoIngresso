import React from 'react';

interface DataListProps {
  data: any;
  array?: boolean;
}
export const DataList: React.FC<DataListProps> = ({ data, array }) =>
  data.map((item: any, index: any) => (
    <div key={index} className="mb-4">
      <div className="dataListTitle">{item.title}</div>
      {array ? (
        item?.content?.map((contentItem: any, key: any) => <div key={key}>{contentItem}</div>)
      ) : (
        <div className="dataListContent">{item?.content}</div>
      )}
    </div>
  ));
