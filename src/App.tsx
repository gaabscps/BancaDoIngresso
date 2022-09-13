import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navigation } from '@/navigation';
import { DialogProvider } from '@/hooks/useDialog';
import store from '@/store';

import 'dayjs';
import 'dayjs/locale/pt-br';
import 'react-toastify/dist/ReactToastify.min.css';
import '@/styles/index.scss';

export const App: React.FC = (): JSX.Element => (
  <Fragment>
    <Provider store={store}>
      <DialogProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </DialogProvider>
    </Provider>

    <ToastContainer />
  </Fragment>
);
