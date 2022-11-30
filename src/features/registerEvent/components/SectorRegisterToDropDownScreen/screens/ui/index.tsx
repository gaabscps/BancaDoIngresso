/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Dialog, Loading } from '@/components';
import { ActionProps } from '@/components/Dialog';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { toast } from 'react-toastify';
import {
  formSectorProps,
  modalConfigProps,
  sectorActionsProps,
  sectorStatesProps,
} from '../../types';
import { RegisterSectorContent } from '../../components/RegisterSectorContent';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  sector = 'sector',
}

export interface SectorRegisterContainerProps {
  state: States;
  sectorSelectedStates: any;
  formSector: formSectorProps;
  sectorStates: sectorStatesProps;
  sectorActions: sectorActionsProps;
  modalConfig: modalConfigProps;
}

export const SectorRegisterContainer: React.FC<SectorRegisterContainerProps> = ({
  state,
  sectorSelectedStates: sectorSelected,
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
      <div className="d-flex flex-column mb-5" style={{ marginTop: '-20px' }}>
        <span className="d-flex">
          <div
            className="mr-5 link-green"
            onClick={(): void => {
              modalConfig.onToggle();
              modalConfig.onShouldShowModal({
                value: ShouldShowModal.sector,
                newTitleModal: 'Cadastrar novo setor',
              });
            }}
          >
            + cadastrar novo setor
          </div>
          <div
            className="link-grey"
            onClick={(): void => {
              if (!sectorSelected) {
                toast.warn('Selecione um setor para editar');
              } else {
                modalConfig.onToggle();
                modalConfig.onShouldShowModal({
                  value: ShouldShowModal.sector,
                  newTitleModal: sectorSelected?.id ? sectorSelected?.name : 'Cadastrar novo setor',
                  sector: sectorSelected,
                });
              }
            }}
          >
            <Pen height={12} width={12} /> editar
          </div>
        </span>
      </div>
    </Fragment>
  );
};
