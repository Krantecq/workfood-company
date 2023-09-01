import React, { useEffect, useState } from "react";
import { Notifications } from "@mui/icons-material";
import {
  Badge,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  ListItemText,
  Divider,
  Popover,
  Typography,
  Stack,
} from "@mui/material";
import { useFireStore } from "../../hooks";
import { collections } from "../../firebase/collections";
import { formateFireStoreDate } from "../../utils/helper";
import { getDocument } from "../../firebase/services/getServices";
import { firebaseQueryOperators } from "../../firebase/queryBuilder";

const Notification = () => {
  // States
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const { data, dataCount } = useFireStore(collections.notifications, [
    { property: "time", isOrder: true, value: "desc" },
  ]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (data && data.length > 0) {
        const updated = await Promise.all(
          data.map(async (item) => {
            if (item.userId) {
              const res = await getDocument(collections.users, [
                {
                  property: "id",
                  operator: firebaseQueryOperators.EQUAL_TO,
                  value: item.userId,
                },
              ]);
              return { ...item, ...res.data?.at(0).userprofile };
            } else return item;
          })
        );
        setNotifications(updated);
      } else setNotifications([]);
    };
    fetchNotifications();
  }, [data]);

  return (
    <>
      <IconButton
        style={{ marginLeft: "561px" }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge badgeContent={dataCount} color="secondary">
          <Notifications color="primary" />
        </Badge>
      </IconButton>
      <Popover
        id="simple-popover"
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box>
          <List sx={{ width: "420px", bgcolor: "background.paper" }}>
            {notifications &&
              notifications.length > 0 &&
              notifications.map((user, index) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={user?.name + user?.last}
                        src={user?.user_profile}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user?.name} ${user?.last} - ${user.message}`}
                      secondary={
                        <Stack direction="row" justifyContent="space-between">
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {user.phoneno}
                          </Typography>
                          {`   ${
                            user?.time
                              ? formateFireStoreDate(
                                  user?.time,
                                  "dd/MM/yyyy hh:mm:ss aa"
                                )
                              : ""
                          }`}
                        </Stack>
                      }
                    />
                  </ListItem>
                  {index < data.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </>
              ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default Notification;
