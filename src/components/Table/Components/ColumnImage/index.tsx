import React from 'react';
import empty from '@/assets/images/other-images/imgvazio.svg';
import { imageStyle } from './styles';

interface ColumnImageProps {
  srcImage: string;
}

export const ColumnImage: React.FC<ColumnImageProps> = ({ srcImage }) => (
  <div style={{ maxHeight: '5.188rem', padding: 0 }}>
    {srcImage ? <img style={imageStyle} src={srcImage} /> : <img style={imageStyle} src={empty} />}
  </div>
);
