import { AUTH_ROUTES } from '@/features/auth/navigation';
import { CLIENT_ROUTES } from '@/features/client/navigation';
import { COMBO_ROUTES } from '@/features/combo/navigation';
import { COMPANY_ROUTES } from '@/features/contractor/navigation';
import { DASHBOARD_ROUTES } from '@/features/dashboard/navigation';
import { EVENTS_ROUTES } from '@/features/events/navigation';
import { GROUPSUBGROUPPRODUCT_ROUTES } from '@/features/groupSubgroupProduct/navigation';
import { MENU_ROUTES } from '@/features/menu/screens/navigation';
import { MODULE_ROUTES } from '@/features/module/screens/navigation';
import { PAYMENT_ROUTES } from '@/features/paymentMethods/navigation';
import { PAYMENTGATEWAY_ROUTES } from '@/features/paymentGateway/navigation';
import { PDV_ROUTES } from '@/features/pdv/navigation';
import { PERMISSION_ROUTES } from '@/features/permission/screens/navigation';
import { POS_ROUTES } from '@/features/pos/navigation';
import { PRODUTCT_ROUTES } from '@/features/product/navigation';
import { PRODUTCTSCOMBOS_ROUTES } from '@/features/productsAndCombos/navigation';
import { REGISTEREVENT_ROUTES } from '@/features/registerEvent/navigation';
import { SUB_MENU_ROUTES } from '@/features/submenu/screens/navigation';
import { TICKET_ROUTES } from '@/features/ticket/navigation';
import { USER_ROUTES } from '@/features/usersAndGroups/screens/navigation';
import { EVENTCLOSE_ROUTES } from '@/features/eventClose/navigation';

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
    Ticket: {
      ...TICKET_ROUTES,
    },
    UsersGroups: {
      itself: '/dashboard/users-groups',
      edit: '/dashboard/users-groups/edit/:id',
    },
    Clients: {
      ...CLIENT_ROUTES,
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
    Combo: {
      ...COMBO_ROUTES,
    },
    Product: {
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
    EventClose: {
      ...EVENTCLOSE_ROUTES,
    },
  },
} as const;

export { path };
