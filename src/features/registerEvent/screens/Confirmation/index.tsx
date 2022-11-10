/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { ConfirmationEventContainer, States } from '@/features/registerEvent/screens/Confirmation/ui';

export const ConfirmationEventScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  return <ConfirmationEventContainer state={state} />;
};
