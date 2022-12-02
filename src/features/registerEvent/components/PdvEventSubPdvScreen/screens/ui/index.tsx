/* eslint-disable no-shadow */
import React, { Fragment } from 'react';
import { Button, ButtonGroup, Dialog, Loading } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { SubPdvContent } from '@/features/registerEvent/components/PdvEventSubPdvScreen/components/SubPdvContent';
import { CustomTable } from '@/components/Table';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import TicketIcon from '@/assets/images/svg/Ticket';
import { ActionProps } from '@/components/Dialog';
import {
  formSubPdvProps,
  formSubPdvRegisterProps,
  modalConfigSubPdvSettingsProps,
  subPdvActionsProps,
  subPdvStatesProps,
} from '../../types';
import { columnsSubPdvEvent } from './table';

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
  hasSubPdv = 'hasSubPdv',
}

export interface SubPdvContainerProps {
  state: States;
  formSubPdv: formSubPdvProps;
  formSubPdvRegister: formSubPdvRegisterProps;
  subPdvStates: subPdvStatesProps;
  subPdvActions: subPdvActionsProps;
  modalConfig: modalConfigSubPdvSettingsProps;
}

export const PdvEventSubPdvContainer: React.FC<SubPdvContainerProps> = ({
  state,
  formSubPdv,
  formSubPdvRegister,
  subPdvStates,
  subPdvActions,
  modalConfig,
}) => {
  const { formData, formErrors, onChangeFormInput } = formSubPdv;

  const subPdvListMock = [
    {
      id: '1',
      name: 'Maquininha do Seu Zé',
      numberSubPdv: '123456',
      expirationDate: '01/01/2021',
      partialPayment: '3%',
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
              title: subPdvStates?.subPdv ? 'Salvar' : 'Cadastrar novo Sub PDV',
              onClick: (): void => undefined,
            },
          }[modalConfig.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.configProduct]: (
              <SubPdvContent
                formSubPdvRegister={formSubPdvRegister}
                // subPdvStates={subPdvStates}
              />
            ),
          }[modalConfig.shouldShowModal]
        }
      </Dialog>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Permitir Sub PDV?"
            name="hasSubPdv"
            value={formData[FormInputName.hasSubPdv]}
            onChange={e => {
              onChangeFormInput(FormInputName.hasSubPdv)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.hasSubPdv && formErrors.hasSubPdv[0]}
          />
          <div className="d-flex justify-content-end">
            <div
              className="mr-5 link-green"
              onClick={() =>
                modalConfig.onShouldShowModal({
                  value: ShouldShowModal.configProduct,
                  newTitleModal: 'Cadastrar novo Sub PDV',
                })
              }
            >
              + cadastrar novo Sub PDV
            </div>
          </div>
        </FormGroup>

        {formData[FormInputName.hasSubPdv] === 'true' && (
          <>
            <SuperCollapse
              title={`Sub PDV’s cadastrados`}
              content={
                subPdvListMock.length > 0 ? (
                  subPdvListMock.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="mb-5">
                        <span className="secondary-table-title">POS #{index + 1}</span>
                        <span className="secondary-table-title font-weight-bold">
                          <b> ·</b> {}
                        </span>
                      </div>
                      <CustomTable
                        numberRowsPerPage={0}
                        progressPending={false}
                        columns={columnsSubPdvEvent}
                        data={[
                          {
                            id: item.id,
                            numberSubPdv: item.numberSubPdv,
                            expirationDate: item.expirationDate,
                            partialPayment: item.partialPayment,
                            actions: (
                              <React.Fragment>
                                <div
                                  className={`${subPdvStates.subPdv ? 'disabled-content' : null}`}
                                >
                                  <div className="d-flex align-items-center">
                                    <div className="ml-4">
                                      <Pen
                                        className="mr-4 svg-icon action-icon"
                                        onClick={(): void =>
                                          modalConfig.onShouldShowModal({
                                            value: ShouldShowModal.configProduct,
                                            newTitleModal: item.name,
                                            subPdv: item,
                                          })
                                        }
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
                  <span>Nenhum sub PDV adicionado</span>
                )
              }
              count={1}
              leftIcon={TicketIcon}
              buttonTitle="Cancelar edição"
              buttonAction={() => subPdvActions.onCancelEdit()}
              showButtonOnTitle={!!subPdvStates?.subPdv}
            />
            <div className="d-flex justify-content-end">
              <div>
                <Button
                  title="Voltar etapa"
                  theme="noneBorder"
                  onClick={() => subPdvActions.onReturnTap()}
                />
                <Button
                  title="Proxima etapa"
                  theme="outlineDark"
                  className="ml-3"
                  onClick={async () => {
                    await subPdvActions.onNextTap();
                  }}
                />
              </div>
            </div>
          </>
        )}
      </Container>
    </Fragment>
  );
};
