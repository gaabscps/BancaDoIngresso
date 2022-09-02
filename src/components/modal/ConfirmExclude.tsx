import React from 'react';
import { Card, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import Button from '../Utils/Button';
import { ReactComponent as Warning } from '../../assets/images/svg/warning.svg';

interface StateProps {
  show: boolean;
}

interface NextLevelProps {
  setShowExclude(value: boolean): any;
}

type Proops = StateProps & NextLevelProps;

const ConfirmExclude = (props: Proops): JSX.Element => {
  const handleClose = (): void => props.setShowExclude(false);
  return (
    <>
      <Modal
        size={'xl'}
        isOpen={props.show}
        toggle={() => props.setShowExclude(false)}
        dialogClassName="modal-550px"
        className="exclude-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <ModalHeader style={{ backgroundColor: '#FFF' }}>
          <div className="subpdv-modal-header-container exclude-modal-header">
            <Warning className="warning-icon" />
            <div className="header-title-text subpdv-name">
              <h5 className="exclude-modal-title">Você tem certeza que quer excluir este item?</h5>
            </div>
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
        <ModalBody style={{ backgroundColor: '#FFF' }}>
          <Container>
            <Card
              className="exclude-container"
              style={{
                padding: '25px 30px',
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              <p className="exclude-text">
                Ao excluir este item o mesmo será excluído <b>permanentemente</b> do sistema, não
                podendo ser recuperado ou acessado novamente.
              </p>
            </Card>
          </Container>
          <div className="exclude-button">
            <div style={{ color: '#fff' }}>
              <Button
                theme="noneBorder"
                style={{ height: '50px', marginRight: '20px' }}
                onClick={() => handleClose()}
              >
                Não, quero manter
              </Button>
            </div>
            <Button className="botao-cadastro">Sim, quero excluir</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConfirmExclude;
