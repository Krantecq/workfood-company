import React from "react";
import { MuiTable, NoDataFound, TableLoader } from "../../../components";
import { Button, Link, TableBody, TableCell, TableRow } from "@mui/material";
import { MEAL_TIME } from "../../../constants/metaData";

const OrderListing = ({
  isLoading = false,
  headingItems = [],
  data = [],
  onViewOrder = () => {},
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
              {
                id,
                companyname,
                orderDate,
                customerName,
                orderTiming,
                totalQuantity,
                status,
                method,
              },
              index
            ) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                  <TableCell>
                    <Link as={Button} onClick={() => onViewOrder(id)}>
                      {id}
                    </Link>
                  </TableCell>
                  <TableCell>{companyname}</TableCell>
                  <TableCell>{orderDate}</TableCell>
                  <TableCell>{customerName}</TableCell>
                  <TableCell>{method}</TableCell>
                  <TableCell>
                    {orderTiming
                      ? MEAL_TIME.find(({ value }) => orderTiming === value)
                          ?.label
                      : "-"}
                  </TableCell>
                  <TableCell>{`₹${totalQuantity}`}</TableCell>
                  <TableCell>{status}</TableCell>
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

export default OrderListing;
