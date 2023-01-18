/* eslint-disable arrow-body-style */
import React from 'react';
import SuperCollapse from '../sharedComponents/SuperCollapse';

interface CollapseTableProps {
  titleColumn: { title: string; width: number }[];
  titleDataRow: { data: string; width: number }[];
  contentColumn: { title: string; width: number }[];
  contentDataRow: { data: string[]; width: number }[];
}
export const CollapseTable: React.FC<CollapseTableProps> = ({
  titleColumn,
  titleDataRow,
  contentColumn,
  contentDataRow,
}) => {
  return (
    <div style={{ overflow: 'auto' }}>
      <div style={{ minWidth: '1040px' }} className="collapseTableText">
        <div className="d-flex mb-3">
          <div className="collapseTableGrid">
            {titleColumn.map((column, index) => (
              <div key={index} className={`width${column.width} text-black-regular`}>
                <span>{column.title}</span>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>
      <SuperCollapse
        responsive={true}
        title={
          <div className="d-flex">
            <div className="collapseTableGrid">
              {titleDataRow.map((titleData, index) => (
                <div key={index} className={`width${titleData.width}`}>
                  <span className="text-small-black-light">{titleData.data}</span>
                </div>
              ))}
            </div>
          </div>
        }
        content={
          <>
            <div className="d-flex">
              <div className="collapseTableGrid">
                {contentColumn.map((contColumn, index) => (
                  <div key={index} className={`mb-4 width${contColumn.width} text-black-regular`}>
                    <span>{contColumn.title}</span>
                  </div>
                ))}
              </div>
              <div></div>
            </div>
            <div className="d-flex">
              <div style={{ height: '30px' }} className="collapseTableGrid">
                {contentDataRow.map((contentData, index) => (
                  <div key={index} className={`width${contentData.width}`}>
                    {contentData.data.map((item: any) => (
                      <span
                        style={{ height: '50px', display: 'flex', flexDirection: 'column' }}
                        key={index}
                        className="text-small-black-light"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        }
      />
    </div>
  );
};
