import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface CustomLoaderProps {
  numberRowsPerPage?: number;
}

export const CustomLoader: React.FC<CustomLoaderProps> = ({
  numberRowsPerPage = 10,
}: CustomLoaderProps) => (
  <div style={{ width: '100%', backgroundColor: '#f1f1f1' }}>
    <Skeleton
      height="5.188rem"
      borderRadius="10px"
      style={{ marginBottom: '25px', marginTop: '53px' }}
      baseColor="#ffffff"
      highlightColor="#f8f8f8"
    />
    {Array.from({ length: +numberRowsPerPage }, () => (
      <Skeleton
        height="5.188rem"
        borderRadius="10px"
        style={{ marginBottom: '25px' }}
        baseColor="#ffffff"
        highlightColor="#f8f8f8"
      />
    ))}
  </div>
);
