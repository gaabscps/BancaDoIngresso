/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { PdvEventContainer, States } from '@/features/registerEvent/screens/Pdv/ui';

export const PdvEventScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  return <PdvEventContainer state={state} />;
};
