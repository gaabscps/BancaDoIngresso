import React from 'react';
import { Input, InputProps } from 'reactstrap';

const SuperInput: React.FC<InputProps> = (props: InputProps) => (
  <Input
    {...props}
    style={{
      // width: '546px',
      height: '62px',
      borderRadius: '5px',
      backgroundColor: '#E6E6E6',
      border: 'none',
      ...props.style,
    }}
  />
);

export default SuperInput;
