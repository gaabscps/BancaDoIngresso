import React from 'react';
import { Card, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { Button } from '@/components/Button';
import CloseModal from '../../../../assets/images/svg/CloseModal';

interface ModalProps {
  title: React.ReactNode;
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
  isCard = false,
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
                title="Cancelar"
                theme="noneBorder"
                size="sm"
                style={{ marginRight: '20px' }}
                onClick={() => handleClose()}
              ></Button>
            </div>
            <Button title={btnLabel} theme="dark" size="sm" onClick={onBtnAction}></Button>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};
