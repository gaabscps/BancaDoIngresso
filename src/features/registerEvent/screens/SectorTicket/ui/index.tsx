/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment, useState } from 'react';
import { Button, ButtonGroup, Loading, Tab } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { SectorTicketMainSettingsScreen } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { CustomTable } from '@/components/Table';
import { ReactComponent as CloseX } from '@/assets/images/svg/closeX.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import Tickets from '@/model/Tickets';
import {
  ticketActionsProps,
  ticketStatesProps,
} from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/types';
import { toCurrency } from '@/helpers/masks/toCurrency';
import { toPercentage } from '@/helpers/common/amount';
import TicketIcon from '@/assets/images/svg/Ticket';
import { SectorTicketGeneralSettingsScreen } from '@/features/registerEvent/components/SectorTicketGeneralSettingsSreen/screens';
import { SectorTicketPaymentSettingsScreen } from '@/features/registerEvent/components/SectorTicketPaymentSettingScreen/screens';
import { useParams } from 'react-router-dom';
import { useEvent } from '@/features/registerEvent/hook/useEvent';
import { formSectorTicketProps, ticketStepProps } from '../types';
import { columnsTickets } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface SectorTicketContainerProps {
  state: States;
  formSectorTicket: formSectorTicketProps;
  ticketStates: ticketStatesProps;
  ticketActions: ticketActionsProps;
  ticketStep: ticketStepProps;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  isTicket = 'isTicket',
}

export type TabSectorTicketActionsProps = {
  nextTab: () => void;
  backTab: () => void;
  onFirstTab: () => void;
  reloadTickets: () => void;
};

type UrlParams = {
  id: string;
};

