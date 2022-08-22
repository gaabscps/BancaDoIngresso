import { Home, Calendar, Settings } from 'react-feather';

const isPathName = (route: string): boolean => window.location.pathname === route;

export const MENUITEMS = {
  Items: [
    {
      title: 'Início',
      icon: Home,
      active: isPathName('/dashboard/admin'),
      path: `/dashboard/admin`,
      type: 'link',
      index: '1',
    },

    {
      path: `/events`,
      icon: Calendar,
      title: 'Eventos',
      type: 'link',
      active: isPathName('/events'),
      index: '1',
    },
    {
      title: 'Administração',
      icon: Settings,
      type: 'sub',
      active: false,
      index: '1',
      children: [
        {
          path: `/users-groups`,
          title: 'Usuários e Grupos',
          type: 'link',
          index: '2',
        },
        {
          path: `/pdv`,
          title: 'PDV',
          type: 'link',
          index: '2',
        },
        {
          path: `/pos`,
          title: 'POS',
          type: 'link',
          index: '2',
        },
        {
          path: `/company`,
          title: 'Empresas',
          type: 'link',
          index: '2',
        },
        {
          path: `/gateway`,
          title: 'Gateway de pagamento',
          type: 'link',
          index: '2',
        },
        {
          path: `/payment`,
          title: 'Formas de pagamento',
          type: 'link',
          index: '2',
        },
        {
          path: `/document`,
          title: 'Documentos',
          type: 'link',
          index: '2',
        },
        {
          path: `/product`,
          title: 'Produtos',
          type: 'link',
          index: '2',
        },
        {
          path: `/metrics`,
          title: 'Métricas',
          type: 'link',
          index: '2',
        },
        {
          path: `/modules`,
          title: 'Módulos',
          type: 'link',
          index: '2',
        },
        {
          path: `/report`,
          title: 'Relatórios',
          type: 'link',
          index: '2',
        },
        {
          path: `/logs`,
          title: 'Logs',
          type: 'link',
          index: '2',
        },
      ],
    },
  ],
};
