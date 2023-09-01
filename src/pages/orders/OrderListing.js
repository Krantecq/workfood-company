import { TableBody, TableCell, TableRow, Link, Button } from "@mui/material";
import { MuiTable, TableLoader, NoDataFound } from "../../components";
import { MEAL_TIME } from "../../constants/metaData";

export const OrderListing = (props) => {
  const { data, isLoading, headingItems, onViewOrder } = props;

  return (
    <MuiTable {...props} isCheckBox={false}>
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
                      ? MEAL_TIME?.find(({ value }) => value === orderTiming)
                          ?.label
                      : ""}
                  </TableCell>
                  <TableCell>
                    {totalQuantity ? `₹${totalQuantity}` : ""}
                  </TableCell>
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
