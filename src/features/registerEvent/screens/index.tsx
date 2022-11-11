/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { ProgressStep } from '../components/ProgressStep';

import { useEvent } from '../hook/useEvent';
import { ConfirmationEventContainer } from './Confirmation/ui';
import { PdvEventContainer } from './Pdv/ui';
import { SectorProductContainer } from './SectorProduct/ui';
import { SectorTicketContainer } from './SectorTicket/ui';
import '@/features/registerEvent/components/ProgressStep/styles.scss';
import { GeneralInformationScreen } from './GeneralInformation';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export const EventScreen: React.FC = (): JSX.Element => {
  const [state] = useState<States>(States.default);
  const { eventState } = useEvent();

  const steps = [
    {
      Component: <GeneralInformationScreen />,
      title: 'Informações gerais',
    },
    {
      Component: <SectorTicketContainer state={state} />,
      title: 'Setor e Ingresso',
    },
    {
      Component: <SectorProductContainer state={state} />,
      title: 'Setor e Produto',
    },
    {
      Component: <PdvEventContainer state={state} />,
      title: 'PDV',
    },
    {
      Component: <ConfirmationEventContainer state={state} />,
      title: 'Confirmação',
    },
  ];

  return (
    <>
      <ProgressStep steps={steps} currentStep={eventState.currentStep} />
      {steps.map((step, index) => {
        if (index === eventState.currentStep) {
          return <React.Fragment key={index}>{step.Component}</React.Fragment>;
        }
        return null;
      })}
    </>
  );
};
