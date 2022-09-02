import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import Button from '../Utils/Button';

interface FilterCustomProps {
  show: boolean;
  setShowFilter(value: boolean): void;
}
type Props = FilterCustomProps;

const Filter = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowFilter(false);
  return (
    <Modal
      fade={false}
      modalClassName="flex-modal-right"
      className="filter-modal"
      isOpen={props.show}
      toggle={() => props.setShowFilter(false)}
      aria-labelledby="example-custom-modal-styling-title"
      contentClassName="filter-modal-content"
    >
      <ModalHeader>
        <div className="subpdv-modal-header-container">
          <div className="header-title-text filter-name">Filtrar por: </div>
          <div className="subpdv-register-buttom"></div>
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
      <ModalBody>
        <div className="nextPageButton filter-button">
          <Button
            theme="noneBorder"
            style={{ height: '50px', marginRight: '20px' }}
            onClick={() => handleClose()}
          >
            Cancelar
          </Button>
          <Button
            style={{
              width: '152px',
              height: '40px',
              display: 'flex',
              // ajustes para o botão se possível
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="botao-cadastro"
          >
            Aplicar
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Filter;
