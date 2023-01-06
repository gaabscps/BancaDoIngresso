/* eslint-disable react/jsx-key */
import EventSectionGet from '@/model/EventSectionGet';
import { DataList } from '@/components/DataList';
import React from 'react';
import Event from '@/model/Event';

interface SectorProductProps {
  data: any;
  event: Event;
}

export const SectorProduct: React.FC<SectorProductProps> = ({ event, data }) => (
  <>
    <h5 className="mb-2 border-bottom-title mb-5 container-event">Setores e Produtos</h5>
    {event?.sectionproductsAndCombos?.map(
      (section: EventSectionGet, index: React.Key | null | undefined) => (
        <>
          <div className="dataListTitle">Nome do setor:</div>
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
