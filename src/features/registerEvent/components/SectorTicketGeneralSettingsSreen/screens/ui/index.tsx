/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, Loading } from '@/components';
import { Container } from 'reactstrap';
import { SectorTicketGeneralSettingsContent } from '@/features/registerEvent/components/SectorTicketGeneralSettingsSreen/components/SectorTicketGeneralSettingsContent';

import { formGeneralSettingsProps, generalSettingsProps } from '../../types';

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
}

export const SectorTicketGeneralSettingsContainer: React.FC<
  SectorTicketGeneralSettingsContainerProps
> = ({ state, formGeneralSettings, generalSettingsActions }) => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      <div className="container-event">
        <SectorTicketGeneralSettingsContent formGeneralSettings={formGeneralSettings} />
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <Button
            title="Salvar"
            theme="noneBorder"
            onClick={async () => {
              await generalSettingsActions.onSave();
            }}
          />
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
