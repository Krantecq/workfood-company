import { DeleteForever } from "@mui/icons-material";
import { Avatar, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { formateFireStoreDate } from "../../utils/helper";
import { TableLoader } from "../loader";
import MuiTable from "../table";
import NoDataFound from "../table/NoDataFound";

const BannerListing = (props) => {
  const { data, isLoading, headingItems, handleDelete } = props;
  return (
    <MuiTable {...props}>
      <TableBody>
        {isLoading ? (
          <TableLoader colSpan={headingItems.length} />
        ) : data && data.length > 0 ? (
          data.map(({ id, image, identifier, uploadedAt }, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow hover key={id}>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                >
                  <Avatar src={image} />
                </TableCell>
                <TableCell>{formateFireStoreDate(uploadedAt)}</TableCell>
                <TableCell>
                  <DeleteForever
                    color="error"
                    onClick={() => handleDelete(id)}
                  />
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

export default BannerListing;
