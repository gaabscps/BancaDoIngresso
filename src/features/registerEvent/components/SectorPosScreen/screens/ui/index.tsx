/* eslint-disable no-shadow */
import {
  Button,
  ButtonGroup,
  Dialog,
  InputText,
  Loading,
  // Loading,
  SelectCustom,
  Switch,
} from '@/components';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as ItemConfig } from '@/assets/images/svg/ItemConfig.svg';
import { updateMask as updateMaskCash } from '@/helpers/masks/cashNumber';
import { CustomTable } from '@/components/Table';
import React from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { ActionProps } from '@/components/Dialog';
import Pos from '@/model/Pos';
import dayjs from 'dayjs';
import POSIcon from '@/assets/images/svg/Pos';
import { controllerEventProps } from '@/features/registerEvent/screens/SectorTicket/types';
import {
  dataConfigStatesProps,
  formAllowPosProps,
  formPosProps,
  modalConfigPosProps,
} from '../../types';
import { PosConfigContent } from '../../components/PosConfigContent';
import { columnsPos } from './table';

export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  configPos = 'configPos',
}

export enum FormInputNameAllowPos {
  allowPos = 'allowPos',
}

export enum FormInputName {
  pos = 'pos',
  waiter = 'waiter',
  commission = 'commission',
  allowDiscount = 'allowDiscount',
}

