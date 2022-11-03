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
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const StatusFilter: React.FC<StatusFilterProps> = ({ handleOnFilterStatus }) => {
  const initialState = [
    {
      name: 'Rascunho',
      value: '0',
      color: colors.lightBlue,
      status: false,
      backgroundColor: colors.lightBlueBG,
    },
    {
      name: 'Liberação pendente',
      value: '1',
      color: colors.darkRed,
      status: false,
      backgroundColor: colors.darkRedBG,
    },
    {
      name: 'Liberado',
      value: '2',
      color: colors.green,
      status: false,
      backgroundColor: colors.greenBG,
    },
    {
      name: 'Recusado',
      value: '3',
      color: colors.yellow,
      status: false,
      backgroundColor: colors.yellowBG,
    },
    {
      name: 'Bloqueado',
      value: '4',
      color: colors.red,
      status: false,
      backgroundColor: colors.redBG,
    },
    {
      name: 'Encerrado',
      value: '5',
      color: colors.lightGreen,
      status: false,
      backgroundColor: colors.lightGreenBG,
    },
    {
      name: 'Finalizado',
      value: '6',
      color: colors.orange,
      status: false,
      backgroundColor: colors.orangeBG,
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
          onClick={() => {
            handleStatus(item);
            handleOnFilterStatus(item.value);
          }}
          className={
            item.status
              ? 'd-flex action-icon eventStatus subText filterActive'
              : 'd-flex eventStatus subText action-icon'
          }
          style={
            item.status
              ? { backgroundColor: `${item.backgroundColor}`, color: `${item.color}` }
              : { backgroundColor: 'transparent' }
          }
        >
          <Status style={{ color: item.color }} />
          {item.name}
        </div>
      ))}
    </>
  );
};
