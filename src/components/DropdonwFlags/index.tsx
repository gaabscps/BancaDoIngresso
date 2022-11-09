/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import '@/components/DropdonwFlags/styles.scss';

interface DropdonwFlagsProps {
  dataColumn: {
    id: string | number;
    name: string;
  }[];
  pointerClass?: boolean;
}

export const DropdonwFlags: React.FC<DropdonwFlagsProps> = ({ dataColumn, pointerClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const idRandom = Math.random().toString(36).substr(2, 9);

  const handleOnToggle = (): void => {
    setIsOpen(!isOpen);
  };
  return (
    <label className="dropdown-flags-custom">
      <div className="dd-button"></div>
      <label
        className={`d-flex mb-0 ${pointerClass === true ? 'pointerSvg' : ''}`}
        htmlFor={idRandom}
      >
        <div className="flag-item" title={dataColumn[0]?.name}>
          {dataColumn[0]?.name}
        </div>
        {dataColumn.length > 1 ? (
          <ChevronDown
            className="icon-chevron ml-2"
            style={{
              transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
            }}
          />
        ) : null}
      </label>
      <input type="checkbox" className="dd-input" id={idRandom} onClick={handleOnToggle} />
      {dataColumn.length > 1 ? (
        <div className="dd-menu">
          <div className="d-flex">
            {dataColumn?.map((item, index) => {
              if (index !== 0)
                return (
                  <span key={item.id} className="flag-item flag-item-list" title={item.name}>
                    {item.name}
                  </span>
                );
            })}
          </div>
        </div>
      ) : null}
    </label>
  );
};
