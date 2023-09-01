import * as React from "react";
import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";

export const TableLoader = ({ colSpan = 0 }) => (
  <TableRow>
    <TableCell colSpan={colSpan + 1} align="center">
      <Loader />
    </TableCell>
  </TableRow>
);

const Loader = () => {
  return (
    <Box
      sx={{
        d: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <CircularProgress color="inherit" />;
    </Box>
  );
};

export default Loader;
