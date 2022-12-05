/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Fragment, useState } from 'react';
import { ButtonGroup, Loading, Tab } from '@/components';
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
import { PdvEventPosScreen } from '@/features/registerEvent/components/PdvEventPosScreen/screens';
import { PdvProductScreen } from '@/features/registerEvent/components/PdvProductsScreen/screens';
import { PdvEventSubPdvScreen } from '@/features/registerEvent/components/PdvEventSubPdvScreen/screens';
import ReactTooltip from 'react-tooltip';
import { columnsEventPdv } from './table';
import TicketIcon from '../../../../../assets/images/svg/Ticket';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface PdvContainerProps {
  state: States;
  formPdv: formPdvProductProps;
  formMainPdv: formMainPdvProductProps;
  mainPdvActions: mainPdvActionsProps;
  mainPdvStates: mainPdvStatesProps;
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
  formPdv,
  formMainPdv,
  mainPdvActions,
  mainPdvStates,
}) => {
  const { formData, formErrors, onChangeFormInput } = formPdv;
  const [numberTab, setNumberTab] = useState(1);

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

  const listDiscountCoupon = [
    {
      id: '1',
      pos: 'Máquininha do seu Zé ',
      users: 'José123, Fernando456',
    },
  ];

  const contentTabs = [
    'Conteudo 1',
    <>
      <PdvEventPosScreen nextTab={handleNextTab} backTab={handleBackTab} />
    </>,
    <>
      <PdvProductScreen nextTab={handleNextTab} backTab={handleBackTab} />
    </>,
    'Conteudo 4',
    <>
      <PdvEventSubPdvScreen backTab={handleBackTab} firstTab={handleOnFirstTab} />
    </>,
  ];
  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="container-event">
          <h5 className="mb-2 border-bottom-title mb-5">Pdv</h5>
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
            name="isProduct"
            value={formData[FormInputName.isPdv]}
            onChange={e => onChangeFormInput(FormInputName.isPdv)(e.target.value)}
            options={[
              { value: true, label: 'Sim' },
              { value: false, label: 'Não' },
            ]}
            error={formErrors.isPdv && formErrors.isPdv[0]}
          />
          <ReactTooltip id="pdvInfo" effect="solid" place={'right'} border={true} type={'light'}>
            Comece escolhendo o PDV que você quer adicionar ao evento.
          </ReactTooltip>
        </FormGroup>
        <hr className="mt-5" />
        {formData[FormInputName.isPdv] === 'true' && (
          <>
            <div className="container-event">
              <MainPdvContent
                formMainPdv={formMainPdv}
                mainPdvActions={mainPdvActions}
                mainPdvStates={mainPdvStates}
              />
            </div>
            <hr className="mt-5 mb-5" />
            <SuperCollapse
              title={`PDV’s adicionados`}
              content={
                listDiscountCoupon.length > 0 ? (
                  listDiscountCoupon.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="mb-5">
                        <span className="secondary-table-title">PDV #{index + 1}</span>
                        <span className="secondary-table-title font-weight-bold">
                          <b> ·</b> Loginha do Zé
                        </span>
                      </div>
                      <CustomTable
                        numberRowsPerPage={0}
                        progressPending={false}
                        columns={columnsEventPdv}
                        data={[
                          {
                            id: item.id,
                            pos: item.pos,
                            users: item.users,
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
                                        onClick={(): void => mainPdvActions.onGet(item as any)}
                                      />
                                      <Trash
                                        className="svg-icon svg-icon-trash"
                                        onClick={() => {
                                          mainPdvActions.onShowModalDelete(item as any);
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
                  <span>Nenhum cupom de desconto adicionado</span>
                )
              }
              count={1}
              leftIcon={TicketIcon}
              buttonTitle="Cancelar edição"
              buttonAction={() => mainPdvActions.onCancelEdit()}
              showButtonOnTitle={!!mainPdvStates?.mainPdv}
            />
            <Tab
              titles={[
                'Ingressos por PDV',
                'Inserir POS',
                'Inserir produtos',
                'Inserir usuários',
                'Cadastrar Sub PDV’s',
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
