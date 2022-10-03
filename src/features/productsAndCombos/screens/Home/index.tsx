/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { HomeContainer, States } from '@/features/productsAndCombos/screens/Home/ui';

export const HomeProductComboScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  return <HomeContainer state={state} />;
};
