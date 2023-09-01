import React from "react";
import { Box, Paper } from "@mui/material";
import { usersOrchardRequestHeadingItems } from "../../../constants/metaData";
import { useUserSelected } from "../../../hooks";
import OrchardRequestListing from "./UserTables/OrchardRequestTable";

const OrchardRequest = () => {
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
        <Box>Orchard Request</Box>
      </Paper>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <OrchardRequestListing
          data={
            selectedUser?.orchard && selectedUser?.orchard?.length > 0
              ? selectedUser.orchard
              : []
          }
          headingItems={usersOrchardRequestHeadingItems}
          isLoading={false}
          selectedItems={""}
          onSelectItems={""}
        />
      </Paper>
    </Box>
  );
};

export default OrchardRequest;
