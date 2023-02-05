import React from 'react';
import { Card } from 'reactstrap';

interface ReportFooterProps {
  hasFooter: boolean;
  data: { title: string; value: string }[];
}

export const ReportFooter: React.FC<ReportFooterProps> = ({ hasFooter, data }) => (
  <div>
    {hasFooter && (
      <Card className="report-footer">
        <div className="d-flex justify-content-between">
          {data.map((item: any, index: any) => (
            <>
              <div key={index} className="report-summary">
                <div className="d-flex">
                  <span className="text-small-darkgray-regular">{item.title} </span>
                  <span className={`text-small-darkgray-700`}>{item.value}</span>
                </div>
              </div>
              {index !== data.length - 1 && <span className="circle-separator">⬤</span>}
            </>
          ))}
        </div>
      </Card>
    )}
  </div>
);
