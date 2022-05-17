import App from "../components/app";

import UserLogin from "../components/auth/login";
import userForgetPassword from "../components/auth/forget-pasword";

// Dashbaord
import AdminDashboard from "../components/dashboard/admin";

// Errors
import Page404 from "../components/errors/error404";

export const routes = [
  {
    path: `/dashboard/admin`,
    component: App,
    child: AdminDashboard,
    privateRoute: true,
  },

  { path: `/`, component: UserLogin, privateRoute: false },
  { path: `/forget-pwd`, component: userForgetPassword, privateRoute: false },

  { path: `*`, component: Page404, privateRoute: false },
];
