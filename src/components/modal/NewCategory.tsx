import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  Container,
  Label,
  Row,
  Col,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import EventCategory from '../../model/EventCategory';
import { createRequest } from '../../store/ducks/event-category/actions';
import SuperInput from '../sharedComponents/SuperInput';

interface CreateCategory {
  id: string;
  name: string;
  description: string;
  actived?: boolean;
}

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowNewCategory(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const NewCategory = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<CreateCategory | any>({} as CreateCategory);
  const handleClose = (): void => props.setShowNewCategory(false);

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
    const createCategory: EventCategory = {
      id: '',
      name: form.name,
      description: form.name,
      actived: true,
    };
    dispatch(createRequest(createCategory));
  };
  return (
    <Modal
      size={'xl'}
      isOpen={props.show}
      toggle={() => handleClose()}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <ModalHeader>
        <div>Cadastrar nova categoria de evento</div>
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
            <Row lg="2" md="1">
              <Col>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="name">
                    Nome da categoria
                  </Label>
                  <SuperInput
                    onChange={onChangeForm()}
                    placeholder="Digite o nome da categoria"
                    id="name"
                    name="name"
                  />
                </div>
              </Col>
            </Row>
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
            Cadastrar nova categoria de evento
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default NewCategory;
