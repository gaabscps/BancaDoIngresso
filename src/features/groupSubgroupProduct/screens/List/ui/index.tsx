/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import { Button, CollapseCustom, Loading } from '@/components';
import { Col, Container, Row } from 'reactstrap';
import { RegisterGroupContent } from '@/features/groupSubgroupProduct/components/RegisterGroupContent';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import GroupProduct from '@/model/GroupProductSend';
import './styles.scss';
import { RegisterSubgroupContent } from '@/features/groupSubgroupProduct/components/RegisterSubgroupContent';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { colors } from '@/styles/colors';
import SubGrupSend from '@/model/SubGrupSend';

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
  subGroupProductState?: SubGrupSend;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataGroupProduct: FormData;
  formErrorsGroupProduct: FormErrors;
  onSaveGroupProduct: () => Promise<void>;
  onSaveGroupSubgroupProduct: () => Promise<void>;
  onToggle: () => void;
  onChangeFormInputGroupProduct: OnChangeFormInput;
  onShowDeleteGroupProduct: (groupProduct: GroupProduct) => void;
  onShowDeleteSubgroupProduct: (subgroupProduct: SubGrupSend) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    groupProduct,
    subgroupProduct,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    groupProduct?: GroupProduct;
    subgroupProduct?: SubGrupSend;
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
              title: groupProductState?.productGroupId ? 'Salvar' : 'Cadastrar novo grupo',
              onClick: (): Promise<void> => onSaveGroupProduct(),
              disabled: formDataGroupProduct.name === '',
            },
            [ShouldShowModal.subgroupProduct]: {
              title: subGroupProductState?.productSubGroupId ? 'Salvar' : 'Cadastrar novo Subgrupo',
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
        <div className="d-flex justify-content-between mb-5">
          <div className="pageTitle d-flex">
            <Link to={`${process.env.PUBLIC_URL}/dashboard/productscombos`}>
              <ArrowLeft color={colors.black} className="arrow-left" />
            </Link>

            <span className="ml-3 mb-0 mt-2">Grupos e subgrupos de produtos</span>
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
            {listGroupProduct.map((item: GroupProduct) => (
              <Col className="tree-item-container">
                <div className="d-flex">
                  <div className="d-flex justify-content-between text-gruop tree-main-text">
                    <div className="mv-auto">{item.productGroupName}</div>
                    <div className="d-flex icon-content mv-auto">
                      <Pen
                        className="svg-icon action-icon sm-icon"
                        onClick={(): void =>
                          onShouldShowModal({
                            value: ShouldShowModal.groupProduct,
                            newTitleModal: `${item.productGroupName}`,
                            groupProduct: item,
                          })
                        }
                      />
                      <Trash
                        className="mr-0 svg-icon sm-icon"
                        onClick={() => {
                          onShowDeleteGroupProduct(item);
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-success-link-widht">
                    <a
                      className="text-success-link"
                      onClick={(): void =>
                        onShouldShowModal({
                          value: ShouldShowModal.subgroupProduct,
                          newTitleModal: `Cadastrar novo subgrupo - Em ${item.productGroupName}`,
                          groupProduct: item,
                        })
                      }
                    >
                      + cadastrar novo subgrupo
                    </a>
                  </div>
                </div>
                <div className="tree">
                  <ul>
                    {item.subGroups.map(subItem => (
                      <li>
                        <div>{subItem.productSubGroupName}</div>
                        <div className="flex-shrink-0 ml-2">
                          <Pen
                            className="mr-3 svg-icon action-icon sm-icon"
                            onClick={(): void =>
                              onShouldShowModal({
                                value: ShouldShowModal.subgroupProduct,
                                newTitleModal: `${subItem.productSubGroupName}`,
                                groupProduct: item,
                                subgroupProduct: subItem,
                              })
                            }
                          />
                          <Trash
                            className="mr-5 svg-icon action-icon sm-icon"
                            onClick={() => {
                              onShowDeleteSubgroupProduct(subItem);
                            }}
                          />
                        </div>
                      </li>
                    ))}
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
