/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment, useState } from 'react';
import { ButtonGroup, Loading, Tab } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { SectorTicketMainSettingsScreen } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { CustomTable } from '@/components/Table';
import { ReactComponent as CloseX } from '@/assets/images/svg/closeX.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import Ticket from '@/model/Ticket';
import {
  ticketActionsProps,
  ticketStatesProps,
} from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/types';
import TicketIcon from '@/assets/images/svg/Ticket';
import { SectorTicketGeneralSettingsScreen } from '@/features/registerEvent/components/SectorTicketGeneralSettingsSreen/screens';
import { SectorTicketPaymentSettingsScreen } from '@/features/registerEvent/components/SectorTicketPaymentSettingScreen/screens';
import { formSectorTicketProps } from '../types';
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
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  isTicket = 'isTicket',
}

export type TabSectorTicketActionsProps = {
  nextTab: () => void;
  backTab: () => void;
  onFirstTab: () => void;
};

export const SectorTicketContainer: React.FC<SectorTicketContainerProps> = ({
  state,
  formSectorTicket,
  ticketStates,
  ticketActions,
}) => {
  const { formData, formErrors, onChangeFormInput } = formSectorTicket;
  const [numberTab, setNumberTab] = useState(0);

  const handleNextTab = (): void => {
    if (numberTab <= contentTabs.length) {
      setNumberTab(numberTab + 1);
    }
  };

  const handleBackTab = (): void => {
    if (numberTab >= contentTabs.length) {
      setNumberTab(numberTab - 1);
    }
  };

  const handleOnFirstTab = (): void => {
    setNumberTab(0);
  };

  const contentTabs = [
    <>
      <SectorTicketMainSettingsScreen
        ticketStates={ticketStates}
        nextTab={handleNextTab}
        onFirstTab={handleOnFirstTab}
      />
    </>,
    <>
      <SectorTicketPaymentSettingsScreen
        ticketStates={ticketStates}
        nextTab={handleNextTab}
        backTab={handleBackTab}
        onFirstTab={handleOnFirstTab}
      />
      ,
    </>,
    <>
      <SectorTicketGeneralSettingsScreen
        ticketStates={ticketStates}
        nextTab={handleNextTab}
        backTab={handleBackTab}
        onFirstTab={handleOnFirstTab}
      />
    </>,
  ];

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
            onChange={e => onChangeFormInput(FormInputName.isTicket)(e.target.value)}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.isTicket && formErrors.isTicket[0]}
          />
        </FormGroup>
        <hr />
        {formData[FormInputName.isTicket] === 'true' && (
          <>
            <div className="mt-5">
              <SuperCollapse
                title="Setores e ingressos adicionados"
                content={
                  ticketStates?.ticketList?.length > 0
                    ? ticketStates?.ticketList?.map((ticket: Ticket, index: number) => (
                        <React.Fragment key={ticket.id}>
                          {index > 0 ? <hr style={{ margin: '25px -30px 30px -50px' }} /> : null}

                          <div>
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
                                    commission: batch.commission,
                                    unitValue: (+batch.unitValue).toLocaleString('pt-br', {
                                      style: 'currency',
                                      currency: 'BRL',
                                    }),
                                    totalValue: (+batch.amount * +batch.unitValue).toLocaleString(
                                      'pt-br',
                                      {
                                        style: 'currency',
                                        currency: 'BRL',
                                      },
                                    ),
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
                                      ticketActions.onGet(ticket);
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
                    : 'Nenhum lote cadastrado. Aqui será exibida uma lista dos lotes cadastrados.'
                }
                leftIcon={TicketIcon}
                count={ticketStates?.ticketList?.length}
                buttonTitle="Cancelar edição"
                buttonAction={ticketActions.onCancelEdit}
                showButtonOnTitle={!!ticketStates?.ticket}
              />
            </div>
            <div className="mb-4">
              <p className="secondPageTitle m-0">Adicionando setor e ingresso</p>
              <span className="infoSubTitle">
                Preencha as 3 (TRÊS) etapas abaixo para adicionar um setor e ingresso
              </span>
            </div>

            <Tab
              numberStap={numberTab}
              titles={[
                'Configurações principais',
                'Configurações de pagamento',
                'Configurações gerais',
              ]}
              contents={contentTabs}
            />
          </>
        )}
      </Container>
    </Fragment>
  );
};
