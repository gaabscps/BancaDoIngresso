import React from 'react';
import { REACT_APP_USER } from '@/utils/config';
import { AuthUser } from '@/model/AuthUser';
import { getBoolean, getItem } from '@/helpers/common/localStorage';

import avatar from '@/assets/images/avatar/avatar.png';
import { path } from '@/navigation/path';

export const Header: React.FC = () => {
  const isUserStoraged = getBoolean(String(REACT_APP_USER));

  let user = {} as AuthUser;

  if (isUserStoraged) {
    user = getItem(String(REACT_APP_USER));
  }

  const titlePageHeader = [
    {
      route: path.Dashboard.Module.itself,
      title: 'Módulos',
      subTitle: 'Parâmetros / Módulos',
    },
    {
      route: path.Dashboard.Permission.itself,
      title: 'Permissões',
      subTitle: 'Parâmetros / Permissões',
    },
    {
      route: path.Dashboard.Menu.itself,
      title: 'Menu',
      subTitle: 'Parâmetros / Menu',
    },
    {
      route: path.Dashboard.SubMenu.itself,
      title: 'Sub Menu',
      subTitle: 'Parâmetros / Sub Menu',
    },
    {
      route: path.Dashboard.User.itself,
      title: 'Usuários e Grupos',
      subTitle: 'Administração / Usuários e Grupos',
    },
    {
      route: path.Dashboard.Pdv.itself,
      title: 'PDV',
      subTitle: 'Administração / PDV',
    },
    {
      route: path.Dashboard.Pos.itself,
      title: 'POS',
      subTitle: 'Administração / POS',
    },
    {
      route: path.Dashboard.ProductsCombos.itself,
      title: 'Produtos e Combos',
      subTitle: 'Administração / Produtos e Combos',
    },
    {
      route: path.Dashboard.Company.itself,
      title: 'Empresas',
      subTitle: 'Administração / Empresas',
    },
    {
      route: path.Dashboard.Gateway.itself,
      title: 'Gateway de pagamento',
      subTitle: 'Administração / Gateway de pagamento',
    },
    {
      route: path.Dashboard.Payment.itself,
      title: 'Formas de Pagamento',
      subTitle: 'Administração / Formas de pagamento',
    },
  ];

  return (
    <div className="page-header">
      <div className="path-container">
        <div className="path-flex-container">
          <span className="path-path">
            {titlePageHeader.filter(item => item.route === window.location.pathname)[0]?.subTitle ??
              ''}
          </span>
          <span className="path-main">
            {titlePageHeader.filter(item => item.route === window.location.pathname)[0]?.title ??
              ''}
          </span>
        </div>
      </div>

      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li className="">
            <div className="media profile-media" title={user?.name}>
              <img className="user-img" src={user?.imageUrl ? user?.imageUrl : avatar} alt="" />
              <div className="media-body profile-name">
                <span>{user?.name}</span>
                <div className="profile-user">
                  {user?.profile} <i className=""></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