export const SectorTicketContainer: React.FC<SectorTicketContainerProps> = ({
  state,
  formSectorTicket,
  ticketStates,
  ticketActions,
  ticketStep,
}) => {
  const { formData, formErrors, onChangeFormInput, isFormValid } = formSectorTicket;
  const [numberTab, setNumberTab] = useState(0);
  const titleTabRef = React.useRef<HTMLInputElement>(null);
  const params = useParams<UrlParams>();

  const { eventState, onChange: onChangeEvent } = useEvent();

  const handleNextTab = (): void => {
    if (numberTab <= contentTabs.length) {
      setNumberTab(numberTab + 1);
      ticketActions.onGetAll(params.id);
    }
  };

  const handleBackTab = (): void => {
    if (numberTab <= contentTabs.length && numberTab >= 0) {
      setNumberTab(numberTab - 1);
      ticketActions.onGetAll(params.id);
    }
  };

  const handleOnFirstTab = (): void => {
    setNumberTab(0);
    ticketActions.onGetAll(params.id);
  };

  const handleReloadTickets = (): void => {
    ticketActions.onGetAll(params.id);
  };

  const contentTabs = [
    {
      component: (
        <SectorTicketMainSettingsScreen
          ticketStates={ticketStates}
          ticketStep={ticketStep}
          nextTab={handleNextTab}
          onFirstTab={handleOnFirstTab}
          reloadTickets={handleReloadTickets}
        />
      ),
      completion: !!ticketStep?.phaseCompletion?.ticket?.mainSettings,
      title: 'Configurações principais',
    },
    {
      component: (
        <SectorTicketPaymentSettingsScreen
          ticketStates={ticketStates}
          ticketStep={ticketStep}
          nextTab={handleNextTab}
          backTab={handleBackTab}
          onFirstTab={handleOnFirstTab}
        />
      ),
      completion: !!ticketStep?.phaseCompletion?.ticket?.payment,
      title: 'Configurações de pagamento',
    },
    {
      component: (
        <SectorTicketGeneralSettingsScreen
          ticketStates={ticketStates}
          ticketStep={ticketStep}
          nextTab={handleNextTab}
          backTab={handleBackTab}
          onFirstTab={handleOnFirstTab}
        />
      ),
      completion: !!ticketStep?.phaseCompletion?.ticket?.generalSettings,
      title: 'Configurações gerais',
    },
  ];

  // focus on tab
  React.useEffect(() => {
    titleTabRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticketStates?.ticket]);

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="container-event">
          <h5 className="mb-2 border-bottom-title mb-5">Setor e ingresso</h5>
        </div>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Este evento terá ingressos?"
            name="isTicket"
            value={formData[FormInputName.isTicket]}
            onChange={e => {
              ticketActions.onHasTicket(e.target.value);
              onChangeFormInput(FormInputName.isTicket)(e.target.value);
            }}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.isTicket && formErrors.isTicket[0]}
          />
        </FormGroup>
        {formData[FormInputName.isTicket] === 'true' && (
          <>
            <hr className="mt-5" />
            <div className="mt-5">
              <SuperCollapse
                title="Setores e ingressos adicionados"
                content={
                  ticketStates?.ticketList?.length > 0
                    ? ticketStates?.ticketList?.map((ticket: Tickets, index: number) => (
                        <React.Fragment key={ticket.id}>
                          {index > 0 ? <hr style={{ margin: '25px -30px 30px -30px' }} /> : null}

                          <div
                            className={`${
                              ticketStates.ticket && ticket.id !== ticketStates.ticket?.id
                                ? 'disabled-content'
                                : ''
                            }`}
                          >
                            <div className="content-collapse-title-flex">
                              <div className="content-collapse-title-container">
                                <p className="content-collapse-title subpvd-title-name">
                                  {ticket.eventSection.name}
                                </p>
                              </div>
                            </div>
                            <React.Fragment key={index}>
                              <div className="d-flex">
                                <CustomTable
                                  columns={columnsTickets}
                                  data={ticket.batchs?.map(batch => ({
                                    name: ticket.name,
                                    batch: batch.name,
                                    commission: `${toPercentage(batch.commission)} %`,
                                    unitValue: toCurrency(batch.unitValue),
                                    totalValue: toCurrency(batch.totalValue),
                                    amount: `${batch.amount} uni`,
                                  }))}
                                  theme="secondaryWithoutBorder"
                                  progressPending={false}
                                  numberRowsPerPage={1000}
                                />
                                <div
                                  className={`d-flex m-2 ml-4 ${
                                    ticketStates.ticket ? 'disabled-content' : null
                                  }`}
                                >
                                  <Pen
                                    className="mr-4 svg-icon action-icon"
                                    onClick={() => {
                                      ticketActions.onGetById(ticket);
                                    }}
                                  />
                                  <CloseX
                                    className="mr-2 svg-icon action-icon svg-icon-trash"
                                    onClick={() => {
                                      ticketActions.onShowDelete(ticket);
                                    }}
                                  />
                                </div>
                              </div>
                            </React.Fragment>
                          </div>
                        </React.Fragment>
                      ))
                    : 'Nenhum setores e ingressos cadastrado. Aqui será exibida uma lista dos setores e ingressos.'
                }
                leftIcon={TicketIcon()}
                count={ticketStates?.ticketList?.length}
              />
            </div>
            <div ref={titleTabRef} className="mb-4 d-flex justify-content-between">
              <div>
                <p className="secondPageTitle m-0">Adicionando setor e ingresso</p>
                <span className="infoSubTitle">
                  Preencha as 3 (TRÊS) etapas abaixo para adicionar um setor e ingresso
                </span>
              </div>
              <div>
                {ticketStates?.ticket ? (
                  <Button
                    title="Cancelar"
                    theme="outlineDark"
                    onClick={() => ticketActions.onCancelEdit()}
                  />
                ) : null}
              </div>
            </div>
            <Tab numberStap={numberTab} contents={contentTabs} />
          </>
        )}
        <hr className="mt-5" />
        <div className="footer-register-event">
          <Button
            title="Voltar"
            theme="noneBorder"
            onClick={() => {
              onChangeEvent({ ...eventState, currentStep: eventState.currentStep - 1 });
            }}
          />
          {(ticketStates?.ticketList && ticketStates?.ticketList?.length > 0) ||
          formData[FormInputName.isTicket] === 'false' ? (
            <Button
              title="Avançar para Setor e produto"
              onClick={() => {
                if (isFormValid()) {
                  onChangeEvent({ ...eventState, currentStep: eventState.currentStep + 1 });
                }
              }}
            />
          ) : null}
        </div>
      </Container>
    </Fragment>
  );
};
