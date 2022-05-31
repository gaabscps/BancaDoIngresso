import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Label,
  FormGroup,
  Button,
  ButtonGroup,
} from "reactstrap";
import SuperButton from "../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  const history = useHistory();

  const nextStep = () => {
    history.push("/pdv");
  };
  const goBack = () => {
    history.goBack();
  };

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="pageTitle">Setor e Produto</div>
        <div className="groupButton">
          <Label className="fieldLabel">Este evento terá produtos?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="pageSubTitle">Adicionando setor e produto</div>
        <div className="infoSubTitle">
          Preencha os campos abaixo para adicionar um setor e produto
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">
            Esse produto faz parte de um combo?
          </Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSearch">
            Combo
          </Label>
          <SuperInput
            id="exampleSearch"
            name="search"
            placeholder="Digite ou selecione o cambor"
            type="search"
          />
        </FormGroup>
        <div className="groupButton">
          <Label className="fieldLabel">
            Impressão da ficha por Item ou Total?
          </Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir cortesia?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSearch">
            Nome do setor
          </Label>
          <SuperInput
            id="exampleSearch"
            name="search"
            placeholder="Digite ou selecione o nome do setor"
            type="search"
          />
        </FormGroup>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSearch">
            Nome do produto
          </Label>
          <SuperInput
            id="exampleSearch"
            name="search"
            placeholder="Digite ou selecione o tipo o nome do produto"
            type="search"
          />
        </FormGroup>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSearch">
            Grupo do produto
          </Label>
          <SuperInput
            id="exampleSearch"
            name="search"
            placeholder="Digite ou selecione o grupo do produto"
            type="search"
          />
        </FormGroup>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSearch">
            Subgrupo do produto
          </Label>
          <SuperInput
            id="exampleSearch"
            name="search"
            placeholder="Digite ou selecione o subgrupo do produto"
            type="search"
          />
        </FormGroup>
        <div className="d-flex">
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDateNumber">
              Quantidade
            </Label>
            <SuperInput
              style={{ width: "243px" }}
              id="exampleNumber"
              name="text"
              placeholder="Ex: 200"
              type="text"
            />
          </FormGroup>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDateNumber">
              Valor unitário
            </Label>
            <SuperInput
              style={{ width: "243px" }}
              id="exampleNumber"
              name="number"
              placeholder="Ex 20,00 R$"
              type="number"
            />
          </FormGroup>
        </div>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleDateNumber">
            Valor total
          </Label>
          <SuperInput
            style={{ width: "243px" }}
            id="exampleNumber"
            name="text"
            placeholder="R$ 200,00"
            type="text"
          />
        </FormGroup>
        <div>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleFile" sm={2}>
              Imagem do produto (opcional)
            </Label>
            <Col sm={10}>
              <SuperInput
                id="exampleFile"
                placeholder="Nenhum arquivo selecionado"
                name="file"
                type="file"
              />
            </Col>
          </FormGroup>
        </div>
        <div className="secondPageTitle">Taxas de cartão</div>
        <div className="pageSubTitle">Venda física</div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir venda com cartão?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Débito
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Crédito
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            PIX
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Taxa administrativa
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <div>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Qtd parcelas
            </Label>
            <SuperInput
              style={{ width: "135px" }}
              id="exampleNumber"
              name="number"
              placeholder="Ex: 2"
              type="number"
            />
          </FormGroup>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Juros ao mês
            </Label>
            <SuperInput
              style={{ width: "135px" }}
              id="exampleNumber"
              name="number"
              placeholder="Ex: 2%"
              type="number"
            />
          </FormGroup>
        </div>
        <div className="pageSubTitle">Venda e-commerce</div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir venda com cartão?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Débito
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Crédito
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            PIX
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Taxa administrativa
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <div>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Qtd parcelas
            </Label>
            <SuperInput
              style={{ width: "135px" }}
              id="exampleNumber"
              name="number"
              placeholder="Ex: 2"
              type="number"
            />
          </FormGroup>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Juros ao mês
            </Label>
            <SuperInput
              style={{ width: "135px" }}
              id="exampleNumber"
              name="number"
              placeholder="Ex: 2%"
              type="number"
            />
          </FormGroup>
        </div>
        <div className="pageSubTitle">Informações complementares</div>
        <FormGroup className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Porcentagem do Garçom (%)
          </Label>
          <SuperInput
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <div className="groupButton">
          <Label className="fieldLabel">Pagamento parcial(rateio)?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir código de desconto?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="nextPageButton">
        <SuperButton
            onClick={goBack}
          >
            Voltar
          </SuperButton>
          <SuperButton onClick={nextStep}>Avançar para PDV</SuperButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
