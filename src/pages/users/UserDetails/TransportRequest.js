import React from "react";
import { Box, Paper } from "@mui/material";
import {
  usersOrdersHeadingItems,
  usersTransportRequestHeadingItems,
} from "../../../constants/metaData";
import { useUserSelected } from "../../../hooks";
import StorageRequestListing from "./UserTables/StorageRequestTable";
import TransportRequestListing from "./UserTables/TransportRequestTable";

const TransportRequest = () => {
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
        <Box>Transport Request</Box>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TransportRequestListing
          data={
            selectedUser?.transport && selectedUser?.transport?.length > 0
              ? selectedUser.transport
              : []
          }
          headingItems={usersTransportRequestHeadingItems}
          isLoading={false}
          selectedItems={""}
          onSelectItems={""}
        />
      </Paper>
    </Box>
  );
};

export default TransportRequest;
