/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Container, Label } from 'reactstrap';
import './style.scss';
import { ReactComponent as Products } from '@/assets/images/svg/Products.svg';
import { ReactComponent as Combos } from '@/assets/images/svg/Combos.svg';
import { ReactComponent as ProductCombo } from '@/assets/images/svg/ProductCombo.svg';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface HomeContainerProps {
  state: States;
}

export const HomeContainer: React.FC<HomeContainerProps> = ({ state }) => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column mb-4">
          <h5>Produtos e Combos</h5>
          <Label className="fieldLabel">Escolha o que você deseja visualizar</Label>
        </div>
      </div>
      <div className="father-cards">
        <Link to={'#!'}>
          <Products width={20} />
          Produtos
        </Link>
        <Link to={'#!'}>
          <Combos width={20} />
          Combos
        </Link>
        <Link to={'#!'}>
          <ProductCombo width={20} />
          Grupos e subgrupos de produtos
        </Link>
      </div>
    </Container>
  </Fragment>
);
