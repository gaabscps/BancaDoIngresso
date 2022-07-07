import App from '../components/app';

import UserLogin from '../components/auth/login';
import userForgetPassword from '../components/auth/forget-pasword';

// Dashboard
import AdminDashboard from '../components/dashboard/admin';
import UserAndGroup from '../components/dashboard/usersAndGroup';
import MainPdv from '../components/dashboard/mainPdv';
import MainPos from '../components/dashboard/mainPos';
import MainCompany from '../components/dashboard/mainCompany';
import MainGateway from '../components/dashboard/mainGateway';
import MainPayment from '../components/dashboard/mainPayment';
import MainDocument from '../components/dashboard/mainDocument';
import MainReports from '../components/dashboard/mainReport';
import MainLogs from '../components/dashboard/mainLogs';
import MainProduct from '../components/dashboard/mainProduct';
import MainMetrics from '../components/dashboard/mainMetrics';
import MainModule from '../components/dashboard/mainModule';

// Report Detail
import ReportDetail from '../components/dashboard/mainReport/salesReport';

// Events
import EventCreation from '../components/dashboard/events/list';

// Event Creation Screens
import GeneralInfos from '../components/dashboard/events/create/general';
import TicketSector from '../components/dashboard/events/create/ticket';
import ProductSector from '../components/dashboard/events/create/product';
import Pdv from '../components/dashboard/events/create/pdv';
import Confirmation from '../components/dashboard/events/create/confirmation';

// Errors
import Page404 from '../components/errors/error404';

export interface RoteContent {
  path: string;
  component: (props: any) => JSX.Element;
  child?: (props: any) => JSX.Element;
  privateRoute: boolean;
}

export const routes: RoteContent[] = [
  // Main Screens
  {
    path: `/dashboard/admin`,
    component: App,
    child: AdminDashboard,
    privateRoute: true,
  },
  {
    path: `/events`,
    component: App,
    child: EventCreation,
    privateRoute: true,
  },
  {
    path: `/users-groups`,
    component: App,
    child: UserAndGroup,
    privateRoute: true,
  },
  {
    path: `/pdv`,
    component: App,
    child: MainPdv,
    privateRoute: true,
  },
  {
    path: `/pos`,
    component: App,
    child: MainPos,
    privateRoute: true,
  },
  {
    path: `/company`,
    component: App,
    child: MainCompany,
    privateRoute: true,
  },
  {
    path: `/gateway`,
    component: App,
    child: MainGateway,
    privateRoute: true,
  },
  {
    path: `/payment`,
    component: App,
    child: MainPayment,
    privateRoute: true,
  },
  {
    path: `/document`,
    component: App,
    child: MainDocument,
    privateRoute: true,
  },
  {
    path: `/report`,
    component: App,
    child: MainReports,
    privateRoute: true,
  },
  {
    path: `/logs`,
    component: App,
    child: MainLogs,
    privateRoute: true,
  },
  {
    path: `/product`,
    component: App,
    child: MainProduct,
    privateRoute: true,
  },
  {
    path: `/metrics`,
    component: App,
    child: MainMetrics,
    privateRoute: true,
  },
  {
    path: `/modules`,
    component: App,
    child: MainModule,
    privateRoute: true,
  },

  /// Route screens of report
  {
    path: `/report-detail`,
    component: App,
    child: ReportDetail,
    privateRoute: true,
  },

  // Routes screens of events
  {
    path: `/event/general`,
    component: App,
    child: GeneralInfos,
    privateRoute: true,
  },
  {
    path: `/event/ticket`,
    component: App,
    child: TicketSector,
    privateRoute: true,
  },
  {
    path: `/event/product`,
    component: App,
    child: ProductSector,
    privateRoute: true,
  },
  {
    path: `/event/pdv`,
    component: App,
    child: Pdv,
    privateRoute: true,
  },
  {
    path: `/event/confirmation`,
    component: App,
    child: Confirmation,
    privateRoute: true,
  },

  { path: `/`, component: UserLogin, privateRoute: false },
  { path: `/forget-pwd`, component: userForgetPassword, privateRoute: false },

  { path: `*`, component: Page404, privateRoute: false },
];
