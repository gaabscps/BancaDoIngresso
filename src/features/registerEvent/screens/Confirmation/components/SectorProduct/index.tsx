import EventSectionGet from '@/model/EventSectionGet';
import { DataList } from '@/components/DataList';
import React from 'react';

interface SectorProductProps {
  data: any;
  event: any;
}

export const SectorProduct: React.FC<SectorProductProps> = ({ event, data }) => (
  <>
    <h5 className="mb-2 border-bottom-title mb-5 container-event">Setores e Produtos</h5>
    {event?.sectionproductsAndCombos?.map(
      (section: EventSectionGet, index: React.Key | null | undefined) => (
        <>
          <div className="mb-4">Nome do setor:</div>
          <div>{section.section.name}</div>
          <div
            className="mb-4"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
              columnGap: '30px',
            }}
          >
            <DataList
              array={true}
              data={[
                {
                  title: 'Grupo:',
                  content:
                    event?.sectionproductsAndCombos?.map((item: { products: any[] }) =>
                      item.products.map(products => products.group.name),
                    ) || '--',
                },
                {
                  title: 'Subgrupo:',
                  content:
                    event?.sectionproductsAndCombos?.map((item: { products: any[] }) =>
                      item.products.map(products => products.subgroup.name),
                    ) || '--',
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
            <DataList data={data} />
          </div>
          {section.section.name.length - 1 !== index && (
            <div key={index} className="mb-5 mt-5" style={{ borderBottom: 'solid 1px #D9D9D9' }} />
          )}
        </>
      ),
    )}
  </>
);
