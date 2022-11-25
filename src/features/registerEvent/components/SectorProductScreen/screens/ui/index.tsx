/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Button, Loading } from '@/components';
import { Container } from 'reactstrap';
import { ProductRegisterContent } from '@/features/registerEvent/components/SectorProductScreen/components/ProductRegisterContent';
import SuperCollapse from '@/components/sharedComponents/SuperCollapse';
import TicketIcon from '@/assets/images/svg/Ticket';
// import { CustomTable } from '@/components/Table';
import { formProductProps, productProps } from '../../types';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

export enum ShouldShowModal {
  sector = 'sector',
}

export interface SectorProductContainerProps {
  state: States;
  formProduct: formProductProps;
  productActions: productProps;
}

export const SectorProductContainer: React.FC<SectorProductContainerProps> = ({
  state,
  formProduct,
  productActions,
}) => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      <div className="container-event">
        <ProductRegisterContent formProduct={formProduct} />
      </div>
      <SuperCollapse
        title={`Cupons de desconto adicionados`}
        content={'content'}
        // listDiscountCoupon.length > 0 ? (
        //   listDiscountCoupon.map((item, index) => (
        //     <>
        //       <span className="secondary-table-title">Cupom #{index + 1}</span>
        //       <span className="secondary-table-title name">
        //         <b> ·</b> {item.name}
        //       </span>
        //       <CustomTable
        //         numberRowsPerPage={0}
        //         progressPending={false}
        //         columns={columnsDiscountCoupon}
        //         data={[
        //           {
        //             id: item.id,
        //             name: item.name,
        //             code: item.code,
        //             amount: item.amount,
        //             discount: item.discount,
        //             actions: (
        //               <React.Fragment>
        //                 <Pen
        //                   className="mr-4 svg-icon action-icon"
        //                   onClick={(): void =>
        //                     onShouldShowModal({
        //                       value: ShouldShowModal.discountCoupons,
        //                       newTitleModal: (
        //                         <div className="d-flex">
        //                           <div
        //                             className="m-auto"
        //                             onClick={() => {
        //                               onShouldShowModal({
        //                                 value: ShouldShowModal.discountCoupons,
        //                                 newTitleModal: discountCoupon?.length
        //                                   ? item.name
        //                                   : 'Cadastrar nova empresa (contratante)',
        //                               });
        //                             }}
        //                           ></div>
        //                           <h5 className="header-title-text modal__title ml-3 mb-0">
        //                             Adicionar conta bancária
        //                           </h5>
        //                         </div>
        //                       ),
        //                     })
        //                   }
        //                 />
        //                 <X
        //                   className="svg-icon action-icon pt-1"
        //                   onClick={() => {
        //                     handleRemoveDiscountCoupon(index);
        //                   }}
        //                 />
        //               </React.Fragment>
        //             ),
        //           },
        //         ]}
        //         theme="secondary"
        //       />
        //     </>
        //   ))
        // ) : (
        //   <span>Nenhum cupom de desconto adicionado</span>
        // )
        // }
        // count={listDiscountCoupon.length}
        leftIcon={TicketIcon}
      />
      <div className="d-flex justify-content-end">
        <Button
          title="Voltar etapa"
          theme="noneBorder"
          onClick={() => productActions.onReturnTap()}
        />
        <Button
          title="Próxima etapa"
          theme="outlineDark"
          className="ml-3"
          onClick={async () => {
            await productActions.onNextTap();
          }}
        />
      </div>
    </Container>
  </Fragment>
);
