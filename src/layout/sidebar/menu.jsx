import { Home, Calendar } from "react-feather";
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
    ],
  },
];
