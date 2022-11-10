/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { SectorTicketContainer, States } from '@/features/registerEvent/screens/SectorTicket/ui';

export const SectorTicketScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  return <SectorTicketContainer state={state} />;
};
