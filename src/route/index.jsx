import App from "../components/app";

import UserLogin from "../components/auth/login";
import userForgetPassword from "../components/auth/forget-pasword";

// Dashboard
import AdminDashboard from "../components/dashboard/admin";

//Telas de eventos
import GeneralInfos from "../components/dashboard/events/create/general";
import TicketSector from "../components/dashboard/events/create/ticket";
import ProductSector from "../components/dashboard/events/create/product";
import Pdv from "../components/dashboard/events/create/pdv";
import Confirmation from "../components/dashboard/events/create/confirmation";

// Events
import EventCreation from "../components/dashboard/events/list";


// Errors
import Page404 from "../components/errors/error404";

export const routes = [
 
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

  //Rotas telas de eventos
  {
    path: `/general`,
    component: App,
    child: GeneralInfos,
    privateRoute: true,
  },
  {
    path: `/ticket`,
    component: App,
    child: TicketSector,
    privateRoute: true,
  },
  {
    path: `/product`,
    component: App,
    child: ProductSector,
    privateRoute: true,
  },
  {
    path: `/pdv`,
    component: App,
    child: Pdv,
    privateRoute: true,
  },
  {
    path: `/confirmation`,
    component: App,
    child: Confirmation,
    privateRoute: true,
  },


  { path: `/`, component: UserLogin, privateRoute: false },
  { path: `/forget-pwd`, component: userForgetPassword, privateRoute: false },

  { path: `*`, component: Page404, privateRoute: false },
];
