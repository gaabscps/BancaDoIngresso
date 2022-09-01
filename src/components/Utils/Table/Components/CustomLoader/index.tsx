import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const CustomLoader: React.FC<any> = () => (
  <div style={{ width: '100%', backgroundColor: '#f1f1f1' }}>
    <Skeleton
      height="5.188rem"
      borderRadius="10px"
      style={{ marginBottom: '25px', marginTop: '53px' }}
      baseColor="#ffffff"
      highlightColor="#f8f8f8"
    />
    <Skeleton
      height="5.188rem"
      borderRadius="10px"
      style={{ marginBottom: '25px' }}
      baseColor="#ffffff"
      highlightColor="#f8f8f8"
    />
    <Skeleton
      height="5.188rem"
      borderRadius="10px"
      style={{ marginBottom: '25px' }}
      baseColor="#ffffff"
      highlightColor="#f8f8f8"
    />
    <Skeleton
      height="5.188rem"
      borderRadius="10px"
      style={{ marginBottom: '25px' }}
      baseColor="#ffffff"
      highlightColor="#f8f8f8"
    />
  </div>
);
