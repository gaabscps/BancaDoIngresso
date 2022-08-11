import React from 'react';
import { Card, Container, Label, Modal, Button, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import SuperInput from '../sharedComponents/SuperInput';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShow(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const DiscountVoucher = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShow(false);
  return (
    <Modal
      size={'xl'}
      //   toggle={() => setShow(false)}
      isOpen={props.show}
      toggle={() => props.setShow(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <ModalHeader>
        <div>Cadastrar voucher de desconto</div>
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
                  style={{ width: '620px' }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Digite a descrição do voucher de desconto"
                  type="email"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleDatetime">
                  Valor do voucher
                </Label>
                <SuperInput id="exampleTime" name="time" placeholder="Ex:R$ 200,00" type="number" />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleDatetime">
                  Código do voucher (gerar automatico, só número e 6 dig)
                </Label>
                <SuperInput id="exampleTime" name="time" placeholder="EX: JOA200" type="number" />
              </div>
            </div>
          </Card>
        </Container>
        <div className="nextPageButton" style={{ marginTop: '5px' }}>
          <Button style={{ height: '56px' }} variant="dark" onClick={() => handleClose()}>
            Gerar voucher
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DiscountVoucher;
