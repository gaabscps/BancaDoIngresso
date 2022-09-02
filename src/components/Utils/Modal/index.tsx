import React from 'react';
import { Card, Container, Modal, Button, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../../assets/images/svg/CloseModal';

// interface StateProps {
//   show: boolean;
// }
// interface DispatchProps {
//   setShow(value: boolean): void;
// }
// type Props = StateProps & DispatchProps;

interface ModalProps {
  title: string;
  children: React.ReactNode;
  btnAction?: React.ReactNode;
  show: boolean;
  setShow(value: boolean): void;
}

const ModalCustom: React.FC<ModalProps> = (props: ModalProps) => {
  const handleClose = (): void => props.setShow(false);
  return (
    <Modal
      size={'xl'}
      isOpen={props.show}
      toggle={() => props.setShow(false)}
      // dialogClassName="modal-550px"
      // aria-labelledby="example-custom-modal-styling-title"
    >
      <ModalHeader>
        <div>{props.title}</div>
        <div
          onClick={() => {
            handleClose();
          }}
          style={{ cursor: 'pointer' }}
        >
          <CloseModal />
        </div>
      </ModalHeader>
      <ModalBody>
        <Container>
          <Card className="mainContainer" style={{ backgroundColor: '#F1F1F1' }}>
            {props.children}
          </Card>
        </Container>
      </ModalBody>
      <div className="nextPageButton">
        <div style={{ color: '#fff' }}>
          <Button style={{ height: '50px' }} variant="outline-light" onClick={() => handleClose()}>
            Cancelar
          </Button>
        </div>
        {props.btnAction}
      </div>
    </Modal>
  );
};

export default ModalCustom;
