/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, Dialog, Loading } from '@/components';
import { Container } from 'reactstrap';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import UserIcon from '@/assets/images/svg/User';
import { SectorTicketMainSettingsContent } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/components/SectorTicketMainSettingsContent';
import { ActionProps } from '@/components/Dialog';
// import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { CustomTable } from '@/components/Table';
import { ReactComponent as CloseX } from '@/assets/images/svg/closeX.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import dayjs from 'dayjs';
import { unmask as unMaskCash } from '@/helpers/masks/cash';
import {
  batchActionsProps,
  batchStatesProps,
  formBatchsProps,
  formMainSettingsProps,
  formSectorProps,
  mainSettingsProps,
  modalConfigTicketMainSettingsProps,
  sectorActionsProps,
  sectorStatesProps,
} from '../../types';
import { BatchContent } from '../../components/BatchContent';
import { RegisterSectorContent } from '../../components/RegisterSectorContent';
import { columnsBatch } from './table';

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
  batchStates: batchStatesProps;
  batchActions: batchActionsProps;
  mainSettingsActions: mainSettingsProps;
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
  batchStates,
  batchActions,
  mainSettingsActions,
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
          <p>{batchStates.batch ? 'Editar lote' : 'Cadastrar lote'}</p>
        </div>

        <div style={{ background: '#FFF', borderRadius: '5px', padding: '50px 30px' }}>
          <div className="container-event">
            <BatchContent formBatchs={formBatchs} batchStates={batchStates} />
          </div>
          <div className="d-flex justify-content-end">
            <div
              className="mr-3"
              onClick={() => {
                batchActions.onCancelEdit();
              }}
            >
              {batchStates.batch ? 'Cancelar edição do lote' : null}
            </div>
            <div
              className="link-green"
              onClick={() => {
                if (batchStates.batch) {
                  batchActions.onEdit(batchStates.batch);
                } else {
                  batchActions.onAdd();
                }
              }}
            >
              {batchStates.batch ? 'Salvar lote' : '+ cadastrar lote'}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <SuperCollapse
            title="Lotes cadastrados"
            content={
              batchStates?.batchList?.length > 0
                ? batchStates?.batchList?.map((batch, index) => (
                    <React.Fragment key={index}>
                      {index > 0 ? <hr style={{ margin: '25px -30px 30px -50px' }} /> : null}

                      <div>
                        <div className="supdv-title-flex">
                          <div className="subpdv-title-container">
                            <p className="subpdv-title subpdv-title-index">
                              Lote #{String(index + 1)}{' '}
                            </p>
                            <p className="subpdv-title subpvd-title-name">• {batch.name}</p>
                          </div>
                        </div>
                        <CustomTable
                          columns={columnsBatch}
                          data={[
                            {
                              amount: `${batch.amount} ${
                                +batch.amount <= 1 ? 'unidade' : 'unidades'
                              }`,
                              startDate: dayjs(batch.startDate).format('DD/MM/YYYY'),
                              endDate: dayjs(batch.endDate).format('DD/MM/YYYY'),
                              totalValue: (
                                +batch.amount * +unMaskCash(batch.unitValue)
                              ).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              }),
                              unitValue: batch.unitValue,

                              actions: (
                                <div className={`${batchStates.batch ? 'disabled-content' : null}`}>
                                  <Pen
                                    className="mr-4 svg-icon action-icon"
                                    onClick={(): Promise<void> => batchActions.onGet(batch)}
                                  />
                                  <CloseX
                                    className="mr-2 svg-icon action-icon svg-icon-trash"
                                    onClick={() => {
                                      batchActions.onDelete(batch);
                                    }}
                                  />
                                </div>
                              ),
                            },
                          ]}
                          theme="secondaryWithoutBorder"
                          progressPending={false}
                          numberRowsPerPage={1000}
                        />
                      </div>
                    </React.Fragment>
                  ))
                : 'Nenhum lote cadastrado. Aqui será exibida uma lista dos lotes cadastrados.'
            }
            leftIcon={UserIcon}
            count={batchStates?.batchList?.length}
          />
        </div>
        <div className="d-flex justify-content-end">
          <Button
            title="Próximo"
            theme="outlineDark"
            onClick={() => mainSettingsActions.onSave()}
          />
        </div>
      </Container>
    </Fragment>
  );
};
