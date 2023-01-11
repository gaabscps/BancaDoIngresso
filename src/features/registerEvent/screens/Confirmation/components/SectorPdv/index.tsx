import { DataList } from '@/components/DataList';
import React from 'react';
import Event from '@/model/Event';

export interface SectorPdvProps {
  event: Event | undefined;
}

export const SectorPdv: React.FC<SectorPdvProps> = ({ event }) => (
  <>
    <h5 className="mb-2 border-bottom-title mb-5 container-event">PDV’s</h5>
    {event?.pdvs?.map((item: any) => (
      <>
        <div>Nome do PDV</div>
        <div>{item.pdv.name}</div>
        <div
          className="mb-4"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
            columnGap: '30px',
          }}
        >
          {item?.poss?.map((pos: any) => (
            <DataList
              key={pos?.pos?.id}
              data={[
                {
                  title: 'Nome da POS:',
                  content: pos?.pos?.name,
                },
                {
                  title: 'Nº de série:',
                  content: pos?.pos?.serialNumber,
                },
                {
                  title: '% do Garçom:',
                  content: pos?.waiter,
                },
              ]}
            />
          ))}
        </div>

        <DataList
          data={[
            {
              title: 'Usuários do PDV:',
              content: item.pdv.users.map((user: any) => user?.name),
            },
          ]}
        />
        <DataList
          data={[
            {
              title: 'SubPDV’s:',
              content: item?.subPdvs?.map((subPdv: any) => subPdv?.subPdv?.name),
            },
          ]}
        />
      </>
    ))}
  </>
);
