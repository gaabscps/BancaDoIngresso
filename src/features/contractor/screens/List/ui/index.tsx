/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading } from '@/components';
import { Container, Label } from 'reactstrap';
import { RegisterContent } from '@/features/contractor/components/RegisterContent';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnStatus, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import Contractor from '@/model/Contractor';
import {
  BanckAccountForm,
  ContractorControllerBankAccount,
  ContractorControllerPix,
  ContractorControllerUser,
  ContractorRequestParams,
  PixForm,
} from '@/features/contractor/types';
import { FilterContent } from '@/features/contractor/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import { RegisterBankAccount } from '@/features/contractor/components/RegisterBankAccount';
import { RegisterPix } from '@/features/contractor/components/RegisterPix';
import ContractorType from '@/model/ContractorType';
import { columnsContractor } from './table';
import { colors } from '@/styles/colors';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRowContractor {
  id: string;
  name: string;
  document: string;
  telephone: string;
  companyType: number;
  actions: string;
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
  filter = 'filter',
  registerContractor = 'registerContractor',
  registerBankAccount = 'registerBankAccount',
  registerPix = 'registerPix',
}

interface ContractorContainerProps {
  state: States;
  contractorState: Contractor | undefined;
  listContractor: Contractor[];
  currentPage: ContractorRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataContractor: FormData;
  formErrorsContractor: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  listBankAccount: BanckAccountForm[];
  clearFilter: () => void;
  onSaveContractor: () => Promise<void>;
  onSaveBankAccount: () => Promise<void>;
  onSavePix: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  changeColorColumn: (status: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputContractor: OnChangeFormInput;
  onShowDeleteContractor: (pos: Contractor) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    contractor,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    contractor?: Contractor;
  }) => void;
  controllerInputAppendBankAccount: ContractorControllerBankAccount;
  controllerInputAppendPix: ContractorControllerPix;
  onDeleteRowBankAccount: (bankAccount: BanckAccountForm) => void;
  listPixTable: PixForm[];
  onDeleteRowPix: (pix: PixForm) => void;
  listContractorType: ContractorType[];
  controllerAppendUser: ContractorControllerUser;
}

export const ContractorContainer: React.FC<ContractorContainerProps> = ({
  listContractor,
  listContractorType,
  state,
  contractorState,
  currentPage,
  title,
  visible,
  shouldShowModal,
  formDataContractor,
  formErrorsContractor,
  formDataFilter,
  formErrorsFilter,
  listBankAccount,
  listPixTable,
  clearFilter,
  onChangeFormInputFilter,
  onChangeFormInputContractor,
  onSaveContractor,
  onSaveBankAccount,
  onSavePix,
  onPaginationChange,
  changeColorColumn,
  onToggle,
  onFilter,
  onShouldShowModal,
  onShowDeleteContractor,
  controllerInputAppendBankAccount,
  controllerInputAppendPix,
  controllerAppendUser,
  onDeleteRowBankAccount,
  onDeleteRowPix,
}) => {
  const dataTableContractor = listContractor?.map(item => ({
    id: item.id,
    name: (
      <ColumnStatus statusColor={String(changeColorColumn(Number(item.status)))}>
        {item.name}
      </ColumnStatus>
    ),
    document: item.document,
    telephone: item.telephone,
    companyType: item.contractorType.name ?? '----',
    actions: (
      <React.Fragment>
        <Pen
          className="mr-2 svg-icon action-icon"
          onClick={(): void => {
            onToggle();
            onShouldShowModal({
              value: ShouldShowModal.registerContractor,
              newTitleModal: `${item.name}`,
              contractor: item,
            });
          }}
        />
        <Trash
          className="mr-2 svg-icon action-icon"
          onClick={() => {
            onShowDeleteContractor(item);
          }}
        />
      </React.Fragment>
    ),
  }));

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
  const renderActionDialogToCancelFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): void => clearFilter(),
    theme: 'noneBorder',
  };

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        position={shouldShowModal === ShouldShowModal.filter ? 'right' : 'center'}
        isContentWithCard={shouldShowModal !== ShouldShowModal.filter}
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToCancelFilter,
            [ShouldShowModal.registerContractor]: renderActionDialogToCancel,
            [ShouldShowModal.registerBankAccount]: renderActionDialogToReturn,
            [ShouldShowModal.registerPix]: renderActionDialogToReturn,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
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
            [ShouldShowModal.filter]: (
              <FilterContent
                formData={formDataFilter}
                formErrors={formErrorsFilter}
                onChangeFormInput={onChangeFormInputFilter}
              />
            ),
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

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>Empresas</Label>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar nova empresa"
              onClick={(): void => {
                onToggle();
                onShouldShowModal({
                  value: ShouldShowModal.registerContractor,
                  newTitleModal: 'Cadastrar nova empresa (contratante)',
                });
              }}
            />
            <div className="filter-container">
              <div
                className="filter-content"
                onClick={(): void => {
                  onToggle();
                  onShouldShowModal({
                    value: ShouldShowModal.filter,
                    newTitleModal: '',
                  });
                }}
              >
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex pb-2 status-container">
          <div className="eventStatus subText">
            <Status style={{ color: '#7AD81B' }} />
            Empresa ativa
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: colors.red }} />
            Empresa inativa
          </div>
        </div>
        <CustomTable
          columns={columnsContractor}
          data={dataTableContractor}
          numberRowsPerPage={currentPage.pageSize}
          progressPending={state === States.loading}
          theme="primary"
        />
        <Pagination
          currentPage={currentPage.page}
          totalCount={currentPage.total}
          pageSize={currentPage.pageSize}
          onPageChange={page => onPaginationChange(page)}
          total={currentPage.total}
        />
      </Container>
    </Fragment>
  );
};
