import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFireStore } from "../../../hooks";
import { collections } from "../../../firebase/collections";
import { Paper } from "@mui/material";
import UserListing from "./UserListing";
import { companiesUsersTableHeaders } from "../../../constants/metaData";
import { getDocument } from "../../../firebase/services/getServices";
import { Loader } from "../../../components";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const { id } = useParams();
  const { data, isFetching } = useFireStore(
    `${collections.companies}/${id}/Employee`
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
              `${collections.companies}/${id}/Employee/${item.id}/orders`
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
  }, [id, data]);

  if (isFetching || isLoading) return <Loader />;

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <UserListing
        data={users && users?.length > 0 ? users : []}
        headingItems={companiesUsersTableHeaders}
        isLoading={isFetching || isLoading}
        isCheckBox={false}
      />
    </Paper>
  );
};

export default Users;
