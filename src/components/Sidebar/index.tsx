import React, { useState } from 'react';
import { AlignJustify, Calendar, ChevronDown, Home, Settings, X, Power, Icon } from 'react-feather';
import { NavLink, useHistory } from 'react-router-dom';
import { REACT_APP_USER, REACT_APP_AUTH } from '@/utils/config';
import { removeItem } from '@/helpers/common/localStorage';

import logoBanca from '@/assets/images/logo/logoBanca.png';
import { path } from '@/navigation/path';

interface MenuItem {
  route: string;
  title: string;
}

interface SubMenuProps {
  IconSvg: Icon;
  items: MenuItem[];
}

export const NavLinkWithSubMenu = ({ items, IconSvg }: SubMenuProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnToggle = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <NavLink
        to=""
        onClick={(e): void => {
          e.preventDefault();
          handleOnToggle();
        }}
      >
        <IconSvg />
        <span className="adm-span">Configurações</span>
        <ChevronDown
          className="icon-chevron"
          style={{ transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)' }}
        />
      </NavLink>

      <div className="submenu-container">
        <ul className={isOpen ? 'sidebar-submenu' : 'sidebar-submenu-collapsed'}>
          {items.map(item => (
            <li key={item.route}>
              <NavLink to={item.route}>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export const Sidebar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);
  const history = useHistory();

  const toggleMobile = (): void => {
    setIsMobile(!isMobile);

    const y = document.getElementById('body');
    const x = document.getElementById('navMenu');

    if (x !== null) {
      // eslint-disable-next-line no-unused-expressions
      x.className === 'sidebar-container'
        ? (x.className += ' mobile')
        : (x.className = 'sidebar-container');
    }

    if (y != null) {
      if (y?.className === 'page-body') {
        y.className += 'mobile';
      } else {
        y.className = 'page-body';
      }
    }
  };

  const handleOnSignOut = (): void => {
    removeItem(String(REACT_APP_USER));
    removeItem(String(REACT_APP_AUTH));

    history.push(path.Initial.itself);
  };

  return (
    <React.Fragment>
      <button className="border-0 bg-white" onClick={(): void => toggleMobile()}>
        <AlignJustify className={isMobile ? 'header-sandwich' : 'header-sandwichactive'} />
      </button>

      <div className="sidebar-container" id="navMenu">
        <div className="sandwich-container">
          <button className="border-0 bg-white" onClick={(): void => toggleMobile()}>
            <X className="sandwich-menu" />
          </button>
        </div>
        <img src={logoBanca} />
        <div className="list-container">
          <li className="sidebar-list">
            <NavLink to={path.Dashboard.itself}>
              <Home />
              <span className="adm-span">Home</span>
            </NavLink>
          </li>

          <li className="sidebar-list">
            <NavLink to={path.Dashboard.Events.itself}>
              <Calendar />
              <span className="adm-span">Eventos</span>
            </NavLink>
          </li>

          <li className="sidebar-list">
            <NavLinkWithSubMenu
              IconSvg={Settings}
              items={[
                {
                  route: path.Dashboard.Payment.itself,
                  title: 'Pagamentos',
                },
                {
                  route: path.Dashboard.Pdv.itself,
                  title: 'PDV',
                },
                {
                  route: path.Dashboard.Pos.itself,
                  title: 'POS',
                },
              ]}
            />
          </li>
        </div>

        <div className="logout-container">
          <li className="sidebar-logout">
            <NavLink
              to=""
              onClick={(e): void => {
                e.preventDefault();
                handleOnSignOut();
              }}
            >
              <Power />
              <span>Sair</span>
            </NavLink>
          </li>
        </div>
      </div>
    </React.Fragment>
  );
};
