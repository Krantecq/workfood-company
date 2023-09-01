import React from "react";
import { MuiTable, NoDataFound, TableLoader } from "../../../components";
import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";

const WalletBalanceListing = ({
  isLoading = false,
  headingItems = [],
  data = [],
  onAddBalance = () => {},
  ...rest
}) => {
  return (
    <MuiTable {...rest} headingItems={headingItems}>
      <TableBody>
        {isLoading ? (
          <TableLoader colSpan={headingItems.length} />
        ) : data && data.length > 0 ? (
          data?.map(({ id, Name, Wallet, Designation }, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{Name}</TableCell>
                <TableCell>{Designation}</TableCell>
                <TableCell>{Wallet}</TableCell>
                <TableCell>
                  <Tooltip title="Add Balance">
                    <IconButton onClick={() => onAddBalance(id)}>
                      <i className="bx bx-plus-circle"></i>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <NoDataFound colSpan={headingItems.length} />
        )}
      </TableBody>
    </MuiTable>
  );
};

export default WalletBalanceListing;
