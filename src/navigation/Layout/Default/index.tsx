import React from 'react';

interface DefaultProps {
  children: React.ReactNode;
}

export const Default: React.FC<DefaultProps> = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);
