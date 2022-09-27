/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Container, Label } from 'reactstrap';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRow {
  id: string;
  name: string;
  serial: string;
  actions: string;
  status: number;
  date: string;
  currentPdv: string;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  pos = 'pos',
}

interface PosContainerProps {
  state: States;
}

export const HomeContainer: React.FC<PosContainerProps> = ({ state }) => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
        <div className="pageTitle" style={{ display: 'grid' }}>
          <Label className="pageTitle">Produtos e Combos</Label>
          <Label className="fieldLabel">Escolha o que você deseja visualizar</Label>
        </div>
      </div>
    </Container>
  </Fragment>
);
