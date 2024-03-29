/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, Dialog, Loading, Switch } from '@/components';
import { Container } from 'reactstrap';
import { ProductRegisterContent } from '@/features/registerEvent/components/SectorProductScreen/components/ProductRegisterContent';
import { updateMask as updateMaskCash } from '@/helpers/masks/cashNumber';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import { CustomTable } from '@/components/Table';
import { ActionProps } from '@/components/Dialog';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as ItemConfig } from '@/assets/images/svg/ItemConfig.svg';
import ProductIcon from '@/assets/images/svg/Product';
import { controllerEventProps } from '@/features/registerEvent/screens/SectorTicket/types';
import { columnsProducts } from './table';
import {
  formConfigProductProps,
  formProductProps,
  modalConfigTicketMainSettingsProps,
  productActionsProps,
  productStatesProps,
} from '../../types';
import { ProductConfigContent } from '../../components/ProductConfigContent';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  configProduct = 'configProduct',
}

export interface SectorProductContainerProps {
  state: States;
  formProduct: formProductProps;
  formConfigProduct: formConfigProductProps;
  productActions: productActionsProps;
  productStates: productStatesProps;
  modalConfig: modalConfigTicketMainSettingsProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formDiscountCoupon: any;
  controllerEvent: controllerEventProps;
}

