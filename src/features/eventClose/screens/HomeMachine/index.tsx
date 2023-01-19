/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { HomeMachineContainer, States } from '@/features/eventClose/screens/HomeMachine/ui';
import { useLocation } from 'react-router-dom';

export const HomeMachineEventCloseScreen: React.FC = (): JSX.Element => {
  const { state: eventLocation } = useLocation();
  const [state] = useState<States>(States.default);

  return <HomeMachineContainer state={state} eventLocation={eventLocation} />;
};
