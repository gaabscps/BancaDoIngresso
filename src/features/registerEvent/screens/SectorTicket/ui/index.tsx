/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, Loading, Tab } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { SectorTicketMainSettingsScreen } from '@/features/registerEvent/components/SectorTicketMainSettingsSreen/screens';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import UserIcon from '@/assets/images/svg/User';
import { formSectorTicketProps } from '../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorTicketContainerProps {
  state: States;
  formSectorTicket: formSectorTicketProps;
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
        {formData[FormInputName.isTicket] === 'true' && (
          <>
            <div className="mt-5">
              <SuperCollapse
                title="Setores e ingressos adicionados"
                content="Nenhum setor e ingresso foi adicionado. Aqui será exibida uma lista dos seus setores e ingressos adicionados."
                leftIcon={UserIcon}
                count={1}
              />
            </div>
            <div className="mb-4">
              <p className="secondPageTitle m-0">Adicionando setor e ingresso</p>
              <span className="infoSubTitle">
                Preencha as 3 (TRÊS) etapas abaixo para adicionar um setor e ingresso
              </span>
            </div>

            <Tab
              titles={[
                'Configurações principais',
                'Configurações de pagamento',
                'Configurações gerais',
              ]}
              contents={[
                <>
                  <SectorTicketMainSettingsScreen />
                </>,
                'Conteudo 2',
                'Conteudo 3',
              ]}
            />
          </>
        )}
      </Container>
    </Fragment>
  );
};
