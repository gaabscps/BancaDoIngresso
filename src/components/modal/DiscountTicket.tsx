import React from 'react';
import {
  Card,
  Container,
  Label,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import SuperInput from '../sharedComponents/SuperInput';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShow(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const DiscountTicket = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShow(false);
  return (
    <>
      <Modal
        size={'xl'}
        isOpen={props.show}
        toggle={() => props.setShow(false)}
        dialogClassName="modal-550px"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <ModalHeader>
          <div>Adicionar cupom de desconto</div>
          <div
            onClick={() => {
              handleClose();
            }}
            style={{ cursor: 'pointer' }}
          >
            <CloseModal />
          </div>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Card className="mainContainer" style={{ backgroundColor: '#F1F1F1' }}>
              <div className="d-flex">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Descrição do voucher (opcional)
                  </Label>
                  <SuperInput
                    style={{ width: '418px' }}
                    id="exampleEmail"
                    placeholder="Digite a descrição do voucher de desconto"
                  />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Código do cupom
                  </Label>
                  <SuperInput
                    style={{ width: '360px' }}
                    id="exampleEmail"
                    placeholder="Digite a descrição do voucher de desconto"
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Quantidade de cupons
                  </Label>
                  <SuperInput style={{ width: '135px' }} id="exampleEmail" placeholder="0" />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Porcentagem de desconto (%)
                  </Label>
                  <SuperInput style={{ width: '248px' }} id="exampleEmail" placeholder="0" />
                </div>
              </div>
            </Card>
            <div className="nextPageButton" style={{ marginTop: '5px' }}>
              <div className="auxSucessText">+ inserir novo cupom de desconto</div>
            </div>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button style={{ height: '56px' }} variant="dark" onClick={() => handleClose()}>
            Gerar voucher
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DiscountTicket;
