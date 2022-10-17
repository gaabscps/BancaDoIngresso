import { Dialog, Loading } from '@/components';
import { ActionProps } from '@/components/Dialog';
import { FilterContent } from '@/features/user/components/FilterContent';
import { RegisterContent } from '@/features/user/components/RegisterContent';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import User from '@/model/User';
import React from 'react';

// eslint-disable-next-line no-shadow
enum States {
  default = 'default',
  loading = 'loading',
}
// eslint-disable-next-line no-shadow
enum ShouldShowModal {
  user = 'pdv',
  filter = 'filter',
}

interface UserContainerProps {
  title: string;
  visible: boolean;
  onToggle: () => void;
  clearFilter: () => void;
  onFilter: () => Promise<void>;
  onSaveUser: () => Promise<void>;
  onChangeFormInputFilter: OnChangeFormInput;
  onChangeFormInputUser: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  setErrorsUser: (errors: FormErrors) => void;
  formDataUser: FormData;
  formDataFilter: FormData;
  formErrorsUser: FormErrors;
  formErrorsFilter: FormErrors;
  shouldShowModal: ShouldShowModal;
  state: States;
  entity?: User;
  list: User[];
}
export const UserContainer: React.FC<UserContainerProps> = (
  props: UserContainerProps,
): JSX.Element => {
  const renderActionDialogToClearFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): void => {
      props.clearFilter();
    },
    theme: 'noneBorder',
  };
  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => props.onToggle(),
    theme: 'noneBorder',
  };

  return (
    <React.Fragment>
      <Loading isVisible={props.state === States.loading} />
      <Dialog
        title={props.title}
        visible={props.visible}
        onClose={props.onToggle}
        position={props.shouldShowModal === ShouldShowModal.filter ? 'right' : 'center'}
        isContentWithCard={props.shouldShowModal !== ShouldShowModal.filter}
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToClearFilter,
            [ShouldShowModal.user]: renderActionDialogToCancel,
          }[props.shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => props.onFilter(),
            },
            [ShouldShowModal.user]: {
              title: props.entity?.id ? 'Editar Usuário' : 'Cadastrar novo Usuário',
              onClick: (): Promise<void> => props.onSaveUser(),
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
                onChangeFormInput={props.onChangeFormInputFilter}
              />
            ),
            [ShouldShowModal.user]: (
              <RegisterContent
                formData={props.formDataUser}
                formErrors={props.formErrorsUser}
                onChangeFormInput={props.onChangeFormInputUser}
                onChangeFileInput={props.onChangeFileInput}
              />
            ),
          }[props.shouldShowModal]
        }
      </Dialog>
    </React.Fragment>
  );
};
