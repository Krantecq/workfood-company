import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import { usersOrdersHeadingItems } from "../../../../constants/metaData";
import { useUserSelected } from "../../../../hooks";
import OrdersListing from "../UserTables/OrderTable";

const Orders = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const { selectedUser } = useUserSelected();

  const onSelectItems = (checked, isAll = false, id) => {
    if (isAll) {
      checked
        ? setSelectedItems(selectedUser?.orders.map(({ id }) => id))
        : setSelectedItems([]);
    } else {
      checked
        ? setSelectedItems((prev) => [...prev, id])
        : setSelectedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          color: "primary",
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>Orders</Box>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <OrdersListing
          data={
            selectedUser?.orders && selectedUser?.orders?.length > 0
              ? selectedUser.orders
              : []
          }
          headingItems={usersOrdersHeadingItems}
          isLoading={false}
          selectedItems={selectedItems}
          onSelectItems={onSelectItems}
        />
      </Paper>
    </Box>
  );
};

export default Orders;
