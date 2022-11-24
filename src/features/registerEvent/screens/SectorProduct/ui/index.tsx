/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { ButtonGroup, Loading, Tab } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { SectorProductGroupScreen } from '@/features/registerEvent/components/SectorProductGroup/screens';
import { formSectorProductProps } from '../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorProductContainerProps {
  state: States;
  formSectorTicket: formSectorProductProps;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  isProduct = 'isProduct',
}

export const SectorProductContainer: React.FC<SectorProductContainerProps> = ({
  state,
  formSectorTicket,
}) => {
  const { formData, formErrors, onChangeFormInput } = formSectorTicket;
  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="container-event">
          <h5 className="mb-2 border-bottom-title mb-5">Setor e Produto</h5>
        </div>
        <FormGroup className="mb-2">
          <ButtonGroup
            label="Este evento terá produtos?"
            name="isProduct"
            value={formData[FormInputName.isProduct]}
            onChange={e => onChangeFormInput(FormInputName.isProduct)(e.target.value)}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.isProduct && formErrors.isProduct[0]}
          />
        </FormGroup>
        <hr />
        {formData[FormInputName.isProduct] === 'true' && (
          <>
            <p className="secondPageTitle m-0">Adicionando setor e produto</p>
            <span className="infoSubTitle mb-3">
              Preencha as 5 (CINCO) etapas abaixo para adicionar um setor e produto
            </span>

            <Tab
              titles={[
                'Cadastro de grupos',
                'Cadastro de produtos',
                'Cadastro de combos',
                'Configs de setores',
                'Configurações de POS',
              ]}
              contents={[
                <>
                  <SectorProductGroupScreen />
                </>,
                'Conteudo 2',
                'Conteudo 3',
                'Conteudo 4',
                'Conteudo 5',
              ]}
              numberStap={0}
            />
          </>
        )}
      </Container>
    </Fragment>
  );
};
