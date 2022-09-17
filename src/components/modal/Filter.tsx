import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Button } from '@/components/Button';
import CloseModal from '../../assets/images/svg/CloseModal';

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
        <div className="filter-button exclude-button">
          <Button
            title="Cancelar"
            theme="noneBorder"
            style={{ height: '50px', marginRight: '20px' }}
            onClick={() => handleClose()}
          ></Button>
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
            title="Aplicar"
            onClick={() => handleClose()}
          ></Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Filter;
