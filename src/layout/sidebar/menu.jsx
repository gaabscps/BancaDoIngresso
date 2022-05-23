import { Home } from "react-feather";
export const MENUITEMS = [
  {
    Items: [
      {
        title: "Início",
        icon: Home,
        active: true,
        path: `${process.env.PUBLIC_URL}`,
        type: "link",
      },
    ],
  },
];
