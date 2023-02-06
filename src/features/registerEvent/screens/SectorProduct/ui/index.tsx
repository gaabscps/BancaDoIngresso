/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment, useState } from 'react';
import { Button, ButtonGroup, Loading, Tab } from '@/components';
import { Container, FormGroup } from 'reactstrap';
import { SectorProductComboScreen } from '@/features/registerEvent/components/SectorProductCombo/screens';
import { SectorProductGroupScreen } from '@/features/registerEvent/components/SectorProductGroup/screens';
import { SectorProductScreen } from '@/features/registerEvent/components/SectorProductScreen/screens';
import { SectorProductConfigSectorScreen } from '@/features/registerEvent/components/SectorProductConfigSectorSreen/screens';
import { SectorPosScreen } from '@/features/registerEvent/components/SectorPosScreen/screens';
import { toast } from 'react-toastify';
import EventPhaseCompletion from '@/model/EventPhaseCompletion';
import { formSectorProductProps } from '../types';
import { controllerEventProps } from '../../SectorTicket/types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface SectorProductContainerProps {
  state: States;
  formSectorProduct: formSectorProductProps;
  controllerEvent: controllerEventProps;
  phaseCompletion: EventPhaseCompletion | undefined;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  isProduct = 'isProduct',
}

export type TabSectorProductActionsProps = {
  nextTab: () => void;
  backTab: () => void;
  onFirstTab: () => void;
  controllerEvent: controllerEventProps;
};

export const SectorProductContainer: React.FC<SectorProductContainerProps> = ({
  state,
  formSectorProduct,
  controllerEvent,
  phaseCompletion,
}) => {
  const { formData, formErrors, onChangeFormInput } = formSectorProduct;
  const [numberTab, setNumberTab] = useState(0);

  const { eventState, onChangeEvent, lastStep } = controllerEvent;

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
    {
      component: (
        <SectorProductGroupScreen nextTab={handleNextTab} controllerEvent={controllerEvent} />
      ),
      completion: !!phaseCompletion?.sectionProduct?.group,
      title: 'Cadastro de grupos',
    },
    {
      component: (
        <SectorProductScreen
          controllerEvent={controllerEvent}
          nextTab={handleNextTab}
          backTab={handleBackTab}
          onFirstTab={handleOnFirstTab}
        />
      ),
      completion: !!phaseCompletion?.sectionProduct?.product,
      title: 'Cadastro de produtos',
    },
    {
      component: (
        <SectorProductComboScreen
          nextTab={handleNextTab}
          backTab={handleBackTab}
          onFirstTab={handleOnFirstTab}
          controllerEvent={controllerEvent}
        />
      ),
      completion: !!phaseCompletion?.sectionProduct?.combo,
      title: 'Cadastro de combos',
    },
    {
      component: (
        <SectorProductConfigSectorScreen
          nextTab={handleNextTab}
          backTab={handleBackTab}
          controllerEvent={controllerEvent}
        />
      ),
      completion: !!phaseCompletion?.sectionProduct?.section,
      title: 'Configs de setores',
    },
    {
      component: (
        <SectorPosScreen
          nextTab={handleNextTab}
          backTab={handleBackTab}
          controllerEvent={controllerEvent}
        />
      ),
      completion: !!phaseCompletion?.sectionProduct?.pos,
      title: 'Configurações de POS',
    },
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
            <div className="mt-5 mb-4">
              <p className="secondPageTitle m-0">Adicionando setor e produto</p>
              <span className="infoSubTitle mb-3">
                Preencha as 5 (CINCO) etapas abaixo para adicionar um setor e produto
              </span>
            </div>

            <Tab contents={contentTabs} numberStap={numberTab} />
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
          {numberTab === 4 || formData[FormInputName.isProduct] === 'false' ? (
            <Button
              title="Avançar para PDV"
              onClick={() => {
                if (lastStep && lastStep.length > 0) {
                  onChangeEvent({ ...eventState, currentStep: eventState.currentStep + 1 });
                } else {
                  toast.error('Preencha todas as etapas para avançar para o próximo passo');
                }
              }}
            />
          ) : null}
        </div>
      </Container>
    </Fragment>
  );
};
