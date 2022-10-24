import { AUTH_ROUTES } from '@/features/auth/navigation';
import { DASHBOARD_ROUTES } from '@/features/dashboard/navigation';
import { PDV_ROUTES } from '@/features/pdv/navigation';
import { POS_ROUTES } from '@/features/pos/navigation';
import { PAYMENTGATEWAY_ROUTES } from '@/features/paymentGateway/navigation';
import { PRODUTCTSCOMBOS_ROUTES } from '@/features/productsAndCombos/navigation';
import { USER_ROUTES } from '@/features/usersAndGroups/screens/navigation';
import { GROUPSUBGROUPPRODUCT_ROUTES } from '@/features/groupSubgroupProduct/navigation';
import { COMPANY_ROUTES } from '@/features/contractor/navigation';
import { MODULE_ROUTES } from '@/features/module/screens/navigation';
import { PERMISSION_ROUTES } from '@/features/permission/screens/navigation';

const path = {
  Initial: {
    ...AUTH_ROUTES,
    All: '*',
  },
  Dashboard: {
    ...DASHBOARD_ROUTES,
    Events: {
      itself: '/dashboard/events',
      edit: '/dashboard/events/edit/:id',
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
    Payment: {
      itself: '/dashboard/payment',
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
