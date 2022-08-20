import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from '../layout/loader';
import Header from '../layout/header';
import Sidebar from '../layout/sidebar';
import Footer from '../layout/footer';

interface StateProps {
  children: JSX.Element;
}

type Props = StateProps;

const App = (props: Props): JSX.Element => (
  <Fragment>
    <Loader />
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
      {/* <Header /> */}
      <div className="page-body-wrapper sidebar-icon">
        <Sidebar />
        <div className="page-body" style={{ minHeight: '100vh' }}>
          {props.children}
        </div>
        <Footer />
        {/* <ThemeCustomize /> */}
      </div>
    </div>
    <ToastContainer />
  </Fragment>
);

export default App;
