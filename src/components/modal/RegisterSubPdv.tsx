import React from 'react';
import { Card, Container, Modal, Button, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';

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
    <>
      <Modal
        size={'xl'}
        isOpen={props.show}
        toggle={() => props.setShowRegisterSubPdv(false)}
        dialogClassName="modal-550px"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <ModalHeader style={{ backgroundColor: '#F8F8F8' }}>
          <div className="subpdv-modal-header-container">
            <div className="header-title-text subpdv-name">Nome do SubPdv</div>
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
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              {' '}
              <form>
                <div className="form-container">
                  <div className="form-content">
                    <div className="input-container">
                      <label htmlFor="name" className="label-style">
                        Nome do Sub PDV
                      </label>
                      <input
                        placeholder="Digite o nome do Sub PDV"
                        className="input-style"
                        id="name"
                        name="name"
                      ></input>
                    </div>
                  </div>
                  <div className="form-content">
                    <div className="input-container">
                      <label htmlFor="address" className="label-style">
                        Endereço do PDV
                      </label>
                      <input
                        placeholder="Digite o endereço do PDV. Ex: Rua 123 da Silva"
                        className="input-style"
                        id="address"
                        name="address"
                      ></input>
                    </div>
                  </div>
                  <div className="form-content two-fields-container">
                    <div className="input-container small-select-input-container">
                      <label htmlFor="state" className="label-style">
                        Estado
                      </label>
                      <select className="input-style small-select-input" id="state" name="state">
                        <option value="" selected className="select-placeholder">
                          SP
                        </option>
                        <option value="">RJ</option>
                      </select>
                    </div>
                    <div className="input-container medium-select-input-container">
                      <label htmlFor="city" className="label-style">
                        Cidade
                      </label>
                      <select className="input-style" id="city" name="city">
                        <option value="" selected className="select-placeholder">
                          Campinas
                        </option>
                        <option value="">São José dos Campos</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-content two-fields-container">
                    <div className="input-container medium-select-input-container">
                      <label htmlFor="cpf" className="label-style">
                        CPF/CNPJ
                      </label>
                      <input
                        placeholder="Digite o CPF ou CNPJ do PDV"
                        className="input-style"
                        id="cpf"
                        name="cpf"
                      ></input>
                    </div>
                  </div>
                  <div className="form-content two-fields-container">
                    <div className="input-container medium-select-input-container">
                      <label htmlFor="phone" className="label-style">
                        Telefone celular
                      </label>
                      <input
                        placeholder="(00) 0 000-0000"
                        className="input-style"
                        id="phone"
                        name="phone"
                      ></input>
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          </Container>
          <div className="nextPageButton">
            <div style={{ color: '#fff' }}>
              <Button
                style={{ height: '50px' }}
                variant="outline-light"
                onClick={() => handleClose()}
              >
                Cancelar
              </Button>
            </div>
            <Button className="botao-cadastro" variant="dark">
              Cadastrar novo SubPDV
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default registerSubPdv;
