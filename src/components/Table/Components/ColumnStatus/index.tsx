import React, { CSSProperties } from 'react';

type justifyProps = 'left' | 'right';

interface ColumnStatusProps {
  statusColor: string;
  justify?: justifyProps;
  children?: React.ReactNode;
}

const leftStyle: CSSProperties = {
  width: '10px',
  height: '100%',
  position: 'absolute',
  right: '0',
  top: '0',
  bottom: '0',
  left: '0',
  zIndex: 1,
};

const rightStyle: CSSProperties = {
  height: '5.188rem',
  width: '4px',
  position: 'absolute',
  right: '0',
  overflow: 'hidden',
  zIndex: 1,
};

const styleColumn = {
  left: { ...leftStyle },
  right: { ...rightStyle },
};

export const ColumnStatus: React.FC<ColumnStatusProps> = ({
  statusColor,
  justify = 'left',
  children,
}) => (
  <div style={{ height: '5.188rem', display: 'flex' }}>
    <div
      style={{
        backgroundColor: statusColor,
        ...styleColumn[justify as justifyProps],
      }}
    />
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  </div>
);
