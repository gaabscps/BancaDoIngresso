import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
// import ThemeCustomize from "../layout/theme-customizer";
import { ToastContainer } from "react-toastify";
import { ADD_SIDEBAR_TYPES, ADD_USER } from "../redux/actionTypes";
import { classes } from "../data/layouts";

import { getLocalStorage } from "../helpers/localStorage";

const App = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((content) => content.User.user);

  const handlePageLayouts = (type) => {
    let key = Object.keys(type).pop();
    let val = Object.values(type).pop();
    document.querySelector(".page-wrapper").className = "page-wrapper " + val;
    dispatch({ type: ADD_SIDEBAR_TYPES, payload: { type: val } });
    localStorage.setItem("layout", key);
  };

  const initInfoUser = () => {
    const user = getLocalStorage(process.env.REACT_APP_USER);
    dispatch({ type: ADD_USER, payload: JSON.parse(user) });
  };

  useEffect(() => {
    initInfoUser();
    handlePageLayouts(classes[2]);
  }, [handlePageLayouts, initInfoUser]);

  console.warn = () => {};
  return (
    <Fragment>
      <Loader />
      <div className="page-wrapper compact-wrapper" id="pageWrapper">
        <Header />
        <div className="page-body-wrapper sidebar-icon">
          <Sidebar />
          <div className="page-body">{children}</div>
          <Footer />
          {/* <ThemeCustomize /> */}
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default App;
