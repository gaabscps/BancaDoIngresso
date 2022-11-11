import FilterVector from '@/assets/images/svg/FilterVector';
import UserIcon from '@/assets/images/svg/User';
import UserGroupIcon from '@/assets/images/svg/UserGroup';
import { Button, Dialog, Loading } from '@/components';
import { ActionProps } from '@/components/Dialog';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { FilterContent } from '@/features/usersAndGroups/components/FilterContent';
import { RegisterGroupContent } from '@/features/usersAndGroups/components/RegisterGroupContent';
import { RegisterUserContent } from '@/features/usersAndGroups/components/RegisterUserContent';
import { States } from '@/helpers/common/states';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import Profile from '@/model/Profile';
import User from '@/model/User';
import UserType from '@/model/UserType';
import React, { ChangeEvent } from 'react';
import { Container, Label } from 'reactstrap';
import {
  CheckBoxData,
  CheckBoxGroup,
  CheckBoxModule,
  CheckBoxPermission,
  CheckBoxUser,
  ShouldShowModal,
} from '..';
import { GroupList } from './GroupList';
import { UserList } from './UserList';
import '../style/table.scss';

interface StateProps {
  state: States;
  title: string;
  modalTitle: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  renderActionDialogToClearFilter: ActionProps;
  renderModalActionProps: ActionProps;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  formDataUser: FormData;
  formErrorsUser: FormErrors;
  users: CheckBoxUser[];
  formDataGroup: FormData;
  formErrorsGroup: FormErrors;
  groups: CheckBoxGroup[];
  userProfileCheckBox: CheckBoxData[];
  userSelectedCount: number;
  groupSelectedCount: number;
  userModules: CheckBoxGroup[];
  user?: User;
  group?: Profile;
  modules?: CheckBoxModule[];
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
  changeUserList(e: React.ChangeEvent<HTMLInputElement>, user: CheckBoxUser): void;
  checkAllGroupList(e: ChangeEvent<HTMLInputElement>): void;
  removeSelectedUsers(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  changeGroupList(e: React.ChangeEvent<HTMLInputElement>, group: CheckBoxGroup): void;
  changeFormInputFilter: OnChangeFormInput;
  onFilter(): Promise<void>;
  changeFormInputUser: OnChangeFormInput;
  onBlurCPF: () => void;
  changeFileInputUser: (inputName: string) => (file: File | undefined) => void;
  onActivateAndInactivateUser(e: ChangeEvent<HTMLInputElement>): void;
  onChangeUserTypeSelected(e: ChangeEvent<HTMLInputElement>, userType: CheckBoxData): void;
  onChangeUserGroupSelected(e: ChangeEvent<HTMLInputElement>, group: CheckBoxGroup): void;
  changeFormInputGroup: OnChangeFormInput;
  onActivateAndInactivateGroup(e: ChangeEvent<HTMLInputElement>): void;
  checkAllModule(e: ChangeEvent<HTMLInputElement>, module: CheckBoxModule): void;
  removeSelectedGroups(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  checkPermission(e: React.ChangeEvent<HTMLInputElement>, permission: CheckBoxPermission): void;
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
          [ShouldShowModal.filter]: props.renderActionDialogToClearFilter,
          [ShouldShowModal.user]: props.renderModalActionProps,
          [ShouldShowModal.group]: props.renderModalActionProps,
        }[props.shouldShowModal],
        {
          [ShouldShowModal.filter]: {
            title: 'Aplicar',
            onClick: (): Promise<void> => props.onFilter(),
          },
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
          [ShouldShowModal.filter]: (
            <FilterContent
              formData={props.formDataFilter}
              formErrors={props.formErrorsFilter}
              onChangeFormInput={props.changeFormInputFilter}
            />
          ),
          [ShouldShowModal.user]: (
            <RegisterUserContent
              formData={props.formDataUser}
              formErrors={props.formErrorsUser}
              userProfileCheckBox={props.userProfileCheckBox}
              modules={props.userModules}
              onChangeFormInput={props.changeFormInputUser}
              onBlurCPF={props.onBlurCPF}
              onChangeFileInput={props.changeFileInputUser}
              onActivateAndInactivate={props.onActivateAndInactivateUser}
              onChangeUserTypeSelected={props.onChangeUserTypeSelected}
              onChangeUserGroupSelected={props.onChangeUserGroupSelected}
            />
          ),
          [ShouldShowModal.group]: (
            <RegisterGroupContent
              formData={props.formDataGroup}
              formErrors={props.formErrorsGroup}
              modules={props.modules}
              onChangeFormInput={props.changeFormInputGroup}
              onActivateAndInactivate={props.onActivateAndInactivateGroup}
              checkAllModule={props.checkAllModule}
              checkPermission={props.checkPermission}
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
          <div className="filter-container">
            <div
              className="filter-content"
              onClick={(): void => props.openModal(ShouldShowModal.filter, '')}
            >
              <FilterVector />
            </div>
          </div>
        </div>
      </div>
      <div>
        <SuperCollapse
          title="Usuários cadastrados"
          className="action-icon"
          content={
            props.users && props.users.length > 0 ? (
              <UserList
                users={props.users}
                count={props.userSelectedCount}
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
          showButtonOnTitle={!!(props.userSelectedCount && props.userSelectedCount > 0)}
          buttonTitle="Deletar selecionados"
          buttonAction={props.removeSelectedUsers}
        />
        <SuperCollapse
          title="Grupos cadastrados"
          className="action-icon"
          content={
            props.groups && props.groups.length > 0 ? (
              <GroupList
                groups={props.groups}
                count={props.groupSelectedCount}
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
          showButtonOnTitle={!!(props.groupSelectedCount && props.groupSelectedCount > 0)}
          buttonTitle="Deletar selecionados"
          buttonAction={props.removeSelectedGroups}
        />
      </div>
    </Container>
  </React.Fragment>
);
