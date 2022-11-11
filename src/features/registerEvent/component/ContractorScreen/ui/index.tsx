/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { RegisterContent } from '@/features/registerEvent/component/ContractorScreen/component/RegisterContent';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import Contractor from '@/model/Contractor';
import {
  BanckAccountForm,
  ContractorControllerBankAccount,
  ContractorControllerPix,
  ContractorControllerUser,
  PixForm,
} from '@/features/registerEvent/component/ContractorScreen/types';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import { RegisterBankAccount } from '@/features/registerEvent/component/ContractorScreen/component/RegisterBankAccount';
import { RegisterPix } from '@/features/registerEvent/component/ContractorScreen/component/RegisterPix';
import ContractorType from '@/model/ContractorType';
import { toast } from 'react-toastify';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export interface DataRowBankAccount {
  id: number;
  name: string;
  agencia: string;
  conta: string;
  actions: string;
}

export interface DataRowPix {
  id: number;
  name: string;
  type: string;
  pix: string;
  actions: string;
}

export interface DataRowUser {
  id: number;
  name: string;
  login: string;
  actions: string;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  registerContractor = 'registerContractor',
  registerBankAccount = 'registerBankAccount',
  registerPix = 'registerPix',
}

interface ContractorContainerProps {
  state: States;
  contractorState: Contractor | undefined;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataContractor: FormData;
  formErrorsContractor: FormErrors;
  listBankAccount: BanckAccountForm[];
  onSaveContractor: () => Promise<void>;
  onSaveBankAccount: () => Promise<void>;
  onSavePix: () => Promise<void>;
  onToggle: () => void;
  onChangeFormInputContractor: OnChangeFormInput;
  onShouldShowModal: ({
    value,
    newTitleModal,
    contractor,
    isEdit,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    contractor?: Contractor;
    isEdit?: boolean;
  }) => void;
  controllerInputAppendBankAccount: ContractorControllerBankAccount;
  controllerInputAppendPix: ContractorControllerPix;
  onDeleteRowBankAccount: (bankAccount: BanckAccountForm) => void;
  listPixTable: PixForm[];
  onDeleteRowPix: (pix: PixForm) => void;
  listContractorType: ContractorType[];
  controllerAppendUser: ContractorControllerUser;
  contractorSelected: Contractor | undefined;
}

export const ContractorContainer: React.FC<ContractorContainerProps> = ({
  contractorSelected,
  listContractorType,
  state,
  contractorState,
  title,
  visible,
  shouldShowModal,
  formDataContractor,
  formErrorsContractor,
  listBankAccount,
  listPixTable,
  onChangeFormInputContractor,
  onSaveContractor,
  onSaveBankAccount,
  onSavePix,
  onToggle,
  onShouldShowModal,
  controllerInputAppendBankAccount,
  controllerInputAppendPix,
  controllerAppendUser,
  onDeleteRowBankAccount,
  onDeleteRowPix,
}) => {
  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };
  const renderActionDialogToReturn: ActionProps = {
    title: 'Cancelar',
    onClick: (): void =>
      onShouldShowModal({
        value: ShouldShowModal.registerContractor,
        newTitleModal: contractorState?.id
          ? contractorState.name
          : 'Cadastrar nova empresa (contratante)',
        contractor: contractorState,
      }),
    theme: 'noneBorder',
  };

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        isContentWithCard={true}
        actions={[
          {
            [ShouldShowModal.registerContractor]: renderActionDialogToCancel,
            [ShouldShowModal.registerBankAccount]: renderActionDialogToReturn,
            [ShouldShowModal.registerPix]: renderActionDialogToReturn,
          }[shouldShowModal],
          {
            [ShouldShowModal.registerContractor]: {
              title: contractorState?.id ? 'Salvar' : 'Cadastrar nova empresa',
              onClick: (): Promise<void> => onSaveContractor(),
              disabled:
                Object.keys(formErrorsContractor).length === 0 &&
                formErrorsContractor.constructor === Object,
            },
            [ShouldShowModal.registerBankAccount]: {
              title: 'Salvar',
              onClick: (): Promise<void> => onSaveBankAccount(),
              disabled: controllerInputAppendBankAccount.bankAccount.length === 0,
            },
            [ShouldShowModal.registerPix]: {
              title: 'Salvar',
              onClick: (): Promise<void> => onSavePix(),
              disabled: controllerInputAppendPix.pix.length === 0,
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.registerContractor]: (
              <RegisterContent
                formData={formDataContractor}
                formErrors={formErrorsContractor}
                onChangeFormInput={onChangeFormInputContractor}
                listPixTable={listPixTable}
                contractorState={contractorState}
                listContractorType={listContractorType}
                listBankAccount={listBankAccount}
                onShouldShowModal={onShouldShowModal}
                onDeleteRowBankAccount={onDeleteRowBankAccount}
                onDeleteRowPix={onDeleteRowPix}
                controllerAppendUser={controllerAppendUser}
              />
            ),
            [ShouldShowModal.registerBankAccount]: (
              <RegisterBankAccount
                formErrors={formErrorsContractor}
                controllerInputAppendBankAccount={controllerInputAppendBankAccount}
              />
            ),
            [ShouldShowModal.registerPix]: (
              <RegisterPix
                formErrors={formErrorsContractor}
                controllerInputAppendPix={controllerInputAppendPix}
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
                value: ShouldShowModal.registerContractor,
                newTitleModal: 'Cadastrar nova empresa (contratante)',
              });
            }}
          >
            + cadastrar nova empresa ou contratante
          </div>
          <div
            className="link-grey"
            onClick={(): void => {
              if (!contractorSelected) {
                toast.warn('Selecione uma empresa ou contratante para continuar');
              } else {
                onToggle();
                onShouldShowModal({
                  value: ShouldShowModal.registerContractor,
                  newTitleModal: contractorSelected?.id
                    ? contractorSelected?.name
                    : 'Cadastrar nova empresa (contratante)',
                  contractor: contractorSelected,
                });
              }
            }}
          >
            <Pen height={12} width={12} /> editar
          </div>
        </span>
      </div>
    </Fragment>
  );
};
