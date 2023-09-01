import React from "react";
import {
  Grid,
  Avatar,
  Stack,
  ListItemAvatar,
  List,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { userNavItems } from "../../constants/metaData";
import { useUserSelected } from "../../hooks";
import { getAddress } from "../../utils/helper";

const UserSideBar = () => {
  const location = useLocation();
  const { selectedUser } = useUserSelected();

  return (
    <div
      style={{
        backgroundColor: "#ECEFEA",
        borderRadius: "25px",
        cursor: "pointer",
        marginLeft: "-139px",
      }}
    >
      <div>
        <Stack
          direction="row"
          spacing={2}
          style={{ marginTop: "15px", marginLeft: "73px" }}
        >
          <Avatar
            alt={`${selectedUser?.userprofile?.name} ${selectedUser?.userprofile?.last}`}
            src={selectedUser?.userprofile?.user_profile}
          />
        </Stack>
      </div>
      <div style={{ marginTop: "12px", marginLeft: "58px" }}>
        <h3>
          {selectedUser?.userprofile?.name
            ? `${selectedUser?.userprofile?.name} ${selectedUser?.userprofile?.last}`
            : "Farmful User"}
        </h3>
      </div>
      <div style={{ marginTop: "15px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List dense={false}>
              {userNavItems.map(({ label, path, icon }, index) => (
                <ListItemButton
                  component={NavLink}
                  to={path.replace("id", selectedUser?.id)}
                  key={index}
                  selected={
                    location.pathname === path.replace("id", selectedUser?.id)
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
      <Stack>
        <Typography align="center" variant="h6" gutterBottom>
          Contact Info
        </Typography>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {selectedUser?.userprofile?.phoneno
            ? `+91${selectedUser?.userprofile?.phoneno}`
            : ""}
        </Typography>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {selectedUser?.userprofile?.address
            ? getAddress(selectedUser?.userprofile?.address)
            : ""}
        </Typography>
      </Stack>
    </div>
  );
};

export default UserSideBar;
