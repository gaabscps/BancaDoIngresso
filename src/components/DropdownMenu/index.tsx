/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';

import './styles.scss';

export interface ActionProps {
  title: string | React.ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
  icon?: React.ReactNode;
  divider?: boolean;
  hidden?: boolean;
  action?: () => void;
}

interface DropdownMenuProps {
  title: string | React.ReactNode;
  actions: ActionProps[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, actions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleClickOutside = (event: any) => {
      if (!menuRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div ref={menuRef}>
      <label className="dropdown-menu-custom svg-icon">
        <div
          className={isOpen ? 'dd-button action-icon checked' : 'dd-button action-icon'}
          style={{
            transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'transform 0.2s ease-in-out',
            width: '30px',
          }}
        >
          {title}
        </div>
        <input onClick={() => setIsOpen(!isOpen)} type="checkbox" className="dd-input" />
        {isOpen && (
          <ul className="dd-menu">
            {actions?.map((action: any, index: any) => (
              <React.Fragment key={index}>
                {action.divider ? <hr /> : null}
                <li
                  onClick={(action.onClick, action.action)}
                  className={action.hidden === true ? 'hiddenDisplay' : ''}
                >
                  <div className="d-flex">
                    {action.icon ? (
                      <div className="my-auto menu-icon-container">{action.icon}</div>
                    ) : null}
                    <div>{action.title}</div>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        )}
      </label>
    </div>
  );
};
