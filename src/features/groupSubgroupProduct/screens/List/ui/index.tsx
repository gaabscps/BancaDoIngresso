/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading } from '@/components';
import { Container, Label } from 'reactstrap';
import { RegisterContent } from '@/features/groupSubgroupProduct/components/RegisterContent';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnStatus, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import GroupSubgroupProduct from '@/model/GroupSubgroupProduct';
import { GroupSubgroupProductRequestParams } from '@/features/groupSubgroupProduct/types';
import dayjs from 'dayjs';
import { FilterContent } from '@/features/groupSubgroupProduct/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import Pdv from '@/model/Pdv';
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRow {
  id: string;
  name: string;
  serial: string;
  actions: string;
  status: number;
  date: string;
  currentPdv: string;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  groupSubgroupProduct = 'groupSubgroupProduct',
}

interface GroupSubgroupProductContainerProps {
  state: States;
  groupSubgroupProductState?: GroupSubgroupProduct;
  listGroupSubgroupProduct: GroupSubgroupProduct[];
  currentPage: GroupSubgroupProductRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataGroupSubgroupProduct: FormData;
  formErrorsGroupSubgroupProduct: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  listPdv: Pdv[];
  onSaveGroupSubgroupProduct: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  changeColorColumn: (status: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputGroupSubgroupProduct: OnChangeFormInput;
  onShowDeleteGroupSubgroupProduct: (groupSubgroupProduct: GroupSubgroupProduct) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    groupSubgroupProduct,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    groupSubgroupProduct?: GroupSubgroupProduct;
  }) => void;
}

export const GroupSubgroupProductContainer: React.FC<GroupSubgroupProductContainerProps> = ({
  listGroupSubgroupProduct,
  state,
  groupSubgroupProductState,
  currentPage,
  title,
  visible,
  shouldShowModal,
  formDataGroupSubgroupProduct,
  formErrorsGroupSubgroupProduct,
  formDataFilter,
  formErrorsFilter,
  listPdv,
  onChangeFormInputFilter,
  onChangeFormInputGroupSubgroupProduct,
  onSaveGroupSubgroupProduct,
  onPaginationChange,
  changeColorColumn,
  onToggle,
  onFilter,
  onShouldShowModal,
  onShowDeleteGroupSubgroupProduct,
}) => {
  const dataTableGroupSubgroupProduct = listGroupSubgroupProduct?.map(item => ({
    id: item.id,
    name: (
      <ColumnStatus statusColor={String(changeColorColumn(Number(item.status)))}>
        {item.name}
      </ColumnStatus>
    ),
    date: dayjs(item.expirationDate, 'YYYY-DD-MM hh:mm:ss').format('DD/MM/YYYY'),
    currentPdv: item.pdv?.name,
    serial: item.serialNumber,
    actions: (
      <React.Fragment>
        <Pen
          className="mr-2 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.groupSubgroupProduct,
              newTitleModal: `Editar ${item.name}`,
              groupSubgroupProduct: item,
            })
          }
        />
        <Trash
          className="mr-2 svg-icon action-icon"
          onClick={() => {
            onShowDeleteGroupSubgroupProduct(item);
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

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        groupSubgroupProductition={shouldShowModal === ShouldShowModal.filter ? 'right' : 'center'}
        isContentWithCard={shouldShowModal !== ShouldShowModal.filter}
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToCancel,
            [ShouldShowModal.groupSubgroupProduct]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.groupSubgroupProduct]: {
              title: groupSubgroupProductState?.id ? 'Salvar' : 'Cadastrar novo grupo',
              onClick: (): Promise<void> => onSaveGroupSubgroupProduct(),
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
            [ShouldShowModal.groupSubgroupProduct]: (
              <RegisterContent
                formData={formDataGroupSubgroupProduct}
                formErrors={formErrorsGroupSubgroupProduct}
                onChangeFormInput={onChangeFormInputGroupSubgroupProduct}
                listGroupSubgroupProduct={listGroupSubgroupProduct}
                listPdv={listPdv}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between mb-5">
          <div className="pageTitle">
            <Label>Grupo e subgrupo de produtos</Label>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar novo grupo"
              onClick={(): void =>
                onShouldShowModal({
                  value: ShouldShowModal.groupSubgroupProduct,
                  newTitleModal: 'Cadastrar nova grupo',
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
