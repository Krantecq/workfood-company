import React from "react";
import { MuiTable, NoDataFound, TableLoader } from "../../../components";
import { TableBody, TableCell, TableRow } from "@mui/material";

const UserListing = ({
  isLoading = false,
  headingItems = [],
  data = [],
  ...rest
}) => {
  return (
    <MuiTable {...rest} headingItems={headingItems}>
      <TableBody>
        {isLoading ? (
          <TableLoader colSpan={headingItems.length} />
        ) : data && data.length > 0 ? (
          data?.map(
            (
              { id, Name, Phone, Wallet, Designation, orderStatus, Email },
              index
            ) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{Name}</TableCell>
                  <TableCell>{Designation}</TableCell>
                  <TableCell>{Phone}</TableCell>
                  <TableCell>{Email}</TableCell>
                  <TableCell>{`₹${Wallet}`}</TableCell>
                  <TableCell>{orderStatus || "-"}</TableCell>
                </TableRow>
              );
            }
          )
        ) : (
          <NoDataFound colSpan={headingItems.length} />
        )}
      </TableBody>
    </MuiTable>
  );
};

export default UserListing;
