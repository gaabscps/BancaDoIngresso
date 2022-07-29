import React, { Fragment } from 'react';
import { Container, FormGroup, Label } from 'reactstrap';
import ProductIcon from '../../../../../../assets/images/svg/Product';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';

import SuperInput from '../../../../../sharedComponents/SuperInput';

const Sample = (): JSX.Element => (
  <Fragment>
    <Container className="subContainer" fluid={true}>
      <hr className="divider" />
      <div className="secondPageTitle" style={{ marginTop: '50px', marginBottom: '30px' }}>
        Cadastrando produtos
      </div>
      <div className="whiteContainer">
        <FormGroup>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="groupName">
              Grupo do produto
            </Label>
            <SuperInput
              id="groupName"
              name="groupName"
              placeholder="Digite ou selecione o grupo do produto"
            />
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="subgroupName">
              Subgrupo do produto
            </Label>
            <SuperInput
              id="subgroupName"
              name="subgroupName"
              placeholder="Digite ou selecione o subgrupo do produto"
            />
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="productGroupName">
              Nome do produto
            </Label>
            <SuperInput
              id="productGroupName"
              name="productGroupName"
              placeholder="Digite  o nome do grupo"
            />
          </div>
          <div className="d-flex pt-2">
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="amount">
                Quantidade
              </Label>
              <SuperInput
                //style={{ width: '243px' }}
                id="amount"
                name="amount"
                placeholder="Ex: 200"
                type="number"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="unitValue">
                Valor unitário
              </Label>
              <SuperInput
                style={{ width: '232px' }}
                id="unitValue"
                name="unitValue"
                placeholder="Ex: 20,00"
                type="number"
              />
            </div>
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="totalValue">
              Valor total
            </Label>
            <SuperInput
              style={{ width: '232px' }}
              id="totalValue"
              name="totalValue"
              placeholder="R$ 200,00"
              type="number"
            />
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="imageBase64">
              Imagem do produto (opcional)
            </Label>
            <SuperInput
              id="imageBase64"
              placeholder="Nenhum arquivo selecionado"
              name="imageBase64"
              type="file"
            />
          </div>
        </FormGroup>
        <div className="nextPageButton">
          <div className="auxSucessText" style={{ paddingTop: '20px' }}>
            + cadastrar produto
          </div>
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <SuperCollapse
          title="Produtos cadastrados"
          content="Nenhum produto foi cadastrado. Aqui será exibida uma lista dos seus produtos cadastrados"
          leftIcon={ProductIcon}
        />
      </div>
    </Container>
  </Fragment>
);

export default Sample;
