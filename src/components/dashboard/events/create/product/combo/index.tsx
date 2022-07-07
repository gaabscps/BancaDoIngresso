import React, { ChangeEvent, Fragment, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Container, FormGroup, Label } from 'reactstrap';
import ComboIcon from '../../../../../../assets/images/svg/Combo';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';
import SuperInput from '../../../../../sharedComponents/SuperInput';
import titleLine from '../../../../../../assets/images/svg/titleLine.svg';

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

  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="divider" />
        <div className="secondPageTitle" style={{ marginTop: '50px', marginBottom: '30px' }}>
          Cadastrando combos
        </div>
        <div className="whiteContainer">
          <FormGroup>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Grupo do combo
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite ou selecione o grupo do combo"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Subgrupo do combo (opcional)
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite ou selecione o subgrupo do combo"
                type="email"
              />
            </div>
            <div className="d-flex pt-2">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Quantidade
                </Label>
                <SuperInput
                  style={{ width: '243px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="Ex: 200"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Valor do combo
                </Label>
                <SuperInput
                  style={{ width: '243px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="Ex: 20,00"
                  type="number"
                />
              </div>
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleFile">
                Imagem do produto (opcional)
              </Label>
              <SuperInput
                id="exampleFile"
                placeholder="Nenhum arquivo selecionado"
                name="file"
                type="file"
              />
            </div>
            <div style={{ display: 'grid', paddingBottom: '50px' }}>
              <div className="pageTitle">Produtos do combo</div>
              <img src={titleLine} style={{ paddingTop: '-20px' }} alt="" />
            </div>
            {inputFields.map((inputField, index) => (
              <div key={index} className="d-flex pt-2">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Produto
                  </Label>
                  <SuperInput
                    style={{ width: '440px' }}
                    id="exampleNumber"
                    placeholder="Digite ou selecione o produto"
                    value={inputField.groupName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleChangeInput(index, event)
                    }
                  />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Quantidade
                  </Label>
                  <SuperInput
                    style={{ width: '134px' }}
                    id="exampleNumber"
                    placeholder="Ex: 100"
                    value={inputField.groupName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleChangeInput(index, event)
                    }
                  />
                </div>
                <div style={{ color: '#fff', marginTop: '55px' }}>
                  <Button
                    style={{ height: '50px' }}
                    variant="outline-light"
                    onClick={() => handleAddFields()}
                  >
                    adicionar novo produto no combo
                  </Button>
                </div>
              </div>
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
