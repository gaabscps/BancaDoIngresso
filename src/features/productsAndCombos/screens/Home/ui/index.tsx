/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Container } from 'reactstrap';
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
        <div className="d-flex flex-column mb-5">
          <div className="pageTitle" style={{ margin: '0' }}>
            <span>Produtos e Combos</span>
          </div>
          <span className="subTitleMain" style={{ marginTop: '10px' }}>
            Escolha o que você deseja visualizar
          </span>
        </div>
      </div>
      <div className="father-cards">
        <Link to={`${process.env.PUBLIC_URL}/dashboard/productscombos/product`}>
          <Products width={20} />
          Produtos
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/dashboard/productscombos/combo`}>
          <Combos width={20} />
          Combos
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/dashboard/productscombos/groupsubgroupproduct`}>
          <ProductCombo width={20} />
          Grupos e subgrupos de produtos
        </Link>
      </div>
    </Container>
  </Fragment>
);
