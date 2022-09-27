/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';

import { States } from '@/features/pos/screens/List/ui';
import PosStatus from '@/model/PosStatus';

import { HomeContainer } from './ui';

export default interface PayloadPos {
  id?: string;
  name: string;
  serialNumber: string;
  status: PosStatus;
  pdv: {
    id: string;
  };
  model: string;
  telephoneOperator: string;
  cardOperator: string;
  expirationDate: string;
}

export const HomeProductComboScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  return <HomeContainer state={state} />;
};
