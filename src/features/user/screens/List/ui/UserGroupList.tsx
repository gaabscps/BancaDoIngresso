import UserIcon from '@/assets/images/svg/User';
import UserGroupIcon from '@/assets/images/svg/UserGroup';
import { Button, Dialog, Loading } from '@/components';
import { ActionProps } from '@/components/Dialog';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { RegisterGroupContent } from '@/features/user/components/RegisterGroupContent';
import { RegisterUserContent } from '@/features/user/components/RegisterUserContent';
import { States } from '@/helpers/common/states';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import Module from '@/model/Module';
import Profile from '@/model/Profile';
import User from '@/model/User';
import UserType from '@/model/UserType';
import React, { ChangeEvent } from 'react';
import { Container, Label } from 'reactstrap';
import { ShouldShowModal } from '..';
import { GroupList } from './GroupList';
import { UserList } from './UserList';

interface StateProps {
  state: States;
  title: string;
  modalTitle: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  renderModalActionProps: ActionProps;
  formDataUser: FormData;
  formErrorsUser: FormErrors;
  users: User[];
  formDataGroup: FormData;
  formErrorsGroup: FormErrors;
  groups: Profile[];
  user?: User;
  group?: Profile;
  modules?: Module[];
}

interface DispatchProps {
  onToggle(): void;
  openModal(value: ShouldShowModal, modalTitle: string, user?: User, group?: Profile): void;
  showDeleteUser(user: User): void;
  showDeleteGroup(profile: Profile): void;
  saveUser(): Promise<void>;
  saveGroup(): Promise<void>;
  checkAllUserList(e: ChangeEvent<HTMLInputElement>): void;
  toUserType(userType: UserType): string;
  changeUserList(user: User): void;
  checkAllGroupList(e: ChangeEvent<HTMLInputElement>): void;
  changeGroupList(profile: Profile): void;
  changeFormInputUser: OnChangeFormInput;
  changeFileInputUser: (inputName: string) => (file: File | undefined) => void;
  changeFormInputGroup: OnChangeFormInput;
}

type Props = StateProps & DispatchProps;

export const UserGroupList: React.FC<Props> = (props: Props): JSX.Element => (
  <React.Fragment>
    <Loading isVisible={props.state === States.loading} />
    <Dialog
      title={props.modalTitle}
      visible={props.visible}
      onClose={props.onToggle}
      position="center"
      isContentWithCard={props.shouldShowModal !== ShouldShowModal.group}
      actions={[
        {
          [ShouldShowModal.user]: props.renderModalActionProps,
          [ShouldShowModal.group]: props.renderModalActionProps,
        }[props.shouldShowModal],
        {
          [ShouldShowModal.user]: {
            title: props.user?.id ? 'Editar usuário' : 'Cadastrar usuário',
            onClick: (): Promise<void> => props.saveUser(),
          },
          [ShouldShowModal.group]: {
            title: props.group?.id ? 'Editar grupo' : 'Cadastrar grupo',
            onClick: (): Promise<void> => props.saveGroup(),
          },
        }[props.shouldShowModal],
      ]}
    >
      {
        {
          [ShouldShowModal.user]: (
            <RegisterUserContent
              formData={props.formDataUser}
              formErrors={props.formErrorsUser}
              onChangeFormInput={props.changeFormInputUser}
              onChangeFileInput={props.changeFileInputUser}
            />
          ),
          [ShouldShowModal.group]: (
            <RegisterGroupContent
              formData={props.formDataGroup}
              formErrors={props.formErrorsGroup}
              modules={props.modules}
              onChangeFormInput={props.changeFormInputGroup}
            />
          ),
        }[props.shouldShowModal]
      }
    </Dialog>
    <Container className="mainContainer" fluid={true}>
      <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
        <div className="pageTitle" style={{ display: 'grid' }}>
          <Label>{props.title}</Label>
        </div>
        <div className="button-filter-container">
          <Button
            theme="outlineDark"
            size="md"
            title="+ Cadastrar grupo"
            style={{ marginRight: 25 }}
            onClick={(): void => props.openModal(ShouldShowModal.group, 'Cadastrar grupo')}
          />
          <Button
            size="md"
            title="+ Cadastrar usuário "
            onClick={(): void => props.openModal(ShouldShowModal.user, 'Cadastrar usuário')}
          />
        </div>
      </div>
      <div>
        <SuperCollapse
          title="Usuários cadastrados"
          content={
            props.users && props.users.length > 0 ? (
              <UserList
                users={props.users}
                change={props.changeUserList}
                checkAll={props.checkAllUserList}
                toUserType={props.toUserType}
                openModal={props.openModal}
                showDelete={props.showDeleteUser}
              />
            ) : (
              'Nenhum usuário cadastrado. Aqui será exibida uma lista dos usuários cadastrados'
            )
          }
          leftIcon={UserIcon}
          count={props.users.length}
        />
        <SuperCollapse
          title="Grupos cadastrados"
          content={
            props.groups && props.groups.length > 0 ? (
              <GroupList
                groups={props.groups}
                change={props.changeGroupList}
                checkAll={props.checkAllGroupList}
                openModal={props.openModal}
                showDelete={props.showDeleteGroup}
              />
            ) : (
              'Nenhum grupo cadastrado. Aqui será exibida uma lista dos grupos cadastrados'
            )
          }
          leftIcon={UserGroupIcon}
          count={props.groups.length}
        />
      </div>
    </Container>
  </React.Fragment>
);