export const SectorProductContainer: React.FC<SectorProductContainerProps> = ({
  state,
  formProduct,
  formConfigProduct,
  productActions,
  productStates,
  modalConfig,
  formDiscountCoupon,
  controllerEvent,
}) => {
  const titleRef = React.useRef<HTMLInputElement>(null);

  // sum of all products within subGroups
  const countProducts = productStates.productList.reduce((acc, { subGroups }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = subGroups.reduce((acc: any, { products }: any) => acc + products.length, 0);
    return acc + count;
  }, 0);

  // focus on name input when batchStates is not empty
  React.useEffect(() => {
    if (productStates?.product) {
      titleRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [productStates?.product]);

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => {
      productActions.onCancelEdit();
      modalConfig.handleOnTougleModal();
    },
    theme: 'noneBorder',
  };

  return (
    <Fragment>
      <Dialog
        title={modalConfig.title}
        visible={modalConfig.visible}
        onClose={modalConfig.handleOnTougleModal}
        isContentWithCard
        actions={[
          {
            [ShouldShowModal.configProduct]: renderActionDialogToCancel,
          }[modalConfig.shouldShowModal],
          {
            [ShouldShowModal.configProduct]: {
              title: productStates?.product ? 'Salvar' : 'Cadastrar novo setor',
              onClick: (): Promise<void> => productActions.onSaveConfig(productStates?.product),
            },
          }[modalConfig.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.configProduct]: (
              <ProductConfigContent
                formConfigProduct={formConfigProduct}
                formDiscountCoupon={formDiscountCoupon}
              />
            ),
          }[modalConfig.shouldShowModal]
        }
      </Dialog>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <h6 ref={titleRef} className="mb-5">
          {productStates.product
            ? `Editando ${productStates.product.name}`
            : 'Cadastrando produtos'}
        </h6>
        <div className="card-ligth-color mb-5">
          <div className="container-event ">
            <ProductRegisterContent
              formProduct={formProduct}
              productStates={productStates}
              productActions={productActions}
              controllerEvent={controllerEvent}
            />
          </div>
          <div className="d-flex justify-content-end">
            <div
              className="mr-3 action-icon"
              onClick={() => {
                productActions.onCancelEdit();
              }}
            >
              {productStates.product ? 'Cancelar' : null}
            </div>
            <div className="link-green" onClick={() => productActions.onSave()}>
              {productStates.product ? 'Salvar edição' : '+ cadastrar produto'}
            </div>
          </div>
        </div>
        <SuperCollapse
          title={`Produtos cadastrados`}
          content={
            productStates.productList.length > 0
              ? productStates.productList.map((group, indexGroup) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  group.subGroups.map((subGroup: any, indexSubGroup: any) => {
                    const disabledProduct =
                      productStates.product &&
                      subGroup.categorySubGroupId !== productStates.product?.subgroup.id
                        ? 'disabled-content'
                        : '';
                    return (
                      <React.Fragment key={indexSubGroup}>
                        <div className={disabledProduct}>
                          <div className="mb-5">
                            <span className="secondary-table-title">
                              Grupo #{indexSubGroup + 1}
                            </span>
                            <span className="secondary-table-title font-weight-bold">
                              <b> ·</b> {group.categoryGroupName} //
                            </span>
                            <span className="secondary-table-title">
                              {' '}
                              Subgrupo #{indexSubGroup + 1}
                            </span>
                            <span className="secondary-table-title font-weight-bold">
                              <b> ·</b> {subGroup.categorySubGroupName}
                            </span>
                          </div>
                          <CustomTable
                            numberRowsPerPage={0}
                            progressPending={false}
                            columns={columnsProducts}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            data={subGroup.products.map((product: any) => {
                              const disabledRows =
                                productStates.product && product.id !== productStates.product?.id
                                  ? 'disabled-content'
                                  : '';
                              return {
                                id: product.id,
                                products: <div className={disabledRows}>{product?.name}</div>,
                                amount: (
                                  <div
                                    className={disabledRows}
                                  >{`${product?.amount} unidades`}</div>
                                ),
                                unitValue: (
                                  <div className={disabledRows}>{`R$ ${updateMaskCash(
                                    String(product?.unitValue),
                                  )}`}</div>
                                ),
                                totalValue: (
                                  <div className={disabledRows}>{`R$ ${updateMaskCash(
                                    String(product?.totalValue),
                                  )}`}</div>
                                ),
                                actions: (
                                  <React.Fragment>
                                    <div
                                      className={productStates.product ? 'disabled-content' : ''}
                                    >
                                      <div className="d-flex align-items-center">
                                        <div className="mt-3 w-100">
                                          <Switch
                                            buttonAlign={{ top: '4.5px' }}
                                            name={`allowSellingWebsite-${product.id}`}
                                            label="Vender online"
                                            onChange={() =>
                                              productActions.onChangeAllowOnline(product)
                                            }
                                            checked={product.allowSellingWebsite}
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <ItemConfig
                                            className={`mr-4 svg-icon action-icon ${
                                              product?.physicalSale && product?.websiteSale
                                                ? ''
                                                : 'svg-icon-error'
                                            }`}
                                            onClick={(): void => {
                                              modalConfig.onShouldShowModal({
                                                value: ShouldShowModal.configProduct,
                                                newTitleModal: 'Configurações do produto',
                                                product,
                                              });
                                            }}
                                          />
                                          <Pen
                                            className="mr-4 svg-icon action-icon"
                                            onClick={(): Promise<void> =>
                                              productActions.onGet(product)
                                            }
                                          />
                                          <Trash
                                            className="svg-icon svg-icon-trash action-icon"
                                            onClick={() => {
                                              modalConfig.onShowModalDelete(product);
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                ),
                              };
                            })}
                            theme="secondaryWithoutBorder"
                          />
                        </div>
                        {indexGroup !== productStates.productList.length - 1 ? (
                          <hr style={{ margin: '25px -30px 30px -30px' }} />
                        ) : null}
                      </React.Fragment>
                    );
                  }),
                )
              : 'Nenhum produto cadastrado. Aqui será exibida uma lista dos produtos cadastrados'
          }
          count={countProducts}
          leftIcon={ProductIcon()}
        />
        <div className="d-flex justify-content-end">
          <Button
            title="Voltar etapa"
            theme="noneBorder"
            onClick={() => productActions.onReturnTab()}
          />
          <Button
            title="Próxima etapa"
            theme="outlineDark"
            className="ml-3"
            onClick={async () => {
              await productActions.onNextTab();
            }}
          />
        </div>
      </Container>
    </Fragment>
  );
};
