/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */ import React, { Fragment } from 'react';
import { Dialog, Loading } from '@/components';
import { Container } from 'reactstrap';
import {
  categoryActionProps,
  categoryStatesProps,
  contractorStatesProps,
  fatherEventActionProps,
  fatherEventStatesProps,
  formCategoryProps,
  formFatherEventProps,
  formGeneralInformationProps,
  GeneralInformaitionActionProps,
  modalConfigProps,
} from '@/features/registerEvent/types';
import './styles.scss';
import { GeneralInformationContent } from '@/features/registerEvent/component/GeneralInformationContent';
import { ActionProps } from '@/components/Dialog';
import { RegisterCategoryContent } from '@/features/registerEvent/component/RegisterCategoryContent';
import { RegisterFatherEventContent } from '@/features/registerEvent/component/RegisterFatherEvent';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  category = 'category',
  fatherEvent = 'fatherEvent',
}

export interface GeneralInformationContainerProps {
  state: States;
  formGeneralInformation: formGeneralInformationProps;
  formCategory: formCategoryProps;
  formFatherEvent: formFatherEventProps;
  modalConfig: modalConfigProps;
  GeneralInformationActions: GeneralInformaitionActionProps;
  categoryStates: categoryStatesProps;
  categoryActions: categoryActionProps;
  fatherEventStates: fatherEventStatesProps;
  fatherEventActions: fatherEventActionProps;
  contractorState: contractorStatesProps;
}

export const GeneralInformationContainer: React.FC<GeneralInformationContainerProps> = ({
  state,
  formGeneralInformation,
  formCategory,
  formFatherEvent,
  modalConfig,
  GeneralInformationActions,
  categoryStates,
  categoryActions,
  fatherEventStates,
  fatherEventActions,
  contractorState,
}) => {
  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => modalConfig.onToggle(),
    theme: 'noneBorder',
  };
  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={modalConfig.title}
        visible={modalConfig.visible}
        onClose={modalConfig.onToggle}
        isContentWithCard
        actions={[
          {
            [ShouldShowModal.category]: renderActionDialogToCancel,
            [ShouldShowModal.fatherEvent]: renderActionDialogToCancel,
          }[modalConfig.shouldShowModal],
          {
            [ShouldShowModal.category]: {
              title: categoryStates?.category ? 'Salvar' : 'Cadastrar nova empresa',
              // title: 'Cadastrar nova empresa',
              onClick: (): Promise<void> => categoryActions.onSave(),
            },
            [ShouldShowModal.fatherEvent]: {
              title: fatherEventStates?.fatherEvent ? 'Salvar' : 'Vincular evento Pai',
              // title: 'Cadastrar nova empresa',
              onClick: (): Promise<void> => fatherEventActions.onSave(),
            },
          }[modalConfig.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.category]: <RegisterCategoryContent formCategory={formCategory} />,
            [ShouldShowModal.fatherEvent]: (
              <RegisterFatherEventContent
                formFatherEvent={formFatherEvent}
                fatherEventStates={fatherEventStates}
              />
            ),
          }[modalConfig.shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <GeneralInformationContent
          state={state}
          formGeneralInformation={formGeneralInformation}
          modalConfig={modalConfig}
          GeneralInformationActions={GeneralInformationActions}
          categoryStates={categoryStates}
          categoryActions={categoryActions}
          fatherEventStates={fatherEventStates}
          fatherEventActions={fatherEventActions}
          contractorState={contractorState}
        />
      </Container>
    </Fragment>
  );
};
