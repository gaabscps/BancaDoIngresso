import React from 'react';
import { Card, Container, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import CloseModal from '@/assets/images/svg/CloseModal';
import { Button, ButtonTheme, ButtonSize } from '@/components/Button';

export interface ActionProps {
  title?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export interface DialogProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  isContentWithCard?: boolean;
  visible: boolean;
  onClose(): void;
  position?: 'center' | 'right';
  footerPosition?: 'center' | 'right' | 'left';
  footerBorder?: 'top' | 'none';
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
  footerPosition = 'right',
  footerBorder = 'top',
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

  const ftPosition = {
    center: 'justify-content-center',
    left: 'justify-content-left',
    right: 'justify-content-right',
  }[footerPosition];

  const ftBorder = {
    top: 'modal__forter-main',
    none: 'border-0',
  }[footerBorder];

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
      <div style={{ padding: '0 40px' }}>
        {actions.length > 0 && actions[0]?.title && (
          <ModalFooter className={`${ftPosition} ${ftBorder}`} style={{ padding: '30px 0' }}>
            {actions?.map((action, index) => (
              <React.Fragment key={index}>
                {action.title && action.onClick && (
                  <Button
                    key={action.title}
                    title={action.title}
                    theme={action.theme}
                    size={action.size}
                    onClick={action.onClick}
                    disabled={action.disabled}
                  />
                )}
              </React.Fragment>
            ))}
          </ModalFooter>
        )}
      </div>
    </Modal>
  );
};
