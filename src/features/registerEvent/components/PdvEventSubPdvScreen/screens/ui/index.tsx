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
import SubPdv from '@/model/SubPdv';
import {
  ContractorControllerUser,
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
  appendUser: ContractorControllerUser;
  modalConfig: modalConfigSubPdvSettingsProps;
}

export const PdvEventSubPdvContainer: React.FC<SubPdvContainerProps> = ({
  state,
  formSubPdv,
  formSubPdvRegister,
  subPdvStates,
  subPdvActions,
  appendUser,
  modalConfig,
}) => {
  const { formData, formErrors, onChangeFormInput } = formSubPdv;

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
              onClick: (): void => modalConfig.onToggle(),
            },
          }[modalConfig.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.configProduct]: (
              <SubPdvContent formSubPdvRegister={formSubPdvRegister} appendUser={appendUser} />
            ),
          }[modalConfig.shouldShowModal]
        }
      </Dialog>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <FormGroup className="mb-2 d-flex">
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
          <div
            className={`mt-5 ml-4 link-green ${
              formData[FormInputName.hasSubPdv] === 'true' ? '' : 'd-none'
            }`}
            onClick={() =>
              modalConfig.onShouldShowModal({
                value: ShouldShowModal.configProduct,
                newTitleModal: 'Cadastrar novo Sub PDV',
                subPdv: {} as SubPdv,
              })
            }
          >
            + cadastrar novo Sub PDV
          </div>
        </FormGroup>

        {formData[FormInputName.hasSubPdv] === 'true' && (
          <>
            <SuperCollapse
              title={`Sub PDV’s cadastrados`}
              content={
                subPdvStates.subPdvList.length > 0 ? (
                  subPdvStates.subPdvList.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="mb-5">
                        <span className="secondary-table-title">Sub PDV’s #{index + 1}</span>
                        <span className="secondary-table-title font-weight-bold">
                          <b> ·</b> {item.name}
                        </span>
                      </div>
                      <CustomTable
                        numberRowsPerPage={0}
                        progressPending={false}
                        columns={columnsSubPdvEvent}
                        data={[
                          {
                            id: item.id,
                            users: item.users.map(data => data.name),
                            link: '',
                            actions: (
                              <React.Fragment>
                                <div>
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
            />
          </>
        )}
        <div className="d-flex justify-content-end">
          <div>
            <Button
              title="Voltar etapa"
              theme="noneBorder"
              onClick={() => subPdvActions.onReturnTap()}
            />
            <Button
              title="Adicionar PDV"
              theme="outlineDark"
              className="ml-3"
              onClick={() => undefined}
              disabled={formData[FormInputName.hasSubPdv] !== 'true'}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};
