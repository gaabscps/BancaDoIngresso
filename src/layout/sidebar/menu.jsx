import { Home } from "react-feather";
export const MENUITEMS = [
  {
    Items: [
      {
        title: "Home",
        icon: Home,
        active: false,
        path: `${process.env.PUBLIC_URL}`,
        type: "link",
      },
    ],
  },
];
