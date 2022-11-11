/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { SectorProductContainer, States } from '@/features/registerEvent/screens/SectorProduct/ui';

export const SectorProductScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  return <SectorProductContainer state={state} />;
};
