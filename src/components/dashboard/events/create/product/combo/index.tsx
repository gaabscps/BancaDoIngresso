import React, { ChangeEvent, Fragment, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Container, FormGroup, Label, Row, Col } from 'reactstrap';
import ComboIcon from '../../../../../../assets/images/svg/Combo';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';
import SuperInput from '../../../../../sharedComponents/SuperInput';
import titleLine from '../../../../../../assets/images/svg/titleLine.svg';
import RemoveX from '../../../../../../assets/images/svg/RemoveX';

const Sample = (): JSX.Element => {
  const [inputFields, setInputFields] = useState([
    {
      productName: '',
      amount: '',
      groupName: '',
    },
  ]);

  const handleChangeInput = (index: number, event: ChangeEvent<HTMLInputElement>): void => {
    const values = [...inputFields];
    const { currentTarget } = event;
    const { name, value } = currentTarget;
    const inputField = {
      ...values[index],
      [name]: value,
    };
    values[index] = inputField;
    setInputFields(values);
  };

  const handleAddFields = (): void => {
    const newInputFields = inputFields;
    newInputFields.push({ productName: '', amount: '', groupName: '' });
    setInputFields(newInputFields);
  };

  const handleDeleteFields = (index: number): void => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="divider" />
        <div className="secondPageTitle" style={{ marginTop: '50px', marginBottom: '30px' }}>
          Cadastrando combos
        </div>
        <div className="whiteContainer">
          <FormGroup>
            <Row lg="2" md="1">
              <Col>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="groupName">
                    Grupo do combo
                  </Label>
                  <SuperInput
                    id="groupName"
                    name="groupName"
                    placeholder="Digite ou selecione o grupo do combo"
                  />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="subgroupName">
                    Subgrupo do combo (opcional)
                  </Label>
                  <SuperInput
                    id="subgroupName"
                    name="subgroupName"
                    placeholder="Digite ou selecione o subgrupo do combo"
                  />
                </div>
                <Row>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="amount">
                        Quantidade
                      </Label>
                      <SuperInput id="amount" name="amount" placeholder="Ex: 200" type="number" />
                    </div>
                  </Col>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="totalValue">
                        Valor do combo
                      </Label>
                      <SuperInput
                        id="totalValue"
                        name="totalValue"
                        placeholder="Ex: 20,00"
                        type="number"
                      />
                    </div>
                  </Col>
                </Row>
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
                <div style={{ display: 'grid', paddingBottom: '50px' }}>
                  <div className="pageTitle">Produtos do combo</div>
                  <img src={titleLine} style={{ paddingTop: '-20px' }} />
                </div>
              </Col>
            </Row>
            {inputFields.map((inputField, index) => (
              <Row key={index}>
                <Col xs="6">
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="productsName">
                      Produto
                    </Label>
                    <SuperInput
                      // style={{ width: '440px' }}
                      id="productsName"
                      placeholder="Digite ou selecione o produto"
                      value={inputField.groupName}
                      onChange={event => handleChangeInput(index, event)}
                    />
                  </div>
                </Col>
                <Col xs="2">
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="productsAmount">
                      Quantidade
                    </Label>
                    <SuperInput
                      // style={{ width: '134px' }}
                      id="productsAmount"
                      placeholder="Ex: 100"
                      value={inputField.groupName}
                      onChange={event => handleChangeInput(index, event)}
                    />
                  </div>
                </Col>
                <Col xs="4">
                  <div style={{ color: '#fff', marginTop: '55px' }} className="d-flex">
                    <div
                      style={{
                        height: '50px',
                        cursor: 'pointer',
                        paddingTop: '15px',
                        marginRight: '25px',
                      }}
                      onClick={() => handleDeleteFields(index)}
                    >
                      <RemoveX />
                    </div>
                    <Button
                      style={{ height: '50px' }}
                      variant="outline-light"
                      onClick={() => handleAddFields()}
                    >
                      adicionar novo produto no combo
                    </Button>
                  </div>
                </Col>
              </Row>
            ))}
            <div className="d-flex pt-2"></div>
          </FormGroup>
          <div className="nextPageButton">
            <div className="auxSucessText" style={{ paddingTop: '20px' }}>
              + cadastrar combo
            </div>
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <SuperCollapse
            title="Grupos cadastrados"
            content="Nenhum grupo foi cadastrado. Aqui será exibida uma lista dos seus grupos cadastrados"
            leftIcon={ComboIcon}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
