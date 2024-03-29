import { DataList } from '@/components/DataList';
import { toPercentage } from '@/helpers/common/amount';
import { toCurrency } from '@/helpers/masks/toCurrency';
import TicketBatch from '@/model/TicketBatch';
import Tickets from '@/model/Tickets';
import dayjs from 'dayjs';
import React from 'react';

interface SectorTicketProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ticket: any;
}

export const SectorTicket: React.FC<SectorTicketProps> = ({ ticket }) => (
  <>
    <h5 className="mb-2 border-bottom-title mb-5 container-event">Setores e Ingressos</h5>
    {ticket?.tickets?.map((item: Tickets, index: React.Key | null | undefined) => (
      <div style={{ overflow: 'auto' }} key={index}>
        <div className="mb-4">
          <div className="mb-2 text-darkgray-regular">Nome do setor:</div>
          <div>{item?.name || '--'}</div>
        </div>
        <div className="d-grid">
          {item.batchs?.map((batch: TicketBatch) => (
            <div
              key={index}
              className="mb-4"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                columnGap: '30px',
              }}
            >
              <DataList
                data={[
                  {
                    title: 'Lote:',
                    content: batch.name || '--',
                  },
                  {
                    title: 'Início da venda:',
                    content: `${dayjs(batch?.startDate).format('DD/MM/YYYY')} - ${
                      String(batch?.startDate).split('T')[1].slice(0, 5) ?? ''
                    }`,
                  },
                  {
                    title: 'Fim da venda:',
                    content: `${dayjs(batch?.startDate).format('DD/MM/YYYY')} - ${
                      String(batch?.startDate).split('T')[1].slice(0, 5) ?? ''
                    }`,
                  },
                  {
                    title: '% comissão:',
                    content: `${toPercentage(batch.commission)}%` || '--',
                  },
                  {
                    title: 'Qtd de ingresso:',
                    content: batch.amount || '--',
                  },
                  {
                    title: 'Qtd cortesia:',
                    content: item?.amountCourtesy || '--',
                  },
                  {
                    title: 'Qtd meia:',
                    content: item.amountHalfPrice || '--',
                  },
                  {
                    title: 'Valor unitário:',
                    content: toCurrency(batch.unitValue) || '--',
                  },
                  {
                    title: <div style={{ fontWeight: '700' }}>Valor total:</div>,
                    content:
                      <div style={{ fontWeight: '700' }}>{toCurrency(batch.totalValue)}</div> ||
                      '--',
                  },
                ]}
              />
            </div>
          ))}
        </div>
        {ticket.tickets.length - 1 !== index && (
          <div key={index} className="mb-5 mt-5" style={{ borderBottom: 'solid 1px #D9D9D9' }} />
        )}
      </div>
    ))}
  </>
);
