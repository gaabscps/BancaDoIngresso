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
  const listDiscountCouponMock = [
    {
      id: '1',
      product: 'Whisky Red Label 1L',
      amount: '100 unidades',
      unitValue: 'R$20,00',
      totalValue: 'R$2.000,00',
      allowOnline: true,
    },
  ];

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => modalConfig.onToggle(),
    theme: 'noneBorder',
  };

  return (
    <Fragment>
      <Dialog
        title={modalConfig.title}
        visible={modalConfig.visible}
        onClose={modalConfig.onToggle}
        isContentWithCard
        actions={[
          {
            [ShouldShowModal.configProduct]: renderActionDialogToCancel,
          }[modalConfig.shouldShowModal],
          {
            [ShouldShowModal.configProduct]: {
              title: productStates?.product ? 'Salvar' : 'Cadastrar novo setor',
              onClick: (): Promise<void> => undefined as any,
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
        <h6 className="mb-5">Cadastrando produtos</h6>
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
              {productStates.product ? 'Cancelar edição do produto' : null}
            </div>
            <div className="link-green" onClick={() => productActions.onSave()}>
              {productStates.product ? 'Salvar produto' : '+ cadastrar produto'}
            </div>
          </div>
        </div>
        <SuperCollapse
          title={`Produtos cadastrados`}
          content={
            productStates.productList.length > 0
              ? productStates.productList.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="mb-5">
                      <span className="secondary-table-title">Grupo #{index + 1}</span>
                      <span className="secondary-table-title font-weight-bold">
                        <b> ·</b> Bebidas //
                      </span>
                      <span className="secondary-table-title"> Subgrupo #{index + 1}</span>
                      <span className="secondary-table-title font-weight-bold">
                        <b> ·</b> Bebidas alcoólicas
                      </span>
                    </div>
                    <CustomTable
                      numberRowsPerPage={0}
                      progressPending={false}
                      columns={columnsProducts}
                      data={[
                        {
                          id: item.id,
                          products: item.product,
                          amount: item.amount,
                          unitValue: item.unitValue,
                          totalValue: item.totalValue,
                          actions: (
                            <React.Fragment>
                              <div
                                className={`${productStates.product ? 'disabled-content' : null}`}
                              >
                                <div className="d-flex align-items-center">
                                  <div>
                                    <Switch
                                      name="status"
                                      label="Vender online"
                                      onChange={() => undefined}
                                      checked={item.allowOnline}
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <Config
                                      className="mr-4 svg-icon action-icon"
                                      onClick={(): void => {
                                        modalConfig.onShouldShowModal({
                                          value: ShouldShowModal.configProduct,
                                          newTitleModal: 'Configurações do produto',
                                          product: item,
                                        });
                                      }}
                                    />
                                    <Pen
                                      className="mr-4 svg-icon action-icon"
                                      onClick={(): Promise<void> => productActions.onGet(item)}
                                    />
                                    <Trash
                                      className="svg-icon svg-icon-trash"
                                      onClick={() => {
                                        modalConfig.onShowModalDelete(item);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          ),
                        },
                      ]}
                      theme="secondaryWithoutBorder"
                    />
                  </React.Fragment>
                ))
              : 'Nenhum produto cadastrado. Aqui será exibida uma lista dos produtos cadastrados'
          }
          count={listDiscountCouponMock.length}
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
