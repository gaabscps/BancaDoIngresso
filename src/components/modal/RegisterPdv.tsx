import React from 'react';
import { Card, Container, Modal, Button, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import SelectInput from '../dashboard/mainPdv/pdvInputs/selectInput';

import LargeInput from '../dashboard/mainPdv/pdvInputs/textInput';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowPdv(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const RegisterPdv = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowPdv(false);
  return (
    <Modal
      size={'xl'}
      isOpen={props.show}
      toggle={() => props.setShowPdv(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <ModalHeader style={{ backgroundColor: '#F8F8F8' }}>
        <div className="subpdv-modal-header-container">
          <div className="header-title-text subpdv-name">Cadastrar novo PDV</div>

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
              padding: '25px 30px',
              backgroundColor: '#F1F1F1',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            {' '}
            <form>
              <div className="form-container">
                <div className="form-content first-content">
                  <LargeInput
                    name="Nome do PDV"
                    placeholder="Digite o nome do PDV"
                    id="name"
                    size="large"
                  />
                </div>
                <div className="form-content">
                  <LargeInput
                    name="Endereço do PDV"
                    placeholder="Digite o endereço do PDV. Ex: Rua 123 da Silva"
                    id="address"
                    size="large"
                  />
                </div>
                <div className="form-content two-fields-container">
                  <SelectInput name="Estado" id="estado" option1="SP" option2="RJ" size="small" />
                  <SelectInput
                    name="Cidade"
                    id="cidade"
                    option1="Campinas"
                    option2="São josé dos Campos"
                    size="medium"
                  />
                </div>
                <div className="form-content two-fields-container">
                  <LargeInput
                    name="CPF/CNPJ"
                    placeholder="Digite o CPF ou CNPJ do PDV"
                    id="cpf"
                    size="medium"
                  />
                </div>
                <div className="form-content two-fields-container">
                  <LargeInput
                    name="Telefone Celular"
                    placeholder="(00) 0 000-0000"
                    id="phone"
                    size="medium"
                  />
                </div>
              </div>
            </form>
          </Card>
        </Container>
        <div className="nextPageButton">
          <div style={{ color: '#fff' }}>
            <Button
              theme="noneBorder"
              style={{ height: '50px', marginRight: '20px' }}
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
          </div>
          <Button className="botao-cadastro">Cadastrar novo SubPDV</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default RegisterPdv;
