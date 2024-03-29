/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Fragment } from 'react';
import { Button, ButtonGroup, Loading, Tab, TooltipCustom } from '@/components';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as Info } from '@/assets/images/svg/infoTooltip.svg';
import { Container, FormGroup } from 'reactstrap';
import { MainPdvContent } from '@/features/registerEvent/components/MainPdvContent';
import { CustomTable } from '@/components/Table';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import {
  formMainPdvProductProps,
  formPdvProductProps,
  mainPdvActionsProps,
  mainPdvStatesProps,
} from '@/features/registerEvent/components/PdvScreen/types';
import { PdvEventTickScreen } from '@/features/registerEvent/components/PdvEventTicketScreen/screens';
import { PdvEventPosScreen } from '@/features/registerEvent/components/PdvEventPosScreen/screens';
import { PdvProductScreen } from '@/features/registerEvent/components/PdvProductsScreen/screens';
import { PdvUserScreen } from '@/features/registerEvent/components/PdvUserScreen/screens';
import { PdvEventSubPdvScreen } from '@/features/registerEvent/components/PdvEventSubPdvScreen/screens';
import PDVIcon from '@/assets/images/svg/Pdv';
import EventPhaseCompletion from '@/model/EventPhaseCompletion';
import { columnsEventPdv } from './table';
import { EventTicketPDVLine } from '..';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface PdvContainerProps {
  state: States;
  pdvId?: string;
  eventTicketsPDV: EventTicketPDVLine[];
  link: string;
  numberTab: number;
  formPdv: formPdvProductProps;
  formMainPdv: formMainPdvProductProps;
  mainPdvActions: mainPdvActionsProps;
  mainPdvStates: mainPdvStatesProps;
  eventState: any;
  onChangeEvent: any;
  inputRef: any;
  phaseCompletion: EventPhaseCompletion | undefined;
  handleGetEventPhaseCompletion: () => void;
  handleHasPdv: (b: string) => Promise<void>;
  isFormValidMainPdv: () => boolean;
  onChangeSelectedPdv: (value: string) => void;
  getEventPdvTickets: () => void;
  handleSetPdvLink: (link: string) => void;
  handleOnGetTickets: () => void;
  handleCheckTicket: (ticketId: string) => void;
  setNumberTab: (value: number) => void;
  nextTab: () => void;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  isPdv = 'isPdv',
}

export type TabPdvActionsProps = {
  nextTab: () => void;
  backTab: () => void;
  firstTab: () => void;
};

