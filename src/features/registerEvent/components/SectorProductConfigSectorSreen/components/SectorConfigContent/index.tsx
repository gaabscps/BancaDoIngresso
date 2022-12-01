/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Form } from 'reactstrap';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  physicalSaleAllowCreditCardPayment = 'physicalSaleAllowCreditCardPayment',
  physicalSaleDebit = 'physicalSaleDebit',
  physicalSaleCredit = 'physicalSaleCredit',
  physicalSalePix = 'physicalSalePix',
  physicalSaleAdministrateTax = 'physicalSaleAdministrateTax',
  physicalSaleInstallments = 'physicalSaleInstallments',
  physicalSaleFee = 'physicalSaleFee',
  websiteSaleAllowCreditCardPayment = 'websiteSaleAllowCreditCardPayment',
  websiteSaleDebit = 'websiteSaleDebit',
  websiteSaleCredit = 'websiteSaleCredit',
  websiteSalePix = 'websiteSalePix',
  websiteSaleAdministrateTax = 'websiteSaleAdministrateTax',
  websiteSaleInstallments = 'websiteSaleInstallments',
  websiteSaleFee = 'websiteSaleFee',
  allowDiscount = 'allowDiscount',
  allowDiscountCoupon = 'allowDiscountCoupon',
  partialPayment = 'partialPayment',
}

export const SectorConfigContent: React.FC<any> = () => (
  <Fragment>
    <Form
      noValidate={true}
      onSubmit={(e): void => {
        e.preventDefault();
      }}
    >
      <p className="mb-5">Selecione os produtos e combos que este setor poderá vender</p>
      {/* <div>
          {props.modules?.map(data => (
            <SuperCollapse
              key={data.id}
              title={data.name}
              content={
                data && data.permissions.length > 0 ? (
                  <ListModule module={data} check={props.checkPermission} />
                ) : (
                  'Nenhuma permissão cadastrada. Aqui será exibida uma lista de permissões'
                )
              }
              leftIcon={() => checkBoxAll(data)}
            />
          ))}
        </div> */}
    </Form>
  </Fragment>
);
