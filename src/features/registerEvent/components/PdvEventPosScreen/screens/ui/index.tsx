/* eslint-disable no-shadow */
import React, { Fragment } from 'react';
import { Button, ButtonGroup, Dialog, Loading } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { PosContent } from '@/features/registerEvent/components/PdvEventPosScreen/components/PosContent';
import { CustomTable } from '@/components/Table';
import { ReactComponent as Config } from '@/assets/images/svg/config.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { ActionProps } from '@/components/Dialog';
import dayjs from 'dayjs';
import POSIcon from '@/assets/images/svg/Pos';
import {
  formPosConfigProps,
  formPosProps,
  formPosRegisterProps,
  modalConfigPosSettingsProps,
  posActionsProps,
  posStatesProps,
} from '../../types';
import { columnsPosEvent } from './table';
import { PosConfigContent } from '../../components/PosConfigContent';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  configProduct = 'configProduct',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  hasPos = 'hasPos',
}

export interface PosContainerProps {
  state: States;
  formPos: formPosProps;
  formPosRegister: formPosRegisterProps;
  formPosConfig: formPosConfigProps;
  posStates: posStatesProps;
  posActions: posActionsProps;
  modalConfig: modalConfigPosSettingsProps;
}

export const PdvEventPosContainer: React.FC<PosContainerProps> = ({
  state,
  formPos,
  formPosRegister,
  formPosConfig,
  posStates,
  posActions,
  modalConfig,
}) => {
  const { formData, formErrors, onInsertPos, onChangeFormInput } = formPos;

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
              title: posStates?.pos && 'Salvar',
              onClick: (): void => formPosConfig.onSave(),
            },
          }[modalConfig.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.configProduct]: <PosConfigContent formPosConfig={formPosConfig} />,
          }[modalConfig.shouldShowModal]
        }
      </Dialog>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <h6 className="mb-5">Inserindo POS</h6>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Permitir POS?"
            name="hasPos"
            value={formData[FormInputName.hasPos]}
            onChange={e => {
              onChangeFormInput(FormInputName.hasPos)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.hasPos && formErrors.hasPos[0]}
          />
        </FormGroup>
        {formData[FormInputName.hasPos] === 'true' && (
          <>
            <div className="card-ligth-color mb-5">
              <PosContent formPosRegister={formPosRegister} posStates={posStates} />
              <div className="d-flex justify-content-end">
                <div className="mr-5 link-green" onClick={() => onInsertPos()}>
                  Inserir POS
                </div>
              </div>
            </div>
            <SuperCollapse
              title={`POS’s inseridos`}
              content={
                posStates.posList.length > 0
                  ? posStates.posList.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="mb-5">
                          <span className="secondary-table-title">POS #{index + 1}</span>
                          <span className="secondary-table-title font-weight-bold">
                            <b> ·</b> {item.pos.name}
                          </span>
                        </div>
                        <CustomTable
                          numberRowsPerPage={0}
                          progressPending={false}
                          columns={columnsPosEvent}
                          data={[
                            {
                              id: item.pos.id,
                              numberPos: item.pos.serialNumber,
                              expirationDate: dayjs(item.pos.expirationDate).format(
                                'YYYY-DD-MM hh:mm:ss',
                              ),
                              partialPayment: item.waiter,
                              actions: (
                                <React.Fragment>
                                  <div className={`${posStates.pos ? 'disabled-content' : null}`}>
                                    <div className="d-flex align-items-center">
                                      <div className="ml-4">
                                        <Config
                                          className="mr-4 svg-icon action-icon"
                                          onClick={(): void => {
                                            modalConfig.onShouldShowModal({
                                              value: ShouldShowModal.configProduct,
                                              newTitleModal: 'Configurações da POS',
                                              pos: item,
                                            });
                                          }}
                                        />
                                        <Pen
                                          className="mr-4 svg-icon action-icon"
                                          onClick={(): void => posActions.onGet(item)}
                                        />
                                        <Trash
                                          className="svg-icon svg-icon-trash"
                                          onClick={() => {
                                            modalConfig.onShowModalDelete(item.pos);
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
                  : // <div className="collapseTableText">
                    'Nenhuma POS cadastrado. Aqui será exibida uma lista das POS cadastrados'
                // </div>
              }
              count={posStates.posList.length}
              leftIcon={POSIcon()}
              buttonTitle="Cancelar edição"
              buttonAction={() => posActions.onCancelEdit()}
              showButtonOnTitle={!!posStates?.pos}
            />
          </>
        )}
        <div className="d-flex justify-content-end">
          <div>
            <Button
              title="Voltar etapa"
              theme="noneBorder"
              onClick={() => posActions.onReturnTap()}
            />
            <Button
              title="Proxima etapa"
              theme="outlineDark"
              className="ml-3"
              onClick={async () => {
                await posActions.onNextTap();
              }}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};
