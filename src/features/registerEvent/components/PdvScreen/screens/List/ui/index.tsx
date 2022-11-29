import React from 'react';
import { Loading, Dialog } from '@/components';
import { ActionProps } from '@/components/Dialog';
import Pdv from '@/model/Pdv';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { ContractorControllerUser } from '@/features/pdv/types';
import { RegisterContent } from '@/features/pdv/components/RegisterContent';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { toast } from 'react-toastify';
import { NameFiles } from '..';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  pdv = 'pdv',
}

interface PdvContainerProps {
  state: States;
  pdvDropdownSelected: Pdv | undefined;
  pdvState?: Pdv;
  nameFiles: NameFiles;
  title: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  formDataPdv: FormData;
  formErrorsPdv: FormErrors;
  setErrorsPdv: (errors: FormErrors) => void;
  onChangeFormInputPdv: OnChangeFormInput;
  onToggle: () => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    pdv,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pdv?: Pdv;
  }) => void;
  onSavePdv: () => Promise<void>;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  controllerAppendUser: ContractorControllerUser;
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

export const PdvContainer: React.FC<PdvContainerProps> = ({
  state,
  pdvDropdownSelected,
  pdvState,
  nameFiles,
  title,
  visible,
  shouldShowModal,
  formDataPdv,
  formErrorsPdv,
  setErrorsPdv,
  onChangeFormInputPdv,
  onToggle,
  onShouldShowModal,
  onSavePdv,
  onChangeFileInput,
  controllerAppendUser,
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
            [ShouldShowModal.pdv]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.pdv]: {
              title: pdvState?.id ? 'Salvar' : 'Cadastrar novo PDV',
              onClick: (): Promise<void> => onSavePdv(),
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.pdv]: (
              <RegisterContent
                formData={formDataPdv}
                formErrors={formErrorsPdv}
                onChangeFormInput={onChangeFormInputPdv}
                onChangeFileInput={onChangeFileInput}
                nameFiles={nameFiles}
                setErrorsPdv={setErrorsPdv}
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
                value: ShouldShowModal.pdv,
              });
            }}
          >
            + cadastrar novo PDV
          </div>
          <div
            className="link-grey"
            onClick={(): void => {
              if (!pdvDropdownSelected) {
                toast.warn('Selecione um PDV para editar');
              } else {
                onToggle();
                onShouldShowModal({
                  value: ShouldShowModal.pdv,
                  newTitleModal: pdvDropdownSelected?.id
                    ? pdvDropdownSelected?.name
                    : 'Cadastrar novo Sub PDV',
                  pdv: pdvDropdownSelected,
                });
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
