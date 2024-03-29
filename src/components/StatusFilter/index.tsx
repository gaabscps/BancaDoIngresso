/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import './styles.scss';
import { colors } from '@/styles/colors';

interface StatusFilterProps {
  name?: string;
  value?: string;
  color?: string;
  backgroundColor?: string;
  status?: boolean;
  handleOnFilterStatus: (status: number) => void;
  clearFilter: () => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const StatusFilter: React.FC<StatusFilterProps> = ({
  handleOnFilterStatus,
  clearFilter,
}) => {
  const initialState = [
    {
      name: 'Rascunho',
      value: '0',
      color: colors.lightBlue,
      colorName: 'lightBlue',
      status: false,
      title: 'Eventos sendo criados',
    },
    {
      name: 'Liberação pendente',
      value: '1',
      color: colors.darkRed,
      colorName: 'darkRed',
      status: false,
      title: 'Aguardando aprovação da Diretoria',
    },
    {
      name: 'Liberado',
      value: '2',
      color: colors.green,
      colorName: 'green',
      status: false,
      title: 'Evento Ativo',
    },
    {
      name: 'Recusado',
      value: '3',
      color: colors.yellow,
      colorName: 'yellow',
      status: false,
      title: 'Evento aguardando correção',
    },
    {
      name: 'Bloqueado',
      value: '4',
      color: colors.red,
      colorName: 'red',
      status: false,
      title: 'Evento Pausado',
    },
    {
      name: 'Encerrado',
      value: '5',
      color: colors.lightGreen,
      colorName: 'lightGreen',
      status: false,
      title: 'Evento acabou, aguardando fechamento',
    },
    {
      name: 'Finalizado',
      value: '6',
      color: colors.orange,
      colorName: 'orange',
      status: false,
      title: 'Evento finalizado sem pendências',
    },
  ];

  const [itemList, setItemList] = useState(initialState);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleStatus = (item: StatusFilterProps) => {
    const newList = itemList.map(i => {
      if (i.value === item.value) {
        return { ...i, status: !i.status };
      }
      return { ...i, status: false };
    });
    setItemList(newList);
  };

  return (
    <>
      {itemList.map((item: any) => (
        // eslint-disable-next-line react/jsx-key
        <div
          title={item.title}
          onClick={() => {
            handleStatus(item);
            // eslint-disable-next-line no-unused-expressions
            item.status ? clearFilter() : handleOnFilterStatus(item.value);
          }}
          className={
            item.status
              ? `d-flex action-icon eventStatus subText filterActive filterStatus filterStatus__${item.colorName}`
              : `d-flex action-icon eventStatus subText filterStatus filterStatus__${item.colorName}`
          }
        >
          <div>
            <Status style={{ color: item.color, display: 'flex', alignItems: 'center' }} />
          </div>
          <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>
        </div>
      ))}
    </>
  );
};
