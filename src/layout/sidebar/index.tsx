/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Fragment, useState } from 'react';
import { ChevronDown, Power, Icon, AlignJustify, X } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import { MENUITEMS } from './menu';
import { removeAuthLocalStorage } from '../../helpers/localStorage';
import logoBanca from '../../assets/images/logo/logoBanca.png';

interface Menu {
  title: string;
  icon: Icon;
  type: string;
  active: boolean;
  path?: string;
  children: MenuItem[];
  badge?: string;
  badgetxt?: string;
}

interface MenuItem {
  path: string;
  title: string;
  type: string;
  active?: boolean;
}

const Sidebar = () => {
  const history = useNavigate();
  const menus: Menu[] = [];
  MENUITEMS.Items.forEach(menu => {
    menus.push(menu as Menu);
  });

  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [sandwich, setSandwich] = useState(true);
  const [mainmenu] = useState(menus);
  const [sidebartoogle, setSidebartoogle] = useState(true);
  const rotacao = 'rotate(-180deg)';
  const logoutUser = (): void => {
    removeAuthLocalStorage();
    history('/');
    history(0);
  };

  const activeVerify = () => {
    if (active) {
      setActive(false);
    }
    if (active1) {
      setActive1(false);
    }
    if (active2) {
      setActive2(false);
    }
  };

  const sandwichMenu = () => {
    setSandwich(!sandwich);
    const y = document.getElementById('body');
    const x = document.getElementById('navMenu');
    if (x != null) {
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

  return (
    <>
      <a href="#">
        <AlignJustify
          className={sandwich ? 'header-sandwich' : 'header-sandwichactive'}
          onClick={event => {
            event.preventDefault();
            sandwichMenu();
          }}
        />
      </a>
      <div className="sidebar-container" id="navMenu">
        <div className="sandwich-container">
          <a href="#">
            <X
              className="sandwich-menu"
              onClick={event => {
                event.preventDefault();
                sandwichMenu();
              }}
            />
          </a>
        </div>
        <img src={logoBanca} />
        <div className="list-container">
          {mainmenu.map((menuItem, i) => (
            <a>
              <li className="sidebar-list" key={i}>
                {menuItem.type === 'sub' ? (
                  <a
                    className={active === true ? 'active' : ''}
                    href="javascript"
                    onClick={event => {
                      event.preventDefault();
                      setSidebartoogle(!sidebartoogle);
                      activeVerify();
                      setActive(!active);
                      menuItem.active = !menuItem.active;
                    }}
                  >
                    <menuItem.icon />
                    <span className="adm-span">{menuItem.title}</span>
                    {active === true ? (
                      <ChevronDown
                        className="icon-chevron"
                        style={{ transition: 'all linear 0.2s' }}
                      />
                    ) : (
                      <ChevronDown
                        className="icon-chevron"
                        style={{ transition: 'all linear 0.2s', transform: rotacao }}
                      />
                    )}
                  </a>
                ) : (
                  ''
                )}
                {menuItem.title === 'Início' && menuItem.path ? (
                  <Link
                    onClick={() => {
                      setSidebartoogle(true);
                      menuItem.active = false;
                      activeVerify();
                      setActive1(!active1);
                    }}
                    className={active1 === true ? 'active' : ''}
                    to={menuItem.path}
                  >
                    <menuItem.icon />
                    <span>{menuItem.title}</span>
                  </Link>
                ) : (
                  ''
                )}
                {menuItem.title === 'Eventos' && menuItem.path ? (
                  <Link
                    onClick={() => {
                      setSidebartoogle(true);
                      menuItem.active = false;
                      activeVerify();
                      setActive2(!active2);
                    }}
                    to={menuItem.path}
                    className={active2 === true ? 'active' : ''}
                  >
                    <menuItem.icon />
                    <span>{menuItem.title}</span>
                  </Link>
                ) : (
                  ''
                )}
                <div className="submenu-container">
                  {menuItem.children ? (
                    <ul className={sidebartoogle ? 'sidebar-submenu-collapsed' : 'sidebar-submenu'}>
                      {menuItem.children.map((childrenItem, index) => (
                        <li key={index}>
                          {childrenItem.type === 'sub' ? (
                            <a href="javascript" className="a">
                              {childrenItem.title}
                            </a>
                          ) : (
                            ''
                          )}

                          {childrenItem.type === 'link' ? (
                            <Link
                              to={childrenItem.path}
                              className={
                                childrenItem.path === window.location.pathname ? 'subactive' : ''
                              }
                              // onClick={() => toggletNavSubActive(i, index, childrenItem)}
                            >
                              <span>{childrenItem.title}</span>
                            </Link>
                          ) : (
                            ''
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ''
                  )}
                </div>
              </li>
            </a>
          ))}
        </div>
        <div className="logout-container">
          <li className="sidebar-logout">
            <Link to="#!" onClick={() => logoutUser()}>
              <Power />
              <span>Sair</span>
            </Link>
          </li>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
