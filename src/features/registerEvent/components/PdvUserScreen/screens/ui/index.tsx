import {
  Button,
  Loading,
  // Loading,
  SelectCustom,
} from '@/components';
import { CustomTable } from '@/components/Table';
import React, { useRef } from 'react';
import { ReactComponent as CloseX } from '@/assets/images/svg/closeX.svg';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap';
import User from '@/model/User';
import { formatToCPFOrCNPJ } from 'brazilian-values';
import { UserScreen } from '@/features/core/UserScreen/screens/List';
import { appendPdvUserProps, formPdvUserProps } from '../../types';
// import { formPdvProductProps } from '../../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  user = 'user',
}

interface SectorProductUserProps {
  state: States;
  controllerFormUser: formPdvUserProps;
  controllerAppendUser: appendPdvUserProps;
  nextTab: () => void;
  backTab: () => void;
}
export const PdvUserContainer: React.FC<SectorProductUserProps> = ({
  state,
  controllerFormUser,
  controllerAppendUser,
  nextTab,
  backTab,
}) => {
  const { formData, formErrors, onChangeFormInput } = controllerFormUser;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refSelectUser = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onClearSelectUser = () => {
    if (refSelectUser) {
      refSelectUser?.current.clearValue();
    }
  };

  const userDataSelected = controllerAppendUser?.listUsers.find(
    (item: User) => item.id === formData.user,
  );

  const dataTableUser = controllerAppendUser.listUsers?.map(item => ({
    id: item.id,
    name: item.name,
    login: item.cpf,
    actions: (
      <CloseX
        className="mr-2 svg-icon action-icon"
        onClick={() => {
          controllerAppendUser.handleRemoveUser(item.id);
        }}
      />
    ),
  }));

  return (
    <>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <Form>
          <FormGroup>
            <Row className="no-gutters">
              <Col md={8}>
                <FormGroup className="mb-2">
                  <SelectCustom
                    name="user"
                    label="Usuário do PDV"
                    placeholder="Digite ou selecione o usuário do PDV"
                    refSelect={refSelectUser}
                    value={formData[FormInputName.user]}
                    onChange={e => onChangeFormInput(FormInputName.user)(e?.value as string)}
                    error={formErrors.user && formErrors.user[0]}
                    options={controllerAppendUser.listUsers.map((itemUser: User) => ({
                      label: itemUser.name,
                      value: itemUser.id,
                    }))}
                    isClearable
                  />
                  <UserScreen
                    getUsersDropdown={controllerAppendUser.handleGetUsers}
                    userDropdownSelected={userDataSelected}
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
            <Row className="no-gutters">
              <Col md={5}>
                <h5 className="mb-4 border-bottom-title fw-400">Usuários inseridos no PDV</h5>
                {controllerAppendUser.listUsers.length > 0 ? (
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
          </FormGroup>
        </Form>
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
