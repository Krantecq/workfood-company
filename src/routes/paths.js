const path = (root, subLink) => `${root}${subLink}`;

const BASE_PATH = "/";
const DASHBOARD_PATH = "/dashboard/";

export const PATH_AUTH = {
  login: path(BASE_PATH, "login"),
  forgotPassword: path(BASE_PATH, "forgotPassword"),
  signup: path(BASE_PATH, "signup"),
};

export const PATH_DASHBOARD = {
  root: DASHBOARD_PATH,
  companies: {
    root: path(DASHBOARD_PATH, "companies"),
    view: (id) => path(DASHBOARD_PATH, `companies/${id}`),
    orders: (id) => path(DASHBOARD_PATH, `companies/${id}/orders`),
    users: (id) => path(DASHBOARD_PATH, `companies/${id}/users`),
    ratings: (id) => path(DASHBOARD_PATH, `companies/${id}/ratings`),
    walletBalance: (id) =>
      path(DASHBOARD_PATH, `companies/${id}/walletBalance`),
  },
  settings: path(DASHBOARD_PATH, "settings"),
  blogs: path(DASHBOARD_PATH, "blogs"),
  menus: path(DASHBOARD_PATH, "menus"),
  employees: path(DASHBOARD_PATH, "employees"),
  orders: path(DASHBOARD_PATH, "orders"),
};
