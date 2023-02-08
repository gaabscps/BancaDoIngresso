import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import EventPhaseCompletion from '@/model/EventPhaseCompletion';
import { Loading } from '@/components';
import { useParams } from 'react-router-dom';
import { ProgressStep } from '../components/ProgressStep';
import { useEvent } from '../hook/useEvent';
import '@/features/registerEvent/components/ProgressStep/styles.scss';
import { GeneralInformationScreen } from './GeneralInformation';
import { SectorProductScreen } from './SectorProduct';
import { SectorTicketScreen } from './SectorTicket';
import { PdvEventScreen } from './Pdv';
import { ConfirmationEventScreen } from './Confirmation';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

type UrlParams = {
  id: 'string';
};

export const EventScreen: React.FC = (): JSX.Element => {
  const [state, setState] = React.useState<States>(States.default);
  const [phaseCompletion, setPhaseCompletion] = useState<EventPhaseCompletion | undefined>();
  const { eventState, onChange: onChangeEvent } = useEvent();
  const params = useParams<UrlParams>();

  const handleGetEventPhaseCompletion = async (): Promise<void> => {
    try {
      if (params.id) {
        setState(States.loading);
        const { data } = await api.get(`/event/phase-completion/${params.id}`);
        setPhaseCompletion(data);
      }
    } finally {
      setState(States.default);
    }
  };

  useEffect(() => {
    // verify if router is '/event/create'
    const isCreate = window.location.pathname.includes('create');
    if (isCreate) {
      onChangeEvent({ ...eventState, currentStep: 0 });
    }
    handleGetEventPhaseCompletion();
  }, [eventState.currentStep]);

  const steps = [
    {
      component: <GeneralInformationScreen />,
      title: 'Informações gerais',
      completion: !!phaseCompletion?.generalInformation,
    },
    {
      component: (
        <SectorTicketScreen
          handleGetEventPhaseCompletion={handleGetEventPhaseCompletion}
          phaseCompletion={phaseCompletion}
        />
      ),
      title: 'Setor e Ingresso',
      completion: !!phaseCompletion?.ticket.completion,
    },
    {
      component: (
        <SectorProductScreen
          handleGetEventPhaseCompletion={handleGetEventPhaseCompletion}
          phaseCompletion={phaseCompletion}
        />
      ),
      title: 'Setor e Produto',
      completion: !!phaseCompletion?.sectionProduct.completion,
    },
    {
      component: (
        <PdvEventScreen
          handleGetEventPhaseCompletion={handleGetEventPhaseCompletion}
          phaseCompletion={phaseCompletion}
        />
      ),
      title: 'PDV',
      completion: !!phaseCompletion?.pdv.completion,
    },
    {
      component: <ConfirmationEventScreen />,
      title: 'Confirmação',
      completion: !!phaseCompletion?.confirmation,
    },
  ];

  return (
    <>
      <Loading isVisible={state === States.loading} />
      <ProgressStep steps={steps} currentStep={eventState.currentStep} />
      {steps.map((step, index) => {
        if (index === eventState.currentStep) {
          return <React.Fragment key={index}>{step.component}</React.Fragment>;
        }
        return null;
      })}
    </>
  );
};
