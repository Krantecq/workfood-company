import React from "react";
import { MuiTable, NoDataFound, TableLoader } from "../../../components";
import {
  Avatar,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";

const RatingListing = ({
  isLoading = false,
  headingItems = [],
  data = [],
  onView = () => {},
  ...rest
}) => {
  return (
    <MuiTable {...rest} headingItems={headingItems}>
      <TableBody>
        {isLoading ? (
          <TableLoader colSpan={headingItems.length} />
        ) : data && data.length > 0 ? (
          data?.map(
            ({ id, itemName, like, dislike, Phone, itemImageUrl }, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                  <TableCell>
                    <Stack direction="row" gap={2}>
                      <Avatar src={itemImageUrl} />
                      {itemName}
                    </Stack>
                  </TableCell>
                  <TableCell>{like}</TableCell>
                  <TableCell>{dislike}</TableCell>
                  <TableCell>
                    {like || dislike
                      ? `${((+like / (+like + +dislike)) * 100).toFixed(2)}%`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => onView(id)}>
                      <RemoveRedEyeOutlined />
                    </IconButton>
                  </TableCell>
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

export default RatingListing;
