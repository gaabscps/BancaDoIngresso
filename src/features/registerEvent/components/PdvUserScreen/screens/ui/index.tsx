import {
  Button,
  Dialog,
  // Loading,
  SelectCustom,
} from '@/components';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { CustomTable } from '@/components/Table';
import React, { ChangeEvent } from 'react';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { X } from 'react-feather';
import { ActionProps } from '@/components/Dialog';
import { formPdvUserProps } from '../../types';
import { PdvUserRegisterContent } from '../../components';
import { CheckBoxData, CheckBoxGroup, CheckBoxModule } from '..';
// import { formPdvProductProps } from '../../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  userRegister = 'userRegister',
}

// eslint-disable-next-line no-shadow
export enum FormInputUser {
  user = 'user',
  name = 'name',
  cpf = 'cpf',
  telephone = 'telephone',
  email = 'email',
  imageBase64 = 'imageBase64',
  imageName = 'imageName',
  password = 'password',
  userType = 'userType',
  status = 'status',
}

interface SectorProductUserProps {
  // state: States;
  title: string | React.ReactNode;
  visible: boolean;
  controllerFormUser: formPdvUserProps;
  shouldShowModal: ShouldShowModal;
  modules?: CheckBoxModule[];
  userProfileCheckBox: CheckBoxData[];
  // userStates: any;
  saveUser(): Promise<void>;
  onChangeUserTypeSelected(e: ChangeEvent<HTMLInputElement>, userType: CheckBoxData): void;
  onBlurCPF: () => void;
  onToggle: () => void;
  nextTab: () => void;
  backTab: () => void;
  onChangeUserGroupSelected(e: ChangeEvent<HTMLInputElement>, group: CheckBoxGroup): void;
  onActivateAndInactivate(e: ChangeEvent<HTMLInputElement>): void;
  changeFileInputUser: (inputName: string) => (file: File | undefined) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
  }) => void;
}
export const PdvUserContainer: React.FC<SectorProductUserProps> = ({
  // state,
  title,
  visible,
  controllerFormUser,
  shouldShowModal,
  modules,
  userProfileCheckBox,
  saveUser,
  onChangeUserGroupSelected,
  onChangeUserTypeSelected,
  // userStates,
  onActivateAndInactivate,
  changeFileInputUser,
  onBlurCPF,
  onToggle,
  onShouldShowModal,
  nextTab,
  backTab,
}) => {
  const { formData, formErrors, onChangeFormInput } = controllerFormUser;
  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

  return (
    <>
      {/* <Loading isVisible={state === States.loading} /> */}
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        isContentWithCard={true}
        actions={[
          {
            [ShouldShowModal.userRegister]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.userRegister]: {
              title: 'Cadastrar usuário',
              onClick: () => saveUser(),
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.userRegister]: (
              <PdvUserRegisterContent
                onBlurCPF={onBlurCPF}
                controllerFormUser={controllerFormUser}
                onActivateAndInactivate={onActivateAndInactivate}
                changeFileInputUser={changeFileInputUser}
                userProfileCheckBox={userProfileCheckBox}
                modules={modules}
                onChangeUserTypeSelected={onChangeUserTypeSelected}
                onChangeUserGroupSelected={onChangeUserGroupSelected}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>
      <Container className="mainContainer" fluid={true}>
        <Form>
          <div className="mb-5">
            <FormGroup>
              <Row>
                <Col md={8}>
                  <SelectCustom
                    name="user"
                    label="Digite ou selecione o usuário do PDV"
                    value={formData[FormInputUser.user]}
                    onChange={e => onChangeFormInput(FormInputUser.user)(e?.value as string)}
                    options={[{ value: '1', label: 'Setor 1' }]}
                    error={formErrors.sector && formErrors.sector[0]}
                  />
                </Col>
                <Col className="d-flex align-items-center mb-3" md={4}>
                  <div
                    className={`action-icon link-green ${
                      formData[FormInputUser.user] === ''
                        ? 'input-action-disabled disable-text'
                        : ''
                    }`}
                  >
                    Inserir usuário
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <div
                    onClick={() => {
                      onShouldShowModal({
                        value: ShouldShowModal.userRegister,
                        newTitleModal: `Cadastrar usuário`,
                      });
                    }}
                    style={{ width: 'fit-content' }}
                    className="action-icon link-green"
                  >
                    + cadastrar novo usuário
                  </div>
                </Col>
                <Col md={2}>
                  <div
                    style={{ width: 'fit-content' }}
                    className={`d-flex action-icon svg-icon align-items-center ${
                      formData[FormInputUser.user] === ''
                        ? 'input-action-disabled disable-text'
                        : ''
                    }`}
                  >
                    <Pen className="mr-2" width={12} />
                    <div>Editar</div>
                  </div>
                </Col>
              </Row>
            </FormGroup>
          </div>
        </Form>

        <React.Fragment key="content">
          <Row>
            <Col>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="border-bottom-title">Usuários inseridos do PDV</h5>
              </div>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md={7}>
              <CustomTable
                theme="secondary"
                numberRowsPerPage={0}
                progressPending={false}
                columns={[
                  {
                    name: 'Nome',
                    selector: row => row.name,
                  },
                  {
                    name: 'Login',
                    selector: row => row.login,
                  },
                  {
                    name: '',
                    selector: row => row.actions,
                    right: true,
                  },
                ]}
                data={[
                  {
                    name: 'Maria Antonia',
                    login: '987.654.321-00',
                    actions: <X className="action-icon svg-icon" onClick={() => undefined} />,
                  },
                ]}
              />
              <div style={{ borderBottom: '1.5px solid #E6E6E6' }}></div>
              <CustomTable
                theme="secondary"
                numberRowsPerPage={0}
                progressPending={false}
                columns={[
                  {
                    name: 'Nome',
                    selector: row => row.product,
                  },
                  {
                    name: 'Login',
                    selector: row => row.group,
                  },
                  {
                    name: '',
                    selector: row => row.actions,
                    right: true,
                  },
                ]}
                data={[
                  {
                    product: 'José da Silva',
                    group: '123.456.789-22',
                    actions: (
                      <>
                        <X className="action-icon svg-icon" onClick={() => undefined} />
                      </>
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
        </React.Fragment>

        <div className="d-flex justify-content-end">
          <Button title="Voltar etapa" theme="noneBorder" onClick={() => backTab()} />
          <Button
            title="Próxima etapa"
            theme="outlineDark"
            className="ml-3"
            onClick={async () => {
              nextTab();
            }}
          />
        </div>
      </Container>
    </>
  );
};
