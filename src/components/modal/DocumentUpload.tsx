import React from 'react';
import { Card, Container, Label, Modal, Button, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import SuperInput from '../sharedComponents/SuperInput';

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowDocument(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const DocumentUpload = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowDocument(false);
  return (
    <Modal
      size={'xl'}
      isOpen={props.show}
      toggle={() => props.setShowDocument(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <ModalHeader>
        <div>Upload de documento</div>
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
            <div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleFile">
                  Arquivo
                </Label>
                <SuperInput
                  id="exampleFile"
                  placeholder="Nenhum arquivo selecionado"
                  name="file"
                  type="file"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Título do documento
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Selecione ou digite o tipo do gateway de pagamento"
                />
              </div>
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleText">
                Descrição
              </Label>
              <SuperInput
                style={{ width: '534px', height: '261px' }}
                id="exampleText"
                placeholder="Digite aqui a descrição do arquivo"
                name="text"
                type="textarea"
              />
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Categoria
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Selecione ou digite a categoria do arquivo"
                />
              </div>
            </div>
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
          <Button variant="dark">Upload</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DocumentUpload;
