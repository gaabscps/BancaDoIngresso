import React from 'react';

interface CollumnImageProps {
  srcImage: string;
}

export const CollumnImage: React.FC<CollumnImageProps> = ({ srcImage }) => (
  <div style={{ maxHeight: '5.188rem', padding: 0 }}>
    <img
      style={{
        height: '5.188rem',
        width: '100%',
        position: 'absolute',
        right: '0',
        top: '0',
        bottom: '0',
        left: '0',
        overflow: 'hidden',
      }}
      src={srcImage}
    />
  </div>
);
