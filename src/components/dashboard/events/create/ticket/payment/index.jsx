import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  FormGroup,
  Label,
  ButtonGroup,
  Button,
} from "reactstrap";
import SuperButton from "../../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <div className="fieldSpacing">
          <Label className="fieldLabel">Gateway Pagamento POS</Label>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Paypal</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Pagseguro</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Picpay</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Rico</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Ricopay</Label>
          </FormGroup>
        </div>
        <div className="fieldSpacing">
          <Label className="fieldLabel">Gateway Pagamento SITE</Label>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Paypal</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Pagseguro</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Picpay</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Rico</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Ricopay</Label>
          </FormGroup>
        </div>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSelect">
            Limite de parcelamento online
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            placeholder="0"
            id="exampleSelect"
            name="select"
            type="select"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </SuperInput>
        </FormGroup>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSelect">
            Limite de parcelamento POS
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            placeholder="0"
            id="exampleSelect"
            name="select"
            type="select"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </SuperInput>
        </FormGroup>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir pagamento fracionado?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir taxa variavel?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir valor variavel?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">
             Permitir pagamento por aproximação?
          </Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir vender online?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir vender na POS?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Imprimir recibo (POS)?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
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
        <FormGroup  className="fieldSpacing">
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
        <FormGroup  className="fieldSpacing">
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
        <FormGroup  className="fieldSpacing">
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
        <FormGroup  className="fieldSpacing">
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
          <FormGroup  className="fieldSpacing">
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
          <FormGroup  className="fieldSpacing">
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
        <FormGroup  className="fieldSpacing">
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
        <FormGroup  className="fieldSpacing">
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
        <FormGroup  className="fieldSpacing">
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
        <FormGroup  className="fieldSpacing">
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
          <FormGroup  className="fieldSpacing">
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
          <FormGroup  className="fieldSpacing">
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
        <div className="pageSubTitle">Cupons e descontos</div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir desconto?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir cupom de desconto?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
