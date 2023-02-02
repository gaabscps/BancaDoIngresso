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

export const SectorProduct: React.FC<SectorProductProps> = ({ event }) => (
  <>
    <h5 className="mb-2 border-bottom-title mb-5 container-event">Setores e Produtos</h5>
    {event?.sectionproductsAndCombos?.map((section: EventSectionGet, indexSector: any) => (
      <div style={{ overflow: 'auto' }}>
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
                content: section.products.find(item => item?.subgroup?.name)?.subgroup.name || '--',
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
          }}
        >
          {section.products && section.products.length > 0 && (
            <DataList
              data={[
                {
                  title: 'Produto',
                  content: section.products.map(item => item.name) || '--',
                },
                {
                  title: 'Qtd',
                  content: section.products.map(item => item.amount) || '--',
                },
                {
                  title: 'Valor un',
                  content: section.products.map(item => toCurrency(item.totalValue)) || '--',
                },
                {
                  title: 'Total estimado',
                  content: section.products.map(
                    item => toCurrency(item.totalValue * item.amount) || '--',
                  ),
                },
                {
                  title: 'Tx Deb',
                  content: section.products.map(item =>
                    item.physicalSale?.debit ? `${toPercentage(item.physicalSale?.debit)}%` : '--',
                  ),
                },
                {
                  title: 'Tx Cred',
                  content: section.products.map(item =>
                    item.physicalSale?.credit
                      ? `${toPercentage(item.physicalSale?.credit)}%`
                      : '--',
                  ),
                },
                {
                  title: 'Tx Pix ',
                  content: section.products.map(item =>
                    item.physicalSale?.pix ? `${toPercentage(item.physicalSale?.pix)}%` : '--',
                  ),
                },
                {
                  title: 'Tx Admin',
                  content: section.products.map(item =>
                    item.physicalSale?.administrateTax
                      ? `${toPercentage(item.physicalSale?.administrateTax)}%`
                      : '--',
                  ),
                },
                {
                  title: 'Parcelas',
                  content: section.products.map(item =>
                    item.physicalSale?.installments ? item.physicalSale?.installments : '--',
                  ),
                },
                {
                  title: 'Jur mês',
                  content: section.products.map(item =>
                    item.physicalSale?.fee ? `${toPercentage(item.physicalSale?.fee)}%` : '--',
                  ),
                },
              ]}
            />
          )}

          {section.combos && section.combos.length > 0 && (
            <DataList
              data={[
                {
                  title: 'Combos',
                  content: section?.combos?.map(item => item.name) || '--',
                },
                {
                  title: 'Qtd',
                  content: section?.combos?.map(item => item.amount) || '--',
                },
                {
                  title: 'Valor un',
                  content: section?.combos?.map(item => toCurrency(item.totalValue)) || '--',
                },
                {
                  title: 'Total estimado',
                  content:
                    section?.combos?.map(item => toCurrency(item.totalValue * item.amount)) || '--',
                },
                {
                  title: 'Tx Deb',
                  content: section?.combos?.map(item =>
                    item.physicalSale?.debit ? `${toPercentage(item.physicalSale?.debit)}%` : '--',
                  ),
                },
                {
                  title: 'Tx Cred',
                  content: section?.combos?.map(item =>
                    item.physicalSale?.credit
                      ? `${toPercentage(item.physicalSale?.credit)}%`
                      : '--',
                  ),
                },
                {
                  title: 'Tx Pix ',
                  content: section?.combos?.map(item =>
                    item.physicalSale?.pix ? `${toPercentage(item.physicalSale?.pix)}%` : '--',
                  ),
                },
                {
                  title: 'Tx Admin',
                  content: section?.combos?.map(item =>
                    item.physicalSale?.administrateTax
                      ? `${toPercentage(item.physicalSale?.administrateTax)}%`
                      : '--',
                  ),
                },
                {
                  title: 'Parcelas',
                  content: section?.combos?.map(item =>
                    item.physicalSale?.installments ? item.physicalSale?.installments : '--',
                  ),
                },
                {
                  title: 'Jur mês',
                  content: section?.combos?.map(item =>
                    item.physicalSale?.fee ? `${toPercentage(item.physicalSale?.fee)}%` : '--',
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>
    ))}
  </>
);
