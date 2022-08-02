import React, { Fragment } from 'react';
import { Container, Input, FormGroup, Label, Row, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';

const Sample = (): JSX.Element => (
  <Fragment>
    <Container className="subContainer" fluid={true}>
      <hr className="dividerUp" />
      <FormGroup className="fieldSpacing">
        <Label className="infoSubTitle">Camarote &gt;&gt; Setor</Label>
        <div className="checkFieldSpacing">
          <Input type="checkbox" />
          <Label className="checkLabel">Camarote Masculino</Label>
        </div>
        <div className="checkFieldSpacing">
          <Input type="checkbox" />
          <Label className="checkLabel">Camarote Meia entrada</Label>
        </div>
        <div className="checkFieldSpacing">
          <Input type="checkbox" />
          <Label className="checkLabel">Camarote Feminino</Label>
        </div>
      </FormGroup>
      <hr className="dividerUp" />
      <Row>
        <Col>
          <FormGroup className="fieldSpacing">
            <Label className="infoSubTitle">Área VIP</Label>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Geral</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Meia entrada</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Universitário</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Camarote</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Área Vip</Label>
            </div>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup className="fieldSpacing">
            <Label className="infoSubTitle">Pista</Label>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Pista Masculina</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Pista Meia entrada</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Pista Feminina</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Camarote</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Área Vip</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Geral</Label>
            </div>
            <div className="checkFieldSpacing">
              <Input type="checkbox" />
              <Label className="checkLabel">Universitário</Label>
            </div>
          </FormGroup>
        </Col>
      </Row>
      <div className="d-flex"></div>
      <div className="nextPageButton">
        <div style={{ color: '#fff' }}>
          <Button
            style={{ height: '50px', width: '200px', borderColor: '#A5A5A5' }}
            variant="outline-light"
          >
            <div className="greyNormalText">Adicionar PDV</div>
          </Button>
        </div>
      </div>
    </Container>
  </Fragment>
);

export default Sample;
