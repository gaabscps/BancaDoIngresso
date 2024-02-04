import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ConfirmDeleteProvider } from '@/hooks/useConfirmDelete';
import { Navigation } from '@/navigation';
import store from '@/store';

import 'dayjs';
import 'dayjs/locale/pt-br';
import 'react-toastify/dist/ReactToastify.min.css';
import '@/styles/index.scss';
import { Sidebar } from './components/Sidebar';

export const App: React.FC = (): JSX.Element => (
  <Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <ConfirmDeleteProvider>
          <Sidebar />
          <Navigation />
        </ConfirmDeleteProvider>
      </BrowserRouter>
    </Provider>
    <ToastContainer />
  </Fragment>
);
