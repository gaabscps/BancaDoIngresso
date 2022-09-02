import React from 'react';
import { Card, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import CloseModal from '../../../../assets/images/svg/CloseModal';
import Button from '../../Button';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onBtnAction?: () => void;
  btnLabel?: string;
  isCard?: boolean;
  show: boolean;
  setShow(value: boolean): void;
}

export const ModalCustom: React.FC<ModalProps> = ({
  title,
  children,
  show,
  setShow,
  onBtnAction,
  btnLabel = 'Confirmar',
  isCard = true,
}: ModalProps) => {
  const handleClose = (): void => setShow(false);
  return (
    <Modal
      size={'xl'}
      isOpen={show}
      toggle={() => setShow(false)}
      // contentClassName={`modal-${theme}`}
    >
      <ModalHeader>
        <div className="modal__header-container">
          {title && <div className="header-title-text modal__title">{title}</div>}
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
        <Container>
          {isCard ? <Card className="modal__main-container">{children}</Card> : children}
        </Container>
        {onBtnAction && (
          <div className="nextPageButton">
            <div style={{ color: '#fff' }}>
              <Button
                theme="noneBorder"
                style={{ marginRight: '20px' }}
                onClick={() => handleClose()}
              >
                Cancelar
              </Button>
            </div>
            <Button theme="dark" onClick={onBtnAction}>
              {btnLabel}
            </Button>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};
