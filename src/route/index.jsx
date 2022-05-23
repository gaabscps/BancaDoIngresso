import App from "../components/app";

import UserLogin from "../components/auth/login";
import userForgetPassword from "../components/auth/forget-pasword";

// Dashboard
import AdminDashboard from "../components/dashboard/admin";

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


  { path: `/`, component: UserLogin, privateRoute: false },
  { path: `/forget-pwd`, component: userForgetPassword, privateRoute: false },

  { path: `*`, component: Page404, privateRoute: false },
];
