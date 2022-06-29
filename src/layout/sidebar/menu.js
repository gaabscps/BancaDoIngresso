import { Home, Calendar, Settings } from "react-feather";
const isPathName = (route) => window.location.pathname === route;

export const MENUITEMS = [
  {
    Items: [
      {
        title: "Início",
        icon: Home,
        active: true,
        active: isPathName("/dashboard/admin"),
        path: `/dashboard/admin`,
        type: "link",
      },

      {
        path: `/events`,
        icon: Calendar,
        title: "Eventos",
        type: "link",
        active: isPathName("/events"),
      },
      {
        title: "Administração",
        icon: Settings,
        type: "sub",
        active: false,
        children: [
          {
            path: `/users-groups`,
            title: "Usuários e Grupos",
            type: "link",
          },
          {
            path: `/pdv`,
            title: "PDV",
            type: "link",
          },
          {
            path: `/pos`,
            title: "POS",
            type: "link",
          },
          {
            path: `/company`,
            title: "Empresas",
            type: "link",
          },
          {
            path: `/gateway`,
            title: "Gateway de pagamento",
            type: "link",
          },
          {
            path: `/payment`,
            title: "Formas de pagamento",
            type: "link",
          },
          {
            path: `/document`,
            title: "Documentos",
            type: "link",
          },
          {
            path: `/product`,
            title: "Produtos",
            type: "link",
          },
          {
            path: `/metrics`,
            title: "Métricas",
            type: "link",
          },
          {
            path: `/modules`,
            title: "Módulos",
            type: "link",
          },
          {
            path: `/report`,
            title: "Relatórios",
            type: "link",
          },
          {
            path: `/logs`,
            title: "Logs",
            type: "link",
          },
        ],
      },
    ],
  },
];
