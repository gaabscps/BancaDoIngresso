/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, CollapseCustom, Loading } from '@/components';
import { Col, Container, Label, Row } from 'reactstrap';
import { RegisterGroupContent } from '@/features/groupSubgroupProduct/components/RegisterGroupContent';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { FilterContent } from '@/features/groupSubgroupProduct/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import GroupProduct from '@/model/GroupProduct';
import './styles.scss';
import { RegisterSubgroupContent } from '@/features/groupSubgroupProduct/components/RegisterSubgroupContent';
import SubgroupProduct from '@/model/SubgroupProduct';

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
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  groupProduct = 'groupProduct',
  subgroupProduct = 'subgroupProduct',
}

interface GroupProductContainerProps {
  state: States;
  groupProductState?: GroupProduct;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataGroupProduct: FormData;
  formErrorsGroupProduct: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  onSaveGroupProduct: () => Promise<void>;
  onSaveGroupSubgroupProduct: () => Promise<void>;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputGroupProduct: OnChangeFormInput;
  onShowDeleteGroupProduct: (groupProduct: GroupProduct) => void;
  onShowDeleteSubgroupProduct: (subgroupProduct: SubgroupProduct) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    groupProduct,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    groupProduct?: GroupProduct;
  }) => void;
  listGroupProduct: SubgroupProduct[];
  formSubgroup: {
    formData: FormData;
    formErrors: FormErrors;
    onChangeFormInput: OnChangeFormInput;
    resetForm: () => void;
  };
}

export const GroupProductContainer: React.FC<GroupProductContainerProps> = ({
  state,
  groupProductState,
  title,
  visible,
  shouldShowModal,
  formDataGroupProduct,
  formErrorsGroupProduct,
  formDataFilter,
  formErrorsFilter,
  onChangeFormInputFilter,
  onChangeFormInputGroupProduct,
  onSaveGroupProduct,
  onSaveGroupSubgroupProduct,
  onToggle,
  onFilter,
  onShouldShowModal,
  listGroupProduct,
  onShowDeleteGroupProduct,
  onShowDeleteSubgroupProduct,
  formSubgroup,
}) => {
  console.log('listGroupProduct :>> ', listGroupProduct);
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
              title: groupProductState?.id ? 'Salvar' : 'Cadastrar novo grupo',
              onClick: (): Promise<void> => onSaveGroupProduct(),
            },
            [ShouldShowModal.subgroupProduct]: {
              title: groupProductState?.id ? 'Salvar' : 'Cadastrar novo Subgrupo',
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
                formData={formDataGroupProduct}
                formErrors={formErrorsGroupProduct}
                onChangeFormInput={onChangeFormInputGroupProduct}
              />
            ),
            [ShouldShowModal.subgroupProduct]: (
              <RegisterSubgroupContent formSubgroup={formSubgroup} />
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
                  value: ShouldShowModal.groupProduct,
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
            {listGroupProduct.map((productSubgroup: SubgroupProduct) => (
              <Col md={4}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex text-gruop">
                    <div style={{ margin: 'auto 0' }}>{productSubgroup.productGroup?.name}</div>
                    <div style={{ margin: 'auto 0' }}>
                      <Pen
                        className="ml-4 mr-4 svg-icon action-icon"
                        onClick={(): void =>
                          onShouldShowModal({
                            value: ShouldShowModal.groupProduct,
                            newTitleModal: `${productSubgroup.productGroup?.name}`,
                            // productSubgroup: productSubgroup?.productGroup,
                          })
                        }
                      />
                      <Trash
                        className="mr-0 svg-icon"
                        onClick={() => {
                          onShowDeleteGroupProduct(productSubgroup);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <a
                      className="text-success-link"
                      style={{ cursor: 'pointer' }}
                      onClick={(): void =>
                        onShouldShowModal({
                          value: ShouldShowModal.groupProduct,
                          newTitleModal: 'Cadastrar Grupo',
                        })
                      }
                    >
                      + novo subgrupo
                    </a>
                  </div>
                </div>
                <div className="tree">
                  <ul>
                    <li>
                      <div>{productSubgroup.name}</div>
                      <div className="flex-shrink-0">
                        <Pen
                          className="mr-4 svg-icon action-icon"
                          onClick={(): void =>
                            onShouldShowModal({
                              value: ShouldShowModal.subgroupProduct,
                              newTitleModal: `${productSubgroup.name}`,
                              // subgroupProduct: productSubgroup,
                            })
                          }
                        />
                        <Trash
                          className="mr-4 svg-icon action-icon"
                          onClick={() => {
                            onShowDeleteSubgroupProduct(productSubgroup);
                          }}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        </CollapseCustom>
      </Container>
    </Fragment>
  );
};
