import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowRight, ArrowLeft, Power, Icon } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import { MENUITEMS } from './menu';
import configDB from '../../data/customizer/config';
import { removeAuthLocalStorage } from '../../helpers/localStorage';
import { ApplicationState } from '../../store';
import logoBanca from '../../assets/images/logo/logoBanca.png';
import logo_dark from '../../assets/images/logo/logo_dark.png';
import logoIcon from '../../assets/images/logo/logo-icon.png';

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

const Sidebar = (): JSX.Element => {
  // eslint-disable-next-line
  const history = useNavigate();
  const menus: Menu[] = [];
  MENUITEMS.Items.forEach(menu => {
    menus.push(menu as Menu);
  });
  const [mainmenu, setMainMenu] = useState(menus);
  const [margin, setMargin] = useState(0);
  const [width] = useState(0);
  const [sidebartoogle] = useState(true);
  const wrapper =
    useSelector<ApplicationState, string>(content => content.customizer.data.sidebar_types.type) ||
    configDB.data.settings.sidebar.type;

  const logoutUser = (): void => {
    removeAuthLocalStorage();
    history('/');
    history(0);
  };

  const isPathName = (route: string): boolean => window.location.pathname === route;

  const setNavActive = (item: Menu | MenuItem): void => {
    const newMenus = mainmenu.filter(Items => {
      if (Items !== item) {
        // eslint-disable-next-line no-param-reassign
        Items.active = false;
        (document.querySelector('.bg-overlay1') as Element).classList.remove('active');
      }
      if (Items.children && Items.children.includes(item as MenuItem)) {
        // eslint-disable-next-line no-param-reassign
        Items.active = true;
        (document.querySelector('.sidebar-link') as Element).classList.add('active');
      }
      return Items;
    });
    // eslint-disable-next-line no-param-reassign
    item.active = !item.active;
    setMainMenu(newMenus);
  };

  const toggletNavActive = (index: number, item: Menu): void => {
    if (window.innerWidth <= 991) {
      (document.querySelector('.page-header') as Element).className = 'page-header close_icon';
      (document.querySelector('.sidebar-wrapper') as Element).className =
        'sidebar-wrapper close_icon ';

      if (item.type === 'sub') {
        (document.querySelector('.page-header') as Element).className = 'page-header ';
        (document.querySelector('.sidebar-wrapper') as Element).className = 'sidebar-wrapper ';
      }
    }
    mainmenu[index].active = !item.active;
    setMainMenu(mainmenu);
  };

  const toggletNavSubActive = (menuIndex: number, index: number, item: MenuItem): void => {
    if (window.innerWidth <= 991) {
      (document.querySelector('.page-header') as Element).className = 'page-header close_icon';
      (document.querySelector('.sidebar-wrapper') as Element).className =
        'sidebar-wrapper close_icon ';

      if (item.type === 'sub') {
        (document.querySelector('.page-header') as Element).className = 'page-header ';
        (document.querySelector('.sidebar-wrapper') as Element).className = 'sidebar-wrapper ';
      }
    }

    mainmenu[menuIndex].children[index].active = !item.active;
    setMainMenu(mainmenu);
  };

  const scrollToRight = (): void => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570);
      } else {
        setMargin(-3464);
      }
      (document.querySelector('.right-arrow') as Element).classList.add('d-none');
      (document.querySelector('.left-arrow') as Element).classList.remove('d-none');
    } else {
      setMargin(margin - width);
      (document.querySelector('.left-arrow') as Element).classList.remove('d-none');
    }
  };

  const scrollToLeft = (): void => {
    if (margin >= -width) {
      setMargin(0);
      (document.querySelector('.left-arrow') as Element).classList.add('d-none');
      (document.querySelector('.right-arrow') as Element).classList.remove('d-none');
    } else {
      setMargin(margin + width);
      (document.querySelector('.right-arrow') as Element).classList.remove('d-none');
    }
  };

  const closeOverlay = (): void => {
    (document.querySelector('.bg-overlay1') as Element).classList.remove('active');
    (document.querySelector('.sidebar-link') as Element).classList.remove('active');
  };

  const activeClass = (): void => {
    (document.querySelector('.sidebar-link') as Element).classList.add('active');
    (document.querySelector('.bg-overlay1') as Element).classList.add('active');
  };

  const responsiveSidebar = (): void => {
    (document.querySelector('.page-header') as Element).className = 'page-header close_icon';
    (document.querySelector('.sidebar-wrapper') as Element).className =
      'sidebar-wrapper close_icon';
  };

  return (
    <Fragment>
      <div
        className={`bg-overlay1`}
        onClick={() => {
          closeOverlay();
        }}
      ></div>
      <div className="sidebar-wrapper">
        <div className="logo-wrapper d-flex justify-content-center align-items-center">
          <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
            <img className="img-fluid for-light" src={logoBanca} alt="" />
            <img className="img-fluid for-dark" src={logo_dark} alt="" />
          </Link>
          <div className="back-btn" onClick={() => responsiveSidebar()}>
            <i className="fa fa-angle-left"></i>
          </div>
          {/* <div
            className="toggle-sidebar"
            onClick={() => openCloseSidebar(sidebartoogle)}
          >
            <Grid className="status_toggle middle sidebar-toggle" />
          </div> */}
        </div>
        <div className="logo-icon-wrapper">
          <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
            <img className="img-fluid" src={logoIcon} alt="" />
          </Link>
        </div>
        <nav className="sidebar-main">
          <div className="left-arrow" onClick={scrollToLeft}>
            <ArrowLeft />
          </div>
          <div
            id="sidebar-menu"
            style={
              wrapper.split(' ').includes('horizontal-wrapper')
                ? { marginLeft: `${margin}px` }
                : { margin: '0px' }
            }
          >
            <ul className="sidebar-links custom-scrollbar">
              <li className="back-btn">
                <div className="mobile-back text-right">
                  <span>{'Back'}</span>
                  <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                </div>
              </li>
              <Fragment>
                {mainmenu.map((menuItem, i) => (
                  <li className="sidebar-list" key={i}>
                    {menuItem.type === 'sub' ? (
                      <a
                        href="javascript"
                        className={`sidebar-link sidebar-title ${
                          menuItem.active ? activeClass() : ''
                        }`}
                        onClick={event => {
                          event.preventDefault();
                          setNavActive(menuItem);
                        }}
                      >
                        <menuItem.icon />
                        <span>{menuItem.title}</span>
                        <div className="according-menu">
                          {menuItem.active ? (
                            <i className="fa fa-angle-down"></i>
                          ) : (
                            <i className="fa fa-angle-right"></i>
                          )}
                        </div>
                      </a>
                    ) : (
                      ''
                    )}

                    {menuItem.type === 'link' && menuItem.path ? (
                      <Link
                        to={menuItem.path}
                        className={`sidebar-link sidebar-title link-nav  ${
                          isPathName(menuItem.path) ? 'active' : ''
                        }`}
                        onClick={() => toggletNavActive(i, menuItem)}
                      >
                        <menuItem.icon />
                        <span>{menuItem.title}</span>
                      </Link>
                    ) : (
                      ''
                    )}

                    {menuItem.children ? (
                      <ul
                        className="sidebar-submenu"
                        style={
                          // eslint-disable-next-line no-nested-ternary
                          menuItem.active
                            ? {
                                opacity: 1,
                                transition: 'opacity 500ms ease-in',
                              }
                            : sidebartoogle
                            ? { display: 'block' }
                            : { display: 'none' }
                        }
                      >
                        {menuItem.children.map((childrenItem, index) => (
                          <li key={index}>
                            {childrenItem.type === 'sub' ? (
                              <a
                                href="javascript"
                                className={`${childrenItem.active ? 'active' : ''}`}
                                onClick={event => {
                                  event.preventDefault();
                                  toggletNavSubActive(i, index, childrenItem);
                                }}
                              >
                                {childrenItem.title}
                                <span className="sub-arrow">
                                  <i className="fa fa-chevron-right"></i>
                                </span>
                                <div className="according-menu">
                                  {childrenItem.active ? (
                                    <i className="fa fa-angle-down"></i>
                                  ) : (
                                    <i className="fa fa-angle-right"></i>
                                  )}
                                </div>
                              </a>
                            ) : (
                              ''
                            )}

                            {childrenItem.type === 'link' ? (
                              <Link
                                to={childrenItem.path}
                                className={`${childrenItem.active ? 'active' : ''}`}
                                onClick={() => toggletNavSubActive(i, index, childrenItem)}
                              >
                                {childrenItem.title}
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
                  </li>
                ))}
              </Fragment>
              <li className="sidebar-list">
                <Link
                  to="#!"
                  className={`sidebar-link sidebar-title link-nav `}
                  onClick={() => logoutUser()}
                >
                  <Power />
                  <span>Sair</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="right-arrow" onClick={scrollToRight}>
            <ArrowRight />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default Sidebar;
