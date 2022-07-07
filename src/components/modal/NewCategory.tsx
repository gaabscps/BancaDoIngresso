import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Card, Container, Label } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import SuperInput from '../sharedComponents/SuperInput';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowNewCategory(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const NewCategory = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowNewCategory(false);
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
          Cadastrar nova categoria de evento
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
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Nome da categoria
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Digite o nome da categoria"
                />
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
          <Button variant="dark">Cadastrar nova categoria de evento</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewCategory;
