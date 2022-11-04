/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Container } from 'reactstrap';
import { formGeneralInformationProps } from '@/features/registerEvent/types';
import './styles.scss';
import { GeneralInformationContent } from '@/features/registerEvent/component/GeneralInformationContent';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface GeneralInformationContainerProps {
  state: States;
  formGeneralInformation: formGeneralInformationProps;
}

export const GeneralInformationContainer: React.FC<GeneralInformationContainerProps> = ({
  state,
  formGeneralInformation,
}) => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      <GeneralInformationContent state={state} formGeneralInformation={formGeneralInformation} />
    </Container>
  </Fragment>
);
