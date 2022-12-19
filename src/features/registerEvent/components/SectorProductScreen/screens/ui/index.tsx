/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, Dialog, Loading, Switch } from '@/components';
import { Container } from 'reactstrap';
import { ProductRegisterContent } from '@/features/registerEvent/components/SectorProductScreen/components/ProductRegisterContent';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import TicketIcon from '@/assets/images/svg/Ticket';
import { CustomTable } from '@/components/Table';
import { ActionProps } from '@/components/Dialog';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as Config } from '@/assets/images/svg/config.svg';
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
  formDiscountCoupon: any;
}

export const SectorProductContainer: React.FC<SectorProductContainerProps> = ({
  state,
  formProduct,
  formConfigProduct,
  productActions,
  productStates,
  modalConfig,
  formDiscountCoupon,
}) => {
  const titleRef = React.useRef<HTMLInputElement>(null);

  // sum of all products within subGroups
  const countProducts = productStates.productList.reduce((acc, { subGroups }) => {
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
      productStates.setProduct(undefined);
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
            <ProductRegisterContent formProduct={formProduct} productStates={productStates} />
          </div>
          <div className="d-flex justify-content-end">
            <div
              className="mr-3"
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
                  group.subGroups.map((subGroup: any, indexSubGroup: any) => (
                    <React.Fragment key={indexSubGroup}>
                      {indexGroup > 0 ? <hr style={{ margin: '25px -30px 30px -50px' }} /> : null}
                      <div>
                        <div className="mb-5">
                          <span className="secondary-table-title">Grupo #{indexSubGroup + 1}</span>
                          <span className="secondary-table-title font-weight-bold">
                            <b> ·</b> {subGroup.categorySubGroupName} //
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
                          data={subGroup.products.map((product: any) => {
                            const disabledRows =
                              productStates.product && product.id !== productStates.product?.id
                                ? 'disabled-content'
                                : '';
                            return {
                              id: product.id,
                              products: <div className={disabledRows}>{product?.name}</div>,
                              amount: (
                                <div className={disabledRows}>{`${product?.amount} unidades`}</div>
                              ),
                              unitValue: (
                                <div className={disabledRows}>{`R$ ${product?.unitValue}`}</div>
                              ),
                              totalValue: (
                                <div className={disabledRows}>{`R$ ${product?.totalValue}`}</div>
                              ),
                              actions: (
                                <React.Fragment>
                                  <div className={productStates.product ? 'disabled-content' : ''}>
                                    <div className="d-flex align-items-center">
                                      <div className="mt-3">
                                        <Switch
                                          name={`allowSellingWebsite-${product.id}`}
                                          label="Vender online"
                                          onChange={() =>
                                            productActions.onChangeAllowOnline(product)
                                          }
                                          checked={product.allowSellingWebsite}
                                        />
                                      </div>
                                      <div className="ml-4">
                                        <Config
                                          height={20}
                                          width={20}
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
                                          height={20}
                                          width={20}
                                          className="mr-4 svg-icon action-icon"
                                          onClick={(): Promise<void> =>
                                            productActions.onGet(product)
                                          }
                                        />
                                        <Trash
                                          className="svg-icon svg-icon-trash"
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
                    </React.Fragment>
                  )),
                )
              : 'Nenhum produto cadastrado. Aqui será exibida uma lista dos produtos cadastrados'
          }
          count={countProducts}
          leftIcon={TicketIcon}
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
