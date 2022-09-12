import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import CloseModal from '../../../../assets/images/svg/CloseModal';
import Button from '../../Button';

import { ReactComponent as Warning } from '../../../../assets/images/svg/warning.svg';

interface ModalProps {
  onBtnAction?: () => void;
  show: boolean;
  setShow(value: boolean): void;
  btnLabel?: string;
}

export const ModalConfirmation: React.FC<ModalProps> = ({
  show,
  setShow,
  onBtnAction,
  btnLabel = 'Sim, quero excluir',
}: ModalProps) => {
  const handleClose = (): void => setShow(false);
  return (
    <Modal
      className="confirmation-modal"
      size={'lg'}
      isOpen={show}
      toggle={() => setShow(false)}
      // contentClassName={`modal-${theme}`}
    >
      <ModalHeader>
        <div className="modal__header-container">
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
        <div className="exclude-container">
          <Warning color="#E64F49" />
          <div className="header-title-text modal__title">
            <h5 className="modal__confirmation-title">
              Você tem certeza que quer excluir este item?
            </h5>
          </div>
          <div className="modal__confirmation-text">
            Ao excluir este item o mesmo será excluído <strong>permanentemente</strong> do sistema,
            não podendo ser recuperado ou acessado novamente.
          </div>
        </div>
        <div className="exclude-button">
          <div style={{ color: '#fff' }}>
            <Button
              theme="noneBorder"
              size="sm"
              style={{ height: '50px', marginRight: '20px' }}
              onClick={() => handleClose()}
            >
              Não, quero manter
            </Button>
          </div>
          <Button theme="dark" size="sm" onClick={onBtnAction}>
            {btnLabel}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};
