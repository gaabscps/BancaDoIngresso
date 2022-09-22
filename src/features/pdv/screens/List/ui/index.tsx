import React from 'react';
import { Container, Label } from 'reactstrap';
import { Button, Loading, Dialog } from '@/components';
import { ColumnImage, CustomTable } from '@/components/Table';
import { ActionProps } from '@/components/Dialog';
import Pdv from '@/model/Pdv';
import SubPdv from '@/model/SubPdv';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import { PdvRequestParams } from '@/features/pdv/types';
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
  listPdv: Pdv[];
  listSubPdv: SubPdv[];
  title: string | React.ReactNode;
  currentPage: PdvRequestParams;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  formDataPdv: FormData;
  formErrorsPdv: FormErrors;
  onChangeFormInputPdv: OnChangeFormInput;
  formDataSubPdv: FormData;
  formErrorsSubPdv: FormErrors;
  onChangeFormInputSubPdv: OnChangeFormInput;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onPaginationChange: (page: number) => void;
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
  onSaveSubPdv: () => Promise<void>;
  onFilter: () => Promise<void>;
  // onShowEdit: (id: string) => Promise<void>;
  onShowDelete: (pdv: Pdv) => void;
  onShowDeleteSubPdv: (subPdv: SubPdv) => void;
  onShowEditSubPdv: (subPdv: SubPdv) => void;
  // onShowListSub: (id: string, name: string) => Promise<void>;
  // onShowFilter: () => void;
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
  listPdv,
  listSubPdv,
  title,
  currentPage,
  visible,
  shouldShowModal,
  formDataPdv,
  formErrorsPdv,
  onChangeFormInputPdv,
  formDataSubPdv,
  formErrorsSubPdv,
  onChangeFormInputSubPdv,
  formDataFilter,
  formErrorsFilter,
  onChangeFormInputFilter,
  onToggle,
  onPaginationChange,
  onShouldShowModal,
  // handleRenderListPdv,
  // onShowListSub,
  // onShowFilter,
  onSavePdv,
  onSaveSubPdv,
  onFilter,
  // onShowEdit,
  onShowDelete,
  onShowDeleteSubPdv,
  onShowEditSubPdv,
}) => {
  const dataTablePdv = listPdv?.map(pdv => ({
    id: pdv.id,
    imageBase64: <ColumnImage srcImage={pdv.imageBase64} />,
    name: pdv.name,
    street: pdv.address.street,
    city: pdv.address.city,
    state: pdv.address.state,
    actions: (
      <div className="d-flex">
        {/* <div style={{ position: 'relative' }}>
          <div className="circle-notification">
            <span className="circle-notification__number">1</span>
          </div> */}
        <SubPdvIcon
          onClick={(): void =>
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
                          pdv,
                        })
                      }
                    >
                      + cadastrar novo Sub PDV
                    </a>
                  </div>
                </div>
              ),
              pdv,
            })
          }
          className="mr-2 svg-icon action-icon"
        />
        {/* </div> */}
        <Pen
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.pdv,
              newTitleModal: `Editar ${pdv.name}`,
              pdv,
            })
          }
          className="mr-2 svg-icon action-icon"
        />
        <Trash onClick={(): void => onShowDelete(pdv)} className="mr-2 svg-icon action-icon" />
      </div>
    ),
  }));

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };

  const renderActionDialogToReturnListSubPdv: ActionProps = {
    title: 'Cancelar',
    onClick: (): void =>
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
                    newTitleModal: 'Cadastrar Sub PDV',
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
      }),
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
            [ShouldShowModal.filter]: renderActionDialogToCancel,
            [ShouldShowModal.pdv]: renderActionDialogToCancel,
            [ShouldShowModal.subpdv]: {},
            [ShouldShowModal.subpdvRegister]: renderActionDialogToReturnListSubPdv,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Filtrar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.pdv]: {
              title: pdvState?.id ? 'Editar PDV' : 'Cadastrar novo PDV',
              onClick: (): Promise<void> => onSavePdv(),
            },
            [ShouldShowModal.subpdv]: {},
            [ShouldShowModal.subpdvRegister]: {
              title: pdvState?.id ? 'Editar SubPDV' : 'Cadastrar novo SubPDV',
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
              // <ListContentSub
              //   dataList={listSubPdv}
              //   onShowDeleteSubPdv={onShowDeleteSubPdv}
              //   onShowEditSubPdv={(): void => onToggle()}
              //   onShowRegisterSubPdv={(): void => onToggle()}
              // />
              <RegisterContentSubPdv
                formData={formDataSubPdv}
                formErrors={formErrorsSubPdv}
                onChangeFormInput={onChangeFormInputSubPdv}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>PDV</Label>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar novo PDV"
              onClick={(): void =>
                onShouldShowModal({
                  value: ShouldShowModal.pdv,
                  newTitleModal: 'Cadastrar novo PDV',
                })
              }
            />
            <div className="filter-container">
              <div
                className="filter-content"
                onClick={(): void =>
                  onShouldShowModal({
                    value: ShouldShowModal.filter,
                    newTitleModal: '',
                  })
                }
              >
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <CustomTable columns={columns} data={dataTablePdv} />
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
