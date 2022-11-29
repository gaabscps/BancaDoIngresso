/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, Loading, Tab } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { MainPdvContent } from '@/features/registerEvent/components/MainPdvContent';
// import { formPdvProps } from '../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface PdvContainerProps {
  state: States;
  formPdv: any;
  formMainPdv: any;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  isPdv = 'isPdv',
}

export type TabPdvActionsProps = {
  nextTab: () => void;
  backTab: () => void;
  onFirstTab: () => void;
};

export const PdvEventContainer: React.FC<PdvContainerProps> = ({ state, formPdv, formMainPdv }) => {
  const { formData, formErrors, onChangeFormInput } = formPdv;

  const contentTabs = ['Conteudo 1', 'Conteudo 2', 'Conteudo 3', 'Conteudo 4', 'Conteudo 5'];
  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="container-event">
          <h5 className="mb-2 border-bottom-title mb-5">Setor e Produto</h5>
        </div>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Permitir PDV?"
            name="isProduct"
            value={formData[FormInputName.isPdv]}
            onChange={e => onChangeFormInput(FormInputName.isPdv)(e.target.value)}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.isPdv && formErrors.isPdv[0]}
          />
        </FormGroup>
        <hr className="mt-5" />
        {formData[FormInputName.isPdv] === 'true' && (
          <>
            <MainPdvContent formMainPdv={formMainPdv} />
            <Tab
              titles={[
                'Cadastro de grupos',
                'Cadastro de produtos',
                'Cadastro de combos',
                'Configs de setores',
                'Configurações de POS',
              ]}
              contents={contentTabs}
              numberStap={0}
            />
          </>
        )}
      </Container>
    </Fragment>
  );
};
