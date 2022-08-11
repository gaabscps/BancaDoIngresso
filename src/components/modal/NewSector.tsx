import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Container, Label, Modal, Button } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import Section from '../../entities/Section';
import { createRequest } from '../../store/ducks/section/actions';
import SuperInput from '../sharedComponents/SuperInput';

interface CreateSection {
  id: string;
  name: string;
  description: string;
  imageBase64?: boolean;
}
interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowNewSector(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const NewSector = (props: Props): JSX.Element => {
  const handleClose = (): void => props.setShowNewSector(false);
  const [form, setForm] = useState<CreateSection | any>({} as CreateSection);
  const dispatch = useDispatch();

  const onChangeForm = (level?: any) => (e: any) => {
    if (!level) {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    } else {
      setForm({
        ...form,
        [level]: {
          ...form[level],
          [e.target.name]: e.target.value,
        },
      });
    }
    // console.log('form', form);
  };

  const handleSubmit = async (): Promise<void> => {
    const createSection: Section = {
      id: '',
      name: form.name,
      description: form.name,
      imageBase64: '',
    };
    dispatch(createRequest(createSection));
  };
  return (
    <Modal
      size={'xl'}
      show={props.show}
      onHide={() => handleClose()}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <Modal.Title id="example-custom-modal-styling-title" className="pageTitle">
          Cadastrar novo setor
        </Modal.Title>
        <div
          onClick={() => {
            handleClose();
          }}
          style={{ cursor: 'pointer' }}
        >
          <CloseModal />
        </div>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Card className="mainContainer" style={{ backgroundColor: '#F1F1F1' }}>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="name">
                  Nome do setor
                </Label>
                <SuperInput
                  id="name"
                  name="name"
                  onChange={onChangeForm()}
                  placeholder="Digite o nome do setor"
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
          <Button variant="dark" onClick={handleSubmit}>
            Cadastrar novo setor
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewSector;
