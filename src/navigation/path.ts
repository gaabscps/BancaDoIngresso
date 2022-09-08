import { AUTH_ROUTES } from '@/features/auth/navigation';
import { DASHBOARD_ROUTES } from '@/features/dashboard/navigation';

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
      itself: '/dashboard/pdv',
    },
    Pos: {
      itself: '/dashboard/pos',
    },
    Company: {
      itself: '/dashboard/company',
    },
    Gateway: {
      itself: '/dashboard/gateway',
    },
    Payment: {
      itself: '/dashboard/payment',
    },
  },
} as const;

export { path };
