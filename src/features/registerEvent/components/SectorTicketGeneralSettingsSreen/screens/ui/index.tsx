/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, Loading } from '@/components';
import { Container } from 'reactstrap';
import { SectorTicketGeneralSettingsContent } from '@/features/registerEvent/components/SectorTicketGeneralSettingsSreen/components/SectorTicketGeneralSettingsContent';

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
        <div>
          {ticketStates?.ticket ? (
            <Button
              title="Salvar"
              theme="noneBorder"
              onClick={async () => {
                await generalSettingsActions.onSave();
              }}
            />
          ) : null}
        </div>
        <div>
          <Button
            title="Voltar"
            theme="noneBorder"
            onClick={() => generalSettingsActions.onReturnTap()}
          />
          <Button
            title="Adicionar ingresso"
            theme="outlineDark"
            className="ml-3"
            onClick={async () => {
              await generalSettingsActions.onNextTap();
            }}
          />
        </div>
      </div>
    </Container>
  </Fragment>
);
