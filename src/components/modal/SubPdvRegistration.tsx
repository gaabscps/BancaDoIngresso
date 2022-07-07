import React from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import { Card, Container, Label } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import SuperInput from '../sharedComponents/SuperInput';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShow(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const SubPdvRegistration = (props: Props): JSX.Element => {
  const handleOpen = (): void => props.setShow(true);
  const handleClose = (): void => props.setShow(false);
  return (
    <>
      <Modal
        size={'xl'}
        show={props.show}
        onHide={() => handleClose()}
        dialogClassName="modal-550px"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title" className="pageTitle">
            Cadastrar novo Sub PDV
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
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Nome do Sub PDV
                </Label>
                <SuperInput id="exampleEmail" placeholder="Digite o nome do Sub PDV" />
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir dinheiro?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    style={{ height: '62px', width: '100px' }}
                    onClick={() => handleOpen()}
                  >
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir taxa antecipada?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    style={{ height: '62px', width: '100px' }}
                    onClick={() => handleOpen()}
                  >
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir débito?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    style={{ height: '62px', width: '100px' }}
                    onClick={() => handleOpen()}
                  >
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir crédito?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    style={{ height: '62px', width: '100px' }}
                    onClick={() => handleOpen()}
                  >
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir PIX?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    style={{ height: '62px', width: '100px' }}
                    onClick={() => handleOpen()}
                  >
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir venda online?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button
                    variant="outline-dark"
                    style={{ height: '62px', width: '100px' }}
                    onClick={() => handleOpen()}
                  >
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
            </Card>
          </Container>
        </Modal.Body>
        <Modal.Footer>
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
            <Button variant="dark">Cadastrar novo Sub PDV</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubPdvRegistration;
