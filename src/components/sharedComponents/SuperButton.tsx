import React from 'react';
import { Button, ButtonProps } from 'reactstrap';

const SuperButton: React.FC<ButtonProps> = (props: ButtonProps) => (
  <Button
    {...props}
    color="#222222"
    style={{
      height: '50px',
      borderRadius: '5px',
      backgroundColor: '#222222',
      color: '#fff',
      ...props.style,
    }}
  />
);

export default SuperButton;
