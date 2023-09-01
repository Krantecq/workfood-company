import React from "react";
import "./user-info.scss";
import AppLogo from "../../assets/images/appLogo.png";
import Notification from "../topnav/Notification";
import { useLocation } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";

const UserInfo = ({ user }) => {
  const location = useLocation();

  return (
    <>
      <div className="user-info" style={{ marginLeft: "-40px" }}>
        <div className="user-info__img">
        </div>
      </div>
      {location.pathname === PATH_DASHBOARD.root && <Notification />}
    </>
  );
};

export default UserInfo;
