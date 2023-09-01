import React from "react";
import { Box, Paper } from "@mui/material";
import { usersStorageRequestHeadingItems } from "../../../constants/metaData";
import { useUserSelected } from "../../../hooks";
import StorageRequestListing from "./UserTables/StorageRequestTable";

const StorageRequest = () => {
  const { selectedUser } = useUserSelected();

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
        <Box>Storage Request</Box>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <StorageRequestListing
          data={
            selectedUser?.storage && selectedUser?.storage?.length > 0
              ? selectedUser.storage
              : []
          }
          headingItems={usersStorageRequestHeadingItems}
          isLoading={false}
          selectedItems={""}
          onSelectItems={""}
        />
      </Paper>
    </Box>
  );
};

export default StorageRequest;
