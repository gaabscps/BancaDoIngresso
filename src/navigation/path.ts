import { AUTH_ROUTES } from '@/features/auth/navigation';
import { DASHBOARD_ROUTES } from '@/features/dashboard/navigation';
import { EVENTS_ROUTES } from '@/features/events/navigation';
import { PDV_ROUTES } from '@/features/pdv/navigation';
import { POS_ROUTES } from '@/features/pos/navigation';
import { PAYMENTGATEWAY_ROUTES } from '@/features/paymentGateway/navigation';
import { PRODUTCTSCOMBOS_ROUTES } from '@/features/productsAndCombos/navigation';
import { USER_ROUTES } from '@/features/usersAndGroups/screens/navigation';
import { GROUPSUBGROUPPRODUCT_ROUTES } from '@/features/groupSubgroupProduct/navigation';
import { COMPANY_ROUTES } from '@/features/contractor/navigation';
import { MODULE_ROUTES } from '@/features/module/screens/navigation';
import { PERMISSION_ROUTES } from '@/features/permission/screens/navigation';
import { MENU_ROUTES } from '@/features/menu/screens/navigation';
import { SUB_MENU_ROUTES } from '@/features/submenu/screens/navigation';
import { PAYMENT_ROUTES } from '@/features/paymentMethods/navigation';
import { PRODUTCT_ROUTES } from '@/features/product/navigation';
import { COMBO_ROUTES } from '@/features/combo/navigation';
import { REGISTEREVENT_ROUTES } from '@/features/registerEvent/navigation';

const path = {
  Initial: {
    ...AUTH_ROUTES,
    All: '*',
  },
  Dashboard: {
    ...DASHBOARD_ROUTES,
    Events: {
      ...EVENTS_ROUTES,
    },
    Event: {
      ...REGISTEREVENT_ROUTES,
    },
    UsersGroups: {
      itself: '/dashboard/users-groups',
      edit: '/dashboard/users-groups/edit/:id',
    },
    Module: {
      ...MODULE_ROUTES,
    },
    Permission: {
      ...PERMISSION_ROUTES,
    },
    Menu: {
      ...MENU_ROUTES,
    },
    SubMenu: {
      ...SUB_MENU_ROUTES,
    },
    User: {
      ...USER_ROUTES,
    },
    Pdv: {
      ...PDV_ROUTES,
    },
    Pos: {
      ...POS_ROUTES,
    },
    Gateway: {
      ...PAYMENTGATEWAY_ROUTES,
    },
    GroupSubgroupProduct: {
      ...GROUPSUBGROUPPRODUCT_ROUTES,
    },
    Product: {
      ...COMBO_ROUTES,
    },
    Combo: {
      ...PRODUTCT_ROUTES,
    },
    Payment: {
      ...PAYMENT_ROUTES,
    },
    ProductsCombos: {
      ...PRODUTCTSCOMBOS_ROUTES,
    },
    Company: {
      ...COMPANY_ROUTES,
    },
  },
} as const;

export { path };
