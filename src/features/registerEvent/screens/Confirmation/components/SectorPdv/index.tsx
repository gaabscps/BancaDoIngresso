import { DataList } from '@/components/DataList';
import React from 'react';
import Event from '@/model/Event';
import { toPercentage } from '@/helpers/common/amount';

export interface SectorPdvProps {
  event: Event | undefined;
}

export const SectorPdv: React.FC<SectorPdvProps> = ({ event }) => (
  <>
    <h5 className="mb-2 border-bottom-title mb-5 container-event">PDV’s</h5>

    {event?.pdvs?.map((item: any, index: any) => (
      <>
        <div className="mb-4">
          <div className="text-darkgray-regular">Nome do PDV</div>
          <div>{item.pdv.name}</div>
        </div>

        {item?.poss?.length > 0 ? (
          item?.poss?.map((pos: any) => (
            <div
              key={pos?.pos?.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                columnGap: '30px',
              }}
            >
              <DataList
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
                    content: `${toPercentage(pos?.waiter)}%`,
                  },
                ]}
              />
            </div>
          ))
        ) : (
          <div className="mb-4">
            <div className="text-darkgray-regular">Nome da POS:</div>
            <div>Nenhuma POS cadastrada</div>
          </div>
        )}

        <DataList
          data={[
            {
              title: 'Usuários do PDV:',
              content:
                item?.pdv?.users?.length > 0
                  ? item?.pdv?.users?.map((user: any) => user?.name)
                  : ['Nenhum usuario cadastrado'],
            },
          ]}
        />
        <DataList
          data={[
            {
              title: 'SubPDV’s:',
              content:
                item?.subPdvs?.length > 0
                  ? item?.subPdvs?.map((subPdv: any) => subPdv?.subPdv?.name)
                  : ['Nenhum subpdv cadastrado'],
            },
          ]}
        />
        {event?.pdvs && index === event.pdvs.length - 1 ? null : <hr />}
      </>
    ))}
  </>
);
