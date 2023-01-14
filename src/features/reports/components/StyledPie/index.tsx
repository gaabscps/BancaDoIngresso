import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from 'chart.js';

interface StyledPieProps {
  generalSale: any;
  backgrundColor1?: string;
  backgrundColor2?: string;
}

export const StyledPie: React.FC<StyledPieProps> = ({
  generalSale,
  backgrundColor1,
  backgrundColor2,
}: any) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: generalSale?.map((item: any) => item?.name),
    datasets: [
      {
        label: '# of Votes',
        data: generalSale?.map((item: any) => item?.value),
        backgroundColor:
          backgrundColor1 && backgrundColor2
            ? [backgrundColor1, backgrundColor2]
            : ['#3CAFC8', '#D8413A'],
        borderWidth: 0,
      },
    ],
  };
  Chart.overrides.pie.plugins.legend.labels.usePointStyle = true;
  Chart.overrides.pie.plugins.legend.labels.pointStyle = 'circle';
  Chart.overrides.pie.plugins.legend.labels.boxHeight = 8;
  Chart.overrides.pie.plugins.legend.labels.boxWidth = 15;
  Chart.defaults.plugins.tooltip.enabled = false;
  return (
    <div className="d-flex">
      <div style={{ width: '200px' }}>
        <Pie width={200} height={200} data={data} />
      </div>
      {generalSale?.map((item: any, index: any) => (
        <div key={index}>
          <div className="d-flex justify-content-end flex-column w-100 h-100">
            <div className="mb-3">
              <span style={{ color: '#828282' }}>{item.name}: </span>
              {item.value} ({item.percent}%)
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
