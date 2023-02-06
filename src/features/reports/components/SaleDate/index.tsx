/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { CollapseTable } from '@/components/CollapseTable';
import { updateMask } from '@/helpers/masks/cashNumber';
import validators from '@/helpers/validators';

interface SaleDateProps {
  saleDate: any;
  titleColumn: any;
  contentColumn: any;
}

export const SaleDate: React.FC<SaleDateProps> = ({ saleDate, titleColumn, contentColumn }) => {
  console.log('saleDate', saleDate);

  return (
    <>
      <h5>Vendas por data</h5>
      {saleDate?.dates?.map((date: any, index: any) => (
        <CollapseTable
          key={index}
          titleColumn={titleColumn}
          titleDataRow={[
            {
              data: date.date,
              width: 300,
            },
            {
              data: date.amountSold,
              width: 200,
            },
            {
              data: date.amountCourtesy,
              width: 100,
            },
            {
              data: `R$ ${updateMask(validators.applyDecimalMask(String(date.value)))}`,
              width: 200,
            },
          ]}
          contentColumn={contentColumn}
          contentDataRow={[
            {
              data: date?.details.map((ticket: any) => ticket.name),
              width: 300,
            },
            {
              data: date?.details.map((ticket: any) => ticket.amountSold),
              width: 200,
            },
            {
              data: date?.details.map((ticket: any) => ticket.goal),
              width: 100,
            },
            {
              data: date?.details.map(
                (ticket: any) =>
                  `R$ ${updateMask(validators.applyDecimalMask(String(ticket.value)))}`,
              ),
              width: 200,
            },
          ]}
        />
      ))}
    </>
  );
};
