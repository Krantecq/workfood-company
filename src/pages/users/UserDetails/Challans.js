import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import { usersChallenHeadingItems } from "../../../constants/metaData";
import { useUserSelected } from "../../../hooks";
import ChallensListing from "./UserTables/ChallensTable";

const Challans = () => {
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
        <Box>Challans</Box>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <ChallensListing
          data={
            selectedUser?.challan && selectedUser?.challan?.length > 0
              ? selectedUser.challan
              : []
          }
          headingItems={usersChallenHeadingItems}
          isLoading={false}
          selectedItems={""}
          onSelectItems={""}
        />
      </Paper>
    </Box>
  );
};

export default Challans;
