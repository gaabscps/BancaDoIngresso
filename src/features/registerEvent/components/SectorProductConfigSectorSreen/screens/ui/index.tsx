/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, Dialog, Loading } from '@/components';
import { Container } from 'reactstrap';
import { SectorProductConfigSectorContent } from '@/features/registerEvent/components/SectorProductConfigSectorSreen/components/SectorTicketConfigSectorContent';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { CustomTable } from '@/components/Table';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as Config } from '@/assets/images/svg/config.svg';
import { ActionProps } from '@/components/Dialog';
import { columnsSectors } from './table';
import {
  formConfigSectorProps,
  configSectorActions,
  sectorStatesProps,
  modalConfigSectorSettingsProps,
} from '../../types';
import TicketIcon from '../../../../../../assets/images/svg/Ticket';

import { SectorConfigContent } from '../../components/SectorConfigContent';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  configProduct = 'configProduct',
}

export interface SectorProductConfigSectorContainerProps {
  state: States;
  formConfigSector: formConfigSectorProps;
  configSectorActions: configSectorActions;
  configSectorStates: sectorStatesProps;
  modalConfig: modalConfigSectorSettingsProps;
}

export const SectorProductConfigSectorContainer: React.FC<
  SectorProductConfigSectorContainerProps
> = ({ state, formConfigSector, configSectorStates, configSectorActions, modalConfig }) => {
  const listDiscountCoupon = [
    {
      id: '1',
      product: '50',
      combos: '6',
    },
  ];

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
            [ShouldShowModal.configProduct]: renderActionDialogToCancel,
          }[modalConfig.shouldShowModal],
          {
            [ShouldShowModal.configProduct]: {
              title: configSectorStates?.sector ? 'Salvar' : 'Cadastrar novo setor',
              onClick: (): Promise<void> => configSectorActions.onSave(),
            },
          }[modalConfig.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.configProduct]: <SectorConfigContent />,
          }[modalConfig.shouldShowModal]
        }
      </Dialog>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <h6 className="mb-4">Cadastrando setores</h6>
        <div className="card-ligth-color mb-5">
          <div className="container-event">
            <SectorProductConfigSectorContent
              formConfigSector={formConfigSector}
              configSectorActions={configSectorActions}
              configSectorStates={configSectorStates}
            />
          </div>
          <div className="d-flex justify-content-end">
            <div
              className="mr-3"
              onClick={() => {
                configSectorActions.onCancelEdit();
              }}
            >
              {configSectorStates.sector ? 'Cancelar' : null}
            </div>
            {configSectorStates.sector ? (
              <div className="link-green">Salvar edição</div>
            ) : (
              <div
                className="link-green"
                onClick={(): void => {
                  modalConfig.onShouldShowModal({
                    value: ShouldShowModal.configProduct,
                    newTitleModal: 'Configurações do sector',
                  });
                }}
              >
                + inserir setor
              </div>
            )}
          </div>
        </div>
        <SuperCollapse
          title={`Setores inseridos`}
          content={
            listDiscountCoupon.length > 0 ? (
              listDiscountCoupon.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="mb-5">
                    <span className="secondary-table-title">Setor #{index + 1}</span>
                    <span className="secondary-table-title font-weight-bold">
                      <b> ·</b> Camarote
                    </span>
                  </div>
                  <CustomTable
                    numberRowsPerPage={0}
                    progressPending={false}
                    columns={columnsSectors}
                    data={[
                      {
                        id: item.id,
                        products: item.product,
                        combos: item.combos,
                        actions: (
                          <React.Fragment>
                            <div
                              className={`${configSectorStates.sector ? 'disabled-content' : null}`}
                            >
                              <div className="d-flex align-items-center">
                                <div className="ml-4">
                                  <Config
                                    className="mr-4 svg-icon action-icon"
                                    onClick={(): void => {
                                      modalConfig.onShouldShowModal({
                                        value: ShouldShowModal.configProduct,
                                        newTitleModal: 'Configurações do sector',
                                        sector: item,
                                      });
                                    }}
                                  />
                                  <Pen
                                    className="mr-4 svg-icon action-icon"
                                    onClick={(): void => configSectorActions.onGet(item)}
                                  />
                                  <Trash
                                    className="svg-icon svg-icon-trash"
                                    onClick={() => {
                                      modalConfig.onShowModalDelete(item);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        ),
                      },
                    ]}
                    theme="secondaryWithoutBorder"
                  />
                </React.Fragment>
              ))
            ) : (
              <span>Nenhum cupom de desconto adicionado</span>
            )
          }
          count={1}
          leftIcon={TicketIcon}
        />
        <div className="d-flex justify-content-end">
          <Button
            title="Voltar etapa"
            theme="noneBorder"
            onClick={() => configSectorActions.onReturnTab()}
          />
          <Button
            title="Próxima etapa"
            theme="outlineDark"
            className="ml-3"
            onClick={async () => {
              await configSectorActions.onNextTab();
            }}
          />
        </div>
      </Container>
    </Fragment>
  );
};
