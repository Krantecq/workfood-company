import React from "react";
import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import sidebarNav from "../../configs/sidebarNav";
import { useAuth, useToaster } from "../../hooks";
import { toastMessages, toastTypes } from "../../constants/keywords";
import AppLogo from "../../assets/images/appLogo.png";

const Sidebar = () => {
  const location = useLocation();
  const { toaster } = useToaster();
  const { logout } = useAuth();

  const closeSidebar = () => {
    document.querySelector(".main__content").style.transform =
      "scale(1) translateX(0)";
    setTimeout(() => {
      document.body.classList.remove("sidebar-open");
      document.querySelector(".main__content").style = "";
    }, 500);
  };

  const onLogout = async () => {
    try {
      const res = await logout();
      if (!res.status) {
        return toaster(
          toastTypes.ERROR,
          res.error.message || toastMessages.GENERAL_ERROR
        );
      }
      if (res.status) {
        toaster(toastTypes.SUCCESS, toastMessages.LOGOUT_SUCCESS);
      }
    } catch (error) {
      toaster(toastTypes.ERROR, toastMessages.GENERAL_ERROR);
    }
  };

  return (
    <div className="sidebar" style={{ marginLeft: "-48px" }}>
      <div className="sidebar__logo" style={{ padding: "20px 0" }}>
        <img
          src={AppLogo}
          alt=""
          style={{ width: "25%", height: "100%", borderRadius: "100%" }}
        />
        <div className="sidebar-close" onClick={closeSidebar}>
          <i className="bx bx-x"></i>
        </div>
      </div>
      <div className="sidebar__menu">
        {sidebarNav.map((nav, index) => (
          <Link
            to={nav.link}
            key={`nav-${index}`}
            className={`sidebar__menu__item ${
              location.pathname === nav.link ? "active" : ""
            }`}
            onClick={closeSidebar}
          >
            <div className="sidebar__menu__item__icon">{nav.icon}</div>
            <div className="sidebar__menu__item__txt">{nav.text}</div>
          </Link>
        ))}
        <div className="sidebar__menu__item" onClick={onLogout}>
          <div className="sidebar__menu__item__icon">
            <i className="bx bx-log-out"></i>
          </div>
          <div className="sidebar__menu__item__txt">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
