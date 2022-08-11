import React from 'react';
import { Card, Container, Label, Row, Col, Modal, Button } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import SuperInput from '../sharedComponents/SuperInput';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowParentEvent(value: boolean): void;
}

type Props = StateProps & DispatchProps;
const ParentEvent = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowParentEvent(false);
  return (
    <Modal
      size={'xl'}
      show={props.show}
      onHide={() => handleClose()}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title" className="pageTitle">
          Cadastrar evento pai
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
            <Row lg="2" md="1">
              <Col>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Evento pai
                  </Label>
                  <SuperInput
                    id="exampleEmail"
                    name="email"
                    placeholder="Digite ou selecione o evento pai"
                  />
                </div>
              </Col>
            </Row>
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
          <Button variant="dark">Vincular evento pai</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ParentEvent;
