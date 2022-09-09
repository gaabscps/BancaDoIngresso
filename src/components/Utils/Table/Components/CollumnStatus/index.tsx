import React, { CSSProperties } from 'react';

type justifyProps = 'left' | 'right';

interface CollumnStatusProps {
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

const rigthStyle: CSSProperties = {
  height: '5.188rem',
  width: '4px',
  position: 'absolute',
  right: '0',
  overflow: 'hidden',
  zIndex: 1,
};

const styleCollumn = {
  left: { ...leftStyle },
  right: { ...rigthStyle },
};

export const CollumnStatus: React.FC<CollumnStatusProps> = ({
  statusColor,
  justify = 'left',
  children,
}) => (
  <div style={{ height: '5.188rem', display: 'flex' }}>
    <div
      style={{
        backgroundColor: statusColor,
        ...styleCollumn[justify as justifyProps],
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
