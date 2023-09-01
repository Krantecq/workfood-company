import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useUserSelected } from "../hooks";
import { Box, CssBaseline } from "@mui/material";
import UserSideBar from "./common/UserSideBar";

const UserLayout = () => {
  // Hooks
  const { userId } = useParams();
  const { setSelectedUser, fetchUser } = useUserSelected();

  // Effects
  useEffect(() => {
    fetchUser(userId);
    return () => setSelectedUser(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <UserSideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
