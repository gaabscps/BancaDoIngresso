import React, { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import { Container, FormGroup, Label, Row, Col, Button } from 'reactstrap';
import BottleIcon from '../../../../../../assets/images/svg/Bottle';
import RemoveX from '../../../../../../assets/images/svg/RemoveX';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';

import SuperInput from '../../../../../sharedComponents/SuperInput';

const Sample = (): JSX.Element => {
  const [inputFields, setInputFields] = useState([
    {
      groupName: '',
    },
  ]);

  const handleSubmit = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

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
    setInputFields([...inputFields, { groupName: '' }]);
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
          Cadastrando grupos
        </div>
        <div className="whiteContainer">
          <FormGroup>
            <Row lg="2" md="1">
              <Col>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="groupName">
                    Nome do grupo
                  </Label>
                  <SuperInput
                    id="grupo"
                    name="grupo"
                    placeholder="Digite o nome do grupo. Ex: Bebidas"
                  />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="imageBase64">
                    Imagem do grupo (opcional)
                  </Label>
                  <SuperInput
                    id="imageBase64"
                    placeholder="Nenhum arquivo selecionado"
                    name="file"
                    type="file"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {inputFields.map((inputField, index) => (
                  <Row key={index}>
                    <Col>
                      <div className="fieldSpacing">
                        <Label className="fieldLabel" for="subgroupName">
                          Nome do Subgrupo (opcional)
                        </Label>
                        <div className="fieldSpacing">
                          <SuperInput
                            id="subgroupName"
                            placeholder="Bebidas doces"
                            value={inputField.groupName}
                            onChange={event => handleChangeInput(index, event)}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col>
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
                          adicionar novo Subgrupo
                        </Button>
                      </div>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </FormGroup>
          <div className="nextPageButton">
            <div className="auxSucessText" style={{ paddingTop: '20px' }} onClick={handleSubmit}>
              + cadastrar grupo
            </div>
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <SuperCollapse
            title="Grupos cadastrados"
            content="Nenhum grupo foi cadastrado. Aqui será exibida uma lista dos seus grupos cadastrados"
            leftIcon={BottleIcon()}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
