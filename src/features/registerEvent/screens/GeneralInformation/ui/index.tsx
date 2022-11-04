/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */ import React, { Fragment } from 'react';
import { Dialog, Loading } from '@/components';
import { Container } from 'reactstrap';
import {
  categoryActionProps,
  categoryStatesProps,
  formCategoryProps,
  formGeneralInformationProps,
  modalConfigProps,
} from '@/features/registerEvent/types';
import './styles.scss';
import { GeneralInformationContent } from '@/features/registerEvent/component/GeneralInformationContent';
import { ActionProps } from '@/components/Dialog';
import { RegisterCategoryContent } from '@/features/registerEvent/component/RegisterCategoryContent';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  category = 'category',
}

export interface GeneralInformationContainerProps {
  state: States;
  formGeneralInformation: formGeneralInformationProps;
  formCategory: formCategoryProps;
  modalConfig: modalConfigProps;
  categoryStates: categoryStatesProps;
  categoryActions: categoryActionProps;
}

export const GeneralInformationContainer: React.FC<GeneralInformationContainerProps> = ({
  state,
  formGeneralInformation,
  formCategory,
  modalConfig,
  categoryStates,
  categoryActions,
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
        position={'center'}
        isContentWithCard
        actions={[
          {
            [ShouldShowModal.category]: renderActionDialogToCancel,
          }[modalConfig.shouldShowModal],
          {
            [ShouldShowModal.category]: {
              title: categoryStates?.category ? 'Salvar' : 'Cadastrar nova empresa',
              // title: 'Cadastrar nova empresa',
              onClick: (): Promise<void> => categoryActions.onSaveGroupProduct(),
            },
          }[modalConfig.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.category]: <RegisterCategoryContent formCategory={formCategory} />,
          }[modalConfig.shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <GeneralInformationContent
          state={state}
          formGeneralInformation={formGeneralInformation}
          modalConfig={modalConfig}
          categoryStates={categoryStates}
          categoryActions={categoryActions}
        />
      </Container>
    </Fragment>
  );
};
