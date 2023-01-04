/* eslint-disable import/no-unresolved */
import React, { Fragment, useRef } from 'react';
import { Button, SelectCustom } from '@/components';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { CustomTable } from '@/components/Table';
import { ReactComponent as CloseX } from '@/assets/images/svg/closeX.svg';
import { UserScreen } from '@/features/core/UserScreen/screens/List';
import User from '@/model/User';
import { SubPdvScreen } from '@/features/core/SubPdvScreen/screens/List';
import SubPdv from '@/model/SubPdv';
import { SubPdvContainerProps } from '../../screens/ui';

import { columnsUser } from '../../screens/ui/table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  name = 'name',
  user = 'user',
}

export const SubPdvContent: React.FC<
  Pick<SubPdvContainerProps, 'formSubPdvRegister' | 'appendUser' | 'subPdvStates' | 'subPdvActions'>
> = ({ formSubPdvRegister, appendUser, subPdvStates, subPdvActions }) => {
  const { formData, formErrors, onChangeFormInput } = formSubPdvRegister;

  const userDataSelected = appendUser?.listUsers.find((item: User) => item.id === formData.user);
  const subPdvDataSelected = subPdvStates?.subPdvOptions.find(
    (item: SubPdv) => item.id === formData.name,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refSelectUser = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onClearSelectUser = () => {
    if (refSelectUser) {
      refSelectUser?.current.clearValue();
    }
  };

  const dataTableUser = appendUser.usersSelected?.map(item => ({
    id: item.id,
    name: item.name,
    login: item.cpf,
    actions: (
      <CloseX
        className="mr-2 svg-icon action-icon"
        onClick={() => {
          appendUser.handleRemoveUser(item);
        }}
      />
    ),
  }));

  return (
    <Fragment>
      <Form
        noValidate={true}
        onSubmit={(e): void => {
          e.preventDefault();
        }}
      >
        <Row>
          <Col md={8}>
            <FormGroup className="mb-2">
              <SelectCustom
                name="name"
                label="Nome do Sub PDV"
                placeholder="Digite ou selecione nome do Sub PDV"
                value={formData[FormInputName.name]}
                onChange={e => onChangeFormInput(FormInputName.name)(e?.value as string)}
                error={formErrors.name && formErrors.name[0]}
                options={subPdvStates.subPdvOptions.map(itemSubPdv => ({
                  label: itemSubPdv.name,
                  value: itemSubPdv.id,
                }))}
                isClearable
              />
              <SubPdvScreen subPdvSelected={subPdvDataSelected} subPdvActions={subPdvActions} />
            </FormGroup>
          </Col>
          <Col md={4} />
        </Row>
        <Row>
          <Col md={8}>
            <FormGroup className="mb-2">
              <SelectCustom
                name="user"
                label="Usuário do Sub PDV"
                placeholder="Digite ou selecione o usuário do Sub PDV"
                refSelect={refSelectUser}
                value={formData[FormInputName.user]}
                onChange={e => onChangeFormInput(FormInputName.user)(e?.value as string)}
                error={formErrors.user && formErrors.user[0]}
                options={appendUser.listUsers.map(itemUser => ({
                  label: itemUser.name,
                  value: itemUser.id,
                }))}
                isClearable
              />
              <UserScreen
                getUsersDropdown={appendUser.handleGetUsers}
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
                  appendUser.handleAddUser(formData[FormInputName.user]);
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
            <h5 className="mb-4 border-bottom-title fw-400">Usuários inseridos no Sub PDV</h5>
            {appendUser.usersSelected.length > 0 ? (
              <CustomTable
                columns={columnsUser}
                data={dataTableUser}
                theme="tertiary"
                progressPending={false}
                numberRowsPerPage={1}
              />
            ) : (
              <>
                <div style={{ padding: '10px 0 20px 0', color: '#A5A5A5' }}>
                  Você ainda não inseriu nenhum usuário neste Sub PDV.
                </div>
                <div style={{ color: '#A5A5A5', paddingBottom: '30px' }}>
                  Aqui será exibida uma lista dos usuários inseridos neste Sub PDV.
                </div>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};
