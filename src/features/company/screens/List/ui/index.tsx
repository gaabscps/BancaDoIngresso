/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading } from '@/components';
import { Container, Label } from 'reactstrap';
import { RegisterContent } from '@/features/company/components/RegisterContent';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnStatus, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import Company from '@/model/Company';
import { CompanyControllerBankAccount, CompanyControllerPix, CompanyRequestParams } from '@/features/company/types';
import { FilterContent } from '@/features/company/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import { RegisterBankAccount } from '@/features/company/components/RegisterBankAccount';
import { RegisterPix } from '@/features/company/components/RegisterPix';
import { columnsCompany } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRowCompany {
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

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  registerCompany = 'registerCompany',
  registerBankAccount = 'registerBankAccount',
  registerPix = 'registerPix',
}

interface CompanyContainerProps {
  state: States;
  companyState?: Company;
  listCompany: Company[];
  currentPage: CompanyRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataCompany: FormData;
  formErrorsCompany: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  listBankAccount: DataRowBankAccount[];
  clearFilter: () => void;
  onSaveCompany: () => Promise<void>;
  onSaveBankAccount: () => Promise<void>;
  onSavePix: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  changeColorColumn: (status: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputCompany: OnChangeFormInput;
  onShowDeleteCompany: (pos: Company) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    company,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    company?: Company;
  }) => void;
  controllerInputAppendBankAccount: CompanyControllerBankAccount;
  controllerInputAppendPix: CompanyControllerPix;
  onDeleteRowBankAccount: (company: Company) => void;
}

export const CompanyContainer: React.FC<CompanyContainerProps> = ({
  listCompany,
  listCompanyType,
  state,
  companyState,
  currentPage,
  title,
  visible,
  shouldShowModal,
  formDataCompany,
  formErrorsCompany,
  formDataFilter,
  formErrorsFilter,
  listBankAccount,
  listPixTable,
  clearFilter,
  onChangeFormInputFilter,
  onChangeFormInputCompany,
  onSaveCompany,
  onSaveBankAccount,
  onSavePix,
  onPaginationChange,
  changeColorColumn,
  onToggle,
  onFilter,
  onShouldShowModal,
  onShowDeleteCompany,
  controllerInputAppendBankAccount,
  controllerInputAppendPix,
  onDeleteRowBankAccount,
  onDeleteRowPix,
}) => {
  const dataTableCompany = listCompany?.map(item => ({
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
              value: ShouldShowModal.registerCompany,
              newTitleModal: `${item.name}`,
              company: item,
            });
          }}
        />
        <Trash
          className="mr-2 svg-icon action-icon"
          onClick={() => {
            onShowDeleteCompany(item);
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
        value: ShouldShowModal.registerCompany,
        newTitleModal: companyState?.id ? companyState.name : 'Cadastrar nova empresa',
        company: companyState,
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
            [ShouldShowModal.registerCompany]: renderActionDialogToCancel,
            [ShouldShowModal.registerBankAccount]: renderActionDialogToReturn,
            [ShouldShowModal.registerPix]: renderActionDialogToReturn,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.registerCompany]: {
              title: companyState?.id ? 'Salvar' : 'Cadastrar nova empresa',
              onClick: (): Promise<void> => onSaveCompany(),
              disabled:
                Object.keys(formErrorsCompany).length === 0 &&
                formErrorsCompany.constructor === Object,
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
            [ShouldShowModal.registerCompany]: (
              <RegisterContent
                formData={formDataCompany}
                formErrors={formErrorsCompany}
                onChangeFormInput={onChangeFormInputCompany}
                listCompany={listCompany}
                listPixTable={listPixTable}
                companyState={companyState}
                listCompanyType={listCompanyType}
                listBankAccount={listBankAccount}
                onShouldShowModal={onShouldShowModal}
                onDeleteRowBankAccount={onDeleteRowBankAccount}
                onDeleteRowPix={onDeleteRowPix}
              />
            ),
            [ShouldShowModal.registerBankAccount]: (
              <RegisterBankAccount
                formErrors={formErrorsCompany}
                controllerInputAppendBankAccount={controllerInputAppendBankAccount}
              />
            ),
            [ShouldShowModal.registerPix]: (
              <RegisterPix
                formErrors={formErrorsCompany}
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
                  value: ShouldShowModal.registerCompany,
                  newTitleModal: 'Cadastrar nova empresa',
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
            <Status style={{ color: '#E64F49' }} />
            Empresa inativa
          </div>
        </div>
        <CustomTable
          columns={columnsCompany}
          data={dataTableCompany}
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
