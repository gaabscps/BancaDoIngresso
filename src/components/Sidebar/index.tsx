import React, { useState } from 'react';
import {
  AlignJustify,
  Calendar,
  ChevronDown,
  Home,
  Settings,
  X,
  Power,
  Icon,
  Tool,
} from 'react-feather';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { REACT_APP_USER, REACT_APP_AUTH } from '@/utils/config';
import { getItem, removeItem } from '@/helpers/common/localStorage';

import logoBanca from '@/assets/images/logo/logoBanca.png';
import { path } from '@/navigation/path';
import { AuthUser } from '@/model/AuthUser';
import SubMenu from '@/model/SubMenu';

interface MenuItem {
  route: string;
  title: string;
}

interface SubMenuProps {
  name: string;
  IconSvg: Icon;
  items: MenuItem[];
}

interface MenuItens {
  name: string;
  MenuIcon: Icon;
  link: string;
  pathname: string;
  subMenus: SubMenu[];
}

export const NavLinkWithSubMenu = ({ name, items, IconSvg }: SubMenuProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

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
        activeClassName={pathname === items[0].route ? 'active' : ''}
      >
        <IconSvg />
        <span className="adm-span">{name}</span>
        <ChevronDown
          className="icon-chevron"
          style={{
            transform: isOpen || pathname === items[0].route ? 'rotate(-180deg)' : 'rotate(0deg)',
          }}
        />
      </NavLink>

      <div className="submenu-container">
        <ul
          className={
            isOpen || pathname === items[0].route ? 'sidebar-submenu' : 'sidebar-submenu-collapsed'
          }
        >
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

const MenuList: React.FC<MenuItens> = ({
  name,
  link,
  pathname,
  MenuIcon,
  subMenus,
}): JSX.Element => {
  const subItens: MenuItem[] = [];
  if (subMenus && subMenus.length > 0) {
    subMenus.forEach(data => {
      subItens.push({ route: data.link, title: data.name });
    });
  }
  return (
    <>
      {subItens.length === 0 && (
        <NavLink to={link} activeClassName={link === pathname ? 'active' : ''}>
          <MenuIcon />
          <span className="adm-span">{name}</span>
        </NavLink>
      )}
      {subItens.length > 0 && (
        <NavLinkWithSubMenu name={name} IconSvg={MenuIcon} items={subItens} />
      )}
    </>
  );
};

export const Sidebar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);
  const history = useHistory();
  const { pathname } = useLocation();

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

  const jsonAuthUser = getItem(String(REACT_APP_USER));
  const user = jsonAuthUser as AuthUser;
  const { menus } = user;

  const getIcon = (icon: string): Icon => {
    let ico: Icon = undefined as unknown as Icon;
    switch (icon) {
      case 'Home':
        ico = Home;
        break;
      case 'Calendar':
        ico = Calendar;
        break;
      case 'Settings':
        ico = Settings;
        break;
      case 'Tool':
        ico = Tool;
        break;
      default:
        ico = Home;
        break;
    }
    return ico;
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
          {menus &&
            menus.length > 0 &&
            menus.map(data => (
              <li key={data.name} className="sidebar-list">
                <MenuList
                  name={data.name}
                  pathname={pathname}
                  link={data.link}
                  MenuIcon={getIcon(data.icon)}
                  subMenus={data.subMenus}
                />
              </li>
            ))}
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
