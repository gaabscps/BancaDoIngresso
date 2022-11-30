/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment, useState } from 'react';
import { ButtonGroup, Loading, Tab } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { SectorProductComboScreen } from '@/features/registerEvent/components/SectorProductCombo/screens';
import { SectorProductGroupScreen } from '@/features/registerEvent/components/SectorProductGroup/screens';
import { SectorProductScreen } from '@/features/registerEvent/components/SectorProductScreen/screens';
import { SectorProductConfigSectorScreen } from '@/features/registerEvent/components/SectorProductConfigSectorSreen/screens';
import { SectorPosScreen } from '@/features/registerEvent/components/SectorPosScreen/screens';
import { formSectorProductProps } from '../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface SectorProductContainerProps {
  state: States;
  formSectorProduct: formSectorProductProps;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  isProduct = 'isProduct',
}

export type TabSectorProductActionsProps = {
  nextTab: () => void;
  backTab: () => void;
  onFirstTab: () => void;
};

export const SectorProductContainer: React.FC<SectorProductContainerProps> = ({
  state,
  formSectorProduct,
}) => {
  const { formData, formErrors, onChangeFormInput } = formSectorProduct;
  const [numberTab, setNumberTab] = useState(0);

  const handleNextTab = (): void => {
    if (numberTab <= contentTabs.length) {
      setNumberTab(numberTab + 1);
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
    <SectorProductGroupScreen nextTab={handleNextTab} />,
    <SectorProductScreen
      nextTab={handleNextTab}
      backTab={handleBackTab}
      onFirstTab={handleOnFirstTab}
    />,
    <SectorProductComboScreen
      nextTab={handleNextTab}
      backTab={handleBackTab}
      onFirstTab={handleOnFirstTab}
    />,
    <SectorProductConfigSectorScreen nextTab={handleNextTab} backTab={handleBackTab} />,
    <SectorPosScreen nextTab={handleNextTab} backTab={handleBackTab} />,
  ];
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
        <hr className="mt-5" />
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
              contents={contentTabs}
              numberStap={numberTab}
            />
          </>
        )}
      </Container>
    </Fragment>
  );
};
