import React from 'react';
import { SectorPosContainer } from './ui';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorProductPosContainerProps {
  state: States;
}
export const SectorPosScreen: React.FC<SectorProductPosContainerProps> = ({ state }) => {
  console.log(States);
  return (
    <>
      <SectorPosContainer state={state} />
    </>
  );
};
