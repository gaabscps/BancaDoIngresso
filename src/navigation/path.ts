import { AUTH_ROUTES } from '@/features/auth/navigation';
import { DASHBOARD_ROUTES } from '@/features/dashboard/navigation';
import { PDV_ROUTES } from '@/features/pdv/navigation';
import { POS_ROUTES } from '@/features/pos/navigation';
import { PAYMENTGATEWAY_ROUTES } from '@/features/paymentGateway/navigation';
import { PRODUTCTSCOMBOS_ROUTES } from '@/features/productsAndCombos/navigation';
import { COMPANY_ROUTES } from '@/features/company/navigation';

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
    Pdv: {
      ...PDV_ROUTES,
    },
    Pos: {
      ...POS_ROUTES,
    },
    Gateway: {
      ...PAYMENTGATEWAY_ROUTES,
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
