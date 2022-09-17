import React from 'react';
import { imageStyle } from './styles';

interface ColumnImageProps {
  srcImage: string;
}

export const ColumnImage: React.FC<ColumnImageProps> = ({ srcImage }) => (
  <div style={{ maxHeight: '5.188rem', padding: 0 }}>
    <img style={imageStyle} src={srcImage} />
  </div>
);
