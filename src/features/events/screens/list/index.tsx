import React from 'react';
import { EventContainer } from '@/features/events/screens/list/ui';
import EventStatus from '@/model/EventStatus';
import { colors } from '@/styles/colors';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const EventScreen: React.FC = () => {
  const paginationSelect = [
    { value: 10, label: '10 por página' },
    { value: 20, label: '20 por página' },
    { value: 50, label: '50 por página' },
    { value: 100, label: '100 por página' },
  ];

  const changeColorColumn = (status: EventStatus): string =>
    ({
      0: colors.lightBlue,
      1: colors.green,
      2: colors.yellow,
      3: colors.red,
    }[status] || colors.grey);

  return (
    <EventContainer paginationSelect={paginationSelect} changeColorColumn={changeColorColumn} />
  );
};
