import React from 'react';
import {
  ButtonGroup,
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
import titleLine from '../../assets/images/svg/titleLine.svg';

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
        aria-labelledby="example-custom-modal-styling-title"
      >
        <ModalHeader>
          <div>Configurações do produto</div>
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
              <div className="secondPageTitle">Taxas de cartão</div>
              <img src={titleLine} style={{ paddingTop: '-40px', marginBottom: '25px' }} alt="" />
              <div className="pageSubTitle">Venda física</div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir venda com cartão?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Débito
                </Label>
                <SuperInput
                  style={{ width: '135px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Crédito
                </Label>
                <SuperInput
                  style={{ width: '135px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  PIX
                </Label>
                <SuperInput
                  style={{ width: '135px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Taxa administrativa
                </Label>
                <SuperInput
                  style={{ width: '135px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="d-flex">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Qtd parcelas
                  </Label>
                  <SuperInput
                    style={{ width: '135px' }}
                    id="exampleNumber"
                    name="number"
                    placeholder="Ex: 2"
                    type="number"
                  />
                </div>
                <div className="fieldSpacing">+</div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Juros ao mês
                  </Label>
                  <SuperInput
                    style={{ width: '135px' }}
                    id="exampleNumber"
                    name="number"
                    placeholder="Ex: 2%"
                    type="number"
                  />
                </div>
              </div>
              <div className="pageSubTitle">Venda e-commerce</div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir venda com cartão?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Boleto
                </Label>
                <SuperInput
                  style={{ width: '135px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Crédito
                </Label>
                <SuperInput
                  style={{ width: '135px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  PIX
                </Label>
                <SuperInput
                  style={{ width: '135px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Taxa administrativa
                </Label>
                <SuperInput
                  style={{ width: '135px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="d-flex">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Qtd parcelas
                  </Label>
                  <SuperInput
                    style={{ width: '135px' }}
                    id="exampleNumber"
                    name="number"
                    placeholder="Ex: 2"
                    type="number"
                  />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Juros ao mês
                  </Label>
                  <SuperInput
                    style={{ width: '135px' }}
                    id="exampleNumber"
                    name="number"
                    placeholder="Ex: 2%"
                    type="number"
                  />
                </div>
              </div>
            </Card>
            <div className="nextPageButton" style={{ marginTop: '5px' }}>
              <div className="auxSucessText">+ inserir novo cupom de desconto</div>
            </div>
          </Container>
        </ModalBody>
        <ModalFooter>
          <div className="nextPageButton">
            <div style={{ color: '#fff' }}>
              <Button
                style={{ height: '50px' }}
                variant="outline-light"
                onClick={() => handleClose()}
              >
                Voltar
              </Button>
            </div>
            <Button variant="dark">Salvar</Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DiscountTicket;
