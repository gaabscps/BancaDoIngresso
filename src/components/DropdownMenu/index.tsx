/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { MouseEventHandler } from 'react';
import './styles.scss';

export interface ActionProps {
  title: string | React.ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
  icon?: React.ReactNode;
  divider?: boolean;
  hidden?: boolean;
}

interface DropdownMenuProps {
  title: string | React.ReactNode;
  actions: ActionProps[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, actions }) => (
  <label className="dropdown-menu-custom">
    <div className="dd-button action-icon">{title}</div>

    <input type="checkbox" className="dd-input" />
    <ul className="dd-menu">
      {actions?.map((action, index) => (
        <React.Fragment key={index}>
          {action.divider ? <hr /> : null}
          <li onClick={action.onClick} className={action.hidden === true ? 'hiddenDisplay' : ''}>
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
  </label>
);
