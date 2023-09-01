import { TableCell, TableRow } from "@mui/material";
import React from "react";

const NoDataFound = ({ showText = "No Data Found", colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan + 1} align="center">
        {showText}
      </TableCell>
    </TableRow>
  );
};

export default NoDataFound;
