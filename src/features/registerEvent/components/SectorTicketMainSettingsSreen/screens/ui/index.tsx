/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, Dialog, Loading } from '@/components';
import { Container } from 'reactstrap';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import UserIcon from '@/assets/images/svg/User';
import { SectorTicketMainSettingsContent } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/components/SectorTicketMainSettingsContent';
import { ActionProps } from '@/components/Dialog';
import {
  formBatchsProps,
  formMainSettingsProps,
  formSectorProps,
  modalConfigTicketMainSettingsProps,
  sectorActionsProps,
  sectorStatesProps,
} from '../../types';
import { BatchContent } from '../../components/BatchContent';
import { RegisterSectorContent } from '../../components/RegisterSectorContent';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  sector = 'sector',
}

export interface SectorTicketMainSettingsContainerProps {
  state: States;
  formMainSettings: formMainSettingsProps;
  formBatchs: formBatchsProps;
  formSector: formSectorProps;
  sectorStates: sectorStatesProps;
  sectorActions: sectorActionsProps;
  modalConfig: modalConfigTicketMainSettingsProps;
}

export const SectorTicketMainSettingsContainer: React.FC<
  SectorTicketMainSettingsContainerProps
> = ({
  state,
  formMainSettings,
  formBatchs,
  formSector,
  sectorStates,
  sectorActions,
  modalConfig,
}) => {
  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => modalConfig.onToggle(),
    theme: 'noneBorder',
  };
  return (
    <Fragment>
      <Dialog
        title={modalConfig.title}
        visible={modalConfig.visible}
        onClose={modalConfig.onToggle}
        isContentWithCard
        actions={[
          {
            [ShouldShowModal.sector]: renderActionDialogToCancel,
          }[modalConfig.shouldShowModal],
          {
            [ShouldShowModal.sector]: {
              title: sectorStates?.sector ? 'Salvar' : 'Cadastrar novo setor',
              onClick: (): Promise<void> => sectorActions.onSave(),
            },
          }[modalConfig.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.sector]: <RegisterSectorContent formSector={formSector} />,
          }[modalConfig.shouldShowModal]
        }
      </Dialog>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="container-event">
          <SectorTicketMainSettingsContent
            formMainSettings={formMainSettings}
            modalConfig={modalConfig}
            sectorStates={sectorStates}
          />
        </div>

        <div className="container-event mb-4">
          <h5 className="mb-2 border-bottom-title mb-5">Lotes</h5>
          <p>Cadastrar lote</p>
        </div>

        <div style={{ background: '#FFF', borderRadius: '5px', padding: '50px 30px' }}>
          <div className="container-event">
            <BatchContent formBatchs={formBatchs} />
          </div>
          <div className="d-flex justify-content-end">
            <div className="link-green">+ cadastrar lote</div>
          </div>
        </div>

        <div className="mt-5">
          <SuperCollapse
            title="Lotes cadastrados"
            content="Nenhum lote cadastrado. Aqui será exibida uma lista dos lotes cadastrados."
            leftIcon={UserIcon}
            count={1}
          />
        </div>
        <div className="d-flex justify-content-end">
          <Button title="Próximo" theme="outlineDark" onClick={() => undefined} disabled />
        </div>
      </Container>
    </Fragment>
  );
};
