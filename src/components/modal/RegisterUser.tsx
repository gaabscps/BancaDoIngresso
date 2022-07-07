import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Card, Container, Label, Input } from 'reactstrap';
import SuperInput from '../sharedComponents/SuperInput';
import titleLine from '../../assets/images/svg/titleLine.svg';
import thirdTitleLine from '../../assets/images/svg/thirdTitleLine.svg';
import fourTitleLine from '../../assets/images/svg/fourTitleLine.svg';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowUser(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const RegisterUser = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowUser(false);
  return (
    <Modal
      size={'xl'}
      show={props.show}
      onHide={() => props.setShowUser(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title" className="pageTitle">
          Cadastrar grupo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Card className="mainContainer" style={{ backgroundColor: '#F1F1F1' }}>
            <div style={{ display: 'grid', paddingBottom: '50px' }}>
              <Label className="pageTitle">Informações básicas</Label>
              <img src={titleLine} style={{ paddingTop: '-20px' }} alt="" />
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Nome do grupo
                </Label>
                <SuperInput
                  style={{ width: '431px' }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Ex:  Administradores"
                  type="email"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Nome do usuário
                </Label>
                <SuperInput
                  style={{ width: '431px' }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Ex:  José da Silva"
                />
              </div>
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                E-mail
              </Label>
              <SuperInput
                style={{ width: '431px' }}
                id="exampleEmail"
                name="email"
                placeholder="Ex:  Administradores"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do grupo
              </Label>
              <SuperInput
                style={{ width: '431px' }}
                id="exampleEmail"
                name="email"
                placeholder="Ex: josedasilva123@gmail.com"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do grupo
              </Label>
              <SuperInput
                style={{ width: '431px' }}
                id="exampleEmail"
                name="email"
                placeholder="Ex:  Administradores"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Número de celular
              </Label>
              <SuperInput
                style={{ width: '431px' }}
                id="exampleEmail"
                name="email"
                placeholder="(00) 0 0000-0000"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                CPF
              </Label>
              <SuperInput
                style={{ width: '431px' }}
                id="exampleEmail"
                name="email"
                placeholder="Ex: 123.456.789-00"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Senha
              </Label>
              <SuperInput
                style={{ width: '431px' }}
                id="exampleEmail"
                name="email"
                placeholder="Ex: 123123"
              />
            </div>
            <div style={{ display: 'grid', paddingBottom: '50px' }}>
              <Label className="pageTitle">Tipo do usuário </Label>
              <Label className="subTitleMain">Papel do usuário dentro do sistema</Label>
              <img src={thirdTitleLine} style={{ paddingTop: '-20px' }} alt="" />
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div className="checkFieldSpacing">
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    Funcionários
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div className="checkFieldSpacing">
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    PDV
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div className="checkFieldSpacing">
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    SubPDV
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div className="checkFieldSpacing">
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    POS
                  </Label>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', paddingBottom: '50px', marginTop: '50px' }}>
              <Label className="pageTitle">Grupo</Label>
              <Label className="subTitleMain">
                Grupo de permissões que o usuário terá no sistema
              </Label>
              <img src={fourTitleLine} style={{ paddingTop: '-20px' }} alt="" />
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div className="checkFieldSpacing">
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    Funcionários
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div className="checkFieldSpacing">
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    PDV
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div className="checkFieldSpacing">
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    SubPDV
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div className="checkFieldSpacing">
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    POS
                  </Label>
                </div>
              </div>
            </div>
          </Card>
        </Container>
        <div className="nextPageButton">
          <div style={{ color: '#fff' }}>
            <Button
              style={{ height: '50px' }}
              variant="outline-light"
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
          </div>
          <Button variant="dark">Cadastrar usuário</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterUser;
