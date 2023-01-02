import React from 'react';
import { Loading, Dialog } from '@/components';
import Pdv from '@/model/Pdv';
import SubPdv from '@/model/SubPdv';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { ContractorControllerUser } from '@/features/pdv/types';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';

import { RegisterContentSubPdv } from '@/features/core/SubPdvScreen/components/RegisterContentSubPdv';
import { toast } from 'react-toastify';
import { ActionProps } from '@/components/Dialog';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  subpdvRegister = 'subpdvRegister',
}

interface PdvContainerProps {
  state: States;
  subPdvState?: SubPdv;
  title: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  formDataSubPdv: FormData;
  formErrorsSubPdv: FormErrors;
  onChangeFormInputSubPdv: OnChangeFormInput;
  onToggle: () => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    pdv,
    subPdv,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pdv?: Pdv;
    subPdv?: SubPdv;
  }) => void;
  onSaveSubPdv: () => Promise<void>;
  controllerAppendUser: ContractorControllerUser;
  subPdvDropdownSelected: SubPdv | undefined;
  onShowEditSubPdv: (subPdv: SubPdv) => void;
}

export interface DataRow {
  id: string;
  imageBase64: string;
  name: string;
  street: string;
  city: string;
  state: string;
  actions: string;
  status: string;
}

export const SubPdvContainer: React.FC<PdvContainerProps> = ({
  state,
  subPdvState,
  title,
  visible,
  shouldShowModal,
  formDataSubPdv,
  formErrorsSubPdv,
  onChangeFormInputSubPdv,
  onToggle,
  onShouldShowModal,
  onSaveSubPdv,
  controllerAppendUser,
  subPdvDropdownSelected,
  onShowEditSubPdv,
}) => {
  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

  return (
    <React.Fragment>
      <Loading isVisible={state === States.loading} />

      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        position="center"
        isContentWithCard={true}
        actions={[
          {
            [ShouldShowModal.subpdvRegister]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.subpdvRegister]: {
              title: subPdvState?.id ? 'Salvar' : 'Cadastrar novo SubPDV',
              onClick: (): Promise<void> => onSaveSubPdv(),
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.subpdvRegister]: (
              <RegisterContentSubPdv
                formData={formDataSubPdv}
                formErrors={formErrorsSubPdv}
                onChangeFormInput={onChangeFormInputSubPdv}
                controllerAppendUser={controllerAppendUser}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <div className="d-flex flex-column mb-5" style={{ marginTop: '-20px' }}>
        <span className="d-flex">
          <div
            className="mr-5 link-green"
            onClick={(): void => {
              onToggle();
              onShouldShowModal({
                newTitleModal: 'Cadastrar novo Sub PDV',
                value: ShouldShowModal.subpdvRegister,
              });
            }}
          >
            + cadastrar novo Sub PDV
          </div>
          <div
            className="link-grey"
            onClick={(): void => {
              if (!subPdvDropdownSelected) {
                toast.warn('Selecione um Sub PDV para editar');
              } else {
                onToggle();
                onShowEditSubPdv(subPdvDropdownSelected);
              }
            }}
          >
            <Pen height={12} width={12} /> editar
          </div>
        </span>
      </div>
    </React.Fragment>
  );
};
