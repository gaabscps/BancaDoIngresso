import React from 'react';
import { Card, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CloseModal from '@/assets/images/svg/CloseModal';
import { Button, ButtonTheme, ButtonSize } from '@/components/Button';

export interface ActionProps {
  title?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface DialogProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  isContentWithCard?: boolean;
  visible: boolean;
  onClose(): void;
  position?: 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  actions: ActionProps[];
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  visible,
  onClose,
  isContentWithCard = false,
  position = 'center',
  size = 'xl',
  actions,
}) => {
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
      <ModalBody className={isContentWithCard ? 'modal__with-container' : ''}>
        <Container>
          {isContentWithCard ? <Card className="modal__main-container">{children}</Card> : children}
        </Container>
      </ModalBody>
      {actions.length > 0 && actions[0]?.title && (
        <ModalFooter style={{ border: '1px solid #E6E6E6' }}>
          {actions?.map((action, index) => (
            <React.Fragment key={index}>
              {action.title && action.onClick && (
                <Button
                  key={action.title}
                  title={action.title}
                  theme={action.theme}
                  size={action.size}
                  onClick={action.onClick}
                />
              )}
            </React.Fragment>
          ))}
        </ModalFooter>
      )}
    </Modal>
  );
};
