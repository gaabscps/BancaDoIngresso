/* eslint-disable react/jsx-key */
import EventSectionGet from '@/model/EventSectionGet';
import { DataList } from '@/components/DataList';
import React from 'react';
import Event from '@/model/Event';
import { toCurrency } from '@/helpers/masks/toCurrency';
import { toPercentage } from '@/helpers/common/amount';

interface SectorProductProps {
  event: Event | undefined;
}

export const SectorProduct: React.FC<SectorProductProps> = ({ event }) => {
  const dataSectorProduct = [
    {
      title: 'Produto',
      content: event?.products?.map(item => item.name) || '--',
    },
    {
      title: 'Qtd',
      content: event?.products?.map(item => item.amount) || '--',
    },
    {
      title: 'Valor un',
      content: event?.products?.map(item => toCurrency(item.unitValue)) || '--',
    },
    {
      title: 'Total estimado',
      content: event?.products?.map(item => toCurrency(item.totalValue)) || '--',
    },
    {
      title: 'Tx Deb',
      content: event?.products?.map(item => `${toPercentage(item.physicalSale?.debit)}%` || '--'),
    },
    {
      title: 'Tx Cred',
      content: event?.products?.map(item => `${toPercentage(item.physicalSale?.credit)}%` || '--'),
    },
    {
      title: 'Tx Pix ',
      content: event?.products?.map(item => `${toPercentage(item.physicalSale?.pix)}%` || '--'),
    },
    {
      title: 'Tx Admin',
      content: event?.products?.map(
        item => `${toPercentage(item.physicalSale?.administrateTax)}%` || '--',
      ),
    },
    {
      title: 'Parcelas',
      content: event?.products?.map(item => item.physicalSale?.installments || '--'),
    },
    {
      title: 'Jur mês',
      content: event?.products?.map(item => `${toPercentage(item.physicalSale?.fee)}%` || '--'),
    },
  ];

  return (
    <>
      <h5 className="mb-2 border-bottom-title mb-5 container-event">Setores e Produtos</h5>
      {event?.sectionproductsAndCombos?.map((section: EventSectionGet, indexSector: any) => (
        <>
          {indexSector > 0 ? <hr style={{ margin: '25px 0px 30px 0px' }} /> : null}
          <div className="text-darkgray-regular">Nome do setor:</div>
          <div className="mb-4">{section.section.name}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
              columnGap: '30px',
            }}
          >
            <DataList
              data={[
                {
                  title: 'Grupo:',
                  content: section.products.find(item => item?.group?.name)?.group.name || '--',
                  width: '100%',
                },
                {
                  title: 'Subgrupo:',
                  content:
                    section.products.find(item => item?.subgroup?.name)?.subgroup.name || '--',
                },
              ]}
            />
          </div>
          <div
            className="mb-4"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
              columnGap: '30px',
              overflow: 'auto',
            }}
          >
            <DataList data={dataSectorProduct} />
          </div>
        </>
      ))}
    </>
  );
};
