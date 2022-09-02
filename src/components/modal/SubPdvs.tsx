import React, { useState } from 'react';
import { Card, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import LoteCollapse from '../sharedComponents/collapse/LoteCollapse';
import ConfirmExclude from './ConfirmExclude';
import RegisterSubPdv from './RegisterSubPdv';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowSubPdvList(value: boolean): void;
  setShowExclude(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const SubPdvList = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowSubPdvList(false);
  const [showRegisterSubPdv, setShowRegisterSubPdv] = useState(false);
  const callShowRegisterSub = (b: boolean): void => {
    setShowRegisterSubPdv(b);
  };

  return (
    <>
      <ConfirmExclude show={false} setShowExclude={props.setShowExclude} />
      <RegisterSubPdv show={showRegisterSubPdv} setShowRegisterSubPdv={callShowRegisterSub} />
      <Modal
        size={'xl'}
        isOpen={props.show}
        toggle={() => props.setShowSubPdvList(false)}
        dialogClassName="modal-550px"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <ModalHeader style={{ backgroundColor: '#F8F8F8' }}>
          <div className="subpdv-modal-header-container">
            <div className="header-title-text subpdv-name">Nome do SubPdv</div>
            <div className="subpdv-register-buttom">
              <a style={{ cursor: 'pointer' }} onClick={() => setShowRegisterSubPdv(true)}>
                + cadastrar novo Sub PDV
              </a>
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
        <ModalBody style={{ backgroundColor: '#F8F8F8' }}>
          <Container>
            <Card
              className="subpdv-main-container"
              style={{
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              <Card>
                <LoteCollapse
                  title={'Sub PDV’s cadastrados (3)'}
                  content={''}
                  leftIcon={() => <CloseModal />}
                  setShowExclude={props.setShowExclude}
                  setShowRegisterSubpdv={callShowRegisterSub}
                />
              </Card>
            </Card>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SubPdvList;
