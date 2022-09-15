import React from 'react';
import { Card, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';

import CloseModal from '@/assets/images/svg/CloseModal';
// import { Button } from '@/components';

interface ModalProps {
  title: React.ReactNode;
  children: React.ReactNode;
  // onBtnAction?: () => void;
  // btnLabel?: string;
  isCard?: boolean;
  visible: boolean;
  onClose(): void;
  position?: 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Dialog: React.FC<ModalProps> = ({
  title,
  children,
  visible,
  onClose,
  // onBtnAction,
  // btnLabel = 'Confirmar',
  isCard = false,
  position = 'center',
  size = 'xl',
}: ModalProps) => {
  const handleClose = (): void => onClose();

  const finalPosition = {
    center: '',
    right: 'flex-modal-right',
  }[position];

  const finalSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  }[size];

  return (
    <Modal
      modalClassName={finalPosition}
      size={finalSize}
      isOpen={visible}
      toggle={() => onClose()}
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
        {/* {onBtnAction && (
          <div className="nextPageButton">
            <div style={{ color: '#fff' }}>
              <Button
                title="Cancelar"
                theme="noneBorder"
                size="sm"
                style={{ marginRight: '20px' }}
                onClick={() => handleClose()}
              />
            </div>
            <Button title={btnLabel} theme="dark" size="sm" onClick={onBtnAction} />
          </div>
        )} */}
      </ModalBody>
    </Modal>
  );
};
