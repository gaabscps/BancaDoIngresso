import React from 'react';
import { ButtonProps } from 'reactstrap';

const SuperButton: React.FC<ButtonProps> = (props: ButtonProps) => (
  <button
    {...props}
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
