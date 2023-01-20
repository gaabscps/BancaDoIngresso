import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Container, Label, Modal, Button, ModalHeader, ModalBody } from 'reactstrap';
import CloseModal from '../../assets/images/svg/CloseModal';
import { imageTeste } from '../../constant/imageTest';
import Address from '../../model/Address';
import Contractor from '../../model/Contractor';
import { createRequest } from '../../store/ducks/contractor/actions';
import SuperInput from '../sharedComponents/SuperInput';

interface CreateCompany {
  id: any;
  name: string;
  type: string;
  telephone: string;
  document: string;
  address: Address;
}

interface StateProps {
  show: boolean;
}
interface DispatchProps {
  setShowCompany(value: boolean): void;
}

type Props = StateProps & DispatchProps;

const RegisterCompany = (props: Props): JSX.Element => {
  const image = imageTeste;
  const dispatch = useDispatch();
  const [form, setForm] = useState<CreateCompany | any>({} as CreateCompany);
  const handleClose = (): void => props.setShowCompany(false);

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
  };

  const handleSubmit = async (): Promise<void> => {
    // const createCompany: Contractor = {
    //   // id: undefined,
    //   name: form.name,
    //   document: form.document,
    //   telephone: form.telephone,
    //   address: {
    //     id: undefined,
    //     zipCode: '-',
    //     state: '-',
    //     city: '-',
    //     district: '-',
    //     street: '-',
    //     complement: '-',
    //     number: '-',
    //     latitude: 0,
    //     longitude: 0,
    //   },
    //   email: '-',
    //   imageBase64: image,
    //   users: [],
    // };
    // dispatch(createRequest(createCompany));
  };
  return (
    <Modal
      size={'xl'}
      isOpen={props.show}
      toggle={() => props.setShowCompany(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <ModalHeader>
        <div>Cadastrar nova empresa</div>
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
                <Label className="fieldLabel" for="name">
                  Nome da empresa
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  id="name"
                  name="name"
                  placeholder="Digite o nome da empresa"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="document">
                  CPF/CNPJ
                </Label>
                <SuperInput
                  style={{ width: '370px' }}
                  onChange={onChangeForm()}
                  id="document"
                  name="document"
                  placeholder="Digite o CPF ou CNPJ do cliente"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="telephone">
                  Celular
                </Label>
                <SuperInput
                  style={{ width: '370px' }}
                  onChange={onChangeForm()}
                  id="telephone"
                  name="telephone"
                  placeholder="(00) 0 0000-0000"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="type">
                  Tipo da empresa
                </Label>
                <SuperInput
                  onChange={onChangeForm()}
                  id="type"
                  name="type"
                  placeholder="Digite o tipo da empresa"
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
            Cadastrar nova empresa
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default RegisterCompany;
