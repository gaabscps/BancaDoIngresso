import React, { Fragment, useState } from "react";
import man from "../../assets/images/dashboard/profile.jpg";
import { LogIn, Bell, Search } from "react-feather";
import { useHistory } from "react-router-dom";

import { Admin, LogOut } from "../../constant";

import {
  removeAuthLocalStorage,
  getLocalStorage,
} from "../../helpers/localStorage";

const Rightbar = (props) => {
  const history = useHistory();
  const [searchresponsive, setSearchresponsive] = useState(false);
  const [notificationDropDown, setNotificationDropDown] = useState(false);

  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive);
      document.querySelector(".search-full").classList.add("open");
      document.querySelector(".more_lang").classList.remove("active");
    } else {
      setSearchresponsive(!searchresponsive);
      document.querySelector(".search-full").classList.remove("open");
    }
  };

  const logoutUser = () => {
    removeAuthLocalStorage();
    history.push("/");
  };

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li>
            <span className="header-search">
              <Search onClick={() => SeacrhResposive(searchresponsive)} />
            </span>
          </li>
          <li className="onhover-dropdown">
            <div
              className="notification-box"
              onClick={() => setNotificationDropDown(!notificationDropDown)}
            >
              <Bell />
              <span className="badge badge-pill badge-secondary"></span>
            </div>
            <ul
              className={`notification-dropdown onhover-show-div ${
                notificationDropDown ? "active" : ""
              }`}
            >
              <li>
                <Bell />
                <h6 className="f-18 mb-0">Notificações</h6>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-primary"> </i>Exemplo 1
                  <span className="pull-right">{"10 min."}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-success"></i>Exemplo 2
                  <span className="pull-right">{"1 hr"}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-info"></i>Exemplo 3
                  <span className="pull-right">{"3 hr"}</span>
                </p>
              </li>
              <li>
                <p>
                  <i className="fa fa-circle-o mr-3 font-danger"></i>Exemplo 4
                  <span className="pull-right">{"6 hr"}</span>
                </p>
              </li>
              <li>
                <button className="btn btn-primary">
                  Verifique todas as notificações
                </button>
              </li>
            </ul>
          </li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img
                className="b-r-10"
                src={require("../../assets/images/avtar/avatar.png")}
                alt=""
              />
              <div className="media-body">
                <span>Nome do usuário</span>
                <p className="mb-0 font-roboto">
                  {Admin} <i className="middle fa fa-angle-down"></i>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
export default Rightbar;
