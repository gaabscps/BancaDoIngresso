/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { DataList } from '@/components/DataList';
import Event from '@/model/Event';
import dayjs from 'dayjs';

interface DataConfirmationProps {
  event: Event | undefined;
}

export const DataConfirmation: React.FC<DataConfirmationProps> = ({ event }) => {
  const handleEventType = (type: number) => {
    switch (type) {
      case 0:
        return 'Mono';
      case 1:
        return 'Pai';
      case 2:
        return 'Filho';
      default:
        return '--';
    }
  };
  // Confirmação de dados
  const dataConfirmation = [
    {
      title: 'Nome do evento:',
      content: event?.name || '--',
    },
    {
      title: 'Tipo do evento:',
      content: handleEventType(Number(event?.eventType)),
    },
    {
      title: 'Eventos filhos:',
      content: event?.childs?.map(child => child.name) || '--',
    },
    {
      title: 'Evento pai:',
      content: event?.fatherEvent?.name || '--',
    },
    {
      title: 'Cidade / Estado:',
      content:
        event?.address.city && event.address.state
          ? `${event?.address.city} / ${event?.address.state}`
          : '--',
    },
    {
      title: 'Data e hora início:',
      content:
        event?.startDate !== undefined
          ? `${dayjs(event?.startDate).format('DD/MM/YYYY')} - ${
              String(event?.startDate).split('T')[1].slice(0, 5) ?? ''
            }`
          : '--',
    },
    {
      title: 'Data e hora fim:',
      content:
        event?.startDate !== undefined
          ? `${dayjs(event?.endDate).format('DD/MM/YYYY')} - ${
              String(event?.endDate).split('T')[1].slice(0, 5) ?? ''
            }`
          : '--',
    },
    {
      title: 'Empresa ou contratante:',
      content: event?.contractor.name || '--',
    },
  ];
  return (
    <>
      <div className="container-event">
        <h5 className="mb-2 border-bottom-title mb-5">Confirmação de dados</h5>
      </div>
      <DataList data={dataConfirmation} />
    </>
  );
};
