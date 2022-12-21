/* eslint-disable no-shadow */
import TicketIcon from '@/assets/images/svg/Ticket';
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
import { ReactComponent as Config } from '@/assets/images/svg/config.svg';
import { CustomTable } from '@/components/Table';
import React from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { ActionProps } from '@/components/Dialog';
import Pos from '@/model/Pos';
import dayjs from 'dayjs';
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
  handleOnSavePos: () => Promise<void>;
  nextTab: () => void;
  backTab: () => void;
  posList: any[];
  posOptions: Pos[];
  handleOnShowDeletePos: (posSelected: Pos) => void;
  dataConfig: dataConfigStatesProps;
  handleOnChangePosSwitch: (comboSelected: any) => void;
  handleOnGetPos: (comboSelected: any) => void;
  handleOnCancelEditPos: () => void;
  posState: any;
}
export const SectorPosContainer: React.FC<SectorProductPosContainerProps> = ({
  state,
  controllerFormPos,
  controllerFormAllowPos,
  controllerModalConfig,
  handleOnSavePos,
  nextTab,
  backTab,
  posList,
  posOptions,
  dataConfig,
  handleOnShowDeletePos,
  handleOnChangePosSwitch,
  handleOnGetPos,
  handleOnCancelEditPos,
  posState,
}) => {
  const { formData, formErrors, onChangeFormInput } = controllerFormPos;
  const { shouldShowModal, title, visible, onToggle, onShouldShowModal } = controllerModalConfig;

  const titleRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (posState) {
      titleRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [posState]);

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
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
            [ShouldShowModal.configPos]: <PosConfigContent dataConfig={dataConfig} />,
          }[shouldShowModal]
        }
      </Dialog>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <Row>
          <Col>
            <h6 ref={titleRef} className="mb-5">
              {posState ? `Editando ${posState.pos.name}` : 'Configurando POS'}
            </h6>
            <Form>
              <FormGroup>
                <ButtonGroup
                  label="Permitir POS?"
                  name="allowPos"
                  value={controllerFormAllowPos.formData[FormInputNameAllowPos.allowPos]}
                  onChange={e =>
                    controllerFormAllowPos.onChangeFormInput(FormInputNameAllowPos.allowPos)(
                      e?.target?.value as string,
                    )
                  }
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
          </Col>
        </Row>
        {controllerFormAllowPos.formData[FormInputNameAllowPos.allowPos] === 'true' ? (
          <>
            <Col>
              <Row>
                <div className="card-ligth-color mb-5 w-100">
                  <Row>
                    <Col md={7}>
                      <SelectCustom
                        name="pos"
                        label="POS"
                        placeholder="Digite ou selecione a POS"
                        value={formData[FormInputName.pos]}
                        onChange={e => onChangeFormInput(FormInputName.pos)(e?.value as string)}
                        options={posOptions.map(item => ({
                          value: item.id,
                          label: item.name,
                        }))}
                        error={formErrors.pos && formErrors.pos[0]}
                      />
                    </Col>
                    <Col md={3}>
                      <InputText
                        type="number"
                        name="waiter"
                        label="Porcentagem do garçom (%)"
                        addon="%"
                        placeholder="0"
                        className="w-input-sm"
                        value={formData[FormInputName.waiter]}
                        onChange={e => onChangeFormInput(FormInputName.waiter)(e.target.value)}
                        error={formErrors.waiter && formErrors.waiter[0]}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>{/* <div className="link-green mb-5">+ cadastrar produto</div> */}</Col>
                  </Row>
                  <Row>
                    <Col className="mr-5" md={3}>
                      <InputText
                        type="number"
                        name="commission"
                        label="Porcentagem de comissão(%)"
                        placeholder="0"
                        addon="%"
                        className="w-input-sm"
                        value={formData[FormInputName.commission]}
                        onChange={e => onChangeFormInput(FormInputName.commission)(e.target.value)}
                        error={formErrors.commission && formErrors.commission[0]}
                      />
                    </Col>
                    <Col md={3}>
                      <ButtonGroup
                        label="Aceita desconto?"
                        name="allowDiscount"
                        value={formData[FormInputName.allowDiscount]}
                        onChange={e =>
                          onChangeFormInput(FormInputName.allowDiscount)(e.target.value)
                        }
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
                      {/* <div
                        className="action-icon d-flex justify-content-end"
                        onClick={(): void => {
                          onShouldShowModal({
                            value: ShouldShowModal.configPos,
                            newTitleModal: 'Configuração de setores e produtos da POS',
                          });
                        }}
                      >
                        Inserir POS
                      </div> */}
                      <div className="d-flex justify-content-end">
                        <div
                          className="mr-3"
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
              </Row>
            </Col>
            <Row>
              <Col></Col>
            </Row>

            <Row>
              <Col>
                <SuperCollapse
                  title="POS’s inseridos"
                  content={
                    // change 0 to index
                    posList.length > 0
                      ? posList.map(
                          (
                            { pos, waiter, commission, actived, eventSections, allowDiscount },
                            indexPos,
                          ) => (
                            <React.Fragment key={indexPos}>
                              {indexPos > 0 ? (
                                <hr style={{ margin: '25px -30px 30px -50px' }} />
                              ) : null}
                              <div
                                className={`${
                                  posState?.pos && posState?.pos?.id !== pos?.id
                                    ? 'disabled-content'
                                    : null
                                }`}
                              >
                                <div className="d-flex w-100 justify-content-between">
                                  <div className="mb-3 w-100">
                                    <span className="secondary-table-title">
                                      POS # {indexPos + 1}
                                    </span>
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
                                      date: dayjs(pos.expirationDate).format('DD/MM/YYYY'),
                                      waiter: `${waiter}%`,
                                      commission: `${commission}%`,
                                      actions: (
                                        <div
                                          className={`${
                                            posState?.pos && posState?.pos?.id === pos?.id
                                              ? 'disabled-content'
                                              : null
                                          }`}
                                        >
                                          <Config
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
                                            width={15}
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
                                            width={13}
                                            className="action-icon svg-icon-trash"
                                            onClick={() =>
                                              handleOnShowDeletePos(pos as unknown as Pos)
                                            }
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
                  leftIcon={TicketIcon}
                />
              </Col>
            </Row>
          </>
        ) : (
          ''
        )}
        <div className="d-flex justify-content-end">
          <Button title="Voltar etapa" theme="noneBorder" onClick={() => backTab()} />
          <Button
            title="Próxima etapa"
            theme="outlineDark"
            className="ml-3"
            onClick={async () => {
              await nextTab();
            }}
          />
        </div>
      </Container>
    </>
  );
};
