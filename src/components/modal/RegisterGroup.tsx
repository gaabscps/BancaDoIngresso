import React, { useState } from 'react';
import { Modal, Button, Collapse } from 'react-bootstrap';
import { Card, Container, Label, Input } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import SuperInput from '../sharedComponents/SuperInput';
// import titleLine from '../../assets/images/svg/titleLine.svg';
import fourTitleLine from '../../assets/images/svg/fourTitleLine.svg';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowGroup(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const RegisterGroup = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowGroup(false);
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  return (
    <Modal
      size={'xl'}
      show={props.show}
      onHide={() => props.setShowGroup(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title" className="pageTitle">
          Cadastrar grupo
        </Modal.Title>
        <div
          onClick={() => {
            handleClose();
          }}
          style={{ cursor: 'pointer' }}
        >
          <CloseModal />
        </div>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Card className="mainContainer" style={{ backgroundColor: '#F1F1F1' }}>
            <div className="titleStep">
              <Label className="pageTitle">Informações básicas</Label>
              <hr className="lineText" />
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
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleText">
                Descrição
              </Label>
              <SuperInput
                style={{ width: '431px', height: '261px' }}
                id="exampleText"
                placeholder="Digite aqui uma descrição para o grupo"
                name="text"
                type="textarea"
              />
            </div>
            <div className="titleStep">
              <Label className="pageTitle">Permissões do grupo</Label>
              <Label className="subTitleMain">
                Seções e ações que este grupo poderá acessar e realizar
              </Label>
              <img src={fourTitleLine} style={{ paddingTop: '-20px' }} alt="" />
            </div>
            <div style={{ marginBottom: '50px', width: '469px' }}>
              <div
                className="collapseTable d-flex justify-content-between collapseTableText"
                onClick={() => setOpen(!open)}
              >
                <div className="d-flex">
                  <div className="normalText ">
                    <div className="checkFieldSpacing">
                      <Input type="checkbox" />
                      <Label check className="checkLabel">
                        Ingressos
                      </Label>
                    </div>
                  </div>
                </div>
                <div>
                  <svg
                    className={`${open ? 'rotateSvg' : ''}`}
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.88 0L8 6.10667L14.12 0L16 1.88L8 9.88L0 1.88L1.88 0Z"
                      fill="#222222"
                    />
                  </svg>
                </div>
              </div>

              <Collapse in={open}>
                <div className="collapseTable">
                  <div className="subTitleMain collapseTableText">
                    <div className="d-flex">
                      <div className="normalText ">
                        <div className="checkFieldSpacing">
                          <Input type="checkbox" />
                          <Label check className="checkLabel">
                            Editar
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="normalText ">
                        <div className="checkFieldSpacing">
                          <Input type="checkbox" />
                          <Label check className="checkLabel">
                            Excluir
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="normalText ">
                        <div className="checkFieldSpacing">
                          <Input type="checkbox" />
                          <Label check className="checkLabel">
                            Incluir
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            <div style={{ marginBottom: '50px', width: '469px' }}>
              <div
                className="collapseTable d-flex justify-content-between collapseTableText"
                onClick={() => setOpenSecond(!openSecond)}
              >
                <div className="d-flex">
                  <div className="normalText ">
                    <div className="checkFieldSpacing">
                      <Input type="checkbox" />
                      <Label check className="checkLabel">
                        Produtos
                      </Label>
                    </div>
                  </div>
                </div>
                <div>
                  <svg
                    className={`${openSecond ? 'rotateSvg' : ''}`}
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.88 0L8 6.10667L14.12 0L16 1.88L8 9.88L0 1.88L1.88 0Z"
                      fill="#222222"
                    />
                  </svg>
                </div>
              </div>

              <Collapse in={openSecond}>
                <div className="collapseTable">
                  <div className="subTitleMain collapseTableText">
                    <div className="d-flex">
                      <div className="normalText ">
                        <div className="checkFieldSpacing">
                          <Input type="checkbox" />
                          <Label check className="checkLabel">
                            Editar
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="normalText ">
                        <div className="checkFieldSpacing">
                          <Input type="checkbox" />
                          <Label check className="checkLabel">
                            Excluir
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="normalText ">
                        <div className="checkFieldSpacing">
                          <Input type="checkbox" />
                          <Label check className="checkLabel">
                            Incluir
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
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
          <Button variant="dark">Cadastrar grupo</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterGroup;
