import React from 'react';
import { imageStyle } from './styles';

interface CollumnImageProps {
  srcImage: string;
}

export const CollumnImage: React.FC<CollumnImageProps> = ({ srcImage }) => (
  <div style={{ maxHeight: '5.188rem', padding: 0 }}>
    <img style={imageStyle} src={srcImage} />
  </div>
);
