import { Dialog, Loading } from '@/components';
import { ActionProps } from '@/components/Dialog';
import { RegisterUserContent } from '@/features/core/UserScreen/components/RegisterUserContent';
import { States } from '@/helpers/common/states';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import Profile from '@/model/Profile';
import User from '@/model/User';
import React, { ChangeEvent } from 'react';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { toast } from 'react-toastify';
import { CheckBoxUser } from '@/features/usersAndGroups/screens/List';
import {
  CheckBoxData,
  CheckBoxGroup,
  CheckBoxModule,
  CheckBoxPermission,
  ShouldShowModal,
} from '..';

interface StateProps {
  state: States;
  title: string;
  modalTitle: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  renderModalActionProps: ActionProps;
  formDataUser: FormData;
  formErrorsUser: FormErrors;
  users: CheckBoxUser[];
  userProfileCheckBox: CheckBoxData[];
  userModules: CheckBoxGroup[];
  user?: User;
  modules?: CheckBoxModule[];
}

interface DispatchProps {
  onToggle(): void;
  openModal(value: ShouldShowModal, modalTitle: string, user?: User, group?: Profile): void;
  saveUser(): Promise<void>;
  changeFormInputUser: OnChangeFormInput;
  onBlurCPF: () => void;
  changeFileInputUser: (inputName: string) => (file: File | undefined) => void;
  onActivateAndInactivateUser(e: ChangeEvent<HTMLInputElement>): void;
  onChangeUserTypeSelected(e: ChangeEvent<HTMLInputElement>, userType: CheckBoxData): void;
  onChangeUserGroupSelected(e: ChangeEvent<HTMLInputElement>, group: CheckBoxGroup): void;
  checkPermission(e: React.ChangeEvent<HTMLInputElement>, permission: CheckBoxPermission): void;
  userDropdownSelected: User;
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
      isContentWithCard={true}
      actions={[
        {
          [ShouldShowModal.user]: props.renderModalActionProps,
        }[props.shouldShowModal],
        {
          [ShouldShowModal.user]: {
            title: props.user?.id ? 'Editar usuário' : 'Cadastrar usuário',
            onClick: (): Promise<void> => props.saveUser(),
            disabled:
              props.formDataUser.cpf === '' ||
              props.formDataUser.email === '' ||
              props.formDataUser.telephone === '' ||
              props.formDataUser.name === '' ||
              props.formDataUser.password === '',
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
        }[props.shouldShowModal]
      }
    </Dialog>

    <div className="d-flex flex-column mb-5" style={{ marginTop: '-20px' }}>
      <span className="d-flex">
        <div
          className="mr-5 link-green"
          onClick={(): void => props.openModal(ShouldShowModal.user, 'Cadastrar grupo')}
        >
          + cadastrar novo usuário
        </div>
        <div
          className="link-grey"
          onClick={(): void => {
            if (!props.userDropdownSelected) {
              toast.warn('Selecione um usuário para editar');
            } else {
              props.openModal(ShouldShowModal.user, 'Editar usuário', props.userDropdownSelected);
            }
          }}
        >
          <Pen height={12} width={12} /> editar
        </div>
      </span>
    </div>
  </React.Fragment>
);
