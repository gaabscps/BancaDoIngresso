import React from 'react';
import './styles.scss';

type FooterCustomProps = {
  data: {
    title: string;
    value: number;
  }[];
};

export const FooterCustom: React.FC<FooterCustomProps> = ({ data }): JSX.Element => (
  <footer
    className="d-flex justify-content-center fixed-bottom"
    style={{
      padding: '20px',
      backgroundColor: '#FFFFFF',
    }}
  >
    {/* Footer fixed */}
    {data.map(({ title, value }, index: number) => (
      <div key={index} className="">
        <div className="d-flex">
          <div className="d-flex" style={{ color: '#828282' }}>
            <span className="mr-2">{title}</span>
            <span className="font-weight-bold">{value}</span>
          </div>
          {/* circles grey with 18px heigth or weith */}
          {index !== data.length - 1 && <div className="circle-grey my-auto" />}
        </div>
      </div>
    ))}
  </footer>
);
