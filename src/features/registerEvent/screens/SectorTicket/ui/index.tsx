/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, Loading, Tab } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { SectorTicketMainSettingsScreen } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorTicketContainerProps {
  state: States;
  formSectorTicket: any;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  isTicket = 'isTicket',
}

export const SectorTicketContainer: React.FC<SectorTicketContainerProps> = ({
  state,
  formSectorTicket,
}) => {
  const { formData, formErrors, onChangeFormInput } = formSectorTicket;
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
        <p className="secondPageTitle m-0">Adicionando setor e ingresso</p>
        <span className="infoSubTitle mb-3">
          Preencha as 3 (TRÊS) etapas abaixo para adicionar um setor e ingresso
        </span>
        <Tab
          titles={[
            'Configurações principais',
            'Configurações de pagamento',
            'Configurações gerais',
          ]}
          contents={[<SectorTicketMainSettingsScreen />, 'Conteudo 2', 'Conteudo 3']}
        />
      </Container>
    </Fragment>
  );
};
