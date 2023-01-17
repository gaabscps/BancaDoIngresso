/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';

interface DataListProps {
  data: any;
}
export const DataList: React.FC<DataListProps> = ({ data }) =>
  data.map((item: any, index: any) => (
    <div key={index} className="mb-4" style={{ whiteSpace: 'nowrap' }}>
      <div className="text-darkgray-regular">{item.title}</div>

      {Array.isArray(item.content) && item.content.length > 0 ? (
        item.content.map((content: any, key: any) => (
          <div key={key} className="text-black-regular mb-3">
            {content}
          </div>
        ))
      ) : (
        <div className="text-black-regular">{item.content}</div>
      )}
    </div>
  ));
