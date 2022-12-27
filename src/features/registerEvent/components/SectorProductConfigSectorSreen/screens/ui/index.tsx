/* eslint-disable no-param-reassign */
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
  dataConfigStatesProps,
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
  dataConfig: dataConfigStatesProps;
}

export const SectorProductConfigSectorContainer: React.FC<
  SectorProductConfigSectorContainerProps
> = ({
  state,
  formConfigSector,
  configSectorStates,
  configSectorActions,
  modalConfig,
  dataConfig,
}) => {
  const titleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (configSectorStates.sector) {
      titleRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [configSectorStates.sector]);

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => {
      configSectorStates.setSector(undefined);
      modalConfig.onToggle();
    },
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
            [ShouldShowModal.configProduct]: <SectorConfigContent dataConfig={dataConfig} />,
          }[modalConfig.shouldShowModal]
        }
      </Dialog>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <h6 ref={titleRef} className="mb-4">
          {configSectorStates.sector
            ? `Editando ${configSectorStates.sector.sectionNome}`
            : 'Cadastrando produtos'}
        </h6>
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
              className="cursor-pointer mr-3"
              onClick={() => {
                configSectorActions.onCancelEdit();
              }}
            >
              {configSectorStates.sector ? 'Cancelar' : null}
            </div>
            {configSectorStates.sector ? (
              <div
                className="link-green"
                onClick={(): void => {
                  if (formConfigSector.isFormValid()) {
                    modalConfig.onShouldShowModal({
                      value: ShouldShowModal.configProduct,
                      newTitleModal: 'Configurações do sector',
                      sector: configSectorStates.sector,
                    });
                  }
                }}
              >
                Salvar edição
              </div>
            ) : (
              <div
                className="link-green"
                onClick={(): void => {
                  if (formConfigSector.isFormValid()) {
                    modalConfig.onShouldShowModal({
                      value: ShouldShowModal.configProduct,
                      newTitleModal: 'Configurações do sector',
                      sector: configSectorStates.sector,
                    });
                  }
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
            configSectorStates.sectorTableList.length > 0
              ? configSectorStates.sectorTableList.map(
                  ({ sectionId, sectionNome, sectionGroup }, index) => {
                    // total products by sectionGroup[].subGroups[].products[]
                    const totalProducts = sectionGroup.reduce((acc: any, { subGroups }: any) => {
                      const totalProductsBySubGroup = subGroups.reduce(
                        (acc: any, { products }: any) => acc + products.length,
                        0,
                      );
                      return acc + totalProductsBySubGroup;
                    }, 0);
                    // total combos by sectionGroup[].subGroups[].combos[]
                    const totalCombos = sectionGroup.reduce((acc: any, { subGroups }: any) => {
                      const totalCombosBySubGroup = subGroups.reduce(
                        (acc: any, { combos }: any) => acc + combos.length,
                        0,
                      );
                      return acc + totalCombosBySubGroup;
                    }, 0);

                    return (
                      <React.Fragment key={index}>
                        {index > 0 ? <hr style={{ margin: '15px -30px 30px -50px' }} /> : null}
                        <div key={index}>
                          <div className="d-flex justify-content-between">
                            <div className="mb-3">
                              <span className="secondary-table-title">Setor #{index + 1}</span>
                              <span className="secondary-table-title font-weight-bold">
                                <b> ·</b> {sectionNome}
                              </span>
                            </div>
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
                                        sector: {
                                          sectionId,
                                          sectionNome,
                                          sectionGroup,
                                        },
                                      });
                                    }}
                                  />
                                  <Pen
                                    width={17}
                                    height={17}
                                    className="mr-4 svg-icon action-icon"
                                    onClick={(): void =>
                                      configSectorActions.onGet({
                                        sectionId,
                                        sectionNome,
                                        sectionGroup,
                                      })
                                    }
                                  />
                                  <Trash
                                    width={17}
                                    height={17}
                                    className="svg-icon svg-icon-trash"
                                    onClick={() => {
                                      modalConfig.onShowModalDelete({
                                        sectionId,
                                        sectionNome,
                                        sectionGroup,
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <CustomTable
                            numberRowsPerPage={0}
                            progressPending={false}
                            columns={columnsSectors}
                            data={[
                              {
                                id: sectionId,
                                products: totalProducts,
                                combos: totalCombos,
                              },
                            ]}
                            theme="secondaryWithoutBorder"
                          />
                        </div>
                      </React.Fragment>
                    );
                  },
                )
              : 'Nenhum setor cadastrado. Aqui será exibida uma lista dos setores cadastrados'
          }
          count={configSectorStates.sectorTableList.length}
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
