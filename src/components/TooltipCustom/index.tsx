import React from 'react';
import ReactTooltip from 'react-tooltip';

type TooltipCustomProps = {
  id: string;
  children: React.ReactNode;
};

export const TooltipCustom: React.FC<TooltipCustomProps> = ({ id, children }) => (
  <ReactTooltip
    id={id}
    effect="solid"
    place={'right'}
    border={true}
    type={'light'}
    borderColor={'#e0e0e0'}
  >
    {children}
  </ReactTooltip>
);
