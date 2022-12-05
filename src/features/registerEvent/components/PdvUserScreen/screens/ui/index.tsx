import {
  Button,
  Dialog,
  // Loading,
  SelectCustom,
} from '@/components';
import { CustomTable } from '@/components/Table';
import React, { useRef } from 'react';
import { ReactComponent as CloseX } from '@/assets/images/svg/closeX.svg';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import { ActionProps } from '@/components/Dialog';
import User from '@/model/User';
import { formatToCPFOrCNPJ } from 'brazilian-values';
import { formPdvUserProps } from '../../types';
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
export enum FormInputName {
  user = 'user',
}

interface SectorProductUserProps {
  // state: States;
  title: string | React.ReactNode;
  visible: boolean;
  controllerFormUser: formPdvUserProps;
  shouldShowModal: ShouldShowModal;
  controllerAppendUser: any;
  // userStates: any;
  onToggle: () => void;
  nextTab: () => void;
  backTab: () => void;
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
  controllerAppendUser,
  // userStates,
  onToggle,
  // onShouldShowModal,
  // nextTab,
  // backTab,
}) => {
  const { formData, formErrors, onChangeFormInput } = controllerFormUser;
  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

  const refSelectUser = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onClearSelectUser = () => {
    if (refSelectUser) {
      refSelectUser?.current.clearValue();
    }
  };

  const dataTableUser = controllerAppendUser.usersSelected?.map((item, index) => ({
    id: item.id,
    name: item.name,
    login: item.cpf,
    actions: (
      <CloseX
        className="mr-2 svg-icon action-icon"
        onClick={() => {
          controllerAppendUser.handleRemoveUser(index);
        }}
      />
    ),
  }));

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
              onClick: () => undefined,
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.userRegister]: <div></div>,
          }[shouldShowModal]
        }
      </Dialog>
      <Form>
        <FormGroup>
          <Container>
            <Row>
              <Col md={8}>
                <h5 className="mt-5 mb-5 border-bottom-title fw-700">Usuários do PDV</h5>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <FormGroup className="mb-2">
                  <SelectCustom
                    name="user"
                    label="Usuário do PDV"
                    placeholder="Digite ou selecione o usuário do PDV"
                    // refSelect={refSelectUser}
                    value={formData[FormInputName.user]}
                    onChange={e => onChangeFormInput(FormInputName.user)(e?.value as string)}
                    error={formErrors.user && formErrors.user[0]}
                    options={controllerAppendUser.listUsers.map((itemUser: User) => ({
                      label: itemUser.name,
                      value: itemUser.id,
                    }))}
                    isClearable
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <div style={{ padding: '37px 0' }}>
                  <Button
                    title="Inserir usuário"
                    theme="noneBorder"
                    onClick={() => {
                      controllerAppendUser.handleAddUser(formData[FormInputName.user]);
                      onClearSelectUser();
                    }}
                    disabled={
                      formData[FormInputName.user] === undefined ||
                      formData[FormInputName.user] === '' ||
                      formData[FormInputName.user] === null
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={7}>
                <h5 className="mb-4 border-bottom-title fw-400">Usuários inseridos no PDV</h5>
                {controllerAppendUser.usersSelected.length > 0 ? (
                  <CustomTable
                    columns={[
                      {
                        name: 'Nome do usuário',
                        selector: row => row.name,
                        maxWidth: '325px',
                      },
                      {
                        name: 'Login',
                        selector: row => formatToCPFOrCNPJ(row.login),
                        maxWidth: '140px',
                      },
                      {
                        name: '',
                        selector: row => row.actions,
                        maxWidth: '85px',
                      },
                    ]}
                    data={dataTableUser}
                    theme="tertiary"
                    progressPending={false}
                    numberRowsPerPage={1}
                  />
                ) : (
                  <>
                    <div style={{ padding: '10px 0 20px 0', color: '#A5A5A5' }}>
                      Você ainda não inseriu nenhum usuário neste PDV.
                    </div>
                    <div style={{ color: '#A5A5A5', paddingBottom: '30px' }}>
                      Aqui será exibida uma lista dos usuários inseridos neste PDV.
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </FormGroup>
      </Form>
    </>
  );
};
