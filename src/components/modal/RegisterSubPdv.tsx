import React from 'react';
import LargeInput from '../dashboard/mainPdv/pdvInputs/textInput';
import { ModalCustom } from '../Utils/Modal/ModalCustom';

interface StateProps {
  show: boolean;
}

interface NextLevelProps {
  setShowRegisterSubPdv(value: boolean): void;
}

type Proops = StateProps & NextLevelProps;

const registerSubPdv = (props: Proops): JSX.Element => {
  const handleClose = (): void => props.setShowRegisterSubPdv(false);
  return (
    // <>
    //   <Modal
    //     size={'xl'}
    //     isOpen={props.show}
    //     toggle={() => props.setShowRegisterSubPdv(false)}
    //     dialogClassName="modal-550px"
    //     aria-labelledby="example-custom-modal-styling-title"
    //   >
    //     <ModalHeader style={{ backgroundColor: '#F8F8F8' }}>
    //       <div className="subpdv-modal-header-container">
    //         <div className="header-title-text subpdv-name">Cadastrar novo Sub PDV</div>
    //         <div
    //           className="modal-close-container"
    //           onClick={() => {
    //             handleClose();
    //           }}
    //           style={{ cursor: 'pointer' }}
    //         >
    //           <CloseModal />
    //         </div>
    //       </div>
    //     </ModalHeader>
    //     <ModalBody style={{ backgroundColor: '#F8F8F8' }}>
    //       <Container>
    //         <Card
    //           className="subpdv-main-container"
    //           style={{
    //             padding: '25px 30px',
    //             backgroundColor: '#F1F1F1',
    //             border: 'none',
    //             borderRadius: '5px',
    //           }}
    //         >
    //           {' '}
    //           <form>
    //             <div className="form-container">
    //               <div className="form-content first-content">
    //                 <LargeInput
    //                   name="Nome do Sub PDV"
    //                   placeholder="Digite o nome do Sub PDV"
    //                   id="name"
    //                   size="large"
    //                 />
    //               </div>
    //               <div className="form-content"></div>
    //             </div>
    //           </form>
    //         </Card>
    //       </Container>
    //       <div className="nextPageButton">
    //         <div style={{ color: '#fff' }}>
    //           <Button
    //             theme="noneBorder"
    //             style={{ height: '50px', marginRight: '20px' }}
    //             onClick={() => handleClose()}
    //           >
    //             Cancelar
    //           </Button>
    //         </div>
    //         <Button className="botao-cadastro">Cadastrar novo SubPDV</Button>
    //       </div>
    //     </ModalBody>
    //   </Modal>
    // </>
    <ModalCustom title={'Nome do Subpdv'} show={props.show} setShow={handleClose} isCard={true}>
      <form>
        <div className="form-container">
          <div className="form-content first-content">
            <LargeInput
              name="Nome do Sub PDV"
              placeholder="Digite o nome do Sub PDV"
              id="name"
              size="large"
            />
          </div>
          <div className="form-content"></div>
        </div>
      </form>
    </ModalCustom>
  );
};

export default registerSubPdv;
