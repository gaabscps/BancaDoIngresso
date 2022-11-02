/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import {
  GeneralInformationContainer,
  States,
} from '@/features/registerEvent/screens/GeneralInformation/ui';

export const GeneralInformationScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);

  return <GeneralInformationContainer state={state} />;
};
