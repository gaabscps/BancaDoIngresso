import React from 'react';
import { Card, Container, Modal, Button, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowSubPdvList(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const SubPdvList = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowSubPdvList(false);
  return (
    <Modal
      size={'xl'}
      isOpen={props.show}
      toggle={() => props.setShowSubPdvList(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <ModalHeader style={{ backgroundColor: '#F8F8F8' }}>
        <div className="subpdv-modal-header-container">
          <div className="header-title-text subpdv-name">Nome do SubPdv</div>
          <div className="subpdv-register-buttom">+ cadastrar novo Sub PDV</div>
          <div
            className="modal-close-container"
            onClick={() => {
              handleClose();
            }}
            style={{ cursor: 'pointer' }}
          >
            <CloseModal />
          </div>
        </div>
      </ModalHeader>
      <ModalBody style={{ backgroundColor: '#F8F8F8' }}>
        <Container>
          <Card
            className="subpdv-main-container"
            style={{
              padding: '25px 30px',
              backgroundColor: '#FFF',
              border: 'none',
              borderRadius: '5px',
            }}
          ></Card>
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
          <Button className="botao-cadastro" variant="dark">
            Cadastrar novo SubPDV
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default SubPdvList;
