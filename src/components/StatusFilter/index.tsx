import React, { useState } from 'react';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import './styles.scss';

interface StatusProps {
  statusColor: string;
  status: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const StatusFilter = (props: StatusProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => {
        setActive(!active);
      }}
      className={
        active
          ? 'd-flex action-icon eventStatus subText filterActive'
          : 'd-flex eventStatus subText action-icon'
      }
      style={
        active ? { backgroundColor: `${props.statusColor}` } : { backgroundColor: 'transparent' }
      }
    >
      <Status style={{ color: props.statusColor }} />
      {props.status}
    </div>
  );
};
