/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { MouseEventHandler, useState } from 'react';
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

export const DropdownMenuAttachment: React.FC<DropdownMenuProps> = ({ title, actions }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <label className="dropdown-menu-attachment svg-icon">
      {title}

      <input
        type="checkbox"
        className="dd-input"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <ul className="dd-menu">
        {actions?.map((action, index) => (
          <React.Fragment key={index}>
            {action.divider ? <hr /> : null}
            <li
              onClick={(action.onClick, action.action)}
              className={action.hidden === true ? 'hiddenDisplay' : ''}
            >
              <div className="d-flex justify-content-end">
                {action.icon ? (
                  <div className="my-auto menu-icon-container">{action.icon}</div>
                ) : null}
                <div>{action.title}</div>
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </label>
  );
};
