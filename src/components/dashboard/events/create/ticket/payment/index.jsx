import React, { Fragment, useEffect, useState } from "react";
import { Container, Input, FormGroup, Label } from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import SuperButton from "../../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="divider" />
        <FormGroup>
          <div className="fieldSpacing">
            <Label className="fieldLabel">Gateway Pagamento POS</Label>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Paypal
              </Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Pagseguro
              </Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Picpay
              </Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Rico
              </Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Ricopay
              </Label>
            </div>
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel">Gateway Pagamento SITE</Label>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Paypal
              </Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Pagseguro
              </Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Picpay
              </Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Rico
              </Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">
                Ricopay
              </Label>
            </div>
          </div>
          <div className="fieldSpacing">
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
          </div>
          <div className="fieldSpacing">
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
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir pagamento fracionado?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir taxa variavel?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir valor variavel?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">
              Permitir pagamento por aproximação?
            </Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir vender online?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir vender na POS?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Imprimir recibo (POS)?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="secondPageTitle">Taxas de cartão</div>
          <div className="pageSubTitle">Venda física</div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir venda com cartão?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="fieldSpacing">
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
          </div>
          <div className="fieldSpacing">
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
          </div>
          <div className="fieldSpacing">
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
          </div>
          <div className="fieldSpacing">
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
          </div>
          <div>
            <div className="fieldSpacing">
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
            </div>
            <div className="fieldSpacing">
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
            </div>
          </div>
          <div className="pageSubTitle">Venda e-commerce</div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir venda com cartão?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Boleto
            </Label>
            <SuperInput
              style={{ width: "135px" }}
              id="exampleNumber"
              name="number"
              placeholder="0%"
              type="number"
            />
          </div>
          <div className="fieldSpacing">
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
          </div>
          <div className="fieldSpacing">
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
          </div>
          <div className="fieldSpacing">
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
          </div>
          <div className="d-flex">
            <div className="fieldSpacing">
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
            </div>
            <div className="fieldSpacing">
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
            </div>
          </div>
          <div className="pageSubTitle">Cupons e descontos</div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir desconto?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir cupom de desconto?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Sim
              </Button>
              <Button
                variant="outline-dark"
                style={{ height: "62px", width: "100px" }}
              >
                Não
              </Button>
            </ButtonGroup>
            <a className="auxSucessText" style={{ paddingTop: "20px" }}>
              + adicionar cupom de desconto
            </a>
          </div>
          <div className="nextPageButton">
            <div style={{ color: "#fff" }}>
              <Button
                style={{
                  height: "50px",
                  width: "250px",
                  borderColor: "#A5A5A5",
                }}
                variant="outline-light"
              >
                <div className="greyNormalText">Adicionar ingresso</div>
              </Button>
            </div>
          </div>
        </FormGroup>
      </Container>
    </Fragment>
  );
};

export default Sample;
