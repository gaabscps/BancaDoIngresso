import React from 'react';
import { REACT_APP_USER } from '@/utils/config';
import { AuthUser } from '@/model/AuthUser';
import { getBoolean, getItem } from '@/helpers/common/localStorage';

import avatar from '@/assets/images/avatar/avatar.png';

export const Header: React.FC = () => {
  const isUserStoraged = getBoolean(String(REACT_APP_USER));

  let user = {} as AuthUser;

  if (isUserStoraged) {
    user = getItem(String(REACT_APP_USER));
  }

  return (
    <div className="page-header">
      <div className="path-container">
        <div className="path-flex-container">
          <span className="path-path">Acessando</span>
          <span className="path-main">{window.location.pathname.replace('/', '')}</span>
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
