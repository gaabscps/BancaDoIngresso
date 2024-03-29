/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, Loading } from '@/components';
import { Container } from 'reactstrap';
import { SectorTicketGeneralSettingsContent } from '@/features/registerEvent/components/SectorTicketGeneralSettingsSreen/components/SectorTicketGeneralSettingsContent';

import BackOnTop from '@/components/sharedComponents/BackOnTop';
import { formGeneralSettingsProps, generalSettingsProps, ticketStatesProps } from '../../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  sector = 'sector',
}

export interface SectorTicketGeneralSettingsContainerProps {
  state: States;
  formGeneralSettings: formGeneralSettingsProps;
  generalSettingsActions: generalSettingsProps;
  ticketStates: ticketStatesProps;
}

export const SectorTicketGeneralSettingsContainer: React.FC<
  SectorTicketGeneralSettingsContainerProps
> = ({ state, formGeneralSettings, generalSettingsActions, ticketStates }) => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      <div className="container-event">
        <SectorTicketGeneralSettingsContent formGeneralSettings={formGeneralSettings} />
      </div>
      <div className="d-flex justify-content-between">
        {/* <div>
          {ticketStates?.ticket ? (
            <Button
              title="Salvar"
              theme="noneBorder"
              onClick={async () => {
                await generalSettingsActions.onSave();
              }}
            />
          ) : null}
        </div> */}
        <div className="d-flex">
          <div className="m-2 mr-5">
            <BackOnTop />
          </div>
          <Button
            title="Voltar"
            theme="noneBorder"
            onClick={() => generalSettingsActions.onReturnTab()}
          />
          <Button
            title={`${ticketStates?.ticket ? 'Salvar ingresso' : 'Adicionar ingresso'}`}
            theme="outlineDark"
            className="ml-3"
            onClick={async () => {
              await generalSettingsActions.onNextTab();
            }}
          />
        </div>
      </div>
    </Container>
  </Fragment>
);
