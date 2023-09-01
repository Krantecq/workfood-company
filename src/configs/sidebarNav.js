import { PATH_DASHBOARD } from "../routes/paths";

const sidebarNav = [
  {
    link: PATH_DASHBOARD.root,
    section: "dashboard",
    icon: <i className="bx bx-home-alt"></i>,
    text: "Home",
  },

  {
    link: PATH_DASHBOARD.orders,
    section: "orders",
    icon: <i className="bx bx-cart-alt"></i>,
    text: "Orders",
  },
  {
    link: PATH_DASHBOARD.menus,
    section: "menu",
    icon: <i className="bx bx-menu"></i>,
    text: "Menu",
  },
  {
    link: PATH_DASHBOARD.employees,
    section: "employees",
    icon: <i className="bx bx-user"></i>,
    text: "Employees",
  },
];

export default sidebarNav;
