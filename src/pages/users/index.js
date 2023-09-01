import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserListing from "./UserListing";
import { useAuth, useFireStore } from "../../hooks";
import { collections } from "../../firebase/collections";
import { companiesUsersTableHeaders } from "../../constants/metaData";

import { getDocument } from "../../firebase/services/getServices";

const User = () => {
  // States
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const { user } = useAuth();
  const { data, isFetching } = useFireStore(
    `${collections.companies}/${user.id}/Employee`
  );

  const mostRecentRecord = (dateArray) =>
    dateArray.reduce((prev, current) => {
      const prevDate = new Date(prev.orderDate);
      const currentDate = new Date(current.orderDate);
      return currentDate > prevDate ? current : prev;
    });

  useEffect(() => {
    (async () => {
      if (data && data.length > 0) {
        setIsLoading(true);

        const userOrders = await Promise.all(
          data.map(async (item) => {
            const res = await getDocument(
              `${collections.companies}/${user.id}/Employee/${item.id}/orders`
            );
            if (res.status && res.data && res.data.length > 0) {
              return {
                ...item,
                orderStatus: res?.data?.length
                  ? mostRecentRecord(res.data)?.status
                  : "",
              };
            } else return { ...item, orderStatus: "" };
          })
        );
        setIsLoading(false);

        return setUsers(userOrders);
      } else {
        return setUsers([]);
      }
    })();
  }, [user, data]);

  return (
    <Box sx={{ width: "100%" }} pr={5}>
      <Paper
        sx={{
          p: 2,
          color: "primary",
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>Users ({data?.length || 0})</Box>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <UserListing
          data={users && users?.length > 0 ? users : []}
          headingItems={companiesUsersTableHeaders}
          isLoading={isFetching || isLoading}
          isCheckBox={false}
        />
      </Paper>
    </Box>
  );
};

export default User;