export interface SectorProductPosContainerProps {
  state: States;
  controllerFormPos: formPosProps;
  controllerFormAllowPos: formAllowPosProps;
  controllerModalConfig: modalConfigPosProps;
  controllerEvent: controllerEventProps;
  handleOnSavePos: () => Promise<void>;
  backTab: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posList: any[];
  posOptions: Pos[];
  handleOnShowDeletePos: (posSelected: Pos) => void;
  dataConfig: dataConfigStatesProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnChangePosSwitch: (comboSelected: any) => void;
  onHandleHasPos: (b: string) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnGetPos: (comboSelected: any) => void;
  handleOnCancelEditPos: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posState: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPosState: React.Dispatch<React.SetStateAction<any>>;
}
export const SectorPosContainer: React.FC<SectorProductPosContainerProps> = ({
  state,
  controllerFormPos,
  controllerFormAllowPos,
  controllerModalConfig,
  controllerEvent,
  posList,
  posOptions,
  dataConfig,
  posState,
  handleOnSavePos,
  backTab,
  onHandleHasPos,
  handleOnShowDeletePos,
  handleOnChangePosSwitch,
  handleOnGetPos,
  handleOnCancelEditPos,
  setPosState,
}) => {
  const { formData, formErrors, onChangeFormInput } = controllerFormPos;
  const { shouldShowModal, title, visible, onToggle, onShouldShowModal } = controllerModalConfig;

  const titleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (posState) {
      titleRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [posState]);

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => {
      handleOnCancelEditPos();
      onToggle();
    },
    theme: 'noneBorder',
  };

  return (
    <>
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        isContentWithCard
        actions={[
          {
            [ShouldShowModal.configPos]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.configPos]: {
              title: 'Salvar',
              onClick: () => handleOnSavePos(),
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.configPos]: (
              <PosConfigContent dataConfig={dataConfig} controllerEvent={controllerEvent} />
            ),
          }[shouldShowModal]
        }
      </Dialog>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <h6 ref={titleRef} className="mb-5">
          {posState ? `Editando ${posState.pos.name}` : 'Configurando POS'}
        </h6>
        <Form>
          <FormGroup>
            <ButtonGroup
              label="Permitir POS?"
              name="allowPos"
              value={controllerFormAllowPos.formData[FormInputNameAllowPos.allowPos]}
              onChange={e => {
                onHandleHasPos(e?.target?.value);
                controllerFormAllowPos.onChangeFormInput(FormInputNameAllowPos.allowPos)(
                  e?.target?.value as string,
                );
              }}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
              error={
                controllerFormAllowPos.formErrors.allowPos &&
                controllerFormAllowPos.formErrors.allowPos[0]
              }
            />
          </FormGroup>
        </Form>

        {controllerFormAllowPos.formData[FormInputNameAllowPos.allowPos] === 'true' ? (
          <>
            <div className="card-ligth-color mb-5 w-100">
              <Row>
                <Col lg={6}>
                  <SelectCustom
                    name="pos"
                    label="POS"
                    placeholder="Digite ou selecione a POS"
                    value={formData[FormInputName.pos]}
                    onChange={e => {
                      const verifyPosExists = posList.find(value => value.pos.id === e?.value);
                      if (verifyPosExists) {
                        setPosState(verifyPosExists);
                      } else {
                        setPosState(undefined);
                      }
                      onChangeFormInput(FormInputName.pos)(e?.value as string);
                    }}
                    options={posOptions.map(item => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    error={formErrors.pos && formErrors.pos[0]}
                  />
                </Col>
                <Col lg="auto">
                  <InputText
                    name="waiter"
                    label="Porcentagem do garçom"
                    addon="%"
                    maxLength={5}
                    placeholder="0"
                    className="w-input-sm"
                    value={formData[FormInputName.waiter]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.waiter)(
                        updateMaskCash(e?.target?.value) as string,
                      )
                    }
                    error={formErrors.waiter && formErrors.waiter[0]}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="auto">
                  <InputText
                    name="commission"
                    label="Porcentagem de comissão"
                    placeholder="0"
                    addon="%"
                    maxLength={5}
                    className="w-input-sm"
                    value={formData[FormInputName.commission]}
                    onChange={e =>
                      onChangeFormInput(FormInputName.commission)(
                        updateMaskCash(e?.target?.value) as string,
                      )
                    }
                    error={formErrors.commission && formErrors.commission[0]}
                  />
                </Col>
                <Col lg={8}>
                  <ButtonGroup
                    label="Aceita desconto?"
                    name="allowDiscount"
                    value={formData[FormInputName.allowDiscount]}
                    onChange={e => onChangeFormInput(FormInputName.allowDiscount)(e.target.value)}
                    error={formErrors.allowDiscount && formErrors.allowDiscount[0]}
                    options={[
                      { value: true, label: 'Sim' },
                      { value: false, label: 'Não' },
                    ]}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-flex justify-content-end">
                    <div
                      className="cursor-pointer mr-3"
                      onClick={() => {
                        handleOnCancelEditPos();
                      }}
                    >
                      {posState ? 'Cancelar' : null}
                    </div>
                    <div
                      className="link-green"
                      onClick={(): void => {
                        onShouldShowModal({
                          value: ShouldShowModal.configPos,
                          newTitleModal: 'Configuração de setores e produtos da POS',
                          pos: posState,
                        });
                      }}
                    >
                      {posState ? 'Salvar edição' : 'Inserir POS'}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <SuperCollapse
              title="POS’s inseridos"
              count={posList.length}
              content={
                // change 0 to index
                posList.length > 0
                  ? posList.map(
                      (
                        {
                          bindingDate,
                          pos,
                          waiter,
                          commission,
                          actived,
                          eventSections,
                          allowDiscount,
                        },
                        indexPos,
                      ) => (
                        <React.Fragment key={indexPos}>
                          {indexPos > 0 ? <hr style={{ margin: '25px -30px 30px -30px' }} /> : null}
                          <div
                            className={`${
                              posState?.pos && posState?.pos?.id !== pos?.id
                                ? 'disabled-content'
                                : null
                            }`}
                          >
                            <div className="d-flex w-100 justify-content-between">
                              <div className="mb-3 w-100">
                                <span className="secondary-table-title">POS # {indexPos + 1}</span>
                                <span className="secondary-table-title font-weight-bold">
                                  • {pos.name}
                                </span>
                              </div>
                              <Switch
                                name={`allowSellingWebsite-${pos.id}`}
                                label={`POS ${actived ? 'Ativo' : 'Inativo'}`}
                                onChange={() =>
                                  handleOnChangePosSwitch({
                                    pos,
                                    waiter,
                                    commission,
                                    allowDiscount,
                                    actived,
                                    eventSections,
                                  })
                                }
                                checked={actived}
                              />
                            </div>
                            <CustomTable
                              theme="secondaryWithoutBorder"
                              numberRowsPerPage={0}
                              progressPending={false}
                              columns={columnsPos}
                              data={[
                                {
                                  serialNumber: pos.serialNumber,
                                  date:
                                    dayjs(bindingDate).format('DD/MM/YYYY') === 'Invalid Date'
                                      ? '-----'
                                      : dayjs(bindingDate).format('DD/MM/YYYY'),
                                  waiter: `${waiter && (+waiter).toFixed(2)}%`,
                                  commission: `${commission && (+commission).toFixed(2)}%`,
                                  actions: (
                                    <div
                                      className={`${
                                        posState?.pos && posState?.pos?.id === pos?.id
                                          ? 'disabled-content'
                                          : null
                                      }`}
                                    >
                                      <ItemConfig
                                        className="mr-4 svg-icon action-icon"
                                        onClick={(): void => {
                                          onShouldShowModal({
                                            value: ShouldShowModal.configPos,
                                            newTitleModal:
                                              'Configuração de setores e produtos da POS',
                                            pos: {
                                              pos,
                                              waiter,
                                              commission,
                                              allowDiscount,
                                              actived,
                                              eventSections,
                                            },
                                          });
                                        }}
                                      />
                                      <Pen
                                        className="mr-4 svg-icon action-icon"
                                        onClick={() =>
                                          handleOnGetPos({
                                            pos,
                                            waiter,
                                            commission,
                                            allowDiscount,
                                            actived,
                                            eventSections,
                                          })
                                        }
                                      />
                                      <Trash
                                        className="svg-icon svg-icon-trash action-icon"
                                        onClick={() => handleOnShowDeletePos(pos as unknown as Pos)}
                                      />
                                    </div>
                                  ),
                                },
                              ]}
                            />
                          </div>
                        </React.Fragment>
                      ),
                    )
                  : 'Nenhuma POS cadastrada. Aqui será exibida uma lista de POS'
              }
              leftIcon={POSIcon()}
            />
          </>
        ) : (
          ''
        )}
        <div className="d-flex justify-content-end">
          <Button title="Voltar etapa" theme="noneBorder" onClick={() => backTab()} />
        </div>
      </Container>
    </>
  );
};