export const PdvEventContainer: React.FC<PdvContainerProps> = ({
  state,
  pdvId,
  eventTicketsPDV,
  link,
  numberTab,
  formPdv,
  formMainPdv,
  mainPdvActions,
  mainPdvStates,
  eventState,
  onChangeEvent,
  inputRef,
  phaseCompletion,
  handleGetEventPhaseCompletion,
  isFormValidMainPdv,
  setNumberTab,
  onChangeSelectedPdv,
  getEventPdvTickets,
  handleSetPdvLink,
  handleOnGetTickets,
  handleCheckTicket,
  nextTab,
  handleHasPdv,
}) => {
  const { formData, formErrors, onChangeFormInput } = formPdv;

  const handleNextTab = async (): Promise<void> => {
    if (numberTab <= contentTabs.length) {
      nextTab();
    }
  };

  const handleBackTab = (): void => {
    if (numberTab <= contentTabs.length && numberTab >= 0) {
      setNumberTab(numberTab - 1);
    }
  };

  const handleOnFirstTab = (): void => {
    setNumberTab(0);
  };

  const contentTabs = [
    {
      component: (
        <PdvEventTickScreen
          pdvId={pdvId}
          eventTicketsPDV={eventTicketsPDV}
          link={link}
          getEventPdvTickets={getEventPdvTickets}
          handleSetPdvLink={handleSetPdvLink}
          handleOnGetTickets={handleOnGetTickets}
          handleCheckTicket={handleCheckTicket}
          nextTab={handleNextTab}
          backTab={handleBackTab}
          numberTab={numberTab}
          isFormValidMainPdv={isFormValidMainPdv}
          inputRef={inputRef}
        />
      ),
      completion: !!phaseCompletion?.pdv?.ticket,
      title: 'Ingressos por PDV',
    },
    {
      component: (
        <PdvEventPosScreen
          handleGetEventPhaseCompletion={handleGetEventPhaseCompletion}
          pdvId={pdvId}
          nextTab={handleNextTab}
          backTab={handleBackTab}
        />
      ),
      completion: !!phaseCompletion?.pdv?.pos,
      title: 'Inserir POS',
    },
    {
      component: (
        <PdvProductScreen
          handleGetEventPhaseCompletion={handleGetEventPhaseCompletion}
          pdvId={pdvId}
          nextTab={handleNextTab}
          backTab={handleBackTab}
        />
      ),
      completion: !!phaseCompletion?.pdv?.product,
      title: 'Inserir produtos',
    },
    {
      component: (
        <PdvUserScreen
          mainPdvStates={mainPdvStates}
          pdvId={pdvId}
          nextTab={handleNextTab}
          backTab={handleBackTab}
        />
      ),
      completion: !!phaseCompletion?.pdv?.user,
      title: 'Inserir usuários',
    },
    {
      component: (
        <PdvEventSubPdvScreen
          resetFormMainPdv={formMainPdv.resetFormMainPdv}
          handleGetEventPhaseCompletion={handleGetEventPhaseCompletion}
          mainPdvStates={mainPdvStates}
          pdvId={pdvId}
          backTab={handleBackTab}
          firstTab={handleOnFirstTab}
        />
      ),
      completion: !!phaseCompletion?.pdv?.subPdv,
      title: 'Cadastrar Sub PDV’s',
    },
  ];

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="container-event">
          <h5 className="mb-2 border-bottom-title mb-5">PDV</h5>
        </div>
        <FormGroup className="mb-2 d-flex ">
          <ButtonGroup
            label={
              <>
                Permitir PDV?
                <a data-for="pdvInfo" data-tip="8" className="ml-3">
                  <Info />
                </a>
              </>
            }
            name="isPdv"
            value={formData[FormInputName.isPdv]}
            onChange={e => {
              handleHasPdv(e.target.value);
              onChangeFormInput(FormInputName.isPdv)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.isPdv && formErrors.isPdv[0]}
            disabledAction={!!pdvId}
          />
          <TooltipCustom id="pdvInfo">
            Comece escolhendo o PDV que você quer adicionar ao evento.
          </TooltipCustom>
        </FormGroup>
        <hr className="mt-5" />
        {formData[FormInputName.isPdv] === 'true' && (
          <>
            <div className="container-event">
              <MainPdvContent
                onChangeSelectedPdv={onChangeSelectedPdv}
                formMainPdv={formMainPdv}
                mainPdvActions={mainPdvActions}
                mainPdvStates={mainPdvStates}
                inputRef={inputRef}
                numberTab={numberTab}
              />
            </div>
            <hr className="mt-5 mb-5" />
            <>
              <SuperCollapse
                title={`PDV’s adicionados`}
                content={
                  mainPdvStates.eventPDVs && mainPdvStates.eventPDVs.length > 0 ? (
                    mainPdvStates.eventPDVs.map((item, index) => (
                      <React.Fragment key={index}>
                        {index > 0 ? <hr style={{ margin: '25px -30px 30px -30px' }} /> : null}
                        <div className="mb-5">
                          <span style={{ fontWeight: '300' }} className="secondary-table-title">
                            PDV #{index + 1}
                          </span>
                          <span style={{ fontWeight: '500' }} className="secondary-table-title">
                            <b> ·</b> {item.pdv.name}
                          </span>
                        </div>
                        <CustomTable
                          numberRowsPerPage={0}
                          progressPending={false}
                          columns={columnsEventPdv}
                          data={[
                            {
                              id: item?.pdv?.id,
                              pos:
                                item?.poss && item?.poss?.length > 0
                                  ? item?.poss.map(data => data?.pos?.name)
                                  : '-----',
                              users:
                                item?.pdv?.users && item?.pdv?.users?.length > 0
                                  ? item?.pdv?.users?.map(data =>
                                      item?.pdv?.users?.length === 1
                                        ? data?.name
                                        : `${data?.name}, `,
                                    )
                                  : '-----',
                              actions: (
                                <React.Fragment>
                                  <div
                                    className={`${
                                      mainPdvStates?.mainPdv ? 'disabled-content' : null
                                    }`}
                                  >
                                    <div className="d-flex align-items-center">
                                      <div className="ml-4">
                                        <Pen
                                          className="mr-4 svg-icon action-icon"
                                          onClick={(): void => mainPdvActions.onGet(item.pdv)}
                                        />
                                        <Trash
                                          className="svg-icon action-icon svg-icon-trash"
                                          onClick={() => {
                                            mainPdvActions.onShowModalDelete(item.pdv);
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
                    <span>Nenhum PDV adicionado</span>
                  )
                }
                count={mainPdvStates.eventPDVs.length}
                leftIcon={PDVIcon()}
                buttonTitle="Cancelar edição"
                buttonAction={() => mainPdvActions.onCancelEdit()}
                showButtonOnTitle={!!mainPdvStates?.mainPdv}
              />
              <div className="mb-4">
                <h6>Adicionando PDV</h6>
                <h6 className="text-darkgray">
                  Preencha as 5 (CINCO) etapas abaixo para adicionar um PDV
                </h6>
              </div>
              <Tab contents={contentTabs} numberStap={numberTab} />
            </>
          </>
        )}

        <div className="footer-register-event">
          <Button
            title="Voltar"
            theme="noneBorder"
            onClick={() => {
              onChangeEvent({ ...eventState, currentStep: eventState.currentStep - 1 });
            }}
          />
          {numberTab === 4 || formData[FormInputName.isPdv] === 'false' ? (
            <Button
              title="Avançar para Confirmação"
              onClick={() => {
                onChangeEvent({ ...eventState, currentStep: eventState.currentStep + 1 });
              }}
            />
          ) : null}
        </div>
      </Container>
    </Fragment>
  );
};
