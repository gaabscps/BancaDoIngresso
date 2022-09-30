/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, CollapseCustom, Loading } from '@/components';
import { Col, Container, Label, Row } from 'reactstrap';
import { RegisterGroupContent } from '@/features/groupSubgroupProduct/components/RegisterGroupContent';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnStatus } from '@/components/Table';
import { GroupSubgroupProductRequestParams } from '@/features/groupSubgroupProduct/types';
import dayjs from 'dayjs';
import { FilterContent } from '@/features/groupSubgroupProduct/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import Pdv from '@/model/Pdv';
import GroupSubgroupProduct from '@/model/GroupSubgroupProduct';
import './styles.scss';

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
  groupProduct = 'groupProduct',
  subgroupProduct = 'subgroupProduct',
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
          className="mr-4 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.groupProduct,
              newTitleModal: `Editar ${item.name}`,
              groupSubgroupProduct: item,
            })
          }
        />
        <Trash
          className="mr-4 svg-icon action-icon"
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
        position={shouldShowModal === ShouldShowModal.filter ? 'right' : 'center'}
        isContentWithCard={shouldShowModal !== ShouldShowModal.filter}
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToCancel,
            [ShouldShowModal.groupProduct]: renderActionDialogToCancel,
            [ShouldShowModal.subgroupProduct]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.groupProduct]: {
              title: groupSubgroupProductState?.id ? 'Salvar' : 'Cadastrar novo grupo',
              onClick: (): Promise<void> => onSaveGroupSubgroupProduct(),
            },
            [ShouldShowModal.subgroupProduct]: {
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
            [ShouldShowModal.groupProduct]: (
              <RegisterGroupContent
                formData={formDataGroupSubgroupProduct}
                formErrors={formErrorsGroupSubgroupProduct}
                onChangeFormInput={onChangeFormInputGroupSubgroupProduct}
                listGroupSubgroupProduct={listGroupSubgroupProduct}
                listPdv={listPdv}
              />
            ),
            [ShouldShowModal.subgroupProduct]: (
              <RegisterGroupContent
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

        <CollapseCustom title="Grupos e subgrupos">
          <Row>
            <Col>
              <p className="text-title-gruop">Nome do grupo</p>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div className="d-flex">
                <div className="d-flex text-gruop">
                  <div style={{ margin: 'auto 0' }}>Bebidas</div>
                  <div style={{ margin: 'auto 0' }}>
                    <Pen
                      className="ml-4 mr-4 svg-icon action-icon"
                      // onClick={(): void =>
                      //   onShouldShowModal({
                      //     value: ShouldShowModal.groupSubgroupProduct,
                      //     newTitleModal: `Editar ${item.name}`,
                      //     groupSubgroupProduct: item,
                      //   })
                      // }
                    />
                    <Trash
                      className="mr-0 svg-icon"
                      // onClick={() => {
                      //   onShowDeleteGroupSubgroupProduct(item);
                      // }}
                    />
                  </div>
                </div>
                <div>
                  <a
                    className="text-success-link"
                    style={{ cursor: 'pointer' }}
                    // onClick={(): void =>
                    //   onShouldShowModal({
                    //     newTitleModal: 'Cadastrar Sub PDV',
                    //     value: ShouldShowModal.subpdvRegister,
                    //     pdv,
                    //   })
                    // }
                  >
                    + novo subgrupo
                  </a>
                </div>
              </div>
              <div className="tree">
                <ul>
                  <li>
                    <div>Bebidas alcoolicas</div>
                    <div className="flex-shrink-0">
                      <Pen
                        className="mr-4 svg-icon action-icon"
                        // onClick={(): void =>
                        //   onShouldShowModal({
                        //     value: ShouldShowModal.groupSubgroupProduct,
                        //     newTitleModal: `Editar ${item.name}`,
                        //     groupSubgroupProduct: item,
                        //   })
                        // }
                      />
                      <Trash
                        className="mr-4 svg-icon action-icon"
                        // onClick={() => {
                        //   onShowDeleteGroupSubgroupProduct(item);
                        // }}
                      />
                    </div>
                  </li>
                  <li>
                    <div>Bebidas alcoolicas</div>
                    <div className="flex-shrink-0">
                      <Pen
                        className="mr-4 svg-icon action-icon"
                        // onClick={(): void =>
                        //   onShouldShowModal({
                        //     value: ShouldShowModal.groupSubgroupProduct,
                        //     newTitleModal: `Editar ${item.name}`,
                        //     groupSubgroupProduct: item,
                        //   })
                        // }
                      />
                      <Trash
                        className="mr-4 svg-icon action-icon"
                        // onClick={() => {
                        //   onShowDeleteGroupSubgroupProduct(item);
                        // }}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={4}>-</Col>
          </Row>
        </CollapseCustom>
      </Container>
    </Fragment>
  );
};
