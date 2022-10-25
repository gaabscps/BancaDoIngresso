import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { Button, Loading, Dialog } from '@/components';
import { ColumnImage, CustomTable } from '@/components/Table';
import { ActionProps } from '@/components/Dialog';
import Pdv from '@/model/Pdv';
import SubPdv from '@/model/SubPdv';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { ContractorControllerUser, PdvRequestParams } from '@/features/pdv/types';
import Pagination from '@/components/Utils/Pagination';
import { RegisterContent } from '@/features/pdv/components/RegisterContent';
import { FilterContent } from '@/features/pdv/components/FilterContent';
import { ListContentSub } from '@/features/pdv/components/ListContentSub';

import FilterVector from '@/assets/images/svg/FilterVector';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as SubPdvIcon } from '@/assets/images/svg/subPDV.svg';

import { RegisterContentSubPdv } from '@/features/pdv/components/RegisterContentSubPdv';
import { columns } from './table';
import { NameFiles } from '..';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  pdv = 'pdv',
  subpdv = 'subpdv',
  subpdvRegister = 'subpdvRegister',
  filter = 'filter',
}

interface PdvContainerProps {
  state: States;
  pdvState?: Pdv;
  subPdvState?: SubPdv;
  listPdv: Pdv[];
  listSubPdv: SubPdv[];
  nameFiles: NameFiles;
  title: string | React.ReactNode;
  currentPage: PdvRequestParams;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  formDataPdv: FormData;
  formErrorsPdv: FormErrors;
  formDataSubPdv: FormData;
  formErrorsSubPdv: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  setErrorsPdv: (errors: FormErrors) => void;
  onChangeFormInputPdv: OnChangeFormInput;
  onChangeFormInputSubPdv: OnChangeFormInput;
  clearFilter: () => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onPaginationChange: (page: number) => void;
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
  onSavePdv: () => Promise<void>;
  onSaveSubPdv: () => Promise<void>;
  onFilter: () => Promise<void>;
  // onShowEdit: (id: string) => Promise<void>;
  onShowDelete: (pdv: Pdv) => void;
  onShowDeleteSubPdv: (subPdv: SubPdv) => void;
  onShowEditSubPdv: (subPdv: SubPdv) => void;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  // onShowListSub: (id: string, name: string) => Promise<void>;
  // onShowFilter: () => void;
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
  pdvState,
  subPdvState,
  listPdv,
  listSubPdv,
  nameFiles,
  title,
  currentPage,
  visible,
  shouldShowModal,
  formDataPdv,
  formErrorsPdv,
  formDataSubPdv,
  formErrorsSubPdv,
  formDataFilter,
  formErrorsFilter,
  setErrorsPdv,
  onChangeFormInputPdv,
  onChangeFormInputSubPdv,
  onChangeFormInputFilter,
  onToggle,
  onPaginationChange,
  onShouldShowModal,
  clearFilter,
  onSavePdv,
  onSaveSubPdv,
  onFilter,
  onShowDelete,
  onShowDeleteSubPdv,
  onShowEditSubPdv,
  onChangeFileInput,
  controllerAppendUser,
}) => {
  useEffect(() => {
    console.log('subPdvState :>> ', subPdvState);
  }, [subPdvState]);

  useEffect(() => {
    console.log('pdvState :>> ', pdvState);
  }, [pdvState]);

  const dataTablePdv = listPdv?.map(pdv => ({
    id: pdv.id,
    imageBase64: <ColumnImage srcImage={pdv.imageBase64} />,
    name: pdv.name,
    street: pdv.address.street,
    city: pdv.address.city,
    state: pdv.address.state,
    actions: (
      <div className="d-flex">
        {pdv.amountSubPdvs !== undefined && pdv.amountSubPdvs > 0 && (
          <span
            className="badge badge-custom position-absolute top-0 start-100 translate-middle rounded-pill bg-danger"
            style={{ marginLeft: '12px' }}
          >
            {pdv.amountSubPdvs}
          </span>
        )}
        <SubPdvIcon
          onClick={(): void => {
            onToggle();
            onShouldShowModal({
              value: ShouldShowModal.subpdv,
              newTitleModal: (
                <div className="subpdv-modal-header-container">
                  {pdv.name ?? 'Sub PDV'}
                  <div className="subpdv-register-buttom">
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={(): void =>
                        onShouldShowModal({
                          newTitleModal: 'Cadastrar Sub PDV',
                          value: ShouldShowModal.subpdvRegister,
                          subPdv: { pdv: { ...pdv } } as any,
                        })
                      }
                    >
                      + cadastrar novo Sub PDV
                    </a>
                  </div>
                </div>
              ),
              pdv,
            });
          }}
          className="mr-4 svg-icon action-icon"
        />
        <Pen
          onClick={(): void => {
            onToggle();
            onShouldShowModal({
              value: ShouldShowModal.pdv,
              newTitleModal: pdv.name,
              pdv,
            });
          }}
          className="mr-4 svg-icon action-icon"
        />
        <Trash
          onClick={(): void => onShowDelete(pdv)}
          className="mr-4 svg-icon action-icon svg-icon-trash"
        />
      </div>
    ),
  }));

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };
  const renderActionDialogToClearFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): void => {
      clearFilter();
    },
    theme: 'noneBorder',
  };

  const renderActionDialogToReturnListSubPdv: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => {
      // onToggle();
      onShouldShowModal({
        value: ShouldShowModal.subpdv,
        newTitleModal: (
          <div className="subpdv-modal-header-container">
            {pdvState?.name ?? 'Sub PDV'}
            <div className="subpdv-register-buttom">
              <a
                style={{ cursor: 'pointer' }}
                onClick={(): void =>
                  onShouldShowModal({
                    newTitleModal: 'Cadastrar novo Sub PDV',
                    value: ShouldShowModal.subpdvRegister,
                  })
                }
              >
                + cadastrar novo Sub PDV
              </a>
            </div>
          </div>
        ),
        pdv: pdvState,
      });
    },
    theme: 'noneBorder',
  };

  return (
    <React.Fragment>
      <Loading isVisible={state === States.loading} />

      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        position={shouldShowModal === ShouldShowModal.filter ? 'right' : 'center'}
        isContentWithCard={
          shouldShowModal !== ShouldShowModal.filter && shouldShowModal !== ShouldShowModal.subpdv
        }
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToClearFilter,
            [ShouldShowModal.pdv]: renderActionDialogToCancel,
            [ShouldShowModal.subpdv]: {},
            [ShouldShowModal.subpdvRegister]: renderActionDialogToReturnListSubPdv,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.pdv]: {
              title: pdvState?.id ? 'Salvar' : 'Cadastrar novo PDV',
              onClick: (): Promise<void> => onSavePdv(),
            },
            [ShouldShowModal.subpdv]: {},
            [ShouldShowModal.subpdvRegister]: {
              title: subPdvState?.id ? 'Salvar' : 'Cadastrar novo SubPDV',
              onClick: (): Promise<void> => onSaveSubPdv(),
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
            [ShouldShowModal.subpdv]: (
              <ListContentSub
                dataList={listSubPdv}
                onShowDeleteSubPdv={onShowDeleteSubPdv}
                onShowEditSubPdv={onShowEditSubPdv}
              />
            ),
            [ShouldShowModal.subpdvRegister]: (
              <RegisterContentSubPdv
                formData={formDataSubPdv}
                formErrors={formErrorsSubPdv}
                onChangeFormInput={onChangeFormInputSubPdv}
                setErrorsPdv={setErrorsPdv}
                controllerAppendUser={controllerAppendUser}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <h5 className="pageTitle">PDV</h5>
          <div className="button-filter-container">
            <Button
              size="md"
              title="+ Cadastrar novo PDV"
              onClick={(): void => {
                onToggle();
                onShouldShowModal({
                  value: ShouldShowModal.pdv,
                  newTitleModal: 'Cadastrar novo PDV',
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
        <CustomTable
          columns={columns}
          data={dataTablePdv}
          numberRowsPerPage={currentPage.pageSize}
          progressPending={state === States.loading}
        />
        <Pagination
          currentPage={currentPage.page}
          totalCount={currentPage.total}
          pageSize={currentPage.pageSize}
          onPageChange={page => onPaginationChange(page)}
          total={currentPage.total}
        />
      </Container>
    </React.Fragment>
  );
};
