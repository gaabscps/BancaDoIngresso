/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import { Button, CollapseCustom, Loading } from '@/components';
import { Col, Container, Row } from 'reactstrap';
import { RegisterGroupContent } from '@/features/groupSubgroupProduct/components/RegisterGroupContent';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import GroupProduct from '@/model/GroupProduct';
import './styles.scss';
import { RegisterSubgroupContent } from '@/features/groupSubgroupProduct/components/RegisterSubgroupContent';
import SubgroupProduct from '@/model/SubgroupProduct';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { colors } from '@/styles/colors';

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
  groupProduct = 'groupProduct',
  subgroupProduct = 'subgroupProduct',
}

interface GroupProductContainerProps {
  state: States;
  groupProductState?: GroupProduct;
  subGroupProductState?: SubgroupProduct;
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
    subgroupProduct,
    isEdit,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    groupProduct?: GroupProduct;
    subgroupProduct?: SubgroupProduct;
    isEdit?: boolean;
  }) => void;
  listGroupProduct: GroupProduct[];
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
  subGroupProductState,
  onChangeFormInputGroupProduct,
  onSaveGroupProduct,
  onSaveGroupSubgroupProduct,
  onToggle,
  onShouldShowModal,
  listGroupProduct,
  onShowDeleteGroupProduct,
  onShowDeleteSubgroupProduct,
  formSubgroup,
}) => {
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
        actions={[
          {
            [ShouldShowModal.groupProduct]: renderActionDialogToCancel,
            [ShouldShowModal.subgroupProduct]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.groupProduct]: {
              title: groupProductState?.id ? 'Salvar' : 'Cadastrar novo grupo',
              onClick: (): Promise<void> => onSaveGroupProduct(),
              disabled: formDataGroupProduct.name === '',
            },
            [ShouldShowModal.subgroupProduct]: {
              title: subGroupProductState?.id ? 'Salvar' : 'Cadastrar novo Subgrupo',
              onClick: (): Promise<void> => onSaveGroupSubgroupProduct(),
              disabled: formSubgroup.formData.name === '',
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
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
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle d-flex">
            <Link to={`${process.env.PUBLIC_URL}/dashboard/productscombos`}>
              <ArrowLeft color={colors.black} style={{ position: 'relative', top: '2' }} />
            </Link>

            <span className="ml-3 mb-0 mt-2">Grupos de subgrupos de produtos</span>
          </div>
          <Button
            title="+ Cadastrar novo grupo"
            onClick={(): void =>
              onShouldShowModal({
                value: ShouldShowModal.groupProduct,
                newTitleModal: 'Cadastrar novo grupo',
              })
            }
          />
        </div>

        <CollapseCustom className="tree-card" title="Grupos e subgrupos">
          <Row>
            <Col>
              <p className="text-title-gruop">Nome do grupo</p>
            </Col>
          </Row>
          <Row className="tree-container">
            {listGroupProduct.map((subGroupProduct: GroupProduct) => (
              <Col className="tree-item-container">
                <div className="d-flex">
                  <div className="d-flex text-gruop tree-main-text">
                    <div style={{ margin: 'auto 0' }}>{subGroupProduct.name}</div>
                    <div className="d-flex icon-content" style={{ margin: 'auto 0' }}>
                      <Pen
                        className="svg-icon action-icon sm-icon"
                        onClick={(): void =>
                          onShouldShowModal({
                            value: ShouldShowModal.groupProduct,
                            newTitleModal: `${subGroupProduct.name}`,
                            groupProduct: subGroupProduct,
                          })
                        }
                      />
                      <Trash
                        className="mr-0 svg-icon sm-icon"
                        onClick={() => {
                          onShowDeleteGroupProduct(subGroupProduct);
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ width: '200px' }}>
                    <a
                      className="text-success-link "
                      style={{ cursor: 'pointer', width: 'fit-content' }}
                      onClick={(): void =>
                        onShouldShowModal({
                          value: ShouldShowModal.subgroupProduct,
                          newTitleModal: `Cadastrar novo subgrupo - Em ${subGroupProduct.name}`,
                          subgroupProduct: subGroupProduct,
                          isEdit: false,
                        })
                      }
                    >
                      + cadastrar novo subgrupo
                    </a>
                  </div>
                </div>
                <div className="tree">
                  <ul>
                    <li>
                      <div>{subGroupProduct.name}</div>
                      <div className="flex-shrink-0 ml-4">
                        <Pen
                          className="mr-4 svg-icon action-icon sm-icon"
                          onClick={(): void =>
                            onShouldShowModal({
                              value: ShouldShowModal.subgroupProduct,
                              newTitleModal: `${subGroupProduct.name}`,
                              subgroupProduct: subGroupProduct,
                              isEdit: true,
                            })
                          }
                        />
                        <Trash
                          className="mr-4 svg-icon action-icon sm-icon"
                          onClick={() => {
                            onShowDeleteSubgroupProduct(subGroupProduct);
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
